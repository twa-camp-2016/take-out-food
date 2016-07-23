function getSelectedItems(inputs,allItems) {

  const selectItems = [];
  //   let allItems = app.loadAllItems();
  for(const input of inputs){
    const inputArray = input.split(' x ');
    const id = inputArray[0];
    const count = parseFloat(inputArray[1]);

    let item = allItems.find(item => item.id === id);
    selectItems.push({item,count});
  }

  return selectItems;
}
function getReceiptItems(selectItems,allPromotions) {

  return selectItems.map(selectItem => {
    const promotionType = findPromotionType(selectItem.item.id,allPromotions);
    const {saved,subtotal,promotionsType} = getDiscount(selectItem.count,selectItem.item.price,promotionType);
    return {selectItem,saved,subtotal,promotionsType}
  });
}
function findPromotionType(id,promotions) {

  for(let p of promotions){
    if(p.hasOwnProperty('items')){
      let promotion = p.items.some(a => a === id);
      return     promotion ? p.type : undefined;
    }
  }
}
function getDiscount(count, price, promotionType) {
  let promotionsType=promotionType;
  let subtotal = count * price;
  let saved = 0;
  if (promotionType === '指定菜品半价') {
    saved = subtotal / 2;
  }
  return {saved, subtotal,promotionsType};
}
function calculateSaveAndTotal(receiptItems){
  let totalArr=[];
  let saveTotal=0;
  let total=0;
  for(let item of receiptItems){
    saveTotal+=item.saved
    total+=item.subtotal;
  }
  totalArr.push(saveTotal,total);
  return totalArr;
}
function getBestCharge(totalArr){
  let best=[];
  let bestcharge=0;
  let proType='';
  let halfPriceTotal=totalArr[1]-totalArr[0];
  if(totalArr[1]>30)
  {
    totalArr[1]-=6;
 ;}
  if(halfPriceTotal>totalArr[1]){
    bestcharge=totalArr[1];
    proType='满30减6元';
    best.push(bestcharge,proType);
  }
  else if((halfPriceTotal<totalArr[1])){
    bestcharge=halfPriceTotal;
    proType='指定菜品半价';
    best.push(bestcharge,proType);
  }
   else
  {
    best.push(totalArr[1]);
  }
  return best;
}

function ptint(receiptItems,totalArr,best){
  let receipt = "============= 订餐明细 =============\n"
 function getText(totalArr,best) {
  let text='';

   function getpromotionInfo(totalArr,best){
    let promtionInfo=[];
    if(best[1]==='指定菜品半价'){
        promtionInfo.push(best[1],totalArr[0])
    }
     else if(best[1]==='满30减6元'){
      promtionInfo.push(best[1],6)
    }
      return promtionInfo;
  };
   if(best.length===1){
     text='';
   }
  let promtionInfo=getpromotionInfo(totalArr,best);

   if(promtionInfo[1]===6) {
     text +='-----------------------------------\n'+
       '使用优惠:\n' +best[1]
       +'，省6元\n';
   }
   else{
     text +='-----------------------------------\n'+
       '使用优惠:\n' +best[1]+'(黄焖鸡，凉皮)'
       +'，省'+totalArr[0]+'元\n';
   }
  return text;
 }
let text=getText(totalArr,best);

  for (let item of receiptItems) {
    receipt +=  item.selectItem.item.name+' x '+item.selectItem.count
      +' = '+item.subtotal + '元\n'
  }

   receipt+=text;
  receipt += '-----------------------------------\n'+
    '总计：' + best[0]+'元\n' +
    '===================================';
  return receipt;
}

function bestCharge(inputs) {

  let allItems=loadAllItems();
  let allPromotions=loadPromotions();
  let selectItems=getSelectedItems(inputs,allItems);
   let receiptItems=getReceiptItems(selectItems,allPromotions);
   let totalArr=calculateSaveAndTotal(receiptItems);
    let best=getBestCharge(totalArr);
    let recepipt = ptint(receiptItems,totalArr,best);
  return recepipt;




}
