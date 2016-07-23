function formatInputs(inputs) {
  return inputs.map(function (item) {
    let input = item.split(' x ');
    return {
      id: input[0],
      amount: parseInt(input[1])
    }
  });
}

function findCartItems(ids, allItems) {
  let result = [];
  ids.map(function (item) {
    for (let i = 0; i < allItems.length; i++) {
      if (item.id === allItems[i].id) {
        result.push(Object.assign({}, allItems[i], {amount: item.amount}));
      }
    }
  });
  return result;
}

function calculaSubTotal(cartItems) {
  return cartItems.map(function (item) {
    let temp = item.price * item.amount;
    return Object.assign({}, item, {subTotal: parseFloat(temp.toFixed(2))});
  });
}
function calculaTotal(subTotalItems) {
  let total = 0;
  subTotalItems.map(function (item) {
    total += item.subTotal;
  });
  return total;
}
function calculaSavedMoney(subTotalItems, promotions) {
  let result = [], flag = 0;
  subTotalItems.map(function (item) {
    for (let i = 1; i < promotions.length; i++) {
      for (let j = 0; j < promotions[i].items.length; j++) {
        if (item.id === promotions[i].items[j] && promotions[i].type === '指定菜品半价') {
          result.push(Object.assign({}, item, {savedMoney: item.price * 0.5}));
          flag = 1;
        }
      }
    }
    if (flag === 0) {
      result.push(Object.assign({}, item, {savedMoney: 0}));
    }
    flag = 0;
  });
  return result;
}
function calculaNewSubTotal(savedMoneyItems) {
  let result = [];
  savedMoneyItems.map(function (item) {
    result.push(Object.assign({}, item, {newSubTotal: item.subTotal - item.savedMoney}));
  });
  return result;
}
function calculaNewTotal(newSubTotalItems, total) {
  let total1 = 0, total2, newTotal;
  newSubTotalItems.map(function (item) {
    total1 += item.newSubTotal;
  });
  if (total >= 30) {
    total2 = total - 6;
  }
  newTotal = total1 <= total2 ? total1 : total2;
  return newTotal;
}
function calculaAllSavedMoney(total, newTotal) {
  return total - newTotal;
}
function print(newSubTotalItems, promotions, total, newTotal, allSavedMoney) {
  let flag=0,tempStr = [], str = '============= 订餐明细 =============\n';
  if (allSavedMoney === 0) {
    newSubTotalItems.map(function (item) {
      str += item.name + ' x ' + item.amount + ' = ' + item.subTotal + '元\n';
    });
    str += '-----------------------------------\n总计：' + total + '元\n===================================';
    return str;
  }
  else if (allSavedMoney === 6) {
    newSubTotalItems.map(function (item) {
      str += item.name + ' x ' + item.amount + ' = ' + item.subTotal + '元\n';
    });
    str += '-----------------------------------\n使用优惠:\n满30减6元，省' + allSavedMoney + '元\n-----------------------------------\n总计：' + newTotal + '元\n===================================';
    return str;
  } else {
    newSubTotalItems.map(function (item) {
      for (let i = 1; i < promotions.length; i++) {
        for (let j = 0; j < promotions[i].items.length; j++) {
          if (item.id === promotions[i].items[j] && promotions[i].type === '指定菜品半价') {
            tempStr.push(item.name);
            flag = 1;
          }
        }
      }
      if (flag === 0) {
        //tempStr.push('');
      }
      flag = 0;
      //tempStr.join('，');
      str += item.name + ' x ' + item.amount + ' = ' + item.subTotal + '元\n';
    });
    str += '-----------------------------------\n使用优惠:\n指定菜品半价(' + tempStr + ')，省' + allSavedMoney + '元\n-----------------------------------\n总计：' + newTotal + '元\n===================================';

    return str;
  }
}
function bestCharge(selectedItems) {
  let ids = formatInputs(selectedItems);
  let cartItems = findCartItems(ids, loadAllItems());
  let subTotalItems = calculaSubTotal(cartItems);
  let total = calculaTotal(subTotalItems);
  let savedMoneyItems = calculaSavedMoney(subTotalItems, loadPromotions());
  let newSubTotalMoney = calculaNewSubTotal(savedMoneyItems);
  let newTotal = calculaNewTotal(newSubTotalMoney, total);
  let allSavedMoney = calculaAllSavedMoney(total, newTotal);
  let str = print(subTotalItems, loadPromotions(), total, newTotal, allSavedMoney)

  return str;
  /*TODO*/
  ;
}
