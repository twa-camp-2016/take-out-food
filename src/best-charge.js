let tags = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];


function getFoodCount(tags) {
  return tags.map((element)=> {
    return {id: element.split("x")[0].trimRight(), count: parseInt(element.split("x")[1])}
  });
}
function loadAllItems() {
  return [{
    id: 'ITEM0001',
    name: '黄焖鸡',
    price: 18.00
  }, {
    id: 'ITEM0013',
    name: '肉夹馍',
    price: 6.00
  }, {
    id: 'ITEM0022',
    name: '凉皮',
    price: 8.00
  }, {
    id: 'ITEM0030',
    name: '冰锋',
    price: 2.00
  }];

}

function bulitFoodItems(foodCounts, allItems) {
  return foodCounts.map(({id, count})=> {
      for (let everItems of allItems) {
        let hasExit = (id === everItems.id);
        if (hasExit) {
          return {id, name: everItems.name, count, price: everItems.price}
        }
      }
    }
  );

}
function loadPromotions() {
  return [{
    type: '满30减6元'
  }, {
    type: '指定菜品半价',
    items: ['ITEM0001', 'ITEM0022']
  }];
}

function promotionPrice(printBuiltItems, promotionItems) {
  let halfName = [];
  //let result = [];
  let totalPrice = printBuiltItems.map(({count, price})=> {
    return littlePrice = count * price;
  });
  //console.log(totalPrice);
  let total = totalPrice.reduce((before, after)=> {
    return before + after;
  });
  //console.log(total);


  let manSave = 0;
  let afterTotal;
  if (total >= 30) {
    manSave = manSave + 6;
    //afterTotal = total - manSave;
    //console.log(afterTotal);
  }

  afterTotal = total - manSave;
  //console.log(afterTotal);

  let sum = 0;
  for (let everyPromotiomItems of promotionItems) {
    if (everyPromotiomItems.type === '指定菜品半价') {
      let items = everyPromotiomItems.items;
      //console.log(items);
      for (let againBuiltPrice of printBuiltItems) {
        for (let item of items) {
          if (againBuiltPrice.id === item) {
            halfName.push(againBuiltPrice.name);
            let price = againBuiltPrice.count * againBuiltPrice.price / 2;
            //sum=sum+price;
            //console.log(sum);}
            sum = sum + price;
            //console.log(sum);
          }
          //console.log(sum);
        }
      }
      //console.log(halfName);
    }
  }
  //console.log(sum);
  let myTotalPrice = total - sum;
  //console.log(totalPrice);
  //console.log(total);
  //console.log(myTotalPrice);
  //console.log(afterTotal);
  let printBuiltItem = printBuiltItems.map((builtItem, index)=> {
    builtItem.perPrices = totalPrice[index];
    return builtItem;
  });
  //console.log(printBuiltItem);

  //console.log(halfName);
  return result = {
    items: printBuiltItem,
    //perPrice:totalPrice,
    total: total,
    saveMan: manSave,
    afterTotal: afterTotal,
    saveHalfPrice: sum,
    myTotalPrice: myTotalPrice,
    halfName: halfName
  };
}
function builtPrintItems(promottedItems) {
  let lines = ["============= 订餐明细 ============="];
  if (promottedItems.saveMan === 0 && promottedItems.saveHalfPrice === 0) {
    for (let {name, count, perPrices} of promottedItems.items) {
      lines.push(`${name} x ${count} = ${perPrices}元`);
    }
    lines.push("-----------------------------------");
    lines.push(`总计：${promottedItems.total}元`);
    lines.push("===================================");
  }
  if ((promottedItems.saveMan < 0 && promottedItems.saveHalfPrice > 0) || promottedItems.myTotalPrice < promottedItems.afterTotal) {
    for (let {name, count, perPrices} of promottedItems.items) {
      lines.push(`${name} x ${count} = ${perPrices}元`);
    }

    lines.push("-----------------------------------");
    lines.push("使用优惠:");
    lines.push(`指定菜品半价(${promottedItems.halfName.join('，')})，省${promottedItems.saveHalfPrice}元`);
    lines.push("-----------------------------------");
    lines.push(`总计：${promottedItems.myTotalPrice}元`);
    lines.push("===================================");
  }
  if ((promottedItems.saveMan > 0 && promottedItems.saveHalfPrice < 0) || promottedItems.myTotalPrice > promottedItems.afterTotal) {
    for (let {name, count, perPrices} of promottedItems.items) {
      lines.push(`${name} x ${count} = ${perPrices}元`);
    }
    lines.push("-----------------------------------");
    lines.push("使用优惠:");
    lines.push(`满30减6元，省${promottedItems.saveMan}元`);
    lines.push("-----------------------------------");
    lines.push(`总计：${promottedItems.afterTotal}元`);
    lines.push("===================================");
  }
  //return lines;
  let recepitString = lines.join('\n');
  return recepitString;
}


function bestCharge(tags) {
  let foodCounts = getFoodCount(tags);
  //console.log(getFoodCount(tags));
  let allItems = loadAllItems();
  let printBuiltItems = bulitFoodItems(foodCounts, allItems);
  // console.log(bulitFoodItems(foodCounts,allItems));
  let promotionItems = loadPromotions();
  // console.log(promotionPrice(printBuiltItems,promotionItems));
  let promottedItems = promotionPrice(printBuiltItems, promotionItems);
  let notes = builtPrintItems(promottedItems);

  //return notes;
  console.log(notes);


}

bestCharge(tags);
