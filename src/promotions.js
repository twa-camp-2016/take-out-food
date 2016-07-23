function loadPromotions() {
  return [{
    type: '满30减6元'
  }, {
    type: '指定菜品半价',
    items: ['ITEM0001', 'ITEM0022']
  }];
}
let originalTotal=getOriginalTotal(cartItems);
let itemsOneDiscount=getOnePromotionItems(cartItems,originalTotal);
let itemsTwoDiscount=getTwoPromotionItems(cartItems,originalTotal);
let itemsDiscount=getPromotionItems(itemsOneDiscount,itemsTwoDiscount);
let total=getTotal(itemsDiscount);
