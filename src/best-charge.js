'use strict';

function bestCharge(selectedItems) {
  const allItems = loadAllItems();
  const orderItems = buildOrderItems(selectedItems, allItems);

  const promotions = loadPromotions();
  const chargeItems = buildChargeItems(orderItems,promotions);

  const charge = buildCharge(chargeItems);
  const chargeText = buildChargeText(charge);

  return chargeText;
}

function buildChargeText(charge) {
  let chargeText = charge.chargeItems
    .map(chargeItem => {
      const orderItem = chargeItem.orderItem;
      return `${orderItem.item.name} x ${orderItem.count} = ${chargeItem.subtotal}元`;
    }).join('\n');
  return `
============= 订餐明细 =============
${chargeText}
-----------------------------------
${getPromotionText(charge)}
`;
}
function getPromotionText(charge) {
  let sumFullThirty = 0;
  let sumHalfdiscount = charge.total - charge.savedTotal;
  let promotionText = '';
  let promotionItems = [];

  if(charge.total > 30){
    sumFullThirty = charge.total - 6;
  }

  for(let chargeItem of charge.chargeItems){
    if(chargeItem.saved != 0){
      promotionItems.push(chargeItem.orderItem.item.name);
    }
  }
   if(sumFullThirty > sumHalfdiscount){
     promotionText = `使用优惠:
指定菜品半价(${promotionItems.join('，')})，省${charge.savedTotal}元
-----------------------------------
总计：${sumHalfdiscount}元
===================================`;
   }else{
     promotionText = `使用优惠:
满30减6元，省6元
-----------------------------------
总计：${sumFullThirty}元
===================================`
   }
  return promotionText;
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
    const id = splittedTag[0].trim();
    const count = parseInt(splittedTag[1]);

    let item = allItems.find(item => item.id === id);
    orderItems.push({item, count});
  }

  return orderItems;
}
