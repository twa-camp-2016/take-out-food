'use strict';

function bestCharge(selectedItems) {
  return /*TODO*/;
}

function buildChargeItems(orderItems, promotions){
  
}

function buildOrderItems(tags, allItems) {
  let orderItems = [];

  for (let tag of tags) {
    const splittedTag = tag.split('x');
    const id = splittedTag[0].slice(0, -1);
    const count = parseInt(splittedTag[1]);

    let item = allItems.find(item => item.id === id);
    orderItems.push({item, count});
  }

  return orderItems;
}
