'use strict';

function bestCharge(selectedItems) {
  let allItems = loadAllItems();
  let allPromotions = loadPromotions();
  let formatedItems = formatItems(selectedItems);
  let searchedItems = searchEachPromotion(formatedItems);
  let subdevidedItems = subdivideItems(searchedItems, allItems);
  let subtotaledItems = subtotalItems(subdevidedItems);
  let discountedItems = discountItems(subtotaledItems, allPromotions);
  let chargedItems = chargeItmes(discountedItems);
  return chargedItems;
}

function formatItems(selectedItems) {
  let formatedItems = [];
  // let tempItems = selectedItems;
  for(let item of selectedItems) {
    let splitTag = item.split(" x ");
    formatedItems.push({
      barcode: splitTag[0],
      amount: parseInt(splitTag[1]) || 1
    });
  }
  return formatedItems;
}

function searchEachPromotion(splitedItems) {
  let searchedItems = [];
  return searchedItems;
}

function subdivideItems(searchedItems) {
  let subdevidedItems = [];
  return subdevidedItems;
}

function subtotalItems(subdevidedItems) {
  let subtotaledItems = [];
  return subtotaledItems;
}

function discountItems(subtotaledItems, allPromotions) {
  let discountedItems = [];
  return discountedItems;
}

function chargeItmes(discountedItems) {
  let chargedItems = [];
  return chargedItems;
}
