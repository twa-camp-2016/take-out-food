function bestCharge(selectedItems) {
  const allItems = loadAllItems();
  const orderItems = buildOrderItems(selectedItems, allItems);
  const promotions = loadPromotions();
  const bestChargeItems = buildBestChargeItems(orderItems, promotions);
  const Receipt = buildReceiptItems(bestChargeItems);
  const printText = buildReceipt(Receipt);
  return printText;
}

function buildReceipt(Receipt) {
  let DiscountText = '';
  const OrderItemsText = Receipt.bestChargeItems.map(item=> {
    let OrderItem = item.orderItem;

    return `${OrderItem.item.name} x ${OrderItem.count} = ${item.subtotal}元`;
  }).join('\n');


  for(let a of Receipt.bestChargeItems){
    if (Receipt.savedTotal === 6) {
      DiscountText = '使用优惠:\n满30减6元，省6元\n'+'-----------------------------------\n';
    }
    else if (Receipt.savedTotal > 6) {
      var discountName = '';
      if(a.saved){
        discountName += a.orderItem.item.name;
      }
      DiscountText = '使用优惠:\n指定菜品半价(' + discountName + ')，省' + Receipt.savedTotal+ '元\n'+'-----------------------------------\n';
    }
  }


  return '============= 订餐明细 =============\n' +OrderItemsText+ '\n-----------------------------------\n'+
DiscountText  + '总计：' + Receipt.total+'元\n' +'==================================='
}


function buildReceiptItems(bestChargeItems) {
  let total = 0;
  let savedTotal = 0;
  for (let item of bestChargeItems) {
    total += item.subtotal;
    savedTotal += item.saved;
  }
  if (total < 30) {
    total -= savedTotal;
  }
  else {
    const totalOne = total - savedTotal;
    const totalTwo = total - 6;
    if (totalOne > totalTwo) {
      total = totalTwo;
      savedTotal = 6;
    }
    else {
      total = totalOne;
    }
  }

  return {bestChargeItems, total, savedTotal};
}


function buildBestChargeItems(orderItems, promotions) {
  return orderItems.map(orderItem=> {
    let {subtotal, saved} = discount(orderItem.item.id, orderItem.item.price, orderItem.count, promotions);
    return {orderItem, subtotal, saved}
  });

}

function discount(id, price, count, promotions) {

  let promotionType = promotions.find(promotion=>promotion.type === '指定菜品半价');
  let discountId = promotionType.items.find(item=>item === id);
  let prePrice = 0;

  if (discountId) {
    prePrice = price / 2;
  }
  let saved = prePrice * count;
  let subtotal = count * price;

  return {saved, subtotal};
}


function buildOrderItems(selectedItems, allItems) {
  const orderItems = [];
  for (let selectedItem of selectedItems) {

    let orderArray = selectedItem.split(' x ');
    let id = orderArray[0];
    let count = parseInt(orderArray[1]);
    let orderItem = orderItems.find(orderItem=> orderItem.item.id === id);
    if (orderItem) {
      orderItem.count = count;
    }
    else {
      let item = allItems.find(item=>item.id === id);
      orderItems.push({item, count});
    }
  }
  return orderItems;
}


// module.exports = {
//   bestCharge:bestCharge,
//   buildOrderItems:buildOrderItems
// };

