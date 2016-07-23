function bestCharge(selectedItems) {

  let allItems = loadAllItems();
  let allPromotedItems = loadPromotions();
  let formatedTags = formatTags(selectedItems);
  let menuItems = getMenuItems(formatedTags, allItems);
  let beforePromotedMenuItems = getSubTotal(menuItems);
  let promotedMenuItems = getPromotedMenuItems(beforePromotedMenuItems, allPromotedItems);
  let detailedPromotedMenuItems = getSubSaveMoney(promotedMenuItems);
  let totalAndSaveMoney = getTotalAndSaveMoney(detailedPromotedMenuItems);
  let promotedChoice = choosePromotion(totalAndSaveMoney);
  let receipt = print(detailedPromotedMenuItems, promotedChoice);

  return receipt;
}

function formatTags(tags) {
  return tags.map(function (tag) {
    let temp = tag.split('x');
    return {id: temp[0].trim(), count: Number(temp[1])};
  });
}


function getMenuItems(formatedTags, allItems) {
  let menuItems = [];
  for (let i = 0; i < formatedTags.length; i++) {
    for (let j = 0; j < allItems.length; j++) {
      if (formatedTags[i].id === allItems[j].id) {
        menuItems.push(Object.assign({}, allItems[j], {count: formatedTags[i].count}));
        break;
      }
    }
  }
  return menuItems;
}

function getSubTotal(menuItems) {
  let beforePromotedMenuItems = [];
  for (let i = 0; i < menuItems.length; i++) {
    beforePromotedMenuItems.push(Object.assign({}, menuItems[i], {subTotal: menuItems[i].price * menuItems[i].count}));
  }
  return beforePromotedMenuItems;
}

function getPromotedMenuItems(beforePromotedMenuItems, allPromotedItems) {
  let promotedMenuItems = [];
  for (let i = 0; i < beforePromotedMenuItems.length; i++) {
    for (let j = 1; j < allPromotedItems.length; j++) {
      for (let k = 0; k < allPromotedItems[j].items.length; k++) {
        if (beforePromotedMenuItems[i].id === allPromotedItems[j].items[k]) {
          promotedMenuItems.push(Object.assign({}, beforePromotedMenuItems[i], {type: allPromotedItems[j].type}));
          break;
        }
        else {
          promotedMenuItems.push(Object.assign({}, beforePromotedMenuItems[i], {type: allPromotedItems[0].type}));
          break;
        }
      }
    }
  }
  return promotedMenuItems;
}

function getSubSaveMoney(promotedMenuItems) {
  let detailedPromotedMenuItems = [];
  for (let i = 0; i < promotedMenuItems.length; i++) {
    if (promotedMenuItems[i].type === '指定菜品半价') {
      detailedPromotedMenuItems.push(Object.assign({}, promotedMenuItems[i], {subSaveMoney: promotedMenuItems[i].subTotal / 2}));
    }
    else {
      detailedPromotedMenuItems.push(Object.assign({}, promotedMenuItems[i], {subSaveMoney: 0}));
    }
  }
  return detailedPromotedMenuItems;
}

function getTotalAndSaveMoney(detailedPromotedMenuItems) {
  let totalAndSaveMoney = [];
  let total = 0, saveMoney = 0;
  for (let i = 0; i < detailedPromotedMenuItems.length; i++) {
    total += detailedPromotedMenuItems[i].subTotal;
    saveMoney += detailedPromotedMenuItems[i].subSaveMoney;
  }
  return Object.assign({}, {total: total, saveMoney: saveMoney});
}

function choosePromotion(totalAndSaveMoney) {
  let promotedType = '';

  if (totalAndSaveMoney.total > 30) {
    if (totalAndSaveMoney.saveMoney > 6) {
      promotedType = '指定菜品半价';
      totalAndSaveMoney.total = totalAndSaveMoney.total - totalAndSaveMoney.saveMoney;
    }
    else {
      promotedType = '满30减6元';
      totalAndSaveMoney.total -= 6;
    }
  }
  else if (totalAndSaveMoney.saveMoney != 0) {
    promotedType = '指定菜品半价';
  }
  return Object.assign({}, totalAndSaveMoney, {promotedType: promotedType});
}


function print(detailedPromotedMenuItems, promotedChoice) {

  let receiptString = '============= 订餐明细 =============';
  let string = '('
  for (let i = 0; i < detailedPromotedMenuItems.length; i++) {
    receiptString = receiptString + '\n' + detailedPromotedMenuItems[i].name + ' x ' + detailedPromotedMenuItems[i].count + ' = ' + detailedPromotedMenuItems[i].subTotal + '元';
  }
  if (promotedChoice.promotedType === '指定菜品半价') {
    for (let i = 0; i < detailedPromotedMenuItems.length; i++) {
      if (detailedPromotedMenuItems[i].type === '指定菜品半价') {
        string += detailedPromotedMenuItems[i].name + '，';
      }
    }
    string = string.slice(0, string.length - 1);
    receiptString += '\n' + '-----------------------------------' + '\n' + '使用优惠:' + '\n' + promotedChoice.promotedType + string + ')' + '，省' + promotedChoice.saveMoney + '元' + '\n' + '-----------------------------------' + '\n' + '总计：' + promotedChoice.total + '元' + '\n' + '===================================';
  }
  else if (promotedChoice.promotedType === '满30减6元') {
    receiptString += '\n' + '-----------------------------------' + '\n' + '使用优惠:' + '\n' + '满30减6元，省6元' + '\n' + '-----------------------------------' + '\n' + '总计：' + promotedChoice.total + '元' + '\n' + '===================================';
  }
  else {
    receiptString += '\n' + '-----------------------------------' + '\n' + '总计：' + promotedChoice.total + '元' + '\n' + '===================================';
  }
  return receiptString;
}
