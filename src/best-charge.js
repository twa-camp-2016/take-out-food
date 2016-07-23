function formatInput(input) {
  return input.map(function (tags) {
    let temp = tags.split('x');
    return {
      id:temp[0].trim(),
      count:parseInt(temp[1])
    }
  });
}
function  mergeCartItems(cartItems) {
  let allItems=loadAllItems();
  let cartItemsInfo=[];
  let j;
  for(let i=0;i<cartItems.length;i++) {
    for (j of allItems) {
      if (j.id === cartItems[i].id) {
        break;
      }
    }
    cartItemsInfo.push(Object.assign({},j, {count: cartItems[i].count}));
  }
  return cartItemsInfo;
}

function  getSubtotal(cartItemsInfo) {
  let cartItemsSub=[];
  for(let i=0;i<cartItemsInfo.length;i++){
    sub=cartItemsInfo[i].count*cartItemsInfo[i].price;
    cartItemsSub.push(Object.assign({},cartItemsInfo[i],{subtotal:sub}));
  }
  return cartItemsSub;
}
function mergePromotionsInfo(itemsPromotions){
  let cartItemsSub=getSubtotal(input);
  let cartItemsPromotionsInfo=[];
  let j,k;
  for (let i = 0; i < cartItemsSub.length; i++) {
    let existItem = 0;
    for (j of itemsPromotions) {
      for (k=0;k<j.items.length;j++){
        if (j.items[k]=== cartItemsSub[i]) {
          existItem = 1;
          break;
        }
    }
    }
      if(existItem){
        cartItemsPromotionsInfo.push(Object.assign({},cartItemsSub[i],{type:j.type}));
      }
      else{
        cartItemsPromotionsInfo.push(Object.assign({},cartItemsSub[i]));
      }
    }
  return cartItemsPromotionsInfo;
}
function getCharge(cartItemsPromotionsInfo){
  let cartItemsCharge=[];
  for(let i=0;i<cartItemsPromotionsInfo.length;i++){
    let subSave=0;
    if(cartItemsPromotionsInfo[i].type==='指定菜品半价'){
        subSave=cartItemsPromotionsInfo[i].subtotal/2;
    }
    cartItemsCharge.push(Object.assign({},cartItemsPromotionsInfo[i],{subSave:subSave}));
  }
  return cartItemsCharge;
}
function  getTotal(cartItemsCharge) {
  let allSave=0;
  let allTotal=0;
  let total=[];
  for(let i=0;i<cartItemsCharge.length;i++){
    allTotal+=cartItemsCharge[i].subtotal;
    allSave+=cartItemsCharge[i].subSave;
    total.push(Object.assign({},cartItemsCharge[i]));
  }
  if(allTotal>30){
    if(allSave<6){
      allSave=6;
      total.push(Object.assign({},{优惠类型:'满30减6元',save:allSave}));
    }
    else{
      total.push(Object.assign({},{save:allSave,优惠类型:'指定菜品半价',save:allSave}));
    }
  }
  allTotal=allTotal-allSave;
  total.push(Object.assign({},{total:allTotal}));
  return total;
}

function bestCharge(selectedItems) {


  return /*TODO*/;
}
