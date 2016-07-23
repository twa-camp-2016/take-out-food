'use strict';

function bestCharge(selectedItems) {
  return /*TODO*/;
}

function buildCharge(chargeItems) {
  let total = 0;
  let savedTotal = 0;

  chargeItems.forEach((chargeItem) => {
    total += chargeItem.subtotal;
    savedTotal += chargeItem.saved;
  });

  return {chargeItems, total, savedTotal}
}

function buildChargeItems(orderItems, promotions) {
  return orderItems.map(orderItem => {
    const promotionType = getPromotionType(orderItem.item.id, promotions);
    let {subtotal, saved} = discount(orderItem.item.price, orderItem.count, promotionType);

    return {orderItem, subtotal, saved};
  })
}

function discount(price, count, promotionType) {
  let saved = 0;
  let subtotal = price * count;

  if (promotionType === '指定菜品半价') {
    saved = price * 0.5 * count;
  }

  subtotal -= saved;

  return {subtotal, saved}
}

function getPromotionType(id, promotions) {
  let promotion = promotions.find(promotion => {
    if (promotion.items === 'undefined' && promotion.type) {
      return true;
    }
    if (promotion.items) {
      return promotion.items.some(item => item === id)
    }
  });

  return promotion ? promotion.type : 'undefined';
}

function buildOrderItems(tags, allItems) {
  let orderItems = [];

  for (let tag of tags) {
    const splittedTag = tag.split('x');
    const id = splittedTag[0].slice(0, -1);
    const count = parseInt(splittedTag[1]);

    let item = allItems.find(item => item.id === id);
    orderItems.push({item, count});
  }

  return orderItems;
}
