function bestCharge(selectedItems) {
  let cartItemsIds = getItemsId(cartTags);
  let mergeCartFoods = mergeCartAmount(cartItemsIds);
  let cartItems = getCartItems(mergeCartFoods);
  let cartItemsSubtotals = caculateSubtotal(cartItems);
  let ItemsTypes = matchItemsType(cartItemsSubtotals);
  let denefitAllItems = denefitAllItemsType(ItemsTypes);
  let benefitItemsSubtotal = caculateBenefitSubtotal(ItemsTypes);
  let benefitTotal = caculateBenefitTotal(benefitItemsSubtotal);
  let savedMoney = caculateSavedMoney(benefitItemsSubtotal)
}
let shopItems = loadAllItems();
let promotions = loadPromotions();
bestCharge(selectedItems);



function getItemsId(selectedItems) {
  return selectedItems.map(function (tag) {
    let info = tag.split(" x ");
    return {
      id:info[0],
      amount:parseFloat(info[1])
    }
  });
}
function mergeCartAmount(cartItemsIds) {
  let mergeCartItems = [];
  for(let i = 0;i<cartItemsIds.length;i++){
    let exist = mergeCartItems.find(function (item) {
      return (cartItemsIds[i].id===item.id);
    });
    if(exist){
      exist.amount +=cartItemsIds[i].amount;
    }else{
      mergeCartItems.push(Object.assign({},cartItemsIds[i]));
    }
  }
  return mergeCartItems;
}
function getCartItems(mergeCartItems) {
  let cartItems = [];
  for(let i = 0;i<mergeCartItems.length;i++){
    let exist = shopItems.find(function (item) {
      return (item.id===mergeCartItems[i].id);
    });
    if(exist){
      cartItems.push(Object.assign({},exist,{amount:mergeCartItems[i].amount}));
    }
  }
  return cartItems;
}
function caculateSubtotal(cartItems) {
  let cartItemsSubtotals = [];
  for(let item of cartItems){
    cartItemsSubtotals.push(Object.assign({},item,{subtotal:item.price*item.amount}));
  }
  return cartItemsSubtotals;
}
function matchItemsType(cartItemsSubtotal) {
  let ItemsTypes = [];
  for(let i = 0;i<promotions.length;i++){
    if (promotions[i].items) {
      for(let item of cartItemsSubtotal) {
          let exist = promotions[i].items.find(function (id) {
            return id === item.id;
          });
          if (exist) {
            ItemsTypes.push(Object.assign( item, {type: promotions[i].type}));
          } else {
            ItemsTypes.push(Object.assign( item));
          }
      }
    }
  }
  return ItemsTypes;
}
function denefitAllItemsType(ItemsTypes) {
  let denefitAllItems = [];
    for (let i = 0; i < promotions.length; i++) {
      if (promotions[i].items == ""|| promotions[i].items ==undefined) {
        for(let item of ItemsTypes) {
          denefitAllItems.push(Object.assign(item, {type1: promotions[i].type}));
        }
      }
    }
    return denefitAllItems;

}
function caculateBenefitSubtotal(ItemsTypes){
 // let benefitItemsSubtotal = [];
  return ItemsTypes.map(function (item) {
    if(item.type){
      return Object.assign({},item,{benefitSubtotal:item.subtotal/2});
    }else{
      return Object.assign({},item);
    }
  });
}
function caculateBenefitTotal(benefitItemsSubtotal) {
  let benefitTotal = 0;
  for(let item of benefitItemsSubtotal){
    if(item.type) {
      benefitTotal += item.benefitSubtotal;
    }else{
      benefitTotal += item.subtotal;
    }
  }
  return benefitTotal;
}

function caculateSavedMoney(benefitItemsSubtotal){
  let savedMoney = 0;
  let total = 0;
  for(let item of benefitItemsSubtotal){
    total += item.subtotal;
    if(item.type){
      savedMoney = item.subtotal-item.benefitSubtotal;
    }
  }
  if(total>30&&savedMoney<=6) {
    savedMoney = 6;
  }
  return savedMoney;
}
function takeOutfood(denefitAllItems){
  let savedMoney = 0;
  let total = 0;
  for(let item of denefitAllItems){
    total += item.subtotal;
    if(item.type){
      savedMoney = item.subtotal-item.benefitSubtotal;
    }
  }
  if(total>30&&savedMoney<=6) {
    for(let item of denefitAllItems) {
      return "============= 订餐明细 ============="+"<br>";
    }
  }


}

