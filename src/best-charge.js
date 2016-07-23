'use strict'
function bestCharge(tags) {
  let items = loadAllItems();
  let promotions = loadPromotions();
  let barcodes = formatTags(tags);
  let orders = getOrders(barcodes, items);
  let detailedOrders = getSubtotal(orders);
  let total = getTotal(detailedOrders);
  let typeName = findPromotionTypes(detailedOrders, promotions);
  let promotionDetailedOrders = onePromotion(detailedOrders, promotions);
  let promotionType = findPromotion(promotionDetailedOrders, promotions, total);
  let str = print(promotionType, detailedOrders, total, typeName);
  return str;
}
function formatTags(tags) {
  return tags.map(function (tag) {
    let info = tag.split(' x ');
    return {
      id: info[0],
      count: parseInt(info[1])
    }
  });
}
function getOrders(barcodes, items) {
  return barcodes.map(function (bar) {
    return Object.assign({}, items.find(function (item) {
      return item.id === bar.id;
    }), {count: bar.count});
  });
}
function getSubtotal(orders) {
  return orders.map(function (order) {
    return Object.assign({}, order, {subtotal: order.price * order.count});
  });
}
function getTotal(detailedOrders) {
  let total = 0;
  for (let order of detailedOrders) {
    total += order.subtotal;
  }
  return total;
}
function findPromotionTypes(detailedOrders, promotions) {
  let typeName = [];
  for (let order of detailedOrders) {
    let existItem = promotions[1].items.find(function (item) {
      return item === order.id;
    });
    if (existItem) {
      typeName.push({name: order.name});
    }
  }
  return typeName;
}
function onePromotion(detailedOrders, promotions) {
  let promotionDetailedOrders = [];
  for (let order of detailedOrders) {
    let existItem = promotions[1].items.find(function (item) {
      return item === order.id;
    });
    if (existItem) {
      promotionDetailedOrders.push(Object.assign({}, {
        id: order.id,
        name: order.name,
        price: order.price,
        count: order.count
      }, {promotionSubtotal: order.subtotal / 2}));
    }
    else
      promotionDetailedOrders.push(Object.assign({}, {
        id: order.id,
        name: order.name,
        price: order.price,
        count: order.count
      }, {promotionSubtotal: order.subtotal}));
  }
  return promotionDetailedOrders;
}
function findPromotion(promotionDetailedOrders, promotions, total) {
  let onePromotionTotal = 0;
  if (total >= 30) {
    onePromotionTotal = total - 6;
  }
  let anotherPromtoinTotal = 0;
  for (let order of promotionDetailedOrders) {
    anotherPromtoinTotal += order.promotionSubtotal;
  }
  if (onePromotionTotal <= anotherPromtoinTotal) {
    return {
      type: '满30减6元',
      promotionTotal: onePromotionTotal
    };
  }
  else
    return {
      type: '指定菜品半价',
      promotionTotal: anotherPromtoinTotal
    };
}
function print(promotionType, detailedOrders, total, typeName) {
  let str = '============= 订餐明细 =============\n';
  for (let order of detailedOrders) {
    str += order.name + ' x ' + order.count + ' = ' + order.subtotal + '元\n';
  }
  str += '-----------------------------------\n';
  if (promotionType.promotionTotal===0) {
    str += '总计：' + total + '元\n===================================';
  }
  else {
    str += '使用优惠:\n';
    str += promotionType.type;
    if (promotionType.type === '指定菜品半价') {
      str += '(' + typeName[0].name;
      for (let i = 1; i < typeName.length; i++) {
        str += '，' + typeName[i].name + ')';
      }
    }
    str += '，省' + (total - promotionType.promotionTotal) + '元\n';
    str += '-----------------------------------\n总计：' + promotionType.promotionTotal + '元\n===================================';
  }
  return str;
}
bestCharge(tags);
