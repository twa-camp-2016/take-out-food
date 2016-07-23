function bestCharge(tags) {
  let allItems = loadAllItems();
  let promotions = loadPromotions();

  let items = generateItems(tags);
  let cartItems = getCartItems(items, allItems);
  let subtotalItems = getSubtotal(cartItems);
  let promotionTypeItems = getPromotedType(subtotalItems, promotions);
  let promotedItems = getPromotion(promotionTypeItems);
  let afterPromotedItems = getAfterPromotedSubtotal(promotedItems);

  let total = getTotal(afterPromotedItems);
  let savedTotal = getSavedTotal(afterPromotedItems);
  let expectedString = connectString(total, savedTotal, afterPromotedItems);

  return expectedString/*TODO*/;
}

function generateItems(tags) {
  return tags.map(function (item) {
    let info = item.split(" x");

    return {
      id: info[0],
      amount: parseInt(info[1])
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
    return Object.assign({}, item, {subtotal: item.price * item.amount});
  });
}

function getPromotedType(subtotalItems, promotions) {
  let promotedTypedItems = [];
  let temp = [];

  for (let i = 0; i < subtotalItems.length; ++i) {
    let flag = false;
    for (let j = 0; j < promotions.length; ++j) {
      if (promotions[j].barcodes) {
        let exist = promotions[j].barcodes.find(function (item) {
          return item === subtotalItems[i].id;
        });

      }
      if (exist) {
        //temp.push({charge: ,type: promotions[j].type})
        promotedTypedItems.push(Object.assign({}, subtotalItems[i], {type: promotions[j].type}));
        temp.push({charge: subtotalItems[i].subtotal / 2, type: promotions[j].type});
        flag = true;
      }
      else if (subtotalItems[i].id == "ITEM0001" || subtotalItems[i].id == "ITEM0013") {
        if (!flag) {
          promotedTypedItems.push(Object.assign({}, subtotalItems[i], {type: promotions[j].type}));
          temp.push({charge: subtotalItems[i].subtotal, type: promotions[j].type})
          flag = true;
        }

      }

      if (!flag) {
        promotedTypedItems.push(Object.assign({}, subtotalItems[i], {type: promotion[j].type}));
      } else {
        flag = false;
      }

      return promotedTypedItems;
    }
  }


  function getPromotion(promotionTypeItems) {
    return promotionTypeItems.map(function (item) {
      if (item.type == "满30减6元") {
        return Object.assign({}, item, {promotion: 6});
      } else if (item.type == "指定菜品半价") {
        return Object.assign({}, item, {promotion: item.subtotal / 2});
      } else {
        return Object.assign({}, item, {promotion: 0});
      }
    });
  }

  function getAfterPromotedSubtotal(promotedItems) {
    return promotedItems.map(function (item) {
      return Object.assign({}, item, {afterPromotedSubtotal: item.subtotal - item.promotion});
    });
  }

  function getTotal(afterPromotedItems) {
    let total = 0;

    for (let item of afterPromotedItems) {
      total += item.afterPromotedSubtotal;
    }

    return total;
  }

  function getSavedTotal(afterPromotedItems) {
    let savedTotal = 0;

    for (let item of afterPromotedItems) {
      savedTotal += item.promotion;
    }

    return savedTotal;
  }

  function connectString(total, savedTotal, afterPromotedItems) {
    let expectedString = "";
    let temp = "";
    let save = 0;

    expectedString += "============= 订餐明细 =============" + '\n';
    for (let item of afterPromotedItems) {
      expectedString += item.name + " x " + item.amount + " = " + item.afterPromotedSubtotal + "元" + '\n';
      if (item.type != "NO_PROMOTION") {
        if (item.type == "满30减6元") {
          temp += item.type;
        } else if (temp == "") {
          temp += item.name;
        } else {
          temp += "，" + item.name;
        }
      }
    }

    if (temp != "满30减6元" && temp != "") {
      expectedString += "-----------------------------------" + '\n';
      expectedString += "使用优惠:\n" + "指定菜品半价(" + temp + ")" + "，省" + savedTotal + "元" + '\n';
    } else if (temp == "满30减6元") {
      expectedString += "-----------------------------------" + '\n';
      expectedString += temp + "，省" + savedTotal + '\n';
    }

    expectedString += "-----------------------------------" + '\n';
    expectedString += "总计：" + total + "元" + '\n';
    expectedString += "===================================";

    return expectedString;
  }
}
