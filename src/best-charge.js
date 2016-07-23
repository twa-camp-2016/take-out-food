function bestCharge(inputs) {
  let splitInputs=splitedInputs(inputs);
  let items=loadAllItems();
  let countItems=buildCountItems(splitInputs, items);
  let promotions=loadPromotions();
  let receiptItems=buildReceiptItems(countItems, promotions);
  let receipt=selectpromotion(receiptItems);
 return buildReceiptText(receipt)


//  return /*TODO*/;
}

function splitedInputs(inputs) {
  let splitInputs = [];
  for (let input of inputs) {
    input = input.split('x');
    splitInputs.push(input);
  }
  return splitInputs;
}

function buildCountItems(splitInputs, items) {
  const countItems = [];
  for (const splitInput of splitInputs) {
    const item = items.find(Item=>Item.id === splitInput[0].slice(0, -1));
    countItems.push({item, count: parseFloat(splitInput[1].slice(1, 2))});
  }
  return countItems;
}

function buildReceiptItems(countItems, promotions) {
  const receiptItems = [];
  for (const countItem of countItems) {
    let halfSaved = 0;
    if (buildpromotion(countItem.item.id, promotions) === true) {
      halfSaved = countItem.item.price * countItem.count / 2;
    }
   // let subtotal=0;
    receiptItems.push({countItem, actual: countItem.item.price * countItem.count, halfSaved})
  }

  return receiptItems;
}

function buildpromotion(id, promotions) {

  for (const promotion of promotions) {
    if (promotion.type === '指定菜品半价') {
      for (let i = 0; i < promotion.items.length; i++) {
        if (promotion.items[i] === id) {
          return true;
        }
      }
    }
  }
}


function selectpromotion(receiptItems) {
  let actualTotal = 0;
  let halfSavedTotal = 0;
  let promotion;
  let tatol;
  let saved = 0;
  for (const receiptItem of receiptItems) {
    actualTotal += receiptItem.actual;
    halfSavedTotal += receiptItem.halfSaved;
  }
  if (actualTotal > 30 && 6 > halfSavedTotal) {
    promotion = '满30减6元';
    tatol = actualTotal-6;
    saved = 6;
  } else if (halfSavedTotal != 0) {
    promotion = '指定菜品半价';
    saved = halfSavedTotal;
    tatol = actualTotal - halfSavedTotal;
  } else {
    promotion = undefined;
    tatol = actualTotal;;
    saved = undefined;
  }
  return {receiptItems, promotion, saved, tatol};
}


function buildReceiptText(receipt) {
  let receiptName = '';
  let receiptItemsText = receipt.receiptItems
    .map(receiptItem => {
      const cartItem = receiptItem.countItem;
      return `${cartItem.item.name} x \
${cartItem.count} = \
${cartItem.count * cartItem.item.price}元`;
    })
    .join('\n');
  let receiptPromotion
  if (receipt.promotion === '满30减6元') {
    receiptPromotion = `-----------------------------------
使用优惠:
满30减6元，省6元`

  } else if (receipt.promotion === '指定菜品半价') {
    receiptPromotion = `-----------------------------------
使用优惠:
指定菜品半价(`
    for (const receiptItem of receipt.receiptItems) {

      if (receiptItem.halfSaved != 0) {
        receiptName += receiptItem.countItem.item.name + '，';
      }
    }
    receiptPromotion += `${receiptName.slice(0, -1)})，省${receipt.saved}元`
  } else {
    receiptPromotion = '';
  }
  if (receipt.saved != undefined){
    return `============= 订餐明细 =============
${receiptItemsText}
${receiptPromotion}
-----------------------------------
总计：${receipt.tatol}元
===================================`
}
  else {
    return `============= 订餐明细 =============
${receiptItemsText}
-----------------------------------
总计：${receipt.tatol}元
===================================`;
  }
}

