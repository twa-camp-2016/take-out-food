function loadAllItems() {
  return [{
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
}
function loadPromotions() {
  return [{
    type: '满30减6元'
  }, {
    type: '指定菜品半价',
    items: ['ITEM0001', 'ITEM0022']
  }];
}
let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];

function bestCharge(inputs) {
  let allItems = loadAllItems();
  let promotions = loadPromotions();
  let formatIds = getFormatIds(inputs);
  // console.log(formatIds);
  let buyItems = getBuyedItems(formatIds, allItems);
  //console.log(buyItems);
  let promotionItems = getPromotItems(buyItems, promotions);
  //console.log(promotionItems);
  let totalPrices = getTotalPrices( promotionItems);
 // console.log(totalPrices);
  let receipt=getReceipt(promotionItems, totalPrices, promotions);
  //console.log(receipt);
  let printReceipt=getStringReceipt(receipt);
  console.log(printReceipt);
}
bestCharge(inputs);
function getFormatIds(inputs) {
  let result = [];
  for (let id of inputs) {
    if (id.includes(" x ")) {
      let temps = id.split(" x ");
      result.push({id: temps[0], count: parseInt(temps[1])});
    }
  }
  return result;
}
function _getExistByBarcode(array, id) {
  return array.find((element) => element.id === id);
}
function getBuyedItems(formatIds, allItems) {
  let result = [];
  for (let formatId of formatIds) {
    let item = _getExistByBarcode(allItems, formatId.id);
    let cartItem = {
      id: formatId.id,
      name: item.name,
      price: item.price,
      count: formatId.count
    }
    result.push(cartItem);
  }
  return result;
}

function getPromotItems(buyItems, promotions) {
  let result = [];
  for (let buyItem of buyItems) {
    let saved = 0;
    let hasPromoted = false;
    let payPrice = 0;
    for (let currentPromotion of promotions) {
     if(currentPromotion.items) {
       for (let id of currentPromotion.items) {
         if (buyItem.id === id) {
           hasPromoted = true;
         }
       }
       if ((hasPromoted) && (currentPromotion.type === '指定菜品半价')) {
         saved = 0.5 * buyItem.price * buyItem.count;
         payPrice = buyItem.count * buyItem.price - saved;
       }
       else{
         payPrice = buyItem.count * buyItem.price;
       }
     }
      // else if ((hasPromoted) && (currentPromotion.type === '满30减6元') && (buyItem.pay > 30)) {
      //   payPrice = buyItem.price * buyItem.count - 30;
      // }
    }
    result.push({
      id: buyItem.id,
      count: buyItem.count,
      name: buyItem.name,
      price: buyItem.price,
      type: buyItem.price,
      payPrice,
      saved
    });
  }
  return result;
}
function getTotalPrices( promotionItems) {
  var result={
    totalPayPrice:0,
    totalSaved:0
  }
  for(let element of  promotionItems){
    result.totalPayPrice+=element.payPrice;
    result.totalSaved+=element.saved;
  }
  return result;
}
function getReceipt(promotionItems, totalPrices, promotions) {

  let receiptItems = [];
  let hasPromoted = false;
  let currentPromotion;
  let payPrice;
  for (let element of promotionItems) {
    for (let currentPromotion of promotions) {
      if (currentPromotion.items) {
        for (let id of currentPromotion.items) {
          if (element.id === id) {
            hasPromoted = true;
          }
        }
      }
      if ((hasPromoted) && (currentPromotion.type === '指定菜品半价')) {
        receiptItems.push({
          name: element.name,
          price: element.price,
          count: element.count,
          payPrice: element.payPrice,
          saved: element.saved
        });
      } else if ((hasPromoted) && (currentPromotion.type === '满30减6元') && totalPrices > 30) {
        receiptItems.push({
          name: element.name,
          unit: element.unit,
          price: element.price,
          count: element.count,
          payPrice: element.payPrice * 0.5,
          saved: element.payPrice * 0.5
        });
      }
    }
  }
    if (hasPromoted) {
      return {
        receiptItems,
        totalPayPrice: totalPrices.totalPayPrice,
        totalSaved: totalPrices.totalSaved
      }
    }
    else {
      return {
        receiptItems,
        totalPayPrice: totalPrices.totalPayPrice,
      }
    }
  }

function getStringReceipt(receipt){}
