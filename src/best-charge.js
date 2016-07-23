function bestCharge(selectedItems) {
  const splitedItems = splitItems(selectedItems);
  const allinfoItems = buildAllinfoItems(splitedItems);
  const receiptPrice = buildReceiptPrice(allinfoItems);
  const totalPriceItem = buildTotalPrice(receiptPrice);
  const receiptText = printReceipt(totalPriceItem);
  return receiptText;
}


function splitItems(selectedItems) {
  return selectedItems.map(selectedItem=> {
    return {id: selectedItem.slice(0, 8), count: parseInt(selectedItem.slice(-1, selectedItem.length))};
  });
}


function buildAllinfoItems(splitedItems) {
  const allItems = loadAllItems();
  return splitedItems.map(splitedItem=> {
    const item = allItems.find(item=>item.id === splitedItem.id);
    return {id: item.id, name: item.name, price: item.price, count: splitedItem.count};
  });
}


function buildReceiptPrice(allinfoItems) {
  const promotions = loadPromotions();
  return allinfoItems.map(item=> {
    const promotionType = findPromotionType(item.id, promotions);
    const {originalPrice, discountPrice} = discount(item.price, item.count, promotionType);

    return {item, originalPrice, discountPrice, promotionType};
  });
}

function findPromotionType(id, promotions) {
  const promotion = promotions.find((promotion)=> {
    if (promotion.items) {
      return promotion.items.some(a=>a === id);
    }
  });
  return promotion ? promotion.type : '满30减6元';
// if(promotion.items){
//   if(promotion.items.find(bar=>id ===bar)){
//     return promotion.type;
//   };
// }
}


function discount(price, count, promotionType) {
  let originalPrice = price * count;
  let discountPrice = price * count;
  if (promotionType === '指定菜品半价') {
    discountPrice /= 2;
  }
  return {originalPrice, discountPrice, promotionType};
}


function buildTotalPrice(receipt) {
  let fullCut = 0;
  let totalPrice = 0;
  receipt.forEach((item)=> {
    totalPrice += item.originalPrice;
    fullCut += item.discountPrice;
  });
  // const fullCut = receipt.reduce((a,b)=>a+b.originalPrice,0);
  // const totalPrice = receipt.reduce((a,b)=>a+a.discountPrice,0);
  return {receipt, fullCut, totalPrice}
}


function printReceipt(totalPriceItem) {
  const receipts = totalPriceItem.receipt;
  let type = '';
  let total = totalPriceItem.totalPrice;
  if (totalPriceItem.totalPrice >= 30 && ((totalPriceItem.totalPrice - 6) > totalPriceItem.fullCut)) {
    total = totalPriceItem.fullCut;
    type = '指定菜品半价';
  }
  else if (totalPriceItem.totalPrice > 30) {
    total = totalPriceItem.totalPrice - 6;
    type = '满30减6元';
  }

  const text = receipts.map((receipt)=> {
    const item = receipt.item;
    return `${item.name} x ${item.count} = ${item.price * item.count}元`;
  }).join('\n');

  let nameText = receipts.map((receipt)=> {
    if (receipt.promotionType && receipt.promotionType === '指定菜品半价') {
      return receipt.item.name;
    }
  }).join();
  nameText =  `${nameText.slice(0,3)}，${nameText.slice(5,9)}`;

  if (type === '指定菜品半价') {
    return `
============= 订餐明细 =============
${text}
-----------------------------------
使用优惠:${type}
指定菜品半价(${nameText})，省${totalPriceItem.totalPrice - total}元
-----------------------------------
总计：${total}元
===================================`
  }
  else if (type === '满30减6元') {
    return `
============= 订餐明细 =============
${text}
-----------------------------------
使用优惠:${type}
省6元
-----------------------------------
总计：${total}元
===================================`
  }
  else {
    return `
============= 订餐明细 =============
${text}
-----------------------------------
总计：${total}元
===================================`
  }

}
