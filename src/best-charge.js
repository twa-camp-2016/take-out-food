let items = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
function formatItems(items) {

  return items.map(function (item) {
    let temp = removeAllSpace(item);
    let tempArray = temp.split("x");
    return {id: tempArray[0], count: parseFloat(tempArray[1])};
  })
}

function removeAllSpace(str) {
  return str.replace(/\s+/g, "");
}
let a = formatItems(items);
console.log(a);
function getSelectedItems(allItems, formatItems) {
  let selectedItems = [];
  for (let i = 0; i < allItems.length; i++) {
    let item = formatItems.find(function (it) {
      return it.id === allItems[i].id;
    })
    if (item) {
      selectedItems.push(Object.assign({}, allItems[i], {count: item.count}));
    }
  }
  return selectedItems;
}
/*
let selectedItems = getSelectedItems(loadAllItems(), a);
console.log(selectedItems);
*/

function calculateSubtotal(selectedItems) {
  let subtotalItems = [];
  for (let i = 0; i < selectedItems.length; i++) {
    let subtotal = selectedItems[i].price * (selectedItems[i].count);
    subtotalItems.push(Object.assign({}, selectedItems[i], {subtotal: subtotal}));
  }
  return subtotalItems;
}
/*let subtotalItems = calculateSubtotal(selectedItems);
console.log(subtotalItems);*/

function calculateSaving(subtotalItems, allPromotionItems) {
  let savedItems = [];
  let tempArray = allPromotionItems[1].items;
  for (let i = 0; i < subtotalItems.length; i++) {
    let items = tempArray.find(function (it) {
      return it === subtotalItems[i].id;
    })
    if (items) {
      savedItems.push(Object.assign({}, subtotalItems[i], {saving: subtotalItems[i].price / 2}));
    }
    else {
      savedItems.push(Object.assign({}, subtotalItems[i], {saving: 0}));
    }
  }
  return savedItems;
}
/*let savedItems = calculateSaving(subtotalItems, loadPromotions());
console.log(savedItems);*/

function getAllSaving(savedItems) {
  let allSaving = 0;
  for (let i = 0; i < savedItems.length; i++) {
    allSaving += savedItems[i].saving;
  }
  return allSaving;
}

function getTotal(savedItems) {
  let total = 0;
  for (let i = 0; i < savedItems.length; i++) {
    total += savedItems[i].subtotal;
  }
  return total;
}
/*
let allSaving = getAllSaving(savedItems);
let total = getTotal(savedItems);
*/
function getBestSaving(total, allSaving, savedItems) {
  let bestSaving = 0;
  let type;
  //要返回的是
  let bestSavingItems = {};
  if (total >= 30) {
    if (allSaving > 6) {
      bestSaving = allSaving;
      type = '指定菜品半价';
    }
    else {
      bestSaving = 6;
      type = '满30减6元';
    }
    bestSavingItems = {items: savedItems, bestSaving: bestSaving, type: type};
    console.log(bestSavingItems.type);
  }
  else {
    bestSavingItems = {items: savedItems, bestSaving: allSaving, type: '指定菜品半价'};
  }
  return bestSavingItems;
}
/*
let bestSavingItems = getBestSaving(total, allSaving, savedItems);
console.log(bestSavingItems);
*/

function getFinalTotal(bestSavingItems, total) {
  let finalTotal;
  finalTotal = total - bestSavingItems.bestSaving;
  return finalTotal;

}
function bestCharge(items) {
  let formatItems = formatItems(items);
  let selectedItems = getSelectedItems(loadAllItems(), formatItems);
  let subtotalItems = calculateSubtotal(selectedItems);
  let savedItems = calculateSaving(subtotalItems, loadPromotions());
  let allSaving = getAllSaving(savedItems);
  let total = getTotal(savedItems);
  let bestSavingItems = getBestSaving(total, allSaving, savedItems);
  let finalTotal = getFinalTotal(bestSavingItems, total);
}









