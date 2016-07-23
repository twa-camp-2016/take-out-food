// function bestCharge(selectedItems) {
//   return /*TODO*/;
// }

function buildCartItems(tags) {
  const items = loadAllItems();
  let cartItems = [];

  for(const tag of tags){
    const tagArray = tag.split(' x ');
    const id = tagArray[0];
    const count = parseFloat(tagArray[1]);

    let item = items.find(item => item.id == id);
    let originCost = item.price*count;

    cartItems.push({item,count,originCost});
  }

  return cartItems;
}

function buildOriginReceiptItems(cartItems) {
  let originTotal = 0;
  cartItems.forEach((cartItem) => {
    originTotal += cartItem.originCost;
  });
  return {cartItems,originTotal};
}

function getPromotionType(receiptItems) {
  let promotions = loadPromotions();
  let halfPriceItems = [];

    for (let cartItem of receiptItems.cartItems){
      promotion =  promotions.find((promotion) => {
        if(promotion.items && promotion.items.includes(cartItem.item.id)){
          halfPriceItems.push(cartItem);
          return promotion;
        }
      });
    }
  if(promotion){
    return{promotionType:promotion.type,halfPriceItems:halfPriceItems}
  }else if(receiptItems.originTotal<30){
    return{promotionType:undefined,originTotal:receiptItems.originTotal}
  }
}

function discount(promotion) {
  let save = 0
  const type = promotion.promotionType;
  if(type === '指定菜品半价'){
    for(let half of promotion.halfPriceItems){
      save += half.originCost/2;
    }
  }
  return save;
}

function chooseCharge(originReceiptItems) {
  const promotion = getPromotionType(originReceiptItems);
  const save = discount(promotion);

  let total =originReceiptItems.originTotal - save;

  let names = promotion.halfPriceItems.map((halfItem) => {
    return halfItem.item.name;
  });

  return {
    originReceiptItems:originReceiptItems,
    promotionMessage:{
      promotionType:promotion.promotionType,
      names:names
    },
    save:save,
    total:total
  }
}
