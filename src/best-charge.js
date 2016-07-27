function getFormattedTags(tags) {
  return tags.map((tag)=> {
    let temps = tag.split(' x ');
    return {id: temps[0], count: parseInt(temps[1])}
  })
}
function _getExistElementByBarcodes(array, id) {
  return array.find((countItem)=>countItem.id === id)
}
function buildCartItems(formattedTags, allItems) {
  return formattedTags.map(({id, count})=> {
    let {name, price}= _getExistElementByBarcodes(allItems, id);
    return {
      id,
      name,
      price,
      count
    }
  })
}
function _fixPrice(number) {
  return parseFloat(number.toFixed(2));
}

function buildPromotedItems(cartItems, promotions) {
  let currentPromotion = promotions.find((promotion)=>promotion.type === '指定菜品半价');
  return cartItems.map((cartItem)=> {
    let normalPrice = cartItem.count * cartItem.price;
    let hasHalfPromoted = currentPromotion.items.includes(cartItem.id);
    let saved = hasHalfPromoted ? normalPrice * 0.5 : 0;
    return Object.assign({}, cartItem, {normalPrice, saved: _fixPrice(saved)});
  })
}
function calculateTotalPrices(promotedItems) {
  return promotedItems.reduce((result, promotedItem)=> {
    result.totalNormalPrice += promotedItem.normalPrice;
    result.totalSaved += promotedItem.saved;
    return result;
  }, {totalNormalPrice: 0, totalSaved: 0})
}

function buildReceipt(promotedItems, {totalNormalPrice, totalSaved}) {
  let finalPrice = 0;
  let totalHalfPrice = totalNormalPrice - totalSaved;
  let totalSubPrice = totalNormalPrice - 6;
  if (totalNormalPrice < 30) {
    finalPrice = totalNormalPrice;
  } else if (totalSaved != 6) {
    finalPrice = totalSaved > 6 ? totalHalfPrice : totalSubPrice;
  } else {
    finalPrice = totalSubPrice;
  }
  let savedItems = [];
  if (finalPrice === totalHalfPrice) {
    savedItems = promotedItems.map(({name, saved})=> {
      return {name, saved};
    })
  }
  let promotedItem = promotedItems.map(({name, price, count, normalPrice, saved})=> {
    return {name, price, count, normalPrice, saved};
  });
  return {
    promotedItem,
    savedItems,
    totalNormalPrice,
    totalSaved,
    finalPrice
  }
}
function buildReceiptString(receipt) {
  let lines = ['============= 订餐明细 ============='];
  for (let {name, count, normalPrice} of receipt.promotedItem) {
    let line = `${name} x ${count} = ${normalPrice}元`;
    lines.push(line);
  }
  if (receipt.finalPrice != receipt.normalPrice) {
    if (receipt.totalSaved > 6) {

      let halfPricesItems=receipt.savedItems.filter(({saved})=> saved>0).map(({name})=>name);
      lines.push('-----------------------------------');
      lines.push('使用优惠:');
      lines.push(`指定菜品半价(${halfPricesItems.join(',')})，省${receipt.totalSaved}元`);
    }else if(receipt.totalSaved!=0){
      lines.push('-----------------------------------');
      lines.push('使用优惠:');
      lines.push('满30减6元，省6元');
    }
  }
  lines.push('-----------------------------------');
  lines.push(`总计：${receipt.finalPrice}元`);
  lines.push('===================================');
  let receiptString = lines.join('\n');
  console.log(receiptString);
  return receiptString;
}

function printReceipt(tags) {
  let formattedTags = getFormattedTags(tags);
  // console.log(formattedTags);
  let allItems = loadAllItems();
  let cartItems = buildCartItems(formattedTags, allItems);
  // console.log(cartItems);
  let promotions = loadPromotions();
  let promotedItems = buildPromotedItems(cartItems, promotions);
  // console.log(promotedItems);
  let totalPrices = calculateTotalPrices(promotedItems);
  // console.log(totalPrices);
  let receipt = buildReceipt(promotedItems, totalPrices);
  // console.log(receipt);
  let receiptString = buildReceiptString(receipt);
  // console.log(receiptString);
  return receiptString;
}
let tags = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
// let tags= ["ITEM0001 x 3", "ITEM0013 x 7"];

function loadAllItems() {
  return [{
    id: 'ITEM0001',
    name: '黄焖鸡',
    price: 18.00
  }, {
    id: 'ITEM0013',
    name: '肉夹馍',
    price: 6.00
  }, {
    id: 'ITEM0022',
    name: '凉皮',
    price: 8.00
  }, {
    id: 'ITEM0030',
    name: '冰锋',
    price: 2.00
  }];
}
function loadPromotions() {
  return [{
    type: '满30减6元'
  },
    {
      type: '指定菜品半价',
      items: ['ITEM0001', 'ITEM0022']
    }];
}
printReceipt(tags);


