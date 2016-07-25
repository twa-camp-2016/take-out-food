'use strict'
function bestCharge(tags) {
  let items = loadAllItems();
  let promotions = loadPromotions();
  let barcodes = formatTags(tags);
  let orders = getOrders(barcodes, items);
  let detailedOrders = getSubtotal(orders);
  let total = getTotal(detailedOrders);
  let typeName = findPromotionTypes(detailedOrders, promotions);
  let promotionType = findPromotion(detailedOrders, total,typeName);
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
 return detailedOrders.reduce(function(total,order){
   return total+=order.subtotal;
 },0);
}
function findPromotionTypes(detailedOrders, promotions) {
  return detailedOrders.filter(function(order){return promotions[1].items.find(function(item){return item===order.id;});});
}

function findPromotion(DetailedOrders, total,typeName) {
  let onePromotionTotal = 0;
  if (total >= 30) {
    onePromotionTotal = total - 6;
  }
  let anotherPromtoinTotal =total-typeName.reduce((save,ty)=>save+ty.subtotal/2,0);
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
  detailedOrders.forEach((order)=>{
    str += order.name + ' x ' + order.count + ' = ' + order.subtotal + '元\n';
  }) ;
  str += '-----------------------------------\n';
  if (promotionType.promotionTotal===0) {
    str += '总计：' + total + '元\n===================================';
  }
  else {
    str += '使用优惠:\n';
    str += promotionType.type;
    if (promotionType.type === '指定菜品半价') {
      str+='(';
      let str1='';
     typeName.forEach(ty=>{
       str1 += '，' + ty.name ;
     });
      str+=str1.substring(1)+')';
    }
    str += '，省' + (total - promotionType.promotionTotal) + '元\n';
    str += '-----------------------------------\n总计：' + promotionType.promotionTotal + '元\n===================================';
  }
  return str;
}
bestCharge(tags);
