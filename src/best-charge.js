"use strict";

const allItems = require('./items');
const allPromotions = require('./promotions');

function bestCharge(selectedItems) {
  const cartItems = buildCartItems(selectedItems, allItems.loadAllItems());
  const receiptItems = buildReceiptItems(cartItems, allPromotions.loadPromotions());
  const receipt = buildReceipt(receiptItems);
  const receiptText = generateReceiptText(receipt);

  return receiptText;
}

function buildCartItems(selectedItems, allItems) {
  return selectedItems.map(selectedItem => {
    const splittedItem = selectedItem.split(' x ');

    const item = allItems.find(item => item.id === splittedItem[0]);
    const count = parseInt(splittedItem[1]);

    return {item, count};
  });
}

function buildReceiptItems(cartItems, promotions) {
  return cartItems.map(cartItem => {
    let subtotal = cartItem.count * cartItem.item.price;
    let saved = 0;

    const promotionType = getPromotionType(cartItem.item.id, promotions);
    if (promotionType === '指定菜品半价') {
      subtotal /= 2;
      saved = subtotal;
    }

    return {cartItem, subtotal, saved};
  });
}

function getPromotionType(id, promotions) {
  const promotion = promotions[1].items.find(item => item === id);
  return promotion ? '指定菜品半价' : '满30减6元';
}

function getHalfPriceNames(receiptItems) {
  return receiptItems.filter(receiptItem => receiptItem.saved > 0)
    .map(receiptItem => receiptItem.cartItem.item.name);
}

function buildReceipt(receiptItems) {
  const promotionType = '满30减6元';
  const actualTotal = receiptItems.map(receiptItem => receiptItem.subtotal).reduce((prev, next) => prev + next);
  const savedTotal = receiptItems.map(receiptItem => receiptItem.saved).reduce((prev, next) => prev + next);

  return {receiptItems, promotionType, savedTotal, actualTotal};
}

function generateReceiptText(receipt) {
  const originTotal = receipt.actualTotal + receipt.savedTotal;
  const halfPriceTotal = receipt.actualTotal;

  if (halfPriceTotal < originTotal - 6) {
    receipt.promotionType = '指定菜品半价';
    return generateHalfPriceText(receipt);
  } else {
    if (originTotal < 30) {
      receipt.actualTotal = originTotal;
      return generateNoPromotionText(receipt);
    } else {
      receipt.savedTotal = 6;
      receipt.actualTotal = originTotal - 6;
      return generateFullThirtyText(receipt);
    }
  }
}

function generateNoPromotionText(receipt) {
  return `${generateReceiptItemsText(receipt)}
${generateActualTotalText(receipt)}`;
}

function generateFullThirtyText(receipt) {
  return `${generateReceiptItemsText(receipt)}
使用优惠:
${receipt.promotionType}，省${receipt.savedTotal}元
-----------------------------------
${generateActualTotalText(receipt)}`;
}

function generateHalfPriceText(receipt) {
  const halfPriceNames = getHalfPriceNames(receipt.receiptItems);

  return `${generateReceiptItemsText(receipt)}
使用优惠:
${receipt.promotionType}(${halfPriceNames.join('，')})，省${receipt.savedTotal}元
-----------------------------------
${generateActualTotalText(receipt)}`;
}

function generateReceiptItemsText(receipt) {
  return `============= 订餐明细 =============
${generateCartItemsText(receipt.receiptItems)}
-----------------------------------`;
}

function generateCartItemsText(receiptItems) {
  return receiptItems.map(receiptItem => `${receiptItem.cartItem.item.name} x \
${receiptItem.cartItem.count} = ${receiptItem.subtotal + receiptItem.saved}元`)
    .join('\n');
}

function generateActualTotalText(receipt) {
  return `总计：${receipt.actualTotal}元
===================================`;
}

module.exports = {
  buildCartItems: buildCartItems,
  buildReceiptItems: buildReceiptItems,
  buildReceipt: buildReceipt,
  generateReceiptText: generateReceiptText,
  bestCharge: bestCharge
};