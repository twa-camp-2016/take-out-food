'use strict';

const loadAllItems = require('./items');
const loadPromotions = require('./promotions');

function bestCharge(selectedItems) {
  const allItems = loadAllItems();
  const promotions = loadPromotions();

  const cartItems = buildCartItems(selectedItems, allItems);
  const receiptItems = buildReceiptItems(cartItems, promotions);

  const receipt = buildReceipt(receiptItems);

  return buildReceiptText(receipt);
}

function buildCartItems(inputs, allItems) {
  const cartItems = [];

  inputs.map((input) => {
    const splited = input.split(' x ');
    const barcode = splited[0];
    const count = parseFloat(splited[1]);

    const item = allItems.find(item => item.id === barcode);

    cartItems.push({item, count});
  });

  return cartItems;
}

function buildReceiptItems(cartItems,promotions) {

  return cartItems.map((cartItem) => {
    const price = cartItem.item.price;

    let subTotal = price * cartItem.count;
    let saved = 0;


    if(judePromotion(cartItem.item.id, promotions[1])){
      saved = subTotal / 2;
    }

    subTotal -= saved;

    return {cartItem, subTotal, saved};
  });
}

function judePromotion(id, promotion) {
  return promotion.items.some(item => item === id);
}

function buildReceipt(receiptItems) {
  let total = 0;
  let savedTotal = 0;

  for(const receiptItem of receiptItems) {
    total += receiptItem.subTotal;
    savedTotal += receiptItem.saved;
  };

  let newReceiptItems = receiptItems;
  if(!judeBestCharge(receiptItems, total)) {
     newReceiptItems = receiptItems.map(receiptItem => {
       receiptItem.subTotal += receiptItem.saved;

       receiptItem.saved = 0;

       return receiptItem;
     });

    total += savedTotal - 6;
    savedTotal = 6;
  }

  return {receiptItems: newReceiptItems, total, savedTotal};

}

function judeBestCharge(receiptItems, halfTotal) {

  const total = receiptItems.reduce((a,b) => {
      const cartItem = b.cartItem;
    return a + (cartItem.item.price * cartItem.count);
  }, 0);

  if(total < 30){
    return true;
  }

  return total - 6 >= halfTotal;
}

function buildReceiptText(receipt) {
  const receiptText = receipt.receiptItems.map((receiptItem) => {
    return `${receiptItem.cartItem.item.name} x \
${receiptItem.cartItem.count} = \
${receiptItem.cartItem.item.price * receiptItem.cartItem.count}元`
  }).join('\n');

  return`
============= 订餐明细 =============
${receiptText}
${getPromotionText(receipt)}
总计：${receipt.total}元
===================================`
}

function getPromotionText(receipt) {
  let promotionText;
  if(receipt.savedTotal === 0) {
    promotionText =  `-----------------------------------`
  } else if(receipt.savedTotal === 6) {

    promotionText = `-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------`
  } else {

    const newReceiptItems = receipt.receiptItems.filter(receiptItem => receiptItem.saved != 0);
    let names = newReceiptItems.map((receiptItem) => {
      return receiptItem.cartItem.item.name;
    }).join('，');

    promotionText = `-----------------------------------
使用优惠:
指定菜品半价(${names})，省13元
-----------------------------------`
  }

  return promotionText;
}

module.exports = {
  buildCartItems : buildCartItems,
  buildReceiptItems: buildReceiptItems,
  buildReceipt : buildReceipt,
  buildReceiptText: buildReceiptText,
  bestCharge:bestCharge
}
