function bestCharge(selectedItems) {
  return selectedItems.map((selectedItem) => {
    let [id,count] = selectedItem.split("x");
    return {id, count: parseInt(count)}
  });
}
function getName(array, barcode) {
  return array.find((arr) => arr.id === barcode);
}
function getCartItems(allItems, countBarcodes) {
  return countBarcodes.map((countBarcode) => {
    let {id, name, price} = getName(allItems, countBarcode.id);
    return {id, name, count: countBarcode.count, price}
  });
}

function getTotalPrice(cartItems) {
  return cartItems.reduce((result, {count, price}) => {
    result.totalPrice += (count * price);
    return result;
  }, {totalPrice: 0});
}


function getHasPromot(id, array) {
  return id.includes(array);
}


function getPromotedItems(n, promotions, cartItems) {
  if (n > 30) {
    let totalPrice_fullCut = n - 6;
    let currentPromotion = promotions.find((promotion) => promotion.type === '指定菜品半价');
    let halfPrice = 0;
    let evaryPrice = 0;
    let totalPrice_halfPrcie = cartItems.reduce((result, cartItem) => {
      let hasPromotion = getHasPromot(cartItem.id, currentPromotion.items);
      if (hasPromotion) {
        halfPrice = cartItem.count * cartItem.price * 0.5;
      }
      result = result + (hasPromotion ? halfPrice : 2 * halfPrice);
      return result;
    }, halfPrice);
    let promotion = totalPrice_fullCut - totalPrice_halfPrcie;
    if (promotion >= 0) {
      return getFullCut(cartItems, totalPrice_fullCut);
    } else {
      return getHalfPrice(cartItems, totalPrice_halfPrcie,n);
    }
  }
}


function getFullCut(cartItems, totalPrice) {
  return {
    cartItems,
    saved: 6,
    totalPrice:totalPrice - 6
  }
}

function getHalfPrice(cartItems, totalPrice,n) {
  return {
    cartItems,
    saved: n-totalPrice,
    totalPrice:totalPrice
  }
}
