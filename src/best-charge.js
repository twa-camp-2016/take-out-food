'use strict'
function bestCharge(inputs) {
  const allItems = loadAllItems();
  const cartItems = buildCartItem(inputs, allItems);
  const subtotal = getSubtotal(cartItems, allItems);
  const promotionType = loadPromotions();
  const bestPromotionType = findBestPromotionType(subtotal, promotionType);
  const totalPrice = getTotalPrice(bestPromotionType, allItems);
  const receiptText = buildReceiptText(totalPrice);

  return receiptText;
}

function buildCartItem(inputs, allItems) {
  const cartItems = [];
  let itemLists = loadAllItems();

  for (const input of inputs) {
    var inputArray = input.split(' x ');
    const id = inputArray[0];
    const count = parseInt(inputArray[1]);

    for (const itemList of itemLists) {
      if (id === itemList.id) {
        cartItems.push({cartItems: {name: itemList.name, count: count}});
      }
    }
  }
  return cartItems;
}

function getSubtotal(cartItems, allItems) {
  var subtotal;
  const cart = [];

  for (var i = 0; i < cartItems.length; i++) {
    for (var j = 0; j < allItems.length; j++) {
      if (cartItems[i].name === allItems[j].name)
        subtotal = cartItems[i].cartItems.count * allItems[j].price;
      cart.push({item: cartItems[i], subtotal: subtotal});
    }
  }

  return cart;
}

function findBestPromotionType(subtotal, promotionType) {
  let savedTypeHalf = 0;
  let savedTypeLess = 0;

  for (const cartItem of subtotal) {
    if (cartItem.item.cartItems.name === '黄焖鸡') {
      savedTypeHalf = 9 * cartItem.item.cartItems.count;
    } else if (cartItem.item.cartItems.name === '凉皮') {
      savedTypeHalf += 4 * cartItem.item.cartItems.count;
    }
    return {promotion: cartItem, promotionType: '指定菜品半价', savedTotal: savedTypeHalf};
  }
  for (const subtotals of subtotal) {
    if (subtotals.item.cartItems.name != '黄焖鸡' || subtotals.item.cartItems.name != '凉皮') {
      savedTypeLess += subtotals.subtotal;
      if (savedTypeLess > 30) {
        savedTypeLess = savedTypeLess - (savedTypeLess % 30) * 6;
        return {promotion: cartItem, promotionType: '满30减6元', savedTotal: savedTypeLess};
      }
    }
  }
}

function getTotalPrice(saveTotal, allItems) {
  let totalPrice = 0;

  for (const totalPrices of saveTotal) {
    for (let i = 0; i < allItems.length; i++) {
      if (totalPrices.item.cartItems.name === allItems[i].name) {
          totalPrice+=allItems[i].price;
      }
    }
  }
  totalPrice-=saveTotal.savedTotal;
  return saveTotal.push(totalPrice);
}

function buildReceiptText(totalPrice) {
  return `============= 订餐明细 =============
${totalPrice.item.cartItems.name} x ${totalPrice.item.cartItems.count} = ${totalPrice.totalPrice}元\n
-----------------------------------
 使用优惠:
 ${totalPrice.promotionType},省${totalPrice.savedTotal}元
 -----------------------------------
 总计：${totalPrice.totalPrice}
 ===================================`;
}

