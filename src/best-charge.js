function bestCharge(selectedItems) {
  let allItems = loadAllItems();
  let promotions = loadPromotions();

  let items = formatItems(selectedItems);
  let cartItems = getCartItems(items, allItems);
  let subtotalItems = getSubtotal(cartItems);
  let total = getTotal(subtotalItems);
  let halfCutIds = getHalfCutId(promotions);
  let halfCutItems = getHalfCutItems(subtotalItems, halfCutIds);
  let halfCut = calculateHalfCutedTotal(halfCutItems, total);
  let fullCut = calculateFullCutedTotal(total);
  let bestPromotion = getTheBestPromotion(halfCut, fullCut);
  let expectedString = connectString(subtotalItems, halfCutIds, bestPromotion);

  return expectedString/*TODO*/;
}

function formatItems(selectedItems) {
  return selectedItems.map(function (item) {
    let temp = item.split(" x ");

    return {
      id: temp[0],
      amount: parseInt(temp[1])
    }
  });
}

function getCartItems(items, allItems) {
  return items.map(function (item) {
    let exist = allItems.find(function (info) {
      return info.id === item.id;
    });
    if (exist) {
      return Object.assign({}, exist, {amount: item.amount});
    }
  });
}

function getSubtotal(cartItems) {
  return cartItems.map(function (item) {
    let subtotal = item.amount * item.price;
    return Object.assign({}, item, {subtotal: subtotal});
  });
}

function getTotal(subtotalItems) {
  let total = 0;

  for (let item of subtotalItems) {
    total += item.subtotal;
  }

  return total;
}

function getHalfCutId(promotions) {
  for (let item of promotions) {
    if (item.items) {
      return item.items;
    }
  }
}

function getHalfCutItems(subtotalItems, halfCutIds){
  let halfCutItems = [];

  subtotalItems.map(function(item){
    let exist = halfCutIds.find(function(info){
      return info === item.id;
    });

    if(exist){
      halfCutItems.push(Object.assign({}, item, {saved: item.subtotal / 2}));
    }else{
      halfCutItems.push(Object.assign({}, item, {saved: 0}));
    }
  });

  return halfCutItems;
}

function calculateHalfCutedTotal(halfCutItems, total){
  let halfCut = [];
  let saved = 0;

  halfCutItems.map(function(item){
    saved += item.saved;
  });

  halfCut.push({save: saved, afterSavedTotal: total - saved});

  return halfCut;
}

function calculateFullCutedTotal(total){
  let fullCut = [];

  if(total >= 30){
    fullCut.push({save: 6, afterSavedTotal: total - 6});
  }else{
    fullCut.push({save: 0, afterSavedTotal: total});
  }

  return fullCut;
}

function getTheBestPromotion(halfCut, fullCut){
  let bestPromotion = [];

  if(halfCut.afterSavedTotal < fullCut.afterSavedTotal){
    bestPromotion.push({save: halfCut.save, bestTotal: halfCut.afterSavedTotal, type: "指定菜品半价"});
  }else{
    bestPromotion.push({save: fullCut.save, bestTotal: fullCut.afterSavedTotal, type: "满30减6元"});
  }

  return bestPromotion;
}

function connectString(subtotalItems, halfCutIds, bestPromotion){
  let expectedString = "";

  return expectedString;
}