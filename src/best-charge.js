function bestCharge(selectedItems) {
  let allItems = loadAllItems();
  let allPromots = loadPromotions();
  let formteTags = formteTags(selectedItems);
  let cartItems = matchId(formteTags);
  let noProSubItems  = noProSubTotal(cartItems);
  let noProTotal = total(noProSubItems);
  let firstProTotal = firstProTypeTotal(noProTotal,allPromots[0]);
  let proCartItems = matchSecondProType(cartItems,allPromots[1]);
  let secondProTotal = secondProTypeTotal(cartItems);
  let bestProTotal =  getBestTotalType(firstProTotal, secondProTotal);
  let proNames = getProNames(proCartItems);
  let promotion = getPromotion(bestProTotal,noProTotal);
console.log(promotion);
  let src = '============= 订餐明细 =============\n';
  for(let i=0;i<noProSubItems.length;i++){
    src += noProSubItems[i].name + 'x' + noProSubItems[i].count +'=' +noProSubItems.subTotal + '元\n';

  }
  src += '-----------------------------------\n使用优惠:\n';
  src +=bestProTotal.type+'(';
  for(let i=0;i<proNames.length;i++){
    src += proNames[i] + '，';
  }
  src +=')，省'+promotion + '元\n-----------------------------------\n总计：'+bestProTotal+'元';




  return ;
}
function formateTags(userMenuTags){
  return userMenuTags.map(function(tag){
    let parsTag = tag.split("x");
    return {
      id : parsTag[0].trim(),
      count : Number(parsTag[1].trim())
    }
  });
}

function matchId(formteTags,allItems){
  let cartItems = [];
  for(let i=0;i<formteTags.length; i++){
    let exist = allItems.find(function(item){
      return item.id ===formteTags[i].id;
    });
    if(exist){
      cartItems.push(Object.assign({},exist,{count :formteTags[i].count}));
    }
  }
 return cartItems;
}
 function noProSubTotal(cartItems){
   return cartItems.map(function(item){
     let subTotal = item.count * item.price;
     return Object.assign(item,{subTotal : subTotal});
   });
 }

function total(noProSubTotal){
  let total = 0;
  for(let i=0;i<noProSubTotal.length;i++){
    total = Number(noProSubTotal[i].subTotal) + Number(total);
  }
  return total;
}

function firstProTypeTotal(noProSubTotal,firstProType){
  let total = noProSubTotal > 30 ? (noProSubTotal-6) : noProSubTotal;
  return total === noProSubTotal ? {type : '-1',total:total} : {type:firstProType.type, total:total};
}

function matchSecondProType(cartItems,secondProType){
 let proCartItems = [];
  for(let i=0;i<cartItems.length;i++){
    let exist = secondProType.items.find(function(item){
      return item === cartItems[i].id;
    });
    if(exist){
      proCartItems.push(Object.assign({},cartItems[i],{type : secondProType.type}));
    }else{
      proCartItems.push(Object.assign({},cartItems[i],{type : "-1"}));
    }
  }
  return proCartItems;
}

function secondProTypeTotal(proCartItems,secondProType){
  let total = 0;
  for(let i=0;i<proCartItems.length;i++){
      if(proCartItems[i].type === "-1"){
         total += proCartItems[i].count * proCartItems[i].price;
      }else if (proCartItems[i].type === secondProType.type){
        total += proCartItems[i].price * 0.5 *proCartItems[i].count;
      }}
  return {
    type : secondProType.type,
    total:total
  };
}

function getBestTotalType(firstProTotal, secondProTotal){
  return firstProTotal.total < secondProTotal.total ? firstProTotal : secondProTotal;
}

function getProNames(proCartItems){
  let proNames = [];
  for(let i=0;i<proCartItems.length;i++){

    if(!(proCartItems[i].type === "-1")){
        proNames.push(proCartItems[i].name);
    }
  }
  return proNames;
}

function getPromotion(bestProTotal,noProTotal){

  return Number(noProTotal.total) - Number(bestProTotal.total);
}





