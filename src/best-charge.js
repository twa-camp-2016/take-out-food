'use strict';
const ids =
["ITEM0001 x 1",
  "ITEM0013 x 2",
  "ITEM0022 x 1"
];

function formattedIds(ids) {
  let result = [];
  for(let id of ids){
    if(id.indexOf('*')===-1){
      result.push({id:ids,count:1});
    }else{
      let temps = id.split('*');
      reuslt.push({id:parseInt(temps[0]),count:temps[1]})

    }
  }
  return result;
}

function getExistElementByIds(array,id) {
  for(let formattedAllId of array){
    if(formattedId.id ===id){
      return countId;
    }
  }
  return null;

}
let formattedAllId = formattedIds(ids);
function countIds(formattedAllIds) {
  let result = [];
  let countId = 0;
  for (let formattedAllId of formattedAllIds){
    let countId = getExistElementByIds(result,formattedAllId.id);
  }if (countId === null){
    result.push({id:formattedAllId.id,count:formattedAllId.count});
  }else{
    result.push({id:formattedAllId.id,count:countId});
  }
  countId += formattedAllId.count;
  return result;
}

let countedAllIds =countedIds (countIds);
let allItems =loadAllItems();

function buildAllItems(allItems,countedAllIds) {
  let result = [];
  let item = getExistElementByIds(result,countedIds);
  for(allItem of allItems){
    let cartItem ={
      id:item.id,
      name:item.name,
      price:item.price,
      count:item.count
    }
  }
  result.push(carItem);
  return result;
}
let promotions = loadPromotions();
function promotedAllItems (cartItems){
  let result = [];
  let hasPromoted = [];
  for(let cartItem of cartItems){
    let currentPromotion = hasPromoted;
    let haspromoted =false;
    let promotion = getExistElementByIds(cartItems,promotions);
      if(promotion.id ===id){
        haspromoted = ture;
        if(promotion.type = haspromoted[0]){
         let  countPrice = cartItem.count *cartItem.price;
          if(countPrice>30&&hasPromoted){
            let saved= 30;
            let payPrice = countPrice - 30;

          }
        }else{
          let saved = cartItem.count *cartItem.price*0.5;
          let payPrice = cartItem.count *cartItem.price*0.5;
        }
      }

  }
  result.push({
    id :cartItem.id,
    name:cartItem.name,
    price:cartItem.price,
    count:cartItem.count,
    payPrice,
    saved,
  });
  return result;
}

function getCaculateAllItems(promotedAllItems){
  let caculatePrice;
  for(let promotedAllItem of promotedAllItem){
    let  catalPayptice;
     caculatePrice += cartItem.payPrice;
    saved += cartItem.saved;

  }
  return{totalPayprice,saved
  };
}





function bestCharge(selectedItems) {
  return /*TODO*/;
}
