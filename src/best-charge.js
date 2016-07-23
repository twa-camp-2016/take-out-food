'use strict';
function bestCharge(selectedItems) {
  let items = loadAllItems();
  let countItems = getCountItems(selectedItems,items);
  let promotions = loadPromotions();
  let newItems = countPromotions(countItems,promotions);
}

function getCountItems(selectedItems,items) {
  let countItems = [];

  for(let selectedItem of selectedItems){
    let splittedItem = selectedItem.split(' x ');
    let id = splittedItem[0];
    let count = parseInt(splittedItem[1]);

    let countItem = countItems.find(countItem => items.id === id);

    if(countItem){
      countItem.count += count;
    }else {
      let item = items.find(item => item.id === id);
      countItems.push({item,count});
    }
  }
  return countItems;
}

function countPromotions(countItems,promotions) {
  
}







