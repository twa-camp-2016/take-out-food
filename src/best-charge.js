'use strict';

function bestCharge(selectedItems) {
  let allItems = loadAllItems();
  let allPromotions = loadPromotions();
  let formatedItems = formatItems(selectedItems);
  let subdevidedItems = subdivideItems(formatedItems, allItems);
  let subtotaledItems = subtotalItems(subdevidedItems);
  let addedItems = addEachPromotion(subtotaledItems, allPromotions);
  let chargedItems = chargeItmes(addedItems);
  let discountedItems = discountItems(chargedItems, allPromotions);
  return chargedItems;
}

function formatItems(selectedItems) {
  let formatedItems = [];
  let tempItems = selectedItems;
  for (let item of tempItems) {
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
  for (let one of formatedItems) {
    for (let each of allItems) {
      if (one["id"] === each["id"]) {
        subdevidedItems.push(Object.assign({}, one, {name: each.name, price: each.price}));
        break;
      }
    }
  }
  return subdevidedItems;
}

function subtotalItems(subdevidedItems) {
  let subtotaledItems = [];
  for (let item of subdevidedItems) {
    let subtotal = item.amount * item.price;
    subtotaledItems.push(Object.assign({}, item, {subtotal: subtotal}));
  }
  return subtotaledItems;
}

function addEachPromotion(subtotaledItems, allPromotions) {
  let addedItems = [];
  for (let one of subtotaledItems) {
    let flag = 1;
    for (let each of allPromotions) {
      if (each.items) {
        for (let bar of each.items) {
          if (one["id"] === bar) {
            addedItems.push(Object.assign({}, one, {type: each.type}));
            flag=0;
          }
        }
      }
    }
    if (flag) {
      addedItems.push(Object.assign({}, one, {type: "无"}));
    }
  }
  return addedItems;
}

function chargeItmes(addedItems) {
  let chargedItems = { items:[], sumtotal: 0};
  for (let item of addedItems) {
    chargedItems.items.push(item);
    chargedItems.sumtotal += item.subtotal;
  }
  return chargedItems;
}

function discountItems(chargedItems, allPromotions) {
  let discountedItems = [];
  let tempItems = newChargedItems(chargedItems);
  let assignedDishesItems = newChargedItems(chargedItems);
  let assignedDishesSavedPrice = 0;
  for (let item of assignedDishesItems.items) {
    if (item.type === "指定菜品半价") {
      let tempPrice = item.subtotal;
      item.subtotal /= 2;
      assignedDishesItems.sumtotal -= (tempPrice - item.subtotal);
      assignedDishesSavedPrice += (tempPrice - item.subtotal);
    }
  }
  if(chargedItems.sumtotal >= 30 && assignedDishesSavedPrice <= 6) {
    tempItems.sumtotal -= 6;
    discountedItems.push(Object.assign({}, tempItems, {
      type: "满30减6元",
      savedPrice: 6
    }));
  } else {
    discountedItems.push(Object.assign({}, assignedDishesItems, {
      type: "指定菜品半价",
      savedPrice: assignedDishesSavedPrice
    }));
  }
  return discountedItems;
}

function newChargedItems(chargedItems) {
  let newItems = {
    items: [],
    sumtotal: chargedItems.sumtotal
  };
  for (let item of chargedItems.items) {
    newItems.items.push(({
      id: item.id,
      amount: item.amount,
      name: item.name,
      price: item.price,
      subtotal: item.subtotal,
      type: item.type
    }));
  }
  return newItems;
}
