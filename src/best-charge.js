
function formatTags(selectedItems) {
  return selectedItems.map(function (items){
       let info=items.split(" x ");
       return {
         id:info[0],
         amount:parseInt(info[1])
       }
  });
}

function mergeIds(ids) {
  let amount=[];
  for(let info of ids){
    let exist=amount.find(function (items) {
      return items.id===info.id;
    });
    if(exist){
      exist.amount+=info.amount;
    }else{
      amount.push(Object.assign({},info,{amount:info.amount}));
    }
  }
  return amount;
}

function changeTypes(allPromotions) {
  let withType = [];
  for (let info of allPromotions) {
    for (let i = 0; i < info.items.length; i++) {

        withType.push(Object.assign({},{id: info.items[i]}, {type: info.type}));

    }
    return withType;
  }
}

function getTypeItems(withType,allItems) {
  let typeItems = [];
   for(let info of withType){
     for(let sofo of allItems){
       if(info.id === sofo.id){
         typeItems.push(Object.assign({},sofo,{type:info.type}))
       }
     }
   }
  return typeItems;
}

function getCartItems(typeItems,amount) {
  let cartItems=[];
  for(let info of typeItems){
    for(let sofo of amount){
      if(info.id===sofo.id){
        cartItems.push(Object.assign({},info,{amount:sofo.amount}));
      }
    }
  }
  return cartItems;
}

function getTwoWayCost(cartItems) {
  let twoWayCost=[];
  for(let i=0;i<cartItems.length;i++){
    let cost_1=0;
    let cost_2=0;
    if(cartItems[i].type === '指定菜品半价'){
      cost_1 += (cartItems[i].price * cartItems[i].amount / 2);
      cost_2 += (cartItems[i].price * cartItems[i].amount );
      twoWayCost.push(Object.assign({},cartItems[i],{cost_1:cost_1,cost_2:cost_2}))
    }else{
      cost_2 += (cartItems[i].prince * cartItems[i].amount );
      twoWayCost.push(Object.assign({},cartItems[i],{cost_1:cost_1,cost_2:cost_2}))
    }
  }
  return twoWayCost;
}

function selectCost(twoWayCost) {
  let prmotionCost=[];
  for(let info of twoWayCost){
    if(info.cost_1<=info.cost_2){
      prmotionCost.push(Object.assign({},info,{promotionCost:info.cost_1}));
    }else{
      prmotionCost.push(Object.assign({},info,{promotionCost:info.cost_2}));
    }
  }
  return prmotionCost;
}

function getTotal(promotionCost) {
  let total=0;
  for(let info of promotionCost){
    total += info.cost;
  }
  return total;
}

function getSaveMoney(promotionCost) {
  let saveMoney=0;
  for(let info of promotionCost){
    saveMoney += (info.price * info.amount - info.cost);
  }
  return saveMoney;
}

function print(promotionCost,total,saveMoney) {
console.log(promotionCost+"\n"+total+"\n"+saveMoney);
}

function bestCharge(selectedItems) {
  let  allItems=loadAllItems();
  let  allPromotion=loadPromotions();
  let  ids=formatTags(selectedItems);
  let amount=mergeIds(ids);
  let withTypeItems=changeTypes(allPromotions);
  let typeItems=getTypeItems(withTypeItems,amount);
  let twoWayCost=getTwoWayCost(cartItems);
  let promotionCost=selectCost(twoWayCost);
  let total=getTotal(promotionCost);
  let saveMoney=getSaveMoney(promotionCost);
  print(promotionCost,total,saveMoney);
}

bestCharge(selectItems);









