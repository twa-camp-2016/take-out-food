'use strict';
function formattedTags(inputs) {
  return inputs.map(function (input) {
    let temp = input.split(' x ');
    return {id: temp[0], count: parseInt(temp[1])};
});
}


function generateAboutItems(allItems, formattedInputs) {
  let result = [];
  for (let i = 0; i < formattedInputs.length; i++) {
    let exist = allItems.find(function (item) {
      return item.id === formattedInputs[i].id;
    });
    if (exist) {
      result.push(Object.assign({}, exist, {count: formattedInputs[i].count}));
    }
  }
  return result;
}


function computeSubtotal(generateItems) {
  let result = [];
  for (let i = 0; i < generateItems.length; i++) {
    result.push(Object.assign({}, generateItems[i], {subtotal: generateItems[i].price * generateItems[i].count}));
  }
  return result;
}
function computeTotal(generateSubtotal) {
  let sum = 0;
  for (let i = 0; i < generateSubtotal.length; i++) {
    sum += generateSubtotal[i].subtotal;
  }
  return sum;
}


function generatePromotions(generateSubtotal, promotionArray) {
  let result = [];
  for (let i = 0; i < generateSubtotal.length; i++) {
    let exist = promotionArray[1].items.find(function (item) {
      return item === generateSubtotal[i].id;
    });
    var flag = 0;
    if (exist) {
      flag = 1;
      result.push(Object.assign({}, {
        id: generateSubtotal[i].id,
        name: generateSubtotal[i].name,
        price: generateSubtotal[i].price,
        count: generateSubtotal[i].count,
        subtotal: parseFloat(generateSubtotal[i].subtotal / 2)
      }));

    }
    if (flag === 0) {
      result.push(Object.assign({}, generateSubtotal[i]));
    }
  }
  return result;
}

function computeSavedTotal(promotionsItems) {
  let sum = 0;
  for (let i = 0; i < promotionsItems.length; i++) {
    sum += promotionsItems[i].subtotal;
  }
  return sum;
}



function print(promotionsItems, total, savedTotal, generateSubtotal) {
  let result = "============= 订餐明细 =============";
  if (total === savedTotal) {

    for (let i = 0; i < promotionsItems.length; i++) {
      result += "\n" + promotionsItems[i].name + " x " +promotionsItems[i].count+ " = " + generateSubtotal[i].subtotal + "元";
    }
    result += "\n-----------------------------------";
    result += "\n总计：" + total + "元";
    result += "\n===================================";
  }


  else if (savedTotal === total - 6) {
    for (let i = 0; i < promotionsItems.length; i++) {
      result += "\n" + promotionsItems[i].name + " x " + promotionsItems[i].count + " = " + generateSubtotal[i].subtotal + "元";
    }
    result += "\n-----------------------------------";
    result += "\n使用优惠:";
    result += "\n满30减6元，省6元";
    result += "\n-----------------------------------";
    result += "\n总计：" + savedTotal;
    result += "\n===================================";
  }
  else {
    for (let i = 0; i < promotionsItems.length; i++) {
      result += "\n" + promotionsItems[i].name + " x " + promotionsItems[i].count + " = " + generateSubtotal[i].subtotal + "元";
    }
      result += "\n-----------------------------------";
      result += "\n使用优惠:";
      result += "\n指定菜品半价(";
      for (let j = 0; j < generateSubtotal.length; j++) {
        if (generateSubtotal[j].subtotal === 2 * promotionsItems[j].subtotal) {
          result += generateSubtotal[j].name;
          result += "，";
        }
      }
      result = result.substr(0, result.length - 1);
      result += ")，";
      result += "省" + (total-savedTotal) + "元";
      result += "\n-----------------------------------";
      result += "\n总计：" + savedTotal+"元";
      result += "\n===================================";
    }
    return result;
}

function bestCharge(inputs) {

  let allItems = loadAllItems();
  let promotionArray = loadPromotions();
  let formattedInputs = formattedTags(inputs);
  let generateItems = generateAboutItems(allItems, formattedInputs);
  let generateSubtotal = computeSubtotal(generateItems);
  let total = computeTotal(generateSubtotal);
  let promotionsItems = generatePromotions(generateSubtotal, promotionArray, total);
  let savedTotal = computeSavedTotal(promotionsItems);
  let result= print(promotionsItems, total, savedTotal, generateSubtotal);
  return result;
}
bestCharge(inputs);
