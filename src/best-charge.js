function getSelectedItems(inputs, allItems) {
  let selectItems = [];
  inputs.map(input=> {
    let inputArray = input.split(' x ');
    let id = inputArray[0];
    let count = parseFloat(inputArray[1]);
    let item = allItems.find(item => item.id === id);
    selectItems.push({item, count});
  })
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
  let exist = promotions.find(item=>item.hasOwnProperty('items'))
  let promotion = exist.items.some(a => a === id);
  return promotion ? exist.type : undefined;
}

function getDiscountInfo(count, price, promotionType) {
  let saved = 0;
  let promotionsType = promotionType;
  let subtotal = count * price;
  if (promotionType === '指定菜品半价') {
    saved = subtotal / 2;
  }
  return {saved, subtotal, promotionsType};
}

function calculateSaveAndTotal(receiptItems) {
  let totalArr = {};
  let total = receiptItems.reduce((acc, cur)=>acc += cur.subtotal, 0);
  let saveTotal = receiptItems.reduce((acc, cur)=> acc += cur.saved, 0);
  return totalArr = {saveTotal: saveTotal, total: total};
}

function getBestCharge(totalArr) {
  let best = {};
  let bestcharge;
  let proType = '';
  let halfPriceTotal = totalArr.total - totalArr.saveTotal;
  if (totalArr.total > 30) {
    totalArr.total -= 6;
  }
  if (halfPriceTotal > totalArr.total) {
    bestcharge = totalArr.total;
    proType = '满30减6元';
    best = {bestcharge: bestcharge, proType: proType};
  }
  else if ((halfPriceTotal < totalArr.total)) {
    bestcharge = halfPriceTotal;
    proType = '指定菜品半价';
    best = {bestcharge: bestcharge, proType: proType};
  }
  else {
    best = {bestcharge: totalArr.total};
  }
  return best;
}

function ptint(receiptItems, totalArr, best) {
  function getbody(receiptItems) {
    let body = receiptItems.map(item=> {
      return `${item.selectItem.item.name} x ${item.selectItem.count} = ${item.subtotal}元\n`
    }).join('');
    return body;
  }
  function getText(totalArr, best) {
    let text = '';
    function getpromotionInfo(best) {
      let promtionInfo;
      if (best.proType === '指定菜品半价') {
        promtionInfo = 'half';
      }
      else if (best.proType === '满30减6元') {
        promtionInfo = 'sub';
      }
      else {
        promtionInfo = 'null';
      }
      return promtionInfo;
    }
    let promtionInfo = getpromotionInfo(best);
    if (promtionInfo === 'sub') {
      text = `-----------------------------------\n使用优惠:\n${best.proType}，省6元\n`;
    }
    else if (promtionInfo === 'null') {
      text = '';
    }
    else {
      textheader = `-----------------------------------\n使用优惠:\n${best.proType}(`
      let itemsArr = [];
      receiptItems.map(items=> {
        if (items.promotionsType === best.proType)
          itemsArr.push(items.selectItem.item.name);
      })
      let str = '';
      itemsArr.forEach(item=>str += item + '，')
      str= `${str.slice(0, -1)}`;
      textfooter= `)，省${totalArr.saveTotal}元\n`;
      text=`${textheader}${str}${textfooter}`;
    }
    return text;
  }
  function getFooter(best) {
    let footer = '';
    footer =`-----------------------------------\n总计：${best.bestcharge}元\n===================================`;
    return footer;
  }
  let header = `============= 订餐明细 =============\n`
  let text = getText(totalArr, best);
  let body = getbody(receiptItems);
  let footer = getFooter(best);
  return `${header}${body}${text}${footer}`;
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
