'use strict';

const allItems = require('../src/items');
const allPromotions = require('../src/promotions');

function bestCharge(selectedItems) {
  const cartItems = buildCartItems(selectedItems, allItems());
  const receiptItems = buildReceiptItems(cartItems, allPromotions());
  const receipt = buildReceipt(receiptItems);
  const receiptText = buildReceiptText(receipt);
  return receiptText;
}

function buildCartItems(selectedItems, allItems) {
  return selectedItems.map(selectedItem => {
    const splitedItem = selectedItem.split(' ');
    const id = splitedItem[0];
    const count = parseInt(splitedItem[2]);
    const item = allItems.find(item => item.id === id);
    return {item, count};
  });
}

function buildReceiptItems(cartItems, promotions) {
  return cartItems.map(cartItem => {
    const {subtotal,saved} = discount(cartItem, promotions[1].items);
    return {cartItem, subtotal, saved};
  });
}

function discount(cartItem, promotions) {
  let price = cartItem.item.price;
  const subtotal = price * cartItem.count;
  let saved = 0;
  if (isPromotionHalf(cartItem.item.id, promotions)) {
    saved = price / 2 * cartItem.count;
  }
  return {subtotal, saved};
}

function isPromotionHalf(id, promotionItems) {
  return promotionItems.some(ItemId => ItemId === id);
}

function buildReceipt(receiptItems) {
  let savedTotal = 0;
  const savedHalf = calculateSavedHalf(receiptItems);
  const sum = calculateSum(receiptItems);
  const totalWithHalf = sum - savedHalf;
  const halfPriceItemNames = getHalfPriceItemNames(receiptItems);
  const savedType = buildSavedType(sum, totalWithHalf, halfPriceItemNames);
  if (savedType.type === '满30减6元') {
    savedTotal = 6;
  }
  else if(savedType.type === '指定菜品半价'){
    savedTotal = savedHalf;
  }
  const total = sum - savedTotal;
  return {receiptItems, total, savedType, savedTotal};
}

function calculateSavedHalf(receiptItems) {
  return receiptItems
    .map(receiptItem => receiptItem.saved)
    .reduce((a, b) => a + b);
}

function calculateSum(receiptItems) {
  return receiptItems
    .map(receiptItem => receiptItem.subtotal)
    .reduce((a, b) => a + b);
}

function getHalfPriceItemNames(receiptItems) {
  return receiptItems
    .filter(receiptItem => receiptItem.saved > 0)
    .map(item => item.cartItem.item.name);
}

function buildSavedType(sum, totalWithHalf, halfItemNames) {
  if (sum>=30 && sum -6 < totalWithHalf) {
    return {type: '满30减6元', name: undefined};
  }
  else if(sum != totalWithHalf){
    return {type: '指定菜品半价', names: halfItemNames};
  }
  else {
    return {type:undefined,name:undefined};
  }
}

function buildReceiptText(receipt) {
  const cartItemsText = buildCartItemsText(receipt.receiptItems);
  const promotionText = buildPromotionText(receipt.savedType, receipt.savedTotal)
  return `
============= 订餐明细 =============
${cartItemsText}${promotionText}
-----------------------------------
总计：${receipt.total}元
===================================`.trim();
}

function buildCartItemsText(receiptItems) {
  return receiptItems
    .map(receiptItem => {
      const cartItem = receiptItem.cartItem;
      return `${cartItem.item.name} x ${cartItem.count} = ${receiptItem.subtotal}元`
    })
    .join('\n');
}

function buildPromotionText(savedType, savedTotal) {
  if (savedType.type === undefined) {
    return ``;
  }
  const promotionTypeText = savedType.type === '满30减6元' ? savedType.type : `${buildHalfText(savedType)}`;
  return `
-----------------------------------
使用优惠:
${promotionTypeText}，省${savedTotal}元`;
}

function buildHalfText(savedType) {
  const namesText = savedType.names.join('，');
  return `${savedType.type}(${namesText})`;
}

module.exports = {
  bestCharge: bestCharge,
  buildCartItems: buildCartItems,
  buildReceiptItems: buildReceiptItems,
  buildReceipt: buildReceipt,
  buildReceiptText: buildReceiptText
}
