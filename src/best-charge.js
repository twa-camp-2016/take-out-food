function getSelectedItems(inputs, allItems) {

  let selectItems = [];
  for (let input of inputs) {
    let inputArray = input.split(' x ');
    let id = inputArray[0];
    let count = parseFloat(inputArray[1]);
    let item = allItems.find(item => item.id === id);
    selectItems.push({item, count});
  }
  return selectItems;
}

function getReceiptItems(selectItems, allPromotions) {
  return selectItems.map(selectItem => {
    let promotionType = findPromotionType(selectItem.item.id, allPromotions);
    let {saved, subtotal, promotionsType} = getDiscountInfo(selectItem.count, selectItem.item.price, promotionType);
    return {selectItem, saved, subtotal, promotionsType}
  });
}

function findPromotionType(id, promotions) {

  for (let p of promotions) {
    if (p.hasOwnProperty('items')) {
      let promotion = p.items.some(a => a === id);
      return promotion ? p.type : undefined;
    }
  }
}

function getDiscountInfo(count, price, promotionType) {
  let promotionsType = promotionType;
  let subtotal = count * price;
  let saved = 0;
  if (promotionType === '指定菜品半价') {
    saved = subtotal / 2;
  }
  return {saved, subtotal, promotionsType};
}

function calculateSaveAndTotal(receiptItems) {
  let totalArr = [];
  let saveTotal = 0;
  let total = 0;
  for (let item of receiptItems) {
    saveTotal += item.saved
    total += item.subtotal;
  }
  totalArr.push(Object.assign({saveTotal: saveTotal}, {total: total}));
  return totalArr;
}

function getBestCharge(totalArr) {
  let best = [];
  let bestcharge;
  let proType = '';
  let halfPriceTotal = totalArr[0].total - totalArr[0].saveTotal;
  if (totalArr[0].total > 30) {
    totalArr[0].total -= 6;
  }
  if (halfPriceTotal > totalArr[0].total) {
    bestcharge = totalArr[0].total;
    proType = '满30减6元';
    best.push(Object.assign({bestcharge: bestcharge}, {proType: proType}));
  }
  else if ((halfPriceTotal < totalArr[0].total)) {
    bestcharge = halfPriceTotal;
    proType = '指定菜品半价';
    best.push(Object.assign({bestcharge: bestcharge}, {proType: proType}));
  }
  else {
    best.push(Object.assign({}, {bestcharge: totalArr[0].total}));
  }
  return best;
}

function ptint(receiptItems, totalArr, best) {
  let receipt = "============= 订餐明细 =============\n"
  function getText(totalArr, best) {
    let text = '';
    function getpromotionInfo(best) {
      let promtionInfo;
      for (let item of best) {
        if (item.proType === '指定菜品半价') {
          promtionInfo = 'half';
        }
        else if (item.proType === '满30减6元') {
          promtionInfo = 'sub';
        }
        else {
          promtionInfo = 'null';
        }
      }
      return promtionInfo;
    }
    let promtionInfo = getpromotionInfo(best);
    if (promtionInfo === 'sub') {
      text += '-----------------------------------\n' +
        '使用优惠:\n' + best[0].proType
        + '，省6元\n';
    }
    else if (promtionInfo === 'null') {
      text = '';
    }
    else {
      text += '-----------------------------------\n' +
        '使用优惠:\n' + best[0].proType + '(';
      let itemsArr = [];
      for (let items of receiptItems) {
        if (items.promotionsType === best[0].proType) {
          itemsArr.push(items.selectItem.item.name);
        }
       for(let i=0;i<itemsArr.length-1;i++){
          text += itemsArr[i]+'，'
        }
      } text+=itemsArr[itemsArr.length-1];
      text += ')' + '，省' + totalArr[0].saveTotal + '元\n';
    }
    return text;
  }
  let text = getText(totalArr, best);
  for (let item of receiptItems) {
    receipt += item.selectItem.item.name + ' x ' + item.selectItem.count
      + ' = ' + item.subtotal + '元\n'
  }
  receipt += text;
  receipt += '-----------------------------------\n' +
    '总计：' + best[0].bestcharge + '元\n' +
    '===================================';
  return receipt;
}

function bestCharge(inputs) {
  let allItems = loadAllItems();
  let allPromotions = loadPromotions();
  let selectItems = getSelectedItems(inputs, allItems);
  let receiptItems = getReceiptItems(selectItems, allPromotions);
  let totalArr = calculateSaveAndTotal(receiptItems);
  let best = getBestCharge(totalArr);
  let recepipt = ptint(receiptItems, totalArr, best);
  return recepipt;

}
