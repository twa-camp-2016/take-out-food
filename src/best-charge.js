function bestCharge(selectedItems) {
  let countIdItems = getCountIdItems(selectedItems);
  let allItems = loadAllItems();
  let informationItems = getInformationItems(countIdItems, allItems);
  let promotions = loadPromotions();
  let promotedItems = buildPromotedItems(informationItems, promotions);
  let totalPrice = calculatePrice(promotedItems);
  let receiptModel = buildReceiptModel(promotedItems, totalPrice);
  return buildReceiptString(receiptModel, promotions);
}
function getCountIdItems(selectedItems) {
  return selectedItems.map((selectedItem) => {
    let [id,count] = selectedItem.split(' x ');
    return {
      id,
      count: parseInt(count)
    }
  })
}
function _getExistElementById(arrays, id) {
  return arrays.find((array) => array.id === id);
}
function getInformationItems(countIdItems, allItems) {
  return countIdItems.map(({id, count}) => {
    let {name, price} = _getExistElementById(allItems, id);
    return {id, name, price, count};
  })
}
function buildPromotedItems(informationItems, promotions) {
  let currentPromotion11 = promotions.find((promotion) => promotion.type === '指定菜品半价');
  let totalSaved = 0;
  let totalPrice = 0;
  let promotedInfos = informationItems.map((informationItem) => {
    let hasPromted = currentPromotion11.items.includes(informationItem.id);
    let saved = hasPromted ? informationItem.count * informationItem.price / 2 : 0;
    let payPrice = informationItem.price * informationItem.count - saved;
    return Object.assign({}, informationItem, {payPrice, saved})
  });
  for (let promotedInfo of promotedInfos) {
    totalPrice += promotedInfo.payPrice;
    totalSaved += promotedInfo.saved;
  }
  let price = totalPrice + totalSaved;
  if (totalSaved >= 6) {
    return {
      promotedInfos,
      promotedType: '指定菜品半价'
    };
  } else if (price > 30 && (totalPrice < 6 || totalPrice > 0)) {
    let promotedInfos = informationItems.map((informationItem) => {
      let payPrice = informationItem.price * informationItem.count;
      let saved = 0;

      return Object.assign({}, informationItem, {payPrice, saved})
    });
    return {
      promotedInfos: promotedInfos,
      promotedType: '满30减6元'
    }
  } else {
    let promotedInfos = informationItems.map((informationItem) => {
      let payPrice = informationItem.price * informationItem.count;
      let saved = 0;
      return Object.assign({}, informationItem, {payPrice, saved})
    });
    return {
      promotedInfos: promotedInfos,
      promotedType: 'NO_PROMOTED'
    }
  }
}
function calculatePrice(promotedItems) {
  //console.log(promotedItems);
  return promotedItems.promotedInfos.reduce((result, {payPrice, saved}) => {
    result.totalPayPrice += payPrice;
    result.totalSaved += saved;
    return result;
  }, {totalPayPrice: 0, totalSaved: 0})
}
function buildReceiptModel(promotedItems, totalPrice) {
  return Object.assign({},promotedItems,{
      totalPayPrice: totalPrice.totalPayPrice,
      totalSaved: totalPrice.totalSaved})
}
function buildReceiptString(receiptModel,promotions) {
  let lines = ['============= 订餐明细 ============='];
  let savedItems = [];
  for(let {name,count,price} of receiptModel.promotedInfos){
    let line = `${name} x ${count} = ${count*price}元`;
    lines.push(line);
  }
  lines.push('-----------------------------------');
  console.log(receiptModel.promotedType);
  if(receiptModel.promotedType === '指定菜品半价') {
    lines.push('使用优惠:');
    let currentPromted = promotions.find((promotion) => promotion.type === '指定菜品半价');
    for(let myItems of receiptModel.promotedInfos){
      let isExist = currentPromted.items.includes(myItems.id);
      if(isExist){
        savedItems.push(myItems.name);
      }
    }
    let myDiscountName = savedItems.join('，');
    lines.push(`指定菜品半价(${myDiscountName})，省${receiptModel.totalSaved}元`);
    lines.push('-----------------------------------');
  }else if(receiptModel.promotedType === '满30减6元'){
    receiptModel.totalPayPrice = receiptModel.totalPayPrice-6;
    lines.push('使用优惠:');
    lines.push('满30减6元，省6元');
    lines.push('-----------------------------------');
  }

  lines.push(`总计：${receiptModel.totalPayPrice}元`);
  lines.push('===================================');

  return lines.join('\n');

}
