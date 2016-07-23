let tags = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
function getFormattedTags(tags) {
  let result = [];
  for (let tag of tags) {
    let temp = tag.split(' x ');
    result.push({id: temp[0], count: parseInt(temp[1])});
  }
  return result;
}
function loadAllItems() {
  let allItems = [{
    id: 'ITEM0001',
    name: '黄焖鸡',
    price: 18.00
  }, {
    id: 'ITEM0013',
    name: '肉夹馍',
    price: 6.00
  }, {
    id: 'ITEM0022',
    name: '凉皮',
    price: 8.00
  }, {
    id: 'ITEM0030',
    name: '冰锋',
    price: 2.00
  }];
  return allItems;
}
function getEixtItemById(array,id) {
  return array.find((element) => element.id === id);
}
function getCartItems(allItems, formattedTags) {
  let result = [];
  for (let formattedTag of formattedTags) {
    let item = getEixtItemById(allItems, formattedTag.id);
    let cartItems = {
      id: item.id,
      name: item.name,
      price: item.price,
      count: formattedTag.count
    };
    result.push(cartItems);
  }
  return result;
}
function loadPromotions(){
  return [{
    type: '满30减6元'
  }, {
    type: '指定菜品半价',
    items: ['ITEM0001','ITEM0022']
  }];
}
function getPromotionItems(promotions, cartItems){
  let result = [];
  for (let promotion of promotions) {
     for (let cartItem of cartItems){
       let saved = 0;
       let payPrice =  cartItem.price*cartItem.count;
      if(promotion.type = '满30减6元'&& payPrice>=30){
           saved = 6;
       }if(promotion.type = '指定菜品半价'&& cartItem.id === promotion.items){
         saved =payPrice*0.5;
       }
      result.push({
        id: cartItem.id,
        name: cartItem.name,
        price: cartItem.price,
        count: cartItem.count,
        payPrice,
        saved,
      });
    }
  }return result;
}


function printReceipt(tags) {
  let formattedTags = getFormattedTags(tags);
  let allItems = loadAllItems();
  let cartItems = getCartItems(allItems, formattedTags);
  let promotions = loadPromotions();
  let promotionItems = getPromotionItems(promotions, cartItems);
  return promotionItems;
}
console.info(printReceipt(tags));

// function bestCharge(selectedItems) {
//   return /*TODO*/;
// }
