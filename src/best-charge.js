let ids = [
  "ITEM0001 x 1",
  "ITEM0013 x 2",
  "ITEM0022 x 1"
];

function getCountedIds(ids) {
  let result = [];
  for (let id of ids) {
    let temps = id.split('x');
    result.push({id: temps[0], count: parseInt(temps[1])});
  }
  return result;
}

function getExistById(array, id) {
  let result = [];
  for (let element of array){
    if(element.id === id){

      return element;
    }
  }
  return null;
  // return array.map((item)=> {
  //   if (item.id === id) {
  //     return item;
  //   }else {
  //     return null;
  //   }
  // });
  console.info(element);
}
getExistById(allItems,'ITEM0001');

function getBuyedItems(countedIds, allItems) {
  let result = [];
  for (let countedId of countedIds) {
    let item = getExistById(allItems, countedId.id);

    let buyedItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      count: countedId.count
    }
    result.push(buyedItem);
  }
  console.info(result);
  return result;
}

function getPromotionItems(buyedItems, promotions) {
  let result = [];

  for (let buyedItem of buyedItems){
    let currentPromotion = promotions[1];
    let element = getExistById(promotions[1].items, buyedItem.id);
    let promotionItem = {
      id: element.id,
      name: element.name,
      price: element.price,
      count: buyedItem.count,
      type: element.type
    }
    result.push(promotionItem);
  }
  return result;
}

function hasPromotion(promotions, type) {
  let hasPromotion = false;
  for (let promotion of promotions){
    if(promotion.type === type){
      return hasPromotion = true;
    }
  }
  return hasPromotion;
}

function caculatePromotedItems(promotionItems) {
  let result = [];
  let saved = 0;
  for (let promotionItem of promotionItems){
    if(promotionItem.type === '指定菜品半价'){
      saved = promotionItem.price * 0.5 * promotionItem.count;
    }else{
      let price = promotionItem.price * promotionItem.count;
      if(price > 30){
        saved = 6;
      }
    }
    let payPrice = promotionItem.price * promotionItem.count - saved;
    let itemPrice = {
      id: promotionItem.id,
      name: promotionItem.name,
      price: promotionItem.price,
      count: promotionItem.count,
      type: promotionItem.type,
      payPrice,
      saved
    }
    result.push(itemPrice);
  }
return result;
}

function getTotalPrices(itemPrices) {
  let totalPrices = {
    totalPayPrice: 0,
    totalSaved: 0
  }

  for(let itemPrice of itemPrices){
    totalPrices += itemPrice.payPrice;
    // totalSaved += itemPrice.saved
  }
  return totalPrices;
}

function buildReceipts(itemPrices, totalPrices) {
  let receipts = [];
  for (let itemPrice of itemPrices){
    receipts.push({
      name: itemPrice.name,
      count: itemPrice.count,
      type: itemPrice.type,
      payPrice:itemPrice.payPrice,
      saved:itemPrice.saved
    })
  }
  return [
    receipts,
    {totalPrice: totalPrices.totalPayPrice}
  ];

}

function bestCharge(ids) {
  let countedIds = getCountedIds(ids);
  let buyedItems = getBuyedItems(countedIds, allItems);
  let promotionItems = getPromotionItems(buyedItems, promotions);
  let itemPrices = caculatePromotedItems(promotionItems);
  let totalPrices = getTotalPrices(itemPrices);
  let receipts = buildReceipts(itemPrices, totalPrices);

}




