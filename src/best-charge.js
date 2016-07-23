'use strict';

function bestCharge(selectedItems) {
  let allItems = loadAllItems();
  let allPromotions = loadPromotions();
  let formatedItems = formatItems(selectedItems);
  let subdevidedItems = subdivideItems(formatedItems, allItems);
  let subtotaledItems = subtotalItems(subdevidedItems);
  let addedItems = addEachPromotion(subtotaledItems, allPromotions);
  let discountedItems = discountItems(addedItems, allPromotions);
  let chargedItems = chargeItmes(discountedItems);
  return chargedItems;
}

function formatItems(selectedItems) {
  let formatedItems = [];
  let tempItems = selectedItems;
  for(let item of tempItems) {
    let splitTag = item.split(" x ");
    formatedItems.push({
      id: splitTag[0],
      amount: parseInt(splitTag[1]) || 1
    });
  }
  return formatedItems;
}

function subdivideItems(formatedItems, allItems) {
  let subdevidedItems = [];
  for(let one of formatedItems) {
    for(let each of allItems) {
      if(one["id"] === each["id"]) {
        subdevidedItems.push(Object.assign({}, one, {name: each.name, price: each.price}));
        break;
      }
    }
  }
  return subdevidedItems;
}

function subtotalItems(subdevidedItems) {
  let subtotaledItems = [];
  for(let item of subdevidedItems) {
    let subtotal = item.amount * item.price;
    subtotaledItems.push(Object.assign({}, item, {subtotal: subtotal}));
  }
  return subtotaledItems;
}

function addEachPromotion(subtotaledItems, allPromotions) {
  let addedItems = [];
  for(let one of subtotaledItems) {
    let flag = 1;
    for(let each of allPromotions) {
      if(each.items) {
        for(let bar of each.items) {
          if(one["id"] === bar) {
            addedItems.push(Object.assign({}, one, {type: each.type}));
            flag=0;
          }
        }
      }
    }
    if(flag) {
      addedItems.push(Object.assign({}, one, {type: "无"}));
    }
  }
  return addedItems;
}

function discountItems(addedItems, allPromotions) {
  let discountedItems = [];
  return discountedItems;
}

function chargeItmes(discountedItems) {
  let chargedItems = [];
  return chargedItems;
}
