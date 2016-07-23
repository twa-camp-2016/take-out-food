function bestCharge(selectedItems) {
  const allItems = loadAllItems();
  const orderItems = buildOrderItems(selectedItems, allItems);
  const allPromotions = loadPromotions();
  const receiptItems = buildReceiptItems(orderItems);
  const chargeItems = buildChargeItems(receiptItems, allPromotions);
  const receipt = buildReceipt(chargeItems);
  const receiptText = buildReceiptText(receipt);
  return receiptText;
}

function buildOrderItems(selectedItems, allItems) {
  const orderItems = [];
  for (const selectedItem of selectedItems) {
    const selectedItemArray = selectedItem.split(' x ');
    const id = selectedItemArray[0];
    const count = parseInt(selectedItemArray[1]);
    const item = allItems.find(item=>item.id === id);
    orderItems.push({item, count});
  }
  return orderItems;
}

function buildReceiptItems(orderItems) {
  return orderItems.map(orderItem=> {
    const subtotal = orderItem.count * orderItem.item.price;
    return {orderItem, subtotal};
  });
}

function buildChargeItems(receiptItems, promotions) {
  const sumFullCut = fullCut(receiptItems);
  const sumHalfPrice = halfPrice(receiptItems, promotions);

  if (sumFullCut <= sumHalfPrice) {
    return {receiptItems, type: '满30减6元', total: sumFullCut};
  }
  else {
    return {receiptItems, type: '指定菜品半价', total: sumHalfPrice};
  }
}

function fullCut(receiptItems) {
  let sum = 0;
  receiptItems.map((receiptItem)=> {
    sum += receiptItem.orderItem.item.price;
  });
  if (sum >= 30) {
    sum -= 6;
  }
  return sum;
}

function halfPrice(receiptItems, promotions) {
  let sum = 0;
  receiptItems.map((receiptItem)=> {
    let subtotal = receiptItem.subtotal;
    const promotionType = findPromotionType(receiptItem.orderItem.item.id, promotions);
    if (promotionType === '指定菜品半价') {
      subtotal = subtotal / 2;
    }
    sum += subtotal;
  });
  return sum;
}

function findPromotionType(id, promotions) {
  const promotion = promotions[1].items.find(b=>b === id);
  if (promotion) {
    return promotions[1].type;
  }
  else {
    return undefined;
  }
}


function buildReceipt(chargeItems) {
  let sum = 0;
  const receiptItems = chargeItems.receiptItems;
  for (const receiptItem of receiptItems) {
    sum += receiptItem.subtotal;
  }
  chargeItems.saved = sum - chargeItems.total;
  return chargeItems;
}

function buildReceiptText(receipt,promotions) {
  let receiptItemsText = receipt.receiptItems.map((receiptItem)=>{
    const orderItem = receiptItem.orderItem;
    return `${orderItem.item.name} × ${orderItem.count} = ${receiptItem.subtotal}元`
  }).join('\n');
  let chargeName = findDiscount(receipt.receiptItems,promotions);
  return `============= 订餐明细 =============
${receiptItemsText}
-----------------------------------
使用优惠:
${receipt.type}${chargeName}，省${receipt.saved}元
-----------------------------------
总计：${receipt.total}元
===================================`.trim();
}


function findDiscount(receipt,promotions) {
  return receipt.receiptItems.find((receiptItem)=> {
    const promotionType = findPromotionType(receiptItem.item.id, promotions);
    if (promotionType === '指定菜品半价') {
      return `(${receiptItem.item.name})`
    }
  }).join('，');
}
