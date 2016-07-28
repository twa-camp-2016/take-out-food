"use strict";

// const {loadPromotions} = require('../src/promotions');
// const {loadAllItems} = require('../src/items');
//
// let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
// function getFormattedTags(inputs) {
//   let result = inputs.map((input) => {
//     let [id, count] = input.split(' x ');
//     return {id: id, count: parseInt(count)};
//   });
//   return result;
// }
//
// function _getExitItemsById(array, id) {
//   return array.find((element)=>element.id === id);
// }
//
// function getCartItems(allItems, formattedTags) {
//   return formattedTags.map(({id, count})=> {
//     let {name, price} =_getExitItemsById(allItems, id);
//     return {id, name, price, count};
//   });
//      return result;
// }
// function getPromotionItems(countedInputs, promotions) {
//   let currentPromotion = promotions.find((promotion)=>promotion.type === '指定菜品半价');
//   return countedInputs.map((countedInput)=> {
//     let hasPromoted = currentPromotion.items.includes(countedInput.id);
//     //console.log(hasPromoted) ;
//     let payPrice1 = countedInput.price * countedInput.count;
//     let saved1 = hasPromoted ? payPrice1 / 2 : 0;
//     let payPrice = payPrice1 - saved1;
//     return Object.assign({}, countedInput, {payPrice1, saved1, payPrice});
//   });
// }
// function getTotalPrice(promotionItems) {
//   let totalPrices = promotionItems.reduce((result, promotionItem)=> {
//     result.totalPayPrice += promotionItem.payPrice1;
//     result.totalSaved1 += promotionItem.saved1;
//     return result;
//   }, {totalPayPrice: 0, totalSaved1: 0, type: ''});
//   //console.log(totalPrices);
//   let totalSaved = 0;
//   if (totalPrices.totalSaved1 !== 0) {
//     if (totalPrices.totalPayPrice >= 30 && totalPrices.totalSaved1 <= 6) {
//       totalPrices.totalPayPrice = totalPrices.totalPayPrice;
//       totalPrices.totalSaved = 6;
//       totalPrices.type = '满30减6';
//       totalPrices.pay = totalPrices.totalPayPrice - 6;
//     } else {
//       totalPrices.totalPayPrice = totalPrices.totalPayPrice;
//       totalPrices.totalSaved = totalPrices.totalSaved1;
//       totalPrices.type = '指定菜品半价';
//       totalPrices.pay = totalPrices.totalPayPrice - totalPrices.totalSaved;
//     }
//   } else {
//     if (totalPrices.totalPayPrice >= 30) {
//       totalPrices.totalPayPrice = totalPrices.totalPayPrice;
//       totalPrices.totalSaved = 6;
//       totalPrices.type = '满30减6';
//       totalPrices.pay = totalPrices.totalPayPrice - 6;
//     } else {
//       totalPrices.totalPayPrice = totalPrices.totalPayPrice;
//       totalPrices.totalSaved = 0;
//       totalPrices.type = '没有优惠';
//       totalPrices.pay = totalPrices.totalPayPrice;
//     }
//   }
//   console.log(totalPrices);
//   return totalPrices;
// }
// function getPrintModel(promotionItems, totalPrices) {
//   let savedItems = promotionItems.filter((promotionItem) => promotionItem.saved1 > 0)
//     .map(({name, count, saved1}) => {
//       return {name, count, saved1}
//     });
//   return {
//     receiptItems: promotionItems.map(({name, count, payPrice1})=> {
//       return {name, count, payPrice1}
//     }),
//     savedItems,
//     type: totalPrices.type, totalSaved: totalPrices.totalSaved, pay: totalPrices.pay
//   }
// }
// function getPrint(receiptModel) {
//   let lines = ['============= 订餐明细 ============='];
//   for (let {name, count, payPrice1} of receiptModel.receiptItems) {
//     let line = `${name} x ${count} = ${payPrice1}元`;
//     lines.push(line);
//   }
//   let hasSaved = receiptModel.savedItems.length > 0;
//   if (hasSaved && receiptModel.type === "指定菜品半价") {
//     lines.push(`-----------------------------------`);
//     lines.push(`使用优惠:`);
//     let line = `${receiptModel.type}(黄焖鸡，凉皮)，省${receiptModel.totalSaved}元`
//     lines.push(line);
//   }
//   if (hasSaved && receiptModel.type === "满30减6") {
//     lines.push('-----------------------------------');
//     lines.push(`使用优惠:`);
//     let line = `${receiptModel.type}，省${receiptModel.totalSaved}元`
//     lines.push(line);
//   }
//   lines.push(`-----------------------------------`);
//   lines.push(`总计：${receiptModel.pay}元`);
//   lines.push(`===================================`);
//   let receiptString = lines.join('\n');
//   return receiptString;
// }
// function bestCharge(inputs) {
//   let formattedTags = getFormattedTags(inputs);
//   let allItems = loadAllItems();
//   let countedInputs = getCartItems(allItems, formattedTags);
//   let promotions = loadPromotions();
//   let promotionItems = getPromotionItems(countedInputs, promotions);
//   let totalPrices = getTotalPrice(promotionItems);
//   let receiptModel = getPrintModel(promotionItems, totalPrices);
//   let receiptString = getPrint(receiptModel);
//   return receiptString;
// }
// console.info(bestCharge(inputs));
//
// module.exports = {
//   bestCharge,
//   getFormattedTags,
//   getCartItems,
//   getPromotionItems,
//   getTotalPrice,
//   getPrintModel,
//   getPrint
// }

