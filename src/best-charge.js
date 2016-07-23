"use strict";

const allItems = require('../src/items');
const allPromotions = require('../src/promotions');

function bestCharge(selectedItems) {
  const cartItems = buildCartItems(selectedItems, allItems.loadAllItems());
  const receiptItems = buildReceiptItems(cartItems, allPromotions.loadPromotions());
  const receipt = buildReceipt(receiptItems);
  const receiptText = generateReceiptText(receipt);

  console.log(receiptText);
}

function buildCartItems(selectedItems, allItems) {
  return selectedItems.map(selectedItem => {
    const splittedItem = selectedItem.split(' x ');

    const item = allItems.find(item => item.id === splittedItem[0]);
    const count = parseInt(splittedItem[1]);
    const total = item.price * count;

    return {item, count, total};
  });
}

function buildReceiptItems(cartItems, promotions) {
  return cartItems.map(cartItem => {
    let subtotal = cartItem.total;
    let saved = 0;

    const existId = promotions[1].items.find(id => id === cartItem.item.id);
    if (existId) {
      subtotal /= 2;
      saved = subtotal;
    }

    return {cartItem, subtotal, saved};
  });
}

function getHalfPriceSum(receiptItems) {
  return receiptItems
    .map(receiptItem => receiptItem.subtotal)
    .reduce((prev, next) => prev + next);
}

function getSum(receiptItems) {
  return receiptItems
    .map(receiptItem => receiptItem.cartItem.total)
    .reduce((prev, next) => prev + next);
}

function buildReceiptItems(receiptItems, promotions) {


}

function buildReceipt(receiptItems) {

  return {receiptItems, actualTotal, savedType, savedTotal};
}


function generateReceiptText(receipt) {
  return `
============= 订餐明细 =============
${}
-----------------------------------
总计：${receipt.actualTotal}元
===================================`.trim();
}

module.exports = {
  buildCartItems: buildCartItems,
  buildReceiptItems: buildReceiptItems
};