
function bestCharge(selectedItems) {
  const allItems = loadAllItems();
  const itemsCount = buildItemsCount(selectedItems, allItems);
  const itemsTotal = buildItemsTotal(itemsCount);
  const allPromotions = loadPromotions();
  const itemsPromotion = buildItemsPromotion(itemsTotal, allPromotions);
  return buildItemsReceipt(itemsPromotion, allPromotions);
}

function buildItemsCount(selectedItems, allItems) {

  const itemsCount = [];
  for (const selectedItem of selectedItems) {

    const selectedItemArray = selectedItem.split('x');
    const itemId = selectedItemArray[0].trim();
    const count = parseInt(selectedItemArray[1]);
    const item = allItems.find(item => {
      return item.id === itemId
    });
    itemsCount.push({item, count});
  }
  return itemsCount;

}

function buildItemsTotal(itemsCount) {
  let total = 0;
  for (const itemCount of itemsCount) {
    total += itemCount.item.price * itemCount.count;
  }
  return {itemsCount, total};

}

function buildItemsPromotion(itemsSubtotal, allPromotions) {

  const {save, promotionType, promotionItems} = getPromotionDiscount(itemsSubtotal, allPromotions);
  return {itemsSubtotal, promotionType, save, promotionItems};

}
function getPromotionDiscount(itemsSubtotal, allPromotions) {
  var saveTemp2 = 0;
  const promotionItems = [];
  if (itemsSubtotal.total >= 30) {
    var saveTemp1 = 6;
    var promotionType1 = allPromotions[0];

  }

  for (const itemCount of itemsSubtotal.itemsCount) {
    if (allPromotions[1].items.some(item=>item === itemCount.item.id)) {
      saveTemp2 += (itemCount.item.price) / 2;
      promotionItems.push(itemCount.item.name);
    }
    var promotionType2 = allPromotions[1];
  }

  return saveTemp1 > saveTemp2 ? {save: saveTemp1, promotionType: promotionType1} : {
    save: saveTemp2,
    promotionType: promotionType2,
    promotionItems: promotionItems
  };

}

function buildItemsReceipt(itemsPromotion) {

  const items = itemsPromotion.itemsSubtotal.itemsCount.map(itemCount=> {

    return `${itemCount.item.name} x ${itemCount.count} = ${itemCount.item.price * itemCount.count}元`
  }).join('\n');
  const isPromotion = isExistPromotions(itemsPromotion);
  if (isPromotion) {
    return `
============= 订餐明细 =============
${items}
-----------------------------------
${isPromotion}
-----------------------------------
总计：${itemsPromotion.itemsSubtotal.total - itemsPromotion.save}元
===================================`.trim();
  }
  else {
    return `
============= 订餐明细 =============
${items}
-----------------------------------
总计：${itemsPromotion.itemsSubtotal.total - itemsPromotion.save}元
===================================`.trim();
  }

}
function isExistPromotions(itemsPromotion) {

  if (itemsPromotion.promotionType.type === '满30减6元') {

    return `使用优惠:
满30减6元，省${itemsPromotion.save}元`.trim()
  }
  else if (itemsPromotion.promotionType.type === '指定菜品半价' && itemsPromotion.promotionItems.length > 0) {
    return `使用优惠:
指定菜品半价(${itemsPromotion.promotionItems[0]}，${itemsPromotion.promotionItems[1]})，省${itemsPromotion.save}元`
  } else {
    return undefined
  }

}

