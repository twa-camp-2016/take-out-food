'use strict';
const allItems = require('../src/items');
const allPromotions = require('../src/promotions');
function bestCharge(selectedItems) {
  const dishItems = buildDishItem(selectedItems, allItems());
  console.log(allItems);
  const menuItems = buildMenuItem(dishItems, allPromotions());
  const receiptText = getMenuReceipt(menuItems, allPromotions());
  return receiptText;
}


function buildDishItem(selectedItems, allItems) {
  const dishItems = [];
  for (const selectedItem of selectedItems) {
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
  }
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
  let savedTotal = 0, total = 0;
  for (const MenuItem of menuItems) {
    savedTotal += MenuItem.saved;
    total += MenuItem.subtotal;
  }
  let totalStr = countTotal(menuItems, promotions);
  let finalTotal = total > totalStr.total ? totalStr.total : total;
  let promotionType = finalTotal === total ? promotions[1].type : finalTotal.promotionType;
  total = {total: finalTotal, promotionType: promotionType};
  return {menuItems, savedTotal, total};
}

function countTotal(menuItems, promotions) {
  let arr = menuItems.map(menuItem => {
    return menuItem.item.price * menuItem.count
  });
  let total = arr.reduce((prv, cur) => prv + cur);
  if (total >= 30)
    return {total: total, promotionType: promotions[0].type};
}

function getMenuAccount(receipt) {
  let receiptItemsText = receipt.menuItems.map(menuItem => {
    const item = menuItem.item;
    return `${item.name} x ${menuItem.count} = ${item.price * menuItem.count}元`
  }).join('\n');
  let promo = receipt.menuItems.map(menuItem => {
      return menuItem.saved != 0 ?  menuItem.item.name : undefined;
  }).join("");
  return `
============= 订餐明细 =============
${receiptItemsText}
-----------------------------------
使用优惠:
指定菜品半价('${promo}')，省9元
-----------------------------------
总计：${receipt.total.item}元
===================================`;

};

module.exports = {
  bestCharge: bestCharge,
  buildDishItem: buildDishItem,
  buildMenuItem: buildMenuItem,
  buildMenuReceipt: buildMenuReceipt,
  getMenuAccount: getMenuAccount

}
