"use strict"

let selectedItems = [
  "ITEM0001 x 1",
  "ITEM0013 x 2",
  "ITEM0022 x 1"
];
//分割
function formatItems(selectedItems) {
  let ItemAndCount = [];
  for(let i=0;i<selectedItems.length;i++){
    let temp = selectedItems[i].split(' x ');
    ItemAndCount.push(Object.assign({},{id:temp[0]},{count:Number(temp[1])}));
  }
  return ItemAndCount;
}
/*console.log(JSON.stringify(formatItems(selectedItems)));
let a1 = formatItems(selectedItems);*/
//展示所有商品信息
let allItems = loadAllItems();

//匹配商品信息
function matchAllItems(ItemAndCount,allItems) {
  var cartItems = [];
  for(let i=0;i<allItems.length;i++){
    var existList = ItemAndCount.find(function (item) {
      return item.id === allItems[i].id;
    });
    if(existList){
      cartItems.push(Object.assign({},allItems[i],{count:existList.count}));
    }
  }
  return cartItems;
}
/*console.log(JSON.stringify(matchAllItems(a1,allItems)));
let a2 = matchAllItems(a1,allItems);*/


//计算原始小计
function calculateOriginSubtotal(cartItems) {
  let originSubtotalList  =[];
  for(let i=0;i<cartItems.length;i++){
    var originSubtotal = parseFloat(cartItems[i].price)*cartItems[i].count;
    originSubtotalList.push(Object.assign({},cartItems[i],{originSubtotal:originSubtotal}));
  }
  return originSubtotalList;
}
/*console.log(JSON.stringify(calculateOriginSubtotal(a2)));
let a3 = calculateOriginSubtotal(a2);*/

//展示所有优惠信息
let allPromotions = loadPromotions();
let tag = 0;
//计算第一种优惠节省
function calculateFirstSaving(originSubtotalList,allPromotions) {
  tag = 1;
  let firstSaving = 0;
  let sub = 0;
  for(let i=0;i<originSubtotalList.length;i++){
    sub += originSubtotalList[i].originSubtotal;
  }
  if(sub > 30){
    firstSaving = 6;
  }else{
    firstSaving = 0;
  }
  return firstSaving;
}
/*console.log(calculateFirstSaving(a3,allPromotions));
let a4 = calculateFirstSaving(a3,allPromotions);*/

//计算第二种优惠节省
function calculateSecondSaving(originSubtotalList,allPromotions){
  tag = 2;
  let tempArray = [];
  let pro = allPromotions[1].items;
  let secondSaving = 0;
  for(let i=0;i<originSubtotalList.length;i++){
    let existList = pro.find(function (item) {
      return item === originSubtotalList[i].id;
    });
    if(existList){
      tempArray.push(Object.assign({},originSubtotalList[i]));
    }
    for(let j=0;j<tempArray.length;j++){
      tempArray[j].originSubtotal = (tempArray[j].originSubtotal)/2;
      secondSaving += tempArray[j].originSubtotal;
    }
  }
  return secondSaving;
}
/*console.log(calculateSecondSaving(a3,allPromotions));
let a5 = calculateSecondSaving(a3,allPromotions);*/

//得到最优惠节省
function getBestSaving(firstSaving,secondSaving) {
  let bestSaving = (firstSaving > secondSaving) ? secondSaving : firstSaving;
  if(firstSaving = secondSaving){
    bestSaving = firstSaving;
  }
  return bestSaving;
}
/*console.log(getBestSaving(a4,a5));
let a6 = getBestSaving(a4,a5);*/

//计算总计
function calculateTotal(originSubtotalList,bestSaving) {
  let total = 0;
  let st = 0;
  for(let i=0;i<originSubtotalList.length;i++){
    st += originSubtotalList[i].originSubtotal;
  }
  total = st - bestSaving;
  return total;
}
/*console.log(calculateTotal(a3,a6));*/

//输出
function print(originSubtotalList,bestSaving,total) {
  console.log("=============　订餐明细　=============");
  for(let i=0;i<originSubtotalList.length;i++){
    console.log(originSubtotalList[i].name+" x "+originSubtotalList[i].count
                 +" = "+originSubtotalList[i].originSubtotal);
  }
  console.log("-----------------------------------");
  if(tag === 1){
    console.log("使用优惠：\n"+"满30减6元，省6元");
  }
  if(tag === 2){
    console.log("使用优惠：\n"+"指定菜品半价"+","+"省"+ bestSaving +"(元)");
  }
  console.log("-----------------------------------");
  console.log("总计"+total+"(元)");
  console.log("===================================");
}

//主调
function bestCharge(selectedItems) {
  let ItemAndCount = formatItems(selectedItems);
  let cartItems = matchAllItems(ItemAndCount,allItems);
  let originSubtotalList = calculateOriginSubtotal(cartItems);
  let firstSaving = calculateFirstSaving(originSubtotalList,allPromotions);
  let secondSaving = calculateSecondSaving(originSubtotalList,allPromotions);
  let bestSaving = getBestSaving(firstSaving,secondSaving);
  let total = calculateTotal(originSubtotalList,bestSaving);
  print(cartItems,bestSaving,total);
}
console.log(bestCharge(selectedItems));
