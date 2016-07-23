let selectedItems = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
let allItems = loadAllItems();
let allPromotions = loadPromotions();
function bestCharge(selectedItems) {
  let itemAmounts = despiteItemsAmount(selectedItems);
  let cartItems = matchCartItems(itemAmounts);
  let promotedTypes = matchCartItems(cartItems);
  let subtotals = calculateSubtotals(promotedTypes);
  let alltotals = calculateAlltotals(subtotals);
  let proTotal1 = calculatePromotePrice_one(alltotals);
  let proTotal2 = calculatPromotePrice_two(subtotals);
  let finalTotal = chooseBest(proTotal1,proTotal2);
  let proValue = alltotals-finalTotal;
  console.log("==========定餐明细=========");
  for (let i = 0; i < subtotals.length; i++) {
    console.log(subtotals[i].name + " " + "x" + " " + subtotals[i].amount+" "+"="+" "+subtotals[i].subtotal+"(元)"+"\n");
    console.log("使用优惠："+"\n" + "-----------------------");
    if (finalTotal === proTotal1) {
      console.log(subtotals[i].type + "(" + subtotals[i].name + ")" + "," + "省"+proValue+"元"+"\n"+ "------------------------------------");
    }
  }
  console.log("总计：" + finalTotal + "\n");
}
bestCharge(selectedItems);

function despiteItemsAmount(selectedItems){
  return selectedItems.map(function(item){
    let info = item.split(" x ");
    return {
      id:info[0],
      amount:parseFloat(info[1]) || 1
    };
  });
}

function matchCartItems(itemAmounts){
  let cartItems = [];
  for(let i=0;i<itemAmounts.length;i++){
      for(let j=0;j<allItems.length;j++){
   if(itemAmounts[i].id === allItems[j].id){
    cartItems.push(Object.assign({},allItems[j],{amount:itemAmounts[i].amount}));
      }
    }
  }
  return cartItems;
}

function mergePromoteTypes(cartItems){
  let promotedTypes = [];
  for(let i=0;i<cartItems.length;i++){
    promotedTypes.push(Object.assign({},cartItems[i],{type:"满30减6元"}));
    for(let j=0;j<allPromotions.length;j++){
      let itemCodes = allPromotions[j].items;
      if(itemCodes){
      for(let k=0;k<itemCodes.length;k++) {
        if (promotedTypes[i].id === itemCodes[k]) {
          promotedTypes[i].type = "指定菜品半价";
          }
        }
      }
    }
  }
  return promotedTypes;
}

function calculateSubtotals(promotedTypes){
  let subtotals = [];
  for(let i=0;i<promotedTypes.length;i++){
    subtotals.push(Object.assign({},promotedTypes[i],{subtotal:(promotedTypes[i].amount)*(promotedTypes[i].price)}))
  }
  return subtotals;
}


function calculateAlltotals(subtotals){
  let alltotals = 0;
  for(let i=0;i<subtotals.length;i++){
    alltotals += subtotals[i].subtotal;
  }
  return alltotals;
}

function calculatePromotePrice_one(alltotals){
  let proTotal1 = 0;
  if(alltotals > 29){
     proTotal1 = alltotals - 6;
}
return proTotal1;
}

function calculatPromotePrice_two(subtotals){
  let proTotal2 = 0;
  for(let i=0;i<subtotals.length;i++){
    if(subtotals[i].type === "指定菜品半价"){
      subtotals[i].subtotal = (subtotals[i].price/2)*subtotals[i].amount;
    }else{
      subtotals[i].subtotal = (subtotals[i].price)*subtotals[i].amount;
    }
    proTotal2 += subtotals[i].subtotal;
  }
  return proTotal2;
}

function chooseBest(proTotal1,proTotal2){
  let finalTotal = 0;
  if(proTotal1>proTotal2){
    finalTotal = proTotal2;
  }else if(proTotal1<proTotal2){
    finalTotal = proTotal1;
  }else{
    finalTotal = proTotal1;
  }
  return finalTotal;
}

