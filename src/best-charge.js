'use strict';
function bestCharge(tags) {
  const allItems = loadAllItems();
  const cartItems = buildCartItems(tags,allItems);
  const promotions = loadPromotions();
  const receiptItems = buildReceiptItems(cartItems,promotions);
  const receipt = buildReceipt(receiptItems);
  const printReceipt = buildReceiptText(receipt);
  console.log(printReceipt);
}

function buildCartItems(tags,allItems) {
  const cartItems = [];

  for(const tag of tags){
    const tagArray =  tag.split(' x ');
    const id = tagArray[0];
    const count = parseInt(tagArray[1]);
    const item = allItems.find(item => item.id === id);
    cartItems.push({item,count});
  }

  return cartItems;
}

function buildReceiptItems(cartItems,promotions) {
  return cartItems.map(cartItem => {
    const promotionType = findPromotionType(cartItem.item.id, promotions);
    const {subOrigin,saved} = discount(cartItem.count, cartItem.item.price, promotionType);

    return {cartItem,subOrigin,saved};
  });
}

function findPromotionType(id, promotions) {
  const itemArray = [];
  itemArray.push(promotions[1].items);
  const promotion = promotions.find(promotion => itemArray.some(b => b === id));

  return promotion ? promotion.type : undefined;
}

function discount(count, price, promotionType) {

  let subOrigin = count * price;
  let saved = 0;
  if(promotionType === '指定菜品半价'){
    saved = subOrigin/2;
  }

  return {subOrigin,saved};
}

function buildReceipt(receiptItems) {
  let total = 0;
  let savedTotal = 0;
  let type = '满30减6元';

  for (const receiptItem of receiptItems) {
    total += receiptItem.subOrigin;
    savedTotal += receiptItem.saved;
  }
  if(total>=30){
    if(total-6 > total - savedTotal){
      total -=savedTotal;
      type = '指定菜品半价';
    }else{
      total = total-6;
    }
  }

  return {receiptItems, total, savedTotal,type}
}

function buildReceiptText(receipt) {
  let receiptItemsText = receipt.receiptItems
  .map(receiptItem => {
    const cartItem = receiptItem.cartItem;
    return `名称：${cartItem.item.name} x ${cartItem.count} = ${formatMoney(receiptItem.subOrigin)}元`;
  }).join('\n');

if(receipt.savedTotal !== 0){
  return `============= 订餐明细 =============
${receiptItemsText}
-----------------------------------
使用优惠:
${receipt.type}(黄焖鸡，凉皮)，省${formatMoney(receipt.savedTotal)}元
-----------------------------------
总计：${formatMoney(receipt.total)}元
===================================`;
}else{
  return `============= 订餐明细 =============
${receiptItemsText}
-----------------------------------
总计：${formatMoney(receipt.total)}元
===================================`;
}}

function formatMoney(money) {
  return money.toFixed(2);
}
