function bestCharge(selectedItems) {
  let countedIds = countIds(selectedItems);
  let allItems = loadAllItems();
  let cartItems = buildCartItems(countedIds,allItems);
  let promotions = loadPromotions();
  let promotedItems = buildPromotions(cartItems,promotions);
  let totalPrice = calculateTotalPrices(promotedItems);

  let chosenTypePrice = chooseType(totalPrice);
  let receipt = buildReceipt(promotedItems,chosenTypePrice);
  let receiptString = buildReceiptString(receipt);

  return receiptString;
}

function countIds(tags) {
  return tags.map((tag) => {
    let [id,count] = tag.split(' x ');
    return {id, count: parseFloat(count)};
  });
}

function _getExistElementByIds(array, id) {
  return array.find((element) => element.id === id);
}

function buildCartItems(countedIds, allItems) {
  return countedIds.map(({id, count}) => {
    let {name, price} = _getExistElementByIds(allItems, id);
    return {id, name, price, count};
  })
}
// function calculateOriginalPrice(cartItems) {
//   return cartItems.reduce((originalTotalPrice, cartItem) => {
//     originalTotalPrice += cartItem.price * cartItem.count;
//     return originalTotalPrice;
//   }, 0)
// }
function buildPromotions(cartItems, promotions) {
  let halfPrice = promotions.find((promotion) => promotion.type === '指定菜品半价');
  return cartItems.map((cartItem) => {
    let hasHalf = halfPrice.items.includes(cartItem.id);
    let saved = hasHalf ? cartItem.price / 2 * cartItem.count : 0;
    let payPrice = cartItem.price * cartItem.count - saved;
    return Object.assign({}, cartItem, {
      payPrice, saved
    });
  });
}

function calculateTotalPrices(promotedItems) {
  return promotedItems.reduce((result, promotedItem)=> {
    debugger;
    result.totalPayPrice += promotedItem.payPrice;
    result.totalSaved += promotedItem.saved;
    return result;
  }, {totalPayPrice: 0, totalSaved: 0})
}

function chooseType({totalPayPrice,totalSaved}) {
  let total = totalPayPrice+totalSaved;
  let reachPromotion = total>=30 ? 6 :0;
  if(reachPromotion === 0){
    return {
      totalPayPrice:totalPayPrice,
      totalSaved:totalSaved,
      chosenType:''
    }
  }else if(reachPromotion > totalSaved){
    return {
      totalPayPrice:totalPayPrice-6,
      totalSaved:6,
      chosenType:'满30减6元'
    }
  }else {
    return {
      totalPayPrice:totalPayPrice,
      totalSaved:totalSaved,
      chosenType:'指定菜品半价'
    }
  }

}

function buildReceipt(promotedItems,{totalPayPrice,totalSaved,chosenType}) {
  let receiptArray =[];
  for(let promotedItem of promotedItems){
      receiptArray.push({
        name:promotedItem.name,
        price:promotedItem.price,
        count:promotedItem.count,
        payPrice:promotedItem.payPrice,
        saved:promotedItem.saved
      });
  }
  return {receiptItems:receiptArray,totalPayPrice,totalSaved,chosenType};
}

function buildReceiptString(receipt) {
  let lines = [];
  lines.push(`============= 订餐明细 =============`);
  let savedItems = receipt.receiptItems.filter((receiptItem)=> receiptItem.saved >0).map(({name})=>{
    return name;
  });

  for(let {name,count,payPrice} of receipt.receiptItems){
      let line=`${name} x ${count} = ${payPrice}元`;
      lines.push(line);
  }

  if(receipt.chosenType.length>0){
    lines.push(`-----------------------------------`);
    lines.push(`使用优惠:`);
    lines.push(`${receipt.chosenType}`);
  }

  lines.push(`-----------------------------------`);
  lines.push(`总计：${receipt.totalPayPrice}元`);
  lines.push(`===================================`);

  let result = lines.join("\n");
  return result;
}
