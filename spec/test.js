/*global receiptString,halfPricesString*/
let _ = require('lodash');
'use strict';
function loadAllItems() {
  return [{
    id: 'ITEM0001',
    name: '黄焖鸡',
    price: 18.00
  }, {
    id: 'ITEM0013',
    name: '肉夹馍',
    price: 6.00
  }, {
    id: 'ITEM0022',
    name: '凉皮',
    price: 8.00
  }, {
    id: 'ITEM0030',
    name: '冰锋',
    price: 2.00
  }];
}
function loadPromotions() {
  return [{
    type: '满30减6元'
  }, {
    type: '指定菜品半价',
    items: ['ITEM0001', 'ITEM0022']
  }];
}
let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
//let inputs = ["ITEM0013 x 4"];

function bestCharge(inputs) {


  let formatIds = getFormatIds(inputs);
  // console.log(formatIds);
  let allItems = loadAllItems();
  let buyedItems = getBuyedItems(formatIds, allItems);
  //console.log(buyedItems);
  let promotions = loadPromotions();
  let promotionItems = getPromotItems(buyedItems, promotions);
//  console.log(promotionItems);
  let totalPay = getTotalPrices(promotionItems);
  console.log(totalPay);
  let receipt = getReceipt(promotionItems, totalPay);
  //console.log(receipt);
  let receiptString = getReceiptString(receipt);
  console.log(receiptString);
  return receiptString;
}
bestCharge(inputs);
function getFormatIds(inputs) {
  return inputs.map(item => item.split(' x '))
    .map(([id, count]) => {
      return {id, count: parseInt(count)}
    });

  // return inputs.map((element)=> {
  //   if (element.includes(" x ")) {
  //     let [id,count]=element.split(" x ");
  //     return {
  //       id,
  //       count: parseInt(count)
  //     }
  //   }
  // });
}
function _getExistByIds(array, id) {
  //return array.find((element)=>element.id === id);
  return _.find(array, function (element) {
    return element.id === id;
  })
}
function getBuyedItems(formatIds, allItems) {
  return formatIds.map(({id, count})=> {
    let {name, price}=_getExistByIds(allItems, id);
    return {id, count, name, price};
  });
}
function getPromotItems(buyedItems, promotions) {
  let currentPromotion = promotions.find((promotion)=>promotion.type === '指定菜品半价');
  return buyedItems.map((buyedItem)=> {
    let hasHalfPrice = currentPromotion.items.includes(buyedItem.id);
    let type = hasHalfPrice ? '指定菜品半价' : '满30减6元';
    let payPrice = buyedItem.price * buyedItem.count;
    let saved = 0;
    return Object.assign({}, buyedItem, {type, payPrice, saved});
  });
}
function getTotalPrices(promotionItems) {
  let result = {
    totalPrices: 0,
    totalSaved: 0
  };
  //let beforePromotionPrices = 0;
  // for (let item of promotionItems) {
  //   beforePromotionPrices += item.payPrice;
  // }
  let beforePromotionPrices = promotionItems.reduce((result, promotionItem)=> {
    result += promotionItem.payPrice;
    return result;
  }, 0);
  //console.log(beforePromotionPrices);
  let reduce6 = 0;
  if (beforePromotionPrices > 30) {
    reduce6 = beforePromotionPrices - 6;
  }
  let halfPrices = 0;
  // for (let item of promotionItems) {
  //   if (item.type === '指定菜品半价') {
  //     item.saved = item.payPrice * 0.5;
  //   }
  //   halfPrices += item.payPrice - item.saved;
  // }
  promotionItems.map((item)=> {
    if (item.type === '指定菜品半价') {
      item.saved = item.payPrice * 0.5;
    }
    halfPrices += item.payPrice - item.saved;
  });
  if ((halfPrices > reduce6) && (beforePromotionPrices > 30)) {
    result.totalPrices = reduce6;
    result.totalSaved = 6;
  }
  else if (reduce6 > halfPrices) {
    result.totalPrices = halfPrices;
    result.totalSaved = beforePromotionPrices - result.totalPrices;
  } else {
    result.totalPrices = beforePromotionPrices;
    result.totalSaved = 0;
  }
  return result;
}
function getReceipt(promotionItems, totalPay) {
  return {
    promotionItems,
    totalPrices: totalPay.totalPrices,
    totalSaved: totalPay.totalSaved,
  }
}
function getReceiptString(receipt) {
  let receiptString = '';

  let arrray = [];
  //for (let item of receipt.promotionItems) {
  receipt.promotionItems.map((item)=>{
    receiptString += `${item.name} x ${item.count} = ${item.payPrice}元`;
    receiptString += '\n ';
    if (item.type === '指定菜品半价') {
      arrray.push(item.name);
    }
  });

  //}
  let halfPricesString;
  halfPricesString = arrray.join('，');
  let savedString = '';
  if (receipt.totalSaved > 6) {
    savedString = `指定菜品半价(${halfPricesString})，省${receipt.totalSaved}元`;
  } else {
    savedString = `满30减6元，省6元`;
  }
  let result = ``;
  if (receipt.totalSaved >= 6) {
    result = `
 ============= 订餐明细 =============
 ${receiptString}-----------------------------------
 使用优惠:
 ${savedString}
 -----------------------------------
 总计：${receipt.totalPrices}元
 ===================================`.trim();
  } else {
    result = `
 ============= 订餐明细 =============
 ${receiptString}-----------------------------------
 总计：${receipt.totalPrices}元
 ===================================`.trim();
  }
  return result;
}

module.exports={};
