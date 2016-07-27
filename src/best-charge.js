//import _ from 'lodash';
'use strict';
function bestCharge(selectedItems) {

  const allItems = loadAllItems();
  const itemArray = getItemArray(selectedItems,allItems);
  const totalArray = getSubtotalArray(itemArray);
  const allPromotions = loadPromotions();
  const savesA = firstPromotion(totalArray);
  const savesB = secondPromotion(totalArray,allPromotions);
  const typeArray = promotionTypeItem(savesA, savesB);
  const list = getItemList(totalArray);
  const promotionList = getPromotionList(typeArray);
  const total = totalPrice(totalArray);
  const receipt = printList(promotionList,list,total,typeArray);
  return receipt;
}

function getItemArray(selectedItems,allItems){

  let countItems = [];

  for (let selectedItem of selectedItems) {
    let splitItem = selectedItem.split(' x ');
    let id = splitItem[0];
    let count = parseInt(splitItem[1]);

    let countItem = countItems.find(countItem => allItems.id === id);

    if (countItem) {
      countItem.count += count;
    } else {
      let item = allItems.find(item => item.id === id);
      countItems.push({item, count});
    }
  }
  return countItems;
}

function getSubtotalArray(itemArray) {

  return itemArray.map(array => {
    let subtotal = array.item.price * array.count;
    return {countItem:array, subtotal};
  });
}

function firstPromotion(totalArray) {

  let total = totalPrice(totalArray);

  if(total >= 30){
    return {total,saves_A:6};
  }else return {total,saves_A:0};

}

function totalPrice(totalArray) {
  let total = 0;
  for(let array of totalArray){
    total += array.subtotal;
  }
  return total;
}
function secondPromotion(totalArray,allPromotions){

  let total = totalPrice(totalArray);
  let saves = 0;
  let selectedItems = selectedPromotionItems(totalArray,allPromotions[1]);
  for(let item of selectedItems){
    saves += item.countItem.item.price / 2;
  }
  return {total,saves_B:saves};
}

function selectedPromotionItems(totalArray,promotion) {
  let items = [];
  totalArray.map(array => promotion.items.find(item =>{
    if(item === array.countItem.item.id){
      items.push(array);
    }
  }));
  return items;
}

function promotionTypeItem(savesA, savesB) {
  if(savesA.saves_A >= savesB.saves_B){
    if(savesA.saves_A === 0){
      return {type:'不打折',saves:savesA.saves_A};
    }else {
      return {type: '满30减6元', saves: savesA.saves_A};
    }
  }else {
    return {type:'指定菜品半价', saves:savesB.saves_B};
  }
}

function getItemList(totalArray) {

  return totalArray.map(array => {
   return `${array.countItem.item.name} x ${array.countItem.count} = ${array.subtotal}元`;})
    .join('\n');
}

function getPromotionList(typeArray) {

    if(typeArray.type === '指定菜品半价'){
      return `使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省${typeArray.saves}元`;
    }
    else if(typeArray.type === '满30减6元'){
      return `使用优惠:
满30减6元，省6元`;
    }
    else return;
}

function printList(promotionList,list,total,typeArray) {
  let realTotal = total - typeArray.saves;
  if(typeArray.type === '不打折'){
    return `
============= 订餐明细 =============
${list}
-----------------------------------
总计：${total}元
===================================`;
  }
  else {
  return `
============= 订餐明细 =============
${list}
-----------------------------------
${promotionList}
-----------------------------------
总计：${realTotal}元
===================================`;}
}
