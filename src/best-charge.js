'use strict';

function bestCharge(selectedItems) {

  const cartItems = buildItems(selectedItems);
  const countedItems = buildSubtotal(cartItems);
  const sumedItems = buildTotal(countedItems);
  const receiptItems = buildReceiptItems(sumedItems);
  const receipt = buildReceipt(receiptItems);

  console.log(receipt);
}

function buildItems(selectedItems) {
  const cartItems = [];
  const allItems = loadAllItems();

  for (const selectedItem of selectedItems) {

    const selectedItemArray = selectedItem.split(' x ');
    const id = selectedItemArray[0];
    const count = parseFloat(selectedItemArray[1]);

    const item = allItems.find(item => item.id === id);

    cartItems.push({item, count});
  }
  return cartItems;
}

function buildSubtotal(cartItems) {
  return cartItems.map((cartItem) => {
    const subtotal = cartItem.item.price * cartItem.count;

    return {cartItem, subtotal};
  })
}

function buildTotal(countedItems) {
  let total = 0 ;
  for(const countedItem of countedItems){
    total += countedItem.subtotal;
  }
  return {countedItem,total};
}

function buildReceiptItems(cartItems) {
  const allPromotions = loadPromotions();
  return cartItems.map((cartItem) => {

    const promotionType = findPromotionType(cartItem.item.id, allPromotions);
    const {saved, subtotal} = discount(cartItem.count, cartItem.item.price, promotionType);

    return {cartItem, saved, subtotal};
  });
}

function findPromotionType(id, promotions) {
  const promotion = promotions.find(promotion => promotion.items.some(i => i === id));
  return promotion ? promotion.type : '满30减6元';
}

function discount(count, price, promotionType) {
  let subtotal = count * price;
  let saved = 0;

  if (promotionType === '满30减6元') {
    saved = 0;
  }
  else if (promotionType === '指定菜品半价') {
    saved = price * 0.5;
  }
  subtotal -= saved;

  return {subtotal, saved};
}
