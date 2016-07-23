function getFormattedTags(tags) {

  return tags.map((tag)=> {
    let temps = tag.split('x');
    let temp=temps[0].substring(0,temps[0].length-1);
    return {id: temp, count: parseInt(temps[1])};
  })
}

function _getExistElementById(array, id) {

  for (let countItem of array) {
    if (countItem.id === id) {
      return countItem;
    }
  }
  return null;
}
function buildCartItems(formattedTags, allItems) {
  return formattedTags.map((formattedTag)=> {


    // console.log(allItems);
    // console.log('['+formattedTag.id+']');
    let item = _getExistElementById(allItems, formattedTag.id);
    // console.log(item);

    return {
      id: formattedTag.id,
      name: item.name,
      price: item.price,
      count: formattedTag.count
    }

  })
}

function buildPromotedItems(carItems, promotions) {
  let subPromotion = promotions[0];
  console.log(subPromotion);
  let halfPromotion = promotions[1];
  console.log(halfPromotion);

  let result = carItems.map((cartItem)=> {
    let totalPrices = cartItem.count * cartItem.price;
    // console.log(totalPrices);
    if (subPromotion) {
      var subPromoted = 6;
      return subPromoted;
    }
    if (halfPromotion) {
      var halfPrice = totalPrices * 0.5;
      return halfPrice;
    }
    
    if (subPromoted != halfPrice) {
      var saved = subPromoted > halfPrice ? subPromoted : halfPrice;
      return saved;
    } else {
      var saved = subPromoted;
      return saved;
    }
    let payPrice = totalPrices - saved;
    return Object.assign({}, cartItem, {payPrice, saved});
    // console.log(cartItem);
  })

  return result;

  // return carItems.map((carItem)=> {
  //   let totalPrices = carItem.count * carItem.price;
  //   if(subPromotion){
  //     let hasPromoted=totalPrices-6;
  //     return hasPromoted;
  //   }else{
  //     var halfPrice = currentPromotion.items.map((promotedId)=> {
  //       if (found.id === promotedId) {
  //         var halfSaved = totalPrices * 0.5;
  //         return halfSaved;
  //       }
  //       return halfPrice;
  //     let saved = subSaved > halfPrice ? subSaved : halfPrice;
  //     let payPrice = totalPrices - saved;
  //     return Object.assign({}, carItem, {payPrice, saved});
  //
  // })
}

function calculateTotalPrice(promotedItems) {
  let result = {
    totalPayPrices: 0,
    totalSaved: 0
  };

  return promotedItems.map((promotedItem)=> {
    result.totalPayPrices += promotedItem.payPrice;
    result.totalSaved += promotedItem.saved;
  })

}
function buildReceipt(promotedItems,totalPrices) {

}


function bestCharge(tags) {

  let formattedTags = getFormattedTags(tags);

  let allItems = loadAllItems();
  let cartItems = buildCartItems(formattedTags, allItems);
  // console.log(cartItems);
  let promotions = loadPromotions();
  let promotedItems = buildPromotedItems(cartItems, promotions);
  let totalPrices = calculateTotalPrice(promotedItems);

}
tags = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
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
  },
    {
      type: '指定菜品半价',
      items: ['ITEM0001', 'ITEM0022']
    }];
}


bestCharge(tags);

