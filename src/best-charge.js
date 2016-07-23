function bestCharge(selectedItems) {
  const allItems = loadAllItems();
  const orderedItems = buildOrderedItems(selectedItems, allItems);

  const chargeItems = buildChargeItems(orderedItems);

  const promotions = loadPromotions();
  const charge = buildCharge(chargeItems, promotions);

  const chargeText = buildChargeText(charge);

  return chargeText;
}

function buildOrderedItems(selectedItems, allItems) {

  return selectedItems.map(selectedItems => {
    const orderArray = selectedItems.split('x');

    return {id: orderArray[0].trim(), count: parseInt(orderArray[1])};
  }).map(order => {
      return {
        item: getItem(order.id, allItems), count: order.count
      }
    }
  );
}

function getItem(id, allItems) {
  return allItems.find(item => item.id === id);
}


function buildChargeItems(orderedItems) {

  return orderedItems.map(orderedItem => {
    const subtotal = orderedItem.item.price * orderedItem.count;

    return {orderedItem, subtotal};
  });
}

function buildCharge(chargeItems, promotions) {
  const charges = calcuCharges(chargeItems, promotions);
  const {promotion, total, savedTotal} = getBestCharge(charges);

  return {chargeItems, promotion, total, savedTotal};
}

function getBestCharge(charges) {
  const charge = charges.find(charge => charge.total === getMinOfArray(charges));
  return {
    promotion: charge.promotion,
    total: charge.total,
    savedTotal: charge.savedTotal
  };

}

function getMinOfArray(array) {

  return array.reduce((prev, curr) => prev < curr.total ? prev : curr.total, array[0].total);
}

function calcuCharges(chargeItems, promotions) {
  const charges = [];

  for (const promotion of promotions) {
    const promotionType = promotion.type;

    if (promotionType === '满30减6元') {
      const payableTotal = chargeItems.reduce((prev, curr) => prev + curr.subtotal, 0);

      isMeetPromotion(payableTotal) ?
        charges.push({promotion: {promotionType: promotion.type}, total: payableTotal - 6, savedTotal: 6})
        : charges.push({promotion: {promotionType: ''}, total: payableTotal, savedTotal: 0});

    }
    else if (promotionType === '指定菜品半价') {
      const {total, savedTotal} = buildHalfPrice(chargeItems, promotion.items);
      const promotedItems = getPromotedItems(chargeItems, promotion.items);

      charges.push({promotion: {promotionType: promotion.type, promotedItems},
        total, savedTotal
      });
    }
  }

  return charges;
}

function getPromotedItems(chargeItems, items) {
  const promotedItems = [];

  for (const chargeItem of chargeItems) {
    if (items.includes(chargeItem.orderedItem.item.id)) {
      promotedItems.push(chargeItem.orderedItem.item.name);
    }
  }
  return promotedItems;
}

function isMeetPromotion(value) {
  return value >= 30;
}

function buildHalfPrice(chargeItems, items) {

  let savedTotal = 0;
  let total = chargeItems.reduce((prev, curr) => prev + curr.subtotal, 0);
  chargeItems.map(chargeItem => {
    if (items.includes(chargeItem.orderedItem.item.id)) {
      savedTotal += chargeItem.subtotal / 2;
    }
  });
  total -= savedTotal;

  return {total, savedTotal};
}

function buildChargeText(charge) {
  const promotionType = charge.promotion.promotionType;
  const itemsText = charge.chargeItems.map(chargeItem => {
    const orderedItem = chargeItem.orderedItem;
    return `${orderedItem.item.name} x ${orderedItem.count} = ${chargeItem.subtotal}元`;
  }).join('\n');

  const text = generateText(promotionType, charge);

  return `============= 订餐明细 =============
${itemsText}
${text}
总计：${charge.total}元
===================================`
}

function generateText(promotionType, charge) {
  let itemsText;
  if (promotionType === '满30减6元') {
    itemsText = generateTextWithSubAmounts(charge);
  }
  else if (promotionType === '指定菜品半价') {
    itemsText = generateTextWithHalfAmounts(charge);
  }
  else {
    itemsText = generateTextWithoutPromotion(charge);
  }

  return itemsText;
}

function generateTextWithSubAmounts(charge) {

  return `\
-----------------------------------
使用优惠:
${charge.promotion.promotionType}，\
省${charge.savedTotal}元
-----------------------------------`
}

function generateTextWithHalfAmounts(charge) {

  return `\
-----------------------------------
使用优惠:
${charge.promotion.promotionType}(${charge.promotion.promotedItems.join('，')})，\
省${charge.savedTotal}元
-----------------------------------`;
}

function generateTextWithoutPromotion(charge) {

  return `-----------------------------------`;
}

