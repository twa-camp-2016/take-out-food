const items = require('../src/items');
const promotions = require('../src/promotions');

function bestCharge(selectedItems) {
  const allItems = items.loadAllItems();
  const cartItems = buildCartItems(selectedItems, allItems);
  const receiptItems = buildReceiptItems(cartItems);
  const bestCharge = getBestCharge(receiptItems);
  thisPromotionType(bestCharge);
  const receiptText = buildReceipt(bestCharge);
  return receiptText;
}

function buildCartItems(selectedItems, allItems) {

  return selectedItems.map(selectedItem => {
    const selected = selectedItem.split(' x ');
    const id = selected[0];
    const count = parseInt(selected[1]);
    const item = allItems.find(item => item.id === id);
    return {item, count};
  });
}

function buildReceiptItems(cartItems) {
  const allPromotions = promotions.loadPromotions();
  return cartItems.map(cartItem => {
    const promotionType = findPromotionType(cartItem.item.id, allPromotions);
    const {saved, subtotal} = discount(cartItem.count, cartItem.item.price, promotionType);
    return {cartItem, saved, subtotal, promotionType};
  });
}

function thisPromotionType(bestChargeItems) {
  const total = bestChargeItems.total;
  const savedTotal = bestChargeItems.savedTotal;
  const preTotal = total + savedTotal;
  if(preTotal >= 30 && savedTotal < 6){
    bestChargeItems.cartItems[0].promotionType = '满30减6元';
    bestChargeItems.savedTotal = 6.00;
    bestChargeItems.total = preTotal -6;
  }
}

function findPromotionType(id, allPromotions) {
  for (let p of allPromotions){
    if(p.hasOwnProperty('items')){
      let promotion = p.items.some(i => i === id);
      return promotion ? p.type : undefined;
    }
  }
}

function discount(count, price, promotionType) {
  let saved = 0;
  let subtotal = count * price;
  if (promotionType === '指定菜品半价'){
    saved = subtotal / 2;
  }
  return {saved, subtotal};
}

function getBestCharge(receiptItems) {
  let total = 0;
  let savedTotal = 0;
  for (const receiptItem of receiptItems){
    total += receiptItem.subtotal;
    savedTotal += receiptItem.saved;
  }
  return {cartItems:receiptItems, savedTotal, total: total - savedTotal};
}

function buildReceipt(bestChargeItems) {
  const receipt = bestChargeItems.cartItems.map(cartItem => {
    return `${cartItem.cartItem.item.name} x ${cartItem.cartItem.count} = ${cartItem.subtotal}元`
  }).join('\n');

  const promotionItems = [];
  const items = bestChargeItems.cartItems;
  items.map(i => {
    if (i.promotionType === '指定菜品半价') {
      promotionItems.push(i.cartItem.item.name);
    }
  });

  let  promotionInfo = ``;
  const type = bestChargeItems.cartItems[0].promotionType;
  if (type === '满30减6元') {
    promotionInfo = `
-----------------------------------
使用优惠:
${type}，省${bestChargeItems.savedTotal}元`;

  }
  if (type === '指定菜品半价') {
    promotionInfo = `
-----------------------------------
使用优惠:
${type}(${promotionItems.join('，')})，省${bestChargeItems.savedTotal}元`;
  }

  return `
============= 订餐明细 =============
${receipt}${promotionInfo}
-----------------------------------
总计：${bestChargeItems.total}元
===================================`.trim();
}


module.exports = {
  bestCharge,
  buildCartItems,
  buildReceiptItems,
  getBestCharge,
  buildReceipt,
  thisPromotionType
}
