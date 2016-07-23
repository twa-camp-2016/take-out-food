
function getItemsCount(ids){
  return ids.map(function (item) {
    let temp=item.split(' x ');
     return {
       id:temp[0],count:parseInt(temp[1])
     }
  })
}

function getCartItems(itemscount) {
  let allItems=loadAllItems();
  let cartItems=[];
  for(let item of itemscount){
    let exit=allItems.find(function (temp) {
      return temp.id===item.id;
    })
    if(exit){
      cartItems.push(Object.assign({},exit,{count:item.count}));
    }
  }
  return cartItems;
}

function caculateSubtotal(cartItems) {
  let subtotalItems=[];
  for(let item of cartItems){
    subtotalItems.push(Object.assign({},item,{subtotal:item.price*item.count}));
  }
  return subtotalItems;
}

function getAllItemsPromotions(){
 let promotions=loadPromotions();
 let allpromotions=[];
 for(let item of promotions){
   if(item.items){
   for(let i=0;i<item.items.length;i++)
     allpromotions.push(Object.assign({},{type:item.type,id:item.items[i]}));
   }
   else{
     allpromotions.push(Object.assign({type:item.type}));
   }
 }
 return allpromotions;
}

function getCartItemsPromotion(subtotalItems,allpromotions) {
  let itemspromotions = [];
  for (let temp of allpromotions) {
    if (!temp.id)
      itemspromotions.push(Object.assign({}, {type: temp.type}));
   }
  for (let item of subtotalItems){
        let exit = allpromotions.find(function (temp) {
          return temp.id === item.id;
        })
    if(exit)
        itemspromotions.push(Object.assign({}, item, {type: exit.type}));
    else
        itemspromotions.push(Object.assign({}, item));
  }
  return itemspromotions;
}

function  getOriginalTotal(itemspromotions) {
  let originaltotal=0;
  for(let item of itemspromotions){
    if(item.subtotal)
      originaltotal+=item.subtotal;
  }
  return originaltotal;

}


function  caculatePromotions(itemspromotions) {
  let promotiontype=[];
  for(let item of itemspromotions){
    if(item.type==='满30减6元')
       promotiontype.push(Object.assign({},{type:item.type,savemoney:6}));
    if(item.type==='指定菜品半价')
      promotiontype.push(Object.assign({},{type:item.type,name:item.name,savemoney:item.count*item.price/2}));
    }
  return promotiontype;
}

function getSaveType(promotiontype) {
  let saves = [];
  let chance=[];
  for (let item of promotiontype) {
    let exit = chance.find(function (temp) {
      return temp.type === item.type;
    })
    if (exit) {
      exit.savemoney += item.savemoney;
    }
    else {
      chance.push(Object.assign({}, {type: item.type, savemoney: item.savemoney}));
    }
  }
    return chance;
}

function getBestPromotion(chance) {
  let i=0;
  let best=[];
  for(let j=0;j<chance.length;j++)
    {
      if(chance[i].savemoney<chance[j].savemoney)
          i=j;
    }
  best.push(Object.assign({},chance[i]));
  return best;
}

function getTotal(originaltotal,best) {
  let total;
  for(let item of best) {
    total = originaltotal - item.savemoney;
     }
     return total;
}

function getPromotionsItems(best,itemspromotions) {
  let promotionsnames=[];
  let i=0;
  for(let item of itemspromotions){
      let exit=best.find(function (temp) {
        return item.type===temp.type;
      })
      if(exit)
        promotionsnames[i++]=item.name;
    }
  return promotionsnames;
}



function bestCharge(selectedItems) {
  let itemscount=getItemsCount(inputs);
  let cartItems=getCartItems(itemscount);
  return /*TODO*/;
  }
