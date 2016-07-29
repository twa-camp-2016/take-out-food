function bestCharge(cartItems) {
  let allItems = loadAllItems();
  let allPromotions = loadPromotions();
  let formatedCart = formatCart(cartItems);
  let selectedItem = selectItems(allItems,formatedCart);
  let itemTotals = subTotal(selectedItem);
  let theTotals = prePromotionTotal(itemTotals);
  let firstPro = firstPromotion(allPromotions,theTotals);
  let matchedProtion = matchPromotion(allPromotions,itemTotals)
  let secondPro = secondPromotion(matchedProtion,theTotals);
  let selectedProtion = selectPromotion(firstPro,secondPro,allPromotions);
  let totals = total(selectedProtion,theTotals);
  return print(selectedProtion,itemTotals,totals);
}

function formatCart(cartItems){
  let formatedCart = [];
  cartItems.map(function(item) {
    let splitItem = item.split(' x ');
    formatedCart.push(Object.assign({},{id:splitItem[0],count:parseInt(splitItem[1])}));
  })
  return formatedCart;
}
function selectItems(allItems,formatedCart){
  let selectedItem = [];
  for(let i=0;i<allItems.length;i++){
    let exist = formatedCart.find(function(item){
      return item.id === allItems[i].id;
    })
    if(exist){
      allItems[i].count = exist.count;
      selectedItem.push(allItems[i]);
    }
  }

  return selectedItem;
}

function subTotal(selectedItem){
  let itemTotals = [];
  selectedItem.map(function(item){
    item.subTotals = item.price*item.count;
    itemTotals.push(item);
  });

  return itemTotals;
}
function prePromotionTotal(itemTotals){
  let theTotal = 0;
  itemTotals.map(function(item){
    theTotal+=item.subTotals;
  });
  return theTotal;
}

function firstPromotion(allPromotions,theTotal){
  let firstProInfo = allPromotions[0].type;
  return (theTotal>30)?6:0;
}

function matchPromotion(allPromotions,itemTotal){
  let matchedPromotion = [];
  itemTotal.map(function(item){
    allPromotions[1].items.map(function(id){
      if(id === item.id){
        item.type = allPromotions[1].type;
        matchedPromotion.push(item);
      }
    });
  });
  return matchedPromotion;
}
function secondPromotion(matchedPromo,theTotal){
  let secondTotal = 0
  matchedPromo.map(function(item){
    if(item.type ==='指定菜品半价'){
      item.promoSubTotal = item.subTotals/2;
      secondTotal += item.promoSubTotal;
    }
  });
  return secondTotal;
}

function selectPromotion(firstPro,secondPro,allPromotion){
  let selectedPro = {};

  if(firstPro>secondPro){
    selectedPro = Object.assign({},{type:allPromotion[0].type,promo:firstPro});
  }else if(secondPro>0){
    selectedPro = Object.assign({},{type:allPromotion[1].type,promo:secondPro});
  }else{
    selectedPro = null;
  }
  return selectedPro;

}

function total(selectedPro,theTotal){
  if(selectedPro){
    return theTotal-selectedPro.promo;
  }else{
    return theTotal;
  }
}

function print(selectedProtion,matchedPromotion,totals){
  let strInfo = '';
  strInfo = '\n'+'============= 订餐明细 ============='+'\n';

  matchedPromotion.map(function(item){
    strInfo += item.name +' x '+item.count+' = '+parseInt(item.subTotals)+'元'+'\n';
  });
  strInfo += '-----------------------------------'+'\n';
  if(selectedProtion){
    strInfo += '使用优惠:'+'\n';
  }

  let cartName = '';
  for(let i=0;i<matchedPromotion.length;i++){
    if(i===matchedPromotion.length-1 && matchedPromotion[i].type){
      cartName += matchedPromotion[i].name;
    }else if(matchedPromotion[i].type){
      cartName += matchedPromotion[i].name;
      cartName += '，';
    }
  }

  if(selectedProtion && selectedProtion.type === '满30减6元'){
    strInfo += selectedProtion.type+'，省'+parseInt(selectedProtion.promo)+'元'+'\n';
  }else if(selectedProtion && selectedProtion.type === '指定菜品半价'){
    strInfo += selectedProtion.type+'('+cartName+')'+'，省'+parseInt(selectedProtion.promo)+'元'+'\n';
  }else{
    strInfo += '';
  }
  if(selectedProtion){
    strInfo += '-----------------------------------'+'\n';
  }

  strInfo += '总计：'+totals+'元'+'\n';
  strInfo += '===================================';
  return strInfo.trim();
}











