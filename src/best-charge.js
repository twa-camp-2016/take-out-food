function bestCharge(selectedItems){
  let allItems = loadAllItems();
  let allPromotions = loadPromotions();

  let formatTags = formateTags(selectedItems);
  let cartItems = matchId(formatTags,allItems);
  let noProSubItems = noProSubTotal(cartItems);
  let noPrototal = noProTotal(noProSubItems);
  let firstPrototal = firstProTotal(noPrototal,allPromotions[0]);
  let secondProSubItems = getSecondProSubToatl(cartItems,allPromotions[1]);
  let secondPrototal = secondProTotal(secondProSubItems,allPromotions[1]);
  let bestProTypetotal = getBestProTypeTotal(firstPrototal,secondPrototal);
  let promition = getPromotion(bestProTypetotal,noPrototal);
  let proNames = getProNames(cartItems,allPromotions[1]);
  let str = getPrintStr(noProSubItems, proNames, bestProTypetotal,allPromotions,promition);
  return str;
}

function formateTags(userTags){
  return userTags.map(function(tag){
    let parsTag = tag.split('x');
    return {
      id:parsTag[0].trim(),
      count:Number(parsTag[1])
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
  let noProSubItems = [];
  for(let i=0;i<cartItems.length;i++){
    let total = Number(cartItems[i].count) * Number(cartItems[i].price);
    noProSubItems.push(Object.assign({},cartItems[i],{subTotal: total}));
  }
  return noProSubItems;
}
function noProTotal(noProSubItems){

  let total = 0;
  for(let i=0;i<noProSubItems.length;i++){
    total = Number(total)+Number(noProSubItems[i].subTotal);
  }
  return {
    type:'-1',
    total: Number(total)
  };
}
function firstProTotal(noPrototal,firstProType){
  return noPrototal.total<30 ?noPrototal : {
    type:firstProType.type,
    total:Number(noPrototal.total)-6
  }
}
function getSecondProSubToatl(cartItems,secondProType){
  let secondProSubTotal = [];
  for(let i=0;i<cartItems.length;i++){
    let exist =  secondProType.items.find(function(item){
      return item === cartItems[i].id;
    });

    if(exist){
      secondProSubTotal.push(Object.assign({},cartItems[i],{subTotal:0.5*cartItems[i].count*cartItems[i].price}));
    }else{
      secondProSubTotal.push(Object.assign({},cartItems[i],{subTotal:cartItems[i].price*cartItems[i].count}));
    }
  }
  return secondProSubTotal;

}
function secondProTotal(secondProSubItems,secondProType){

  let total = 0;
  for(let i=0;i<secondProSubItems.length;i++){
    total = Number(secondProSubItems[i].subTotal)+Number(total);
  }
  return {
    type:secondProType.type,
    total:Number(total)
  }
}
function getBestProTypeTotal(firstPrototal,secondPrototal){
  return firstPrototal.total<=secondPrototal.total ? firstPrototal : secondPrototal;
}
function  getPromotion(bestProTypetotal,noPrototal){
  return noPrototal.total- bestProTypetotal.total ;
}
function getProNames(cartItems,secondProType){
  let names = [];
  for(let i=0;i<cartItems.length;i++){
    let exist = secondProType.items.find(function(item){
      return item ===cartItems[i].id;
    });
    if(exist){
      names.push(cartItems[i].name);
    }
  }
  return names;
}
function getPrintStr(noProSubItems, proNames, bestProTotal,allPromots,promotion){

  let src = '============= 订餐明细 =============\n';
  for(let i=0;i<noProSubItems.length;i++){
    src += noProSubItems[i].name + ' x ' + noProSubItems[i].count +' = ' +noProSubItems[i].subTotal + '元\n';
  }

  if(bestProTotal.type === allPromots[0].type){
    src += '-----------------------------------\n';
    src += '使用优惠:\n'+bestProTotal.type+'，省'+promotion+'元\n';
  }else if(bestProTotal.type === allPromots[1].type){
    src += '-----------------------------------\n';
    src += '使用优惠:\n';
    src +=bestProTotal.type+'('+proNames[0];
    for(let i=1;i<proNames.length;i++){
      src += '，'+proNames[i];
    }
    src +=')，省'+ promotion + '元\n';
  }

  src += '-----------------------------------\n总计：'+bestProTotal.total+'元';

  return src;
}
