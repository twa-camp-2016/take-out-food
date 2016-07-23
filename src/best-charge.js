function bestCharge(selectedItems) {

  let allItems = loadAllItems();
  let promotions = loadPromotions();

  let ids = formateIds(selectedItems);
  let halfIds = getHalfId(promotions);
  let itemsInfo = getItemsInfo(ids, allItems);
  let itemSubtotal = getSubtotal(itemsInfo)
  let total = getAllTotal(itemSubtotal);
  let secondSubtotal = getScondSubtotal(itemSubtotal, halfIds);

  let firstAllSave = getFirstAllSave(total);
  let secondAllSave = getSecondAllSave(secondSubtotal);
  let secondAllSubtotal = getSecondAllSubtotal(secondSubtotal)

  let returnType = judge(firstAllSave, secondAllSave, secondAllSubtotal, total);

  let returnString = '============= 订餐明细 =============\n';

  for(let item of secondSubtotal) {
    returnString += item.name + ' x ' + item.count + ' = ' + item.price*item.count + '元\n';
  }
  returnString += '-----------------------------------\n';

  if(returnType.type != 'null') {
    returnString += '使用优惠:\n' ;

    if(returnType.type === '满30减6元') {
      returnString += returnType.type + '，省' + firstAllSave +'元\n';

    }
    if (returnType.type === '指定菜品半价') {

      returnString += returnType.type + '(';
      for(let i=0; i<secondSubtotal.length; ++i) {
        for(let id of halfIds) {
           if(secondSubtotal[i].id === id && i!= (secondSubtotal.length-1)) {
            returnString += secondSubtotal[i].name + '，';
          }
          if(secondSubtotal[i].id === id &&  i== (secondSubtotal.length-1)) {
            returnString += secondSubtotal[i].name;
          }
        }
      }

      returnString += ')，省' + secondAllSave +'元\n';
    }

    returnString += '-----------------------------------\n';
  }

  returnString += '总计：' + returnType.total + '元\n';
  returnString += '===================================\n';
  return /*TODO*/ returnString;
}

function formateIds(selectedItems) {
  return selectedItems.map(function (item) {
      let temp = item.split(' x ');
      return {
          id: temp[0],
          count: parseInt(temp[1]) || 1
      };
  });
}

function getHalfId(promotions) {
  let halfIds;

  for(let pro of promotions) {
    if(pro.type === '指定菜品半价') {
      halfIds = pro.items;
    }
  }
  return halfIds;
}

function getItemsInfo(ids, allItems) {
  let itemsInfo = [];
  for(let id of ids) {
    for(let item of allItems) {
      if(id.id === item.id) {
        itemsInfo.push(Object.assign({}, item, {count: id.count}))
      }
    }
  }
  return itemsInfo;
}

function getSubtotal(itemsInfo) {
  let itemSubtotal = [];
  for(let item of itemsInfo) {
    let result = item.price * item.count;
    itemSubtotal.push(Object.assign({}, item, {subtotal: result}))
  }
  return itemSubtotal;
}

function getAllTotal(itemSbutotal) {
  let total = 0;
  for(let item of itemSbutotal) {
    total += item.subtotal;

  }
  return total;
}

function getScondSubtotal(itemSubtotal, halfIds) {
  let secondSubtotal = [];
  

  for(let item of itemSubtotal) {
    let first = 0;
    let second = 0;

    for(let id of halfIds) {

      if(item.id === id) {
        first = item.count * (item.price / 2);
        second = first;
      } else {
        first = 0;
        second = item.subtotal;
      }
      console.log(second)
      secondSubtotal.push(Object.assign({}, item, {secondSave: first, secondSubtotal: second}))
      break;

    }
  }
  console.log(secondSubtotal)
  return secondSubtotal;
}

function getFirstAllSave(total) {
  let firstAllSave;
  if(total < 30) {
    firstAllSave = 0;
  } else {
    firstAllSave = 6;
  }
  return firstAllSave;
}

function getSecondAllSave(secondSubtotal) {
  let seconeAllSave = 0;
  for(let item of secondSubtotal) {
    seconeAllSave += item.secondSave;
  }
  return seconeAllSave;
}

function getSecondAllSubtotal(secondSubtotal) {
  let seconeAllSubtotal = 0;
  for(let item of secondSubtotal) {
    seconeAllSubtotal += item.secondSubtotal;
  }
  return seconeAllSubtotal;
}

function judge(firstAllSave, seconeAllSave, seconeAllSubtotal, total) {
  let returnType ;
  let finalTotal;

  if(firstAllSave <= seconeAllSave && firstAllSave > 0) {
    finalTotal =seconeAllSubtotal
    returnType = {total: finalTotal,type: '指定菜品半价'};
  } else if(firstAllSave === 0) {
    finalTotal = total;
    returnType = {total: finalTotal,type: 'null'};
  } else {
    finalTotal = total - firstAllSave;
    returnType = {total: finalTotal,type: '满30减6元'};
  }
  return returnType;
}
