'use strict'

function bestCharge(selectedItems) {
  const allItems = loadAllItems();
  const allPromotions = loadPromotions();

  const cartItems = buildCartItems(allItems, selectedItems);
  const receiptCartItems = buildReceiptCartItems(cartItems, allPromotions);
  const receiptItems = calculateReceiptItems(receiptCartItems);
  const receipt = buildReceipt(receiptItems);
  const receiptText = buildReceiptText(receipt);

  return receiptText;
}

function buildCartItems(allItems, selectedItems) {
  return selectedItems.map(selectedItem => {
    const splitSelectedItem = selectedItem.split(' x ');
    const barcode = splitSelectedItem[0];
    const count = parseInt(splitSelectedItem[1]);
    const item = allItems.find(item => item.id === barcode);

    console.log(item);
    return {item, count};
  });
}

function buildReceiptCartItems(cartItems, allPromotions) {
  return cartItems.map(receiptCartItem => {
    const subTotal = receiptCartItem.item.price * receiptCartItem.count;
    const save = calculateHalvePromotions(receiptCartItem.item.id, allPromotions);
    const canSave = save ? parseFloat(subTotal / 2) : 0.00;

    return {receiptCartItem, subTotal, canSave};
  });
}

function calculateHalvePromotions(barcode, allPromotions) {

  return allPromotions.filter(promotion => promotion.items).find(a => {
    return a.items.some(b => b === barcode);
  });
}

function calculateReceiptItems(receiptItems) {
  let total = 0;
  let canSaved = 0;

  for (const receiptItem of receiptItems) {
    total += receiptItem.subTotal;
    canSaved += receiptItem.canSave;
  }
  return {receiptItems, total, canSaved};
}

function buildReceipt(receiptItems) {
  const promotion = findPomotionType(receiptItems);
  return {receipt: receiptItems, promotion};
}

function findPomotionType(receiptItems) {
  const saved = receiptItems.total > 30 ? receiptItems.total -(receiptItems.total- 6) : 0;

  return saved >= receiptItems.canSaved ? {type: '满30减6元', saved: saved} : {
    type: '指定菜品半价',
    saved: receiptItems.canSaved
  };
}


function buildReceiptText(receipt) {
  let receiptText = receipt.receipt.receiptItems.map(receiptItem => {
    const info =  `
============= 订餐明细 =============
${receiptItem.receiptCartItem.item.name}\
 x ${receiptItem.receiptCartItem.count}\
  = ${receiptItem.subTotal}元
`
  });
  let string =`
-----------------------------------
使用优惠:
${receipt.promotion.type},${receipt.promotion.saved}
-----------------------------------
总计：${receipt.receipt.total}元
===================================
`

return string;

}


module.exports = {
  bestCharge: bestCharge,
  buildCartItems: buildCartItems,
  buildReceiptCartItems: buildReceiptCartItems,
  calculateReceiptItems: calculateReceiptItems,
  buildReceipt: buildReceipt,
  buildReceiptText: buildReceiptText
}
