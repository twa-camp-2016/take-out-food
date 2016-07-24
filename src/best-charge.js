'use strict';

function bestCharge(tags) {
  const allItems = loadAllItems();
  const menuItems = buildMenuItems(tags, allItems);

  const promotions = loadPromotions();
  const receiptItems = buildReceiptItems(menuItems, promotions);

  const receipt = buildReceipt(receiptItems);
  const receiptText = buildReceiptText(receipt);

  return receiptText;
}

function buildMenuItems(tags, allItems) {
  const menuItems = [];

  for (let tag of tags) {
    const tagArray = tag.split(' x ');
    const id = tagArray[0];
    const count = parseInt(tagArray[1]);
    const item = findExist(allItems, id);
    if (item) {
      menuItems.push({item, count});
    }
  }
  return menuItems;
}

function findExist(allItems, id) {
  return allItems.find(item => item.id === id);
}

function buildReceiptItems(menuItems, promotions) {

  return menuItems.map(menuItem => {
    const promotionType = getPromotionType(menuItem.item.id, promotions);
    const {actualTotal,halfTotal,saved} = discount(promotionType, menuItem.item.price, menuItem.count);

    return {receiptItem: menuItem, actualTotal, halfTotal, saved}
  });
}

function getPromotionType(id, promotions) {
  const promotion = promotions.find(promotion=>promotion.items.includes(id));
  return promotion ? promotion.type : undefined;
}


function discount(promotionType, price, count) {
  let actualTotal = price * count;
  let halfTotal = price * count;
  let saved = 0;

  if (promotionType === "指定菜品半价") {
    halfTotal = parseFloat(price * count / 2);
    saved = parseFloat(price * count / 2);
  }
  return {actualTotal, halfTotal, saved};
}

function buildReceipt(receiptItems) {

  let halfPrice = 0;
  let halfSaved = 0;
  let discountPrice = 0;
  //let discountSaved = 6;

  for (let receiptItem of receiptItems) {
    halfPrice += receiptItem.halfTotal;
    halfSaved += receiptItem.saved;
    discountPrice += receiptItem.actualTotal;
  }
  if (discountPrice >= 30) {
    discountPrice = discountPrice - 6;
  }
  return {receiptItems, halfPrice, halfSaved, discountPrice};
}


function buildReceiptText(receipt) {
  let promotion = '';
  let savedMoney = 0;
  let total = 0;
  const discountPrice = receipt.discountPrice;
  if (discountPrice + 6 > 30 && receipt.halfPrice >= receipt.discountPrice) {
    promotion = '满30减6元';
    savedMoney = 6;
    total = parseFloat(receipt.discountPrice);
  }
  else if (discountPrice +6 <= 30 && receipt.halfSaved === 0) {
    promotion = '不优惠';
    total = receipt.discountPrice;
  }
  else {
    promotion = '指定菜品半价';
    savedMoney = receipt.halfSaved;
    total = parseFloat(receipt.halfPrice);

  }

  let halfItems = [];

  let receiptText = receipt.receiptItems.map(menuItem => {
    const item = menuItem.receiptItem;
    if (menuItem.saved !== 0.00) {
      const name = item.item.name;
      halfItems.push(name);
    }
    return `${item.item.name} x ${item.count} = ${menuItem.actualTotal}元`;
  }).join('\n');

  let halfName = halfItems.join('，');

  return `============= 订餐明细 =============
${receiptText}
-----------------------------------${getpriviliegeText(promotion, halfName, savedMoney)}
总计：${total}元
===================================`;
}

function getpriviliegeText(promotion, halfName, savedMoney) {
  if (promotion === '满30减6元') {
    return `
使用优惠:
${promotion}，省${savedMoney}元
-----------------------------------`;
  }
  else if (promotion === '不优惠') {
    return ''.trim();
  }
  else {
    return `
使用优惠:
${promotion}(${halfName})，省${savedMoney}元
-----------------------------------`;
  }
}





