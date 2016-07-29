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
  let summary = generateSummay(discountedItems);
  return summary;
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
  if (chargedItems.sumtotal < 30 && assignedDishesSavedPrice === 0) {
    discountedItems.push(Object.assign({}, assignedDishesItems, {
      type: "无",
      savedPrice: 0
    }));
  } else if(chargedItems.sumtotal >= 30 && assignedDishesSavedPrice <= 6) {
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

function generateSummay(discountedItems) {
  let summary = `============= 订餐明细 =============\n`;
  for (let item of discountedItems[0].items) {
    summary += `${item.name} x ${item.amount} = ${item.amount * item.price}元\n`;
  }
  if (discountedItems[0].type !== "无") {
    summary += `-----------------------------------\n`;
    summary += (`使用优惠:\n` + discountedItems[0].type);
    if (discountedItems[0].type === "指定菜品半价") {
      summary += `(`;
      for (let item of discountedItems[0].items) {
        if (item.type === "指定菜品半价") {
          summary += (item.name + `，`);
        }
      }
      summary = summary.substring(0,summary.length-1);
      summary += ")";
    }
    summary += (`，省${discountedItems[0].savedPrice}元\n`);
  }
  summary += `-----------------------------------\n`;
  summary += (`总计：${discountedItems[0].sumtotal}元\n`);
  summary += `===================================`;
  return summary;
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
