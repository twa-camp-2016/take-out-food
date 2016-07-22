
function spiltItems(inputs) {
  return inputs.map(function (tag) {
    let info=tag.split("x");
    return {
      id: info[0],
      amount: Number.parseFloat(info[1])
    };
  });
}

function loadItemsInformation(spilted,allItems) {
  let result=[];
  for (let i = 0; i < spilted.length; i++)
    for (let j = 0; j < allItems.length; j++) {
      if (spilted[i].id === allItems[j].id) {
        result.push(Object.assign({},allItems[j], {amount: spilted[i].amount}));
      }
    }
  return result;
}
function putPromotions(loadItems,promoted) {
  let result = [];
  let subTotal = 0;
  loadItems.map(function (item) {
    for (let i = 0; i < promoted.length; i++) {
      if (promoted[i].length == 2) {
        for (let j = 0; j < promoted[i].items.length; j++) {
          if (promoted[i].items[j] === item.id) {
            subTotal = item.price * item.amount;
            result.push(Object.assign({}, item, {type: peomoted[i].type, suntotalPrice: subTotal}));
          }
          else {
            subTotal = item.price * item.amount;
            result.push(Object.assign({}, item, {type: peomoted[i].type, suntotalPrice: subTotal}));
          }
        }
      }
    }
  });
  return result;
}

function calculatedPromotiionone(putOutPromotions) {
  let saved=0;
  let totalsaveone=0;
  for(let i=0;i<putOutPromotions.length;i++)
  {
    if(putOutPromotions[i].type='指定菜品半价') {
      subtotalsave= putOutPromotions[i].price / 2;
      saved+=subtotalsave;
    }
  }
  return saved;
}
function calculatedpromotiontwo(putOutPromotions) {
  let saved=0;
  let totalsavetwo=0;
  for(let i=0;i<putOutPromotions.length,i++)
  {
    totalsavetwo+=putOutPromotions[i].price*putOutPromotions.amount;
    if(totalsavetwo>=30){
      saved=6;
    }
    else
    {
      saved=0;
    }
  }
  return saved;
}

function  calculatePromotions(promotionone,promotiontwo,putOutPromotions) {
  let total=0;
  let saved=0;
  let result=[];
  if(promotionone==promotiontwo&&promotiontwo>promotionone)
  {
    for(let i=0;i<putOutPromotions.length;i++)
    {
      total+=putOutPromotions[i].price*putOutPromotions.amount-6;
    }
    saved=6;
    result.push(putOutPromotions,saved,total);
  }
  else if (promotionone>promotiontwo)
  {
    for (let i=0;i<putOutPromotions.length,i++) {
      if (putOutPromotions[i].type = '指定菜品半价') {
         saved += putOutPromotions[i].price / 2;
         total+= saved;
      }
      else {
         total+= putOutPromotions.price;
      }
      result.push(putOutPromotions,saved,total);
    }
  }
  else if(promotionone==0&&promotiontwo<30)
  {
    for(let i=0;i<putOutPromotions.length;i++)
    {
      total+=putOutPromotions[i].price*putOutPromotions[i].amount;
    }
    saved=0;
    result.push(putOutPromotions,saved,total)
  }
  return result;
}
function printReceipt() {
  let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
  let spilted = spiltItems(inputs);
  //console.log(spilted);
  let allItems = loadAllItems();
  //console.log(allItems);
  let loadItems = loadItemsInformation(spilted, allItems);
  //console.log(loadItems);
  let promoted = loadPromotions();
  //console.log(promoted);
  let putOutPromotions = putPromotions(loadItems, promoted);
  //console.log(putOutPromotions);
  let promotionone = calculatedPromotiionone(putOutPromotions);
  let promotiontwo = calculatedpromotiontwo(putOutPromotions);
  let calculateInformation=calculatePromotions(promotionone,promotiontwo,putOutPromotions);
  console.log(calculateInformation);
}
