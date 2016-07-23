function bestCharge(tags) {
  const allItems = loadAllItems();
  const cartItems = buildCartItems(tags, allItems);

  const allPromotions = loadPromotions();
  const receiptItems = buildReceiptItems(cartItems, allPromotions);

  const receipts = buildReceipts(receiptItems);

  return buildReceiptText(receipts);

}

function buildCartItems(tags, allItems) {
  const cartItems = [];

  for (const tag of tags) {
    const tagArray = tag.split(' x ');
    const id = tagArray[0];
    const count = parseInt(tagArray[1]);

    const item = allItems.find(item => item.id === id);

    cartItems.push({item, count});
  }

  return cartItems;
}

function buildReceiptItems(cartItems, allPromotions) {

  return cartItems.map((cartItem) => {

    const promotionType = findPromotionType(cartItem.item.id, allPromotions);

    const {saved, subTotal} = discount(cartItem.count, cartItem.item.price, promotionType);
    return {cartItem, subTotal, saved};
  });
}

function findPromotionType(id, allPromotions) {
  const promotions = [];
  promotions.push(allPromotions[1]);

  const thePromotion = promotions.find(promotion => promotion.items.find(b => b === id));

  return thePromotion ? thePromotion.type : undefined;
}

function discount(count, price, promotionType) {
  let subTotal = count * price;
  let saved = 0;

  if (promotionType === '指定菜品半价') {
    saved = subTotal - subTotal / 2;
  }

  return {subTotal, saved}
}

function buildReceipts(receiptItems) {
  var total = 0;
  var savedTotal = 0;

  for (const receiptItem of receiptItems) {
    total += receiptItem.subTotal;
    savedTotal += receiptItem.saved;
  }

  if (total > 30) {
    if ((total - 6) < (total - savedTotal)) {
      return {receiptItems, total: (total - 6), savedTotal: 6, promotionType: '满30减6元'}
    }
    else
      return {receiptItems, total: (total - savedTotal), savedTotal, promotionType: '指定菜品半价(黄焖鸡，凉皮)'}
  }

  else if (savedTotal) {
    return {receiptItems, total: (total - savedTotal), savedTotal, promotionType: '指定菜品半价(黄焖鸡，凉皮)'}
  }
  else
    return {receiptItems, total: total};
}


function buildReceiptText(receipts) {
  let receiptItemsText = (receipts.receiptItems)
    .map(receiptItem => {
      const cartItem = receiptItem.cartItem;
      return `${cartItem.item.name} x ${cartItem.count} = ${cartItem.item.price * cartItem.count}元`;
    }).join('\n');

  if (receipts.promotionType) {
    return `
============= 订餐明细 =============
${receiptItemsText}
-----------------------------------
使用优惠:
${receipts.promotionType}，省${receipts.savedTotal}元
-----------------------------------
总计：${receipts.total}元
===================================`
  }
  else return `
============= 订餐明细 =============
${receiptItemsText}
-----------------------------------
总计：${receipts.total}元
===================================`
}
