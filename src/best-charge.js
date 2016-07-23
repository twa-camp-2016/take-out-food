'use strict';
const allItems = require('../src/items');
const allPromotions = require('../src/promotions');
function bestCharge(selectedItems) {
  const dishItems = buildDishItem(selectedItems, allItems());
  const menuItems = buildMenuItem(dishItems, allPromotions());
  const receipt = buildMenuReceipt(menuItems, allPromotions());
  return getReceiptText(receipt);
}


function buildDishItem(selectedItems, allItems) {
  let dishItems = [];
  selectedItems.map(selectedItem => {
    const selectedArray = selectedItem.split("x");
    const id = selectedArray[0];
    const count = parseFloat(selectedArray[1] || 1);
    const dishItem = dishItems.find(dishItem => dishItem.item.id == id);
    if (dishItem) {
      dishItem.count += count;
    }
    else {
      const item = allItems.find(item => item.id === id);
      dishItems.push({item, count});
    }
  });
  return dishItems;
};

function buildMenuItem(dishItems, promotions) {
  return dishItems.map(dishItem => {
    const promotionType = getPromotionType(dishItem.item.id, promotions);
    const {saved, subtotal} = discount(dishItem.count, dishItem.item.price, promotionType);
    return {dishItem, saved, subtotal};
  });
}

function getPromotionType(id, promotions) {
  const promotion = promotions[1].items.some(b => b === id);
  return promotion ? promotions[1].type : undefined;
};

function discount(count, price, promotionType) {
  let subtotal = count * price;
  let saved = 0;
  if (promotionType === '指定菜品半价') {
    saved = count * parseFloat(price / 2);
  }
  subtotal -= saved;
  return {saved, subtotal};
};


function buildMenuReceipt(menuItems, promotions) {
  let total = menuItems.map(menuItem => menuItem.subtotal)
                       .reduce((prv, cur) => prv + cur);
  let savedTotal = menuItems.map(menuItem => menuItem.saved)
                            .reduce((prv, cur) => prv + cur);
  let totalStr = countTotal(menuItems, promotions);
  let finalTotal = totalStr && total > totalStr.total ? totalStr.total : total;
  let promotionType = finalTotal === total ? promotions[1].type : totalStr.promotionType;
  total = {total: finalTotal, promotionType: promotionType};
  return {menuItems, savedTotal, total};
}

function countTotal(menuItems, promotions) {
  let arr = menuItems.map(menuItem => {
    return menuItem.dishItem.item.price * menuItem.dishItem.count
  });
  let total = arr.reduce((prv, cur) => prv + cur);
  if (total >= 30)
    return {total: total - 6, promotionType: promotions[0].type};
}

function getReceiptText(receipt) {
  let receiptItemsText = receipt.menuItems.map(menuItem => {
    const item = menuItem.dishItem;
    return `${item.item.name} x ${item.count} = ${item.item.price * item.count}元`
  }).join('\n');
  return `============= 订餐明细 =============
${receiptItemsText}${getPromotionText(receipt)}
-----------------------------------
总计：${receipt.total.total}元
===================================`;

};

function getPromotionText(receipt) {
  let finalSaved = getFinalSaved(receipt);
  let finalPromotionType = getFinalPromotionType(receipt);
  let subtotalArr = receipt.menuItems.map(menuItem => {
    const itemDish = menuItem.dishItem;
    return itemDish.item.price * itemDish.count;
  });
  let total = subtotalArr.reduce((pev, cru) => pev + cru);
  total = total === receipt.total.total && receipt.savedTotal === 0
  let text = `
-----------------------------------
使用优惠:
${receipt.total.promotionType}${finalPromotionType}省${finalSaved}元`;
  return total ? "" : text;
}

function getFinalPromotionType(receipt) {
  let promo = receipt.menuItems.map(menuItem => {
    return menuItem.saved != 0 ? menuItem.dishItem.item.name + ',' : undefined;
  }).join("");
  return receipt.total.promotionType !== '指定菜品半价' ? ',' : promo;
}

function getFinalSaved(receipt) {
  if (receipt.total.promotionType === '满30减6元') {
    return 6;
  }
  else if (receipt.total.promotionType === '指定菜品半价') {
    return receipt.savedTotal;
  }

}

module.exports = {
  bestCharge: bestCharge,
  buildDishItem: buildDishItem,
  buildMenuItem: buildMenuItem,
  buildMenuReceipt: buildMenuReceipt,
  getReceiptText: getReceiptText

}
