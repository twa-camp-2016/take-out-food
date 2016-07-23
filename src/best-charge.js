const allItems = require('./items');
const promotions = require('./promotions');

function bestCharge(selectedItems) {
  const cartDishes = buildCartDishes(selectedItems);
  const details = buildOrderDishes(cartDishes);
  const orderDetail = buildOrderDetail(details);
  const orderDetailText = buildOrderDetailText(orderDetail);
  return orderDetailText;
}

function buildCartDishes(selectedItems) {
  const cartDishes = [];
  const allDishes = allItems();
  for (const selectedItem of selectedItems) {
    const itemArray = selectedItem.split('x');
    const id = itemArray[0].trim();
    const count = parseInt(itemArray[1]);

    const dish = allDishes.find(item=>item.id === id);
    cartDishes.push({dish, count});
  }

  return cartDishes;
}

function buildOrderDishes(cartDishes) {
  return cartDishes.map(cartDish=> {
    let promotionType = findPromotionType(cartDish.dish.id, promotions());
    let {saved, subtotal} = preferential(cartDish.count, cartDish.dish.price, promotionType);
    return {cartDish, saved, subtotal}
  });
}

function findPromotionType(id, promotions) {
  const promotionType = promotions[1].items.find(itemId=>itemId === id);
  return promotionType ? promotions[1].type : undefined;
}

function preferential(count, price, promotionType) {
  let saved = 0;
  let subtotal = count * price;

  if (promotionType === promotions()[1].type) {
    saved = subtotal / 2;
  }

  return {saved, subtotal};
}

function buildOrderDetail(orderDishes) {
  let total = 0;
  let savedTotal = 0;
  let promotionType = undefined;

  for (const orderDish of orderDishes) {
    total += orderDish.subtotal;
    savedTotal += orderDish.saved;
  }

  if (total > 30 && savedTotal <= 6) {
    total -= 6;
    savedTotal = 6;
    promotionType = promotions()[0].type;
  }
  else if (total > 30) {
    total -= savedTotal;
    promotionType = promotions()[1].type;
  }

  return {orderDishes, total, savedTotal, promotionType}
}

function findPromotionItems(orderDishes) {
  const promotionItems = [];
  for (let item of orderDishes) {
    const cartDish = promotions()[1].items.find(itemId=>itemId === item.cartDish.dish.id);
    if (cartDish) {
      promotionItems.push(item.cartDish.dish.name);
    }
  }
  return `(${promotionItems.join('，')})`;
}

function buildOrderDetailText(orderDetail) {
  let promotionItems = '';
  if (orderDetail.promotionType === '指定菜品半价') {
    promotionItems = findPromotionItems(orderDetail.orderDishes);
  }

  const orderText = orderDetail.orderDishes.map(orderDish=> {
    return `${orderDish.cartDish.dish.name} x ${orderDish.cartDish.count} = ${orderDish.subtotal}元`;
  }).join('\n');
  let preferentialText = '';
  if (orderDetail.promotionType) {
    preferentialText = `-----------------------------------
使用优惠:
${orderDetail.promotionType}${promotionItems}，省${orderDetail.savedTotal}元`;
  }

  if (orderDetail.promotionType) {
    return `
============= 订餐明细 =============
${orderText}
${preferentialText}
-----------------------------------
总计：${orderDetail.total}元
===================================`.trim();
  }
  else {
    return `
============= 订餐明细 =============
${orderText}
-----------------------------------
总计：${orderDetail.total}元
===================================`.trim()
  }
}

module.exports = {
  buildCartDishes,
  buildOrderDishes,
  buildOrderDetail,
  buildOrderDetailText,
  bestCharge
};