function loadAllItems() {
  return [
    {id: 'ITEM0001', name: '黄焖鸡', price: 18.00},
    {id: 'ITEM0013', name: '肉夹馍', price: 6.00},
    {id: 'ITEM0022', name: '凉皮', price: 8.00},
    {id: 'ITEM0030', name: '冰锋', price: 2.00}];
}
function loadPromotions() {
  return [
    {type: '满30减6元'},
    {type: '指定菜品半价', items: ['ITEM0001', 'ITEM0022']}];
}
 let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
//let inputs = [ "ITEM0013 x 2"];

function getFormatted(inputs) {
  let result = inputs.map((input)=> {
    let [id,count] = input.split(' x ');
    return {id: id, count: parseInt(count)};
  });
  return result;
}
// function getExitItemsById(array, id) {
//   return array.find((element)=>element.id === id);
// }
function getCartItems(allItems, formattedItems) {
  let result = formattedItems.map(({id, count})=> {
    let {name, price} = allItems.find((element)=>element.id === id);
    return {id, name, price, count};
  });
  return result;
}
function getHalfPriceItems(promotions, cartItems) {
  let currentPromotion = promotions.find((promotion)=>promotion.type === '指定菜品半价');
  return cartItems.map((cartItem)=> {
    let hasPromoted = currentPromotion.items.includes(cartItem.id);
    let pay = cartItem.price * cartItem.count;
    let saved = hasPromoted ? pay * 0.5 : 0;
    let payPrice = pay - saved;
    return Object.assign({}, cartItem, {payPrice, saved});
  });
}

function getHalfTotalPrice(halfPriceItems) {
  let totalHalfPrice = halfPriceItems.reduce((result, halfPriceItem)=> {
    result.totalHalfPayPrice += halfPriceItem.payPrice;
    result.totalHalfSaved += halfPriceItem.saved;
    return result;
  }, {totalHalfPayPrice: 0, totalHalfSaved: 0});
  return totalHalfPrice;
}
function getSubtractedPrice(cartItems) {
  let totalSubtractions = cartItems.reduce((result, cartItem)=> {
    result.totalSubtractedPrice += cartItem.price * cartItem.count;
    return result;
  }, {totalSubtractedPrice: 0, totalSubtractedSaved: 0});
  if (totalSubtractions.totalSubtractedPrice >= 30) {
    totalSubtractions.totalSubtractedSaved = 6;
  }
  return totalSubtractions;
}
function getCompared(totalSubtractions, totalHalfPrice) {
  let savedItems = {};
  if(totalSubtractions.totalSubtractedSaved < totalHalfPrice.totalHalfSaved){
    savedItems.type = '指定菜品半价';
      savedItems.save = totalHalfPrice.totalHalfSaved;
      savedItems.total = totalHalfPrice.totalHalfPayPrice;
  }else if(totalSubtractions.totalSubtractedSaved!==0){
    savedItems.type = '满30减6元';
    savedItems.save = totalSubtractions.totalSubtractedSaved;
    savedItems.total = totalSubtractions.totalSubtractedPrice - 6;
  }else {
    savedItems.type = 'No';
    savedItems.save = 0;
    savedItems.total = totalSubtractions.totalSubtractedPrice;
  }
  return savedItems;
}
function getPrintModel(cartItems, savedItems) {
  return {
    receiptItems: cartItems.map(({name, count, price})=> {
      return {name, count, price}
    }),
    type: savedItems.type, save: savedItems.save, total: savedItems.total
  };
}
function printSting(receiptModel){
  let lines = [`============= 订餐明细 =============`];
  for (let {name, count, price} of receiptModel.receiptItems) {
    let line = `${name} x ${count} = ${count*price}元`;
    lines.push(line);
  }
  if (receiptModel.type === "指定菜品半价") {
    lines.push(`-----------------------------------`);
    lines.push(`使用优惠:`);
    let line = `${receiptModel.type}(黄焖鸡，凉皮)，省${receiptModel.save}元`
    lines.push(line);
  }
  if (receiptModel.type === "满30减6元") {
    lines.push(`-----------------------------------`);
    lines.push(`使用优惠:`);
    let line = `${receiptModel.type}，省${receiptModel.save}元`
    lines.push(line);
  }
  lines.push(`-----------------------------------`);
  lines.push(`总计：${receiptModel.total}元`);
  lines.push(`===================================`);
  let receiptString = lines.join('\n');
  return receiptString;
}
function bestCharge(inputs) {
  let formattedItems = getFormatted(inputs);
  let allItems = loadAllItems();
  let cartItems = getCartItems(allItems, formattedItems);
  let promotions = loadPromotions();
  let halfPriceItems = getHalfPriceItems(promotions, cartItems);
  let totalHalfPrices = getHalfTotalPrice(halfPriceItems);
  let totalSubtractionPrice = getSubtractedPrice(cartItems);
  let savedItems = getCompared(totalSubtractionPrice, totalHalfPrices);
  let receiptModel = getPrintModel(cartItems, savedItems);
  //console.log(receiptModel);
  let receiptString = printSting(receiptModel);
  return receiptString
}

console.log(bestCharge(inputs));
