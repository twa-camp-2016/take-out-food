function bestCharge(selectedItems) {
  return /*TODO*/;
}

function formatItems(selectedItems) {
  return selectedItems.map(function (item) {
    let temp = item.split(" x ");

    return {
      id: temp[0],
      amount: parseInt(temp[1])
    }
  });
}

function getCartItems(items, allItems) {
  return items.map(function (item) {
    let exist = allItems.find(function (info) {
      return info.id === item.id;
    });
    if (exist) {
      return Object.assign({}, exist, {amount: item.amount});
    }
  });
}

function getSubtotal(cartItems) {
  return cartItems.map(function (item) {
    let subtotal = item.amount * item.price;
    return Object.assign({}, item, {subtotal: subtotal});
  });
}

function getTotal(subtotalItems) {
  let total = 0;

  for (let item of subtotalItems) {
    total += item.subtotal;
  }

  return total;
}

function getHalfCutId(promotions) {
  for (let item of promotions) {
    if (item.items) {
      return item.items;
    }
  }
}