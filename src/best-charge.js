const allItems = require("./items");
const allPromotions = require("./promotions");

function bestCharge(selectedItems) {
  const cartItems = buildCartItems(selectedItems, allItems());
  const receiptItems = buildReceiptItems(cartItems, allPromotions());
  const receipt = buildReceipt(receiptItems, allPromotions());
  return getReceiptText(receipt);
}

function buildCartItems(selectedItems, allItems) {
  return selectedItems.map(selectedItem => {
    const splitedSelectedItme = selectedItem.split(" ");
    const id = splitedSelectedItme[0];
    const count = parseInt(splitedSelectedItme[2] || 1);
    const item = allItems.find(item => item.id === id);
    return {item, count};
  });
}

function buildReceiptItems(cartItems, promotions) {
  return cartItems.map(cartItem => {
    const promotionType = getPromotionType(cartItem.item.id, promotions);
    const {saved, subtotal} = discount(cartItem.item.price, cartItem.count, promotionType);
    return {cartItem, saved, subtotal};
  });
}

function getPromotionType(id, promotions) {
  return promotions[1].items.some(b=>b === id) ? promotions[1].type : undefined;
}

function discount(price, count, promotionType) {
  let saved = 0;
  let subtotal = price * count;
  if (promotionType === '指定菜品半价') {
    saved = parseFloat(price / 2) * count;
  }
  subtotal -= saved;
  return {saved, subtotal};
}

function buildReceipt(receiptItems, promotions) {
  let total = receiptItems.map(receiptItem => receiptItem.subtotal)
    .reduce((a, b) => a + b);
  let savedTotal = receiptItems.map(receiptItem => receiptItem.saved)
    .reduce((a, b)=> a + b);
  let savedTotalStr = getTotalAnother(receiptItems, promotions);
  const type = savedTotal > savedTotalStr.saved ? promotions[1].type : savedTotalStr.type;
  savedTotal = savedTotal > savedTotalStr.saved ? savedTotal : savedTotalStr.saved;
  savedTotal = {savedTotal, type};
  total = type === '满30减6元' ? savedTotalStr.total : total;
  return {receiptItems, savedTotal, total};
}

function getTotalAnother(receiptItems, promotions) {
  let subtotalArr = receiptItems.map(receiptItem => receiptItem.cartItem.item.price * receiptItem.cartItem.count);
  let total = subtotalArr.reduce((a, b)=> a + b);
  const saved = total > 30 ? 6 : 0;
  const type = promotions[0].type;
  total = total > 30 ? total - 6 : total;
  return {saved, type, total}
}


function getReceiptText(receipt) {
  let dishAccount = receipt.receiptItems.map(receiptItem => {
    const cartItem = receiptItem.cartItem;
    return `${cartItem.item.name} x ${cartItem.count} = ${cartItem.item.price * cartItem.count}元`
  }).join('\n');
  return `============= 订餐明细 =============
${dishAccount}${getPromotionText(receipt)}
-----------------------------------
总计：${receipt.total}元
===================================`
}

function getPromotionText(receipt) {
  let promotionItems =  receipt.receiptItems.map(receiptItem =>
    receiptItem.saved != 0 ? receiptItem.cartItem.item.name + "，" : "").join("");
  promotionItems = receipt.savedTotal.type != '满30减6元' ? promotionItems.substring(0,promotionItems.length-1) : "";
  let charOne  = receipt.savedTotal.type != '满30减6元' ? '(' : "";
  let charTwo  = receipt.savedTotal.type != '满30减6元' ? ')' : "";
  const text = `
-----------------------------------
使用优惠:
${receipt.savedTotal.type}${charOne}${promotionItems}${charTwo}，省${receipt.savedTotal.savedTotal}元`;
  return receipt.savedTotal.savedTotal != 0 ? text : "";
}

module.exports = {
  bestCharge: bestCharge,
  buildCartItems: buildCartItems,
  buildReceiptItems: buildReceiptItems,
  buildReceipt: buildReceipt,
  getReceiptText: getReceiptText
};


