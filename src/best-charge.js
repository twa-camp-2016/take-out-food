function bestCharge(idInfo) {
  let splitedItemsInfo = splitInfo(idInfo);
  let allItems = loadAllItems();
  let promotionsInfo = loadPromotions();
  let promotionAddtion = matchPromotions(splitedItemsInfo,promotionsInfo);
  let selectedInfo = matchItemsInfo(promotionAddtion,allItems);
  let uncutTotal = caculateUncutTotal(selectedInfo);
  let halfPriceTotal = caculateHalfPriceTotal(selectedInfo,uncutTotal);
  let cuttedSixTotal = caculateCutSixTotal(selectedInfo);
  let finalTotal = chooseCut(halfPriceTotal,cuttedSixTotal);
  let spare = caculateSpare(uncutTotal,finalTotal);
  let details = writeDetails(selectedInfo,finalTotal,spare);
  return details;
}

function splitInfo(idInfo) {
  let splitedItemsInfo = [];
  for(let i=0;i<idInfo.length;i++){
    let temp = idInfo[i].split(' x ');
    let temp1 = parseInt(temp[1]);
    splitedItemsInfo.push(Object.assign({},{id:temp[0]},{count:temp1}));
  }
  return splitedItemsInfo;
}

function matchPromotions(splitedItemsInfo,promotionsInfo) {
  let promotionAddtion = [];
  for(let i=0;i<splitedItemsInfo.length;i++){
      promotionsInfo.find(function (ite) {
      let exist = ite.items.find(function (item) {
        return item === splitedItemsInfo[i].id;
      });
      type = '满30减6元';
      if (exist){
        type = ite.type;
      }
      promotionAddtion.push(Object.assign({},promotionAddtion[i],{type:type}));
    });
  }
  return promotionAddtion;
}
function matchItemsInfo(promotionAddtion,allItems) {
  let selectedInfo = [];
  for(let i=0;i<promotionAddtion.length;i++){
    let temp = allItems.find(function (item) {
      return item.id === promotionAddtion[i].id;
    });
    if(temp){
      selectedInfo.push(Object.assign({},temp,{count:promotionAddtion[i].count},{type:promotionAddtion[i].type}));
    }
  }
  return selectedInfo;
}

function caculateUncutTotal(selectedInfo) {
  let uncutTotal =[];
  let temp = 0;
  for(let i=0;i<selectedInfo.length;i++){
    temp += (selectedInfo[i].count * selectedInfo[i].price);
  }
  uncutTotal.push(Object.assign({},{uncutTotal:temp}));
  return uncutTotal;
}


function caculateHalfPriceTotal(selectedInfo,uncutTotal) {
  let halfPriceTotal = [];
  let temp = selectedInfo;
  let temp1 = 0;
  let tag = false;
  for(let i=0;i<temp.length;i++){
    if (temp[i].type === '指定菜品半价'){
      temp[i].price = temp[i].price/2;
      tag = true;
    }
    temp1 += (temp[i].price * temp[i].count);
  }
  if (tag === true) {
    halfPriceTotal.push(Object.assign({}, {halfPriceTotal: temp1}));
  } else {
    halfPriceTotal.push(Object.assign({},{halfPriceTotal:uncutTotal.uncutTotal}));
  }
  return halfPriceTotal;
}

function caculateCutSixTotal(selectedInfo) {
  let cuttedSixTotal = [];
  let sum = 0;
  for(let i=0;i<selectedInfo.length;i++){
    sum += (selectedInfo[i].count * selectedInfo[i].price);
  }
  if (sum < 30){
    cuttedSixTotal.push(Object.assign({},{sum}));
  } else {
    cuttedSixTotal.push(Object.assign({},{cuttedSixTotal:sum-6}));
  }
  return cuttedSixTotal;
}

function chooseCut(halfPriceTotal,cuttedSixTotal){
  let finalTotal = [];
  if (halfPriceTotal[0].halfPriceTotal < cuttedSixTotal[0].cuttedSixTotal){
    finalTotal.push(Object.assign({},{finalTotal:halfPriceTotal[0].halfPriceTotal},{type:'指定菜品半价'}));
  } else if(halfPriceTotal[0].halfPriceTotal > cuttedSixTotal[0].cuttedSixTotal){
    finalTotal.push(Object.assign({},{finalTotal:cuttedSixTotal[0].cuttedSixTotal},{type:'满30减6元'}));
  } else if(halfPriceTotal[0].halfPriceTotal === cuttedSixTotal[0].cuttedSixTotal){
    finalTotal.push(Object.assign({},{finalTotal:cuttedSixTotal[0].cuttedSixTotal},{type:'满30减6元'}));
  }
  return finalTotal;
}

function caculateSpare(uncutTotal,finalTotal){
  let spare = [];
  if (uncutTotal[0] === finalTotal[0].finalTotal){
    spare.push({spare:0});
  }
  if (uncutTotal[0].uncutTotal < finalTotal[0].finalTotal){
    spare.push({spare:finalTotal[0].finalTotal - uncutTotal[0].uncutTotal});
  } else if(uncutTotal[0].uncutTotal > finalTotal[0].finalTotal){
    spare.push({spare:uncutTotal[0].uncutTotal - finalTotal[0].finalTotal});
  }
  return spare;
}

function writeDetails(selectedInfo,finalTotal,spare) {
  let temp = '';
  let details = '============= 订餐明细 =============\n';
  for(let i=0;i<selectedInfo.length;i++){
    details += selectedInfo[i].name + ' x ' + selectedInfo[i].count + ' = ' + (selectedInfo[i].price * selectedInfo[i].count) + '元\n'
  }
  if (spare[0].spare !== 0){
    details += '-----------------------------------\n';
    details += '使用优惠:\n' + finalTotal[0].type;
    if (finalTotal[0].type === '指定菜品半价') {
      for (let i = 0; i < selectedInfo.length; i++) {
        if (selectedInfo[i].id === 'ITEM0001') {
          temp += '黄焖鸡,';
        }
        if (selectedInfo[i].id === 'ITEM0022') {
          temp += '凉皮';
        }
      }
      details += '(' + temp + '),省' + spare[0].spare + '元\n';
    }
    if(finalTotal[0].type === '满30减6元'){
      details += ',省' + spare[0].spare + '元\n';
    }
    details += '-----------------------------------\n';
  } else {
    details += '-----------------------------------\n';
  }
    details += '总计：' + finalTotal[0].finalTotal + '元\n'+'==================================='
  return details.trim();
}
