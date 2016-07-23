'use strict';
function bestCharge(selectedItems) {
  let allItems = loadAllItems();
  let promotions = loadPromotions();
  let formatedTags = getFormatedTags(selectedItems);
  let cartItems = bulidCartItems(formatedTags,allItems);
  let promotedItems = getPromotedItems(cartItems,promotions);
  let allPrices = calculateTotalPrices(promotedItems);
  let receipt = buildReceiptString(promotedItems,{totalOriginPayPrice:allPrices.totalOriginPayPrice,totalSaved:allPrices.totalSaved});
  let finallyString = printReceipt(receipt);

  return finallyString;
  console.log(finallyString);
}

function getFormatedTags(tags)  {
    let formatedTags = [];

    for(let tag of tags){
      let temp = tag.split('x');
      formatedTags.push({id:temp[0].trim(),count:parseInt(temp[1])});
    }
  return formatedTags;
}

function getExistCartById(array,id) {
    for(let item of array){
      if(item.id === id){
        return item;
      }
    }
  return null;
}


function bulidCartItems(formatedTags,allItems) {
  let cartItems = [];

  for(let formatedTag of formatedTags) {
    let found = getExistCartById(allItems,formatedTag.id);
    cartItems.push({
        id:found.id,
        name:found.name,
        price:found.price,
        count:formatedTag.count
      });
    }
  return cartItems;
}

function getPromotedItems(cartItems,promotions){
  let promotedItems = [];
  let currentPromotion = promotions[1];

    for(let cartItem of cartItems){
      let hasPromoted = false;
      let saved = 0;

      for(let item of currentPromotion.items){
          if(cartItem.id === item){
            hasPromoted = true;
          }
      }
      promotedItems.push({
        id:cartItem.id,
        name:cartItem.name,
        price:cartItem.price,
        count:cartItem.count,
        originalPayPrice:cartItem.count * cartItem.price,
        presentPayPrice:hasPromoted ? cartItem.count * cartItem.price * 0.5 : cartItem.count * cartItem.price,
        saved:hasPromoted ? cartItem.count * cartItem.price * 0.5 : saved
      });
    }
  return promotedItems;
}

function calculateTotalPrices(promotedItems) {
  let originTotalPayPrice = 0;
  let totalSaved = 0;

  for(let promotedItem of promotedItems){
        originTotalPayPrice += promotedItem.originalPayPrice;
        totalSaved += promotedItem.saved;
  }
  if(originTotalPayPrice >= 30 && totalSaved <= 6 ){
     totalSaved = 6;
  }
  let totalPayPrice = originTotalPayPrice - totalSaved;
  return {
    totalOriginPayPrice:originTotalPayPrice,
    totalPresentPayPrice:totalPayPrice,
    totalSaved:totalSaved
  }
}


function buildReceiptString(promotedItems,{totalOriginPayPrice,totalSaved}) {
  let receiptItems = [];
  let result = [];

  for(let promotedItem of promotedItems) {
    receiptItems.push({
      name: promotedItem.name,
      count: promotedItem.count,
      price: promotedItem.price,
      originalPayPrice: promotedItem.originalPayPrice,
      saved: promotedItem.saved
    });
  }
    result = {
      receiptItems,
      totalPayPrice:totalOriginPayPrice - totalSaved,
      totalSaved:totalSaved
    };
  return result;
}

function printReceipt(receipt) {
  let lines = ['============= 订餐明细 ============='];

  for(let receiptItem of receipt.receiptItems){
    let line = `${receiptItem.name} x ${receiptItem.count} = ${receiptItem.price * receiptItem.count}元`;
    lines.push(line);
  }

  let hasSaved = (receipt.totalSaved > 0);

  if(hasSaved){
    lines.push('-----------------------------------');
    lines.push('使用优惠:');
    if(receipt.totalSaved === 6){
       lines.push('满30减6元，省6元');
    }else{
      let line = '';
       for(let receiptItem of receipt.receiptItems){
         if(receiptItem.saved !== 0){
           line += `${receiptItem.name}`;
           line +='，';
         }
       }
      let s,newStr="";
      s = line.charAt(line.length-1);
      if(s === '，'){
        for(let i = 0 ; i< line.length - 1;i++){
          newStr += line[i];
        }
      }
      lines.push(`指定菜品半价(${newStr})，省${receipt.totalSaved}元`);
    }
  }
  lines.push('-----------------------------------');
  lines.push(`总计：${receipt.totalPayPrice}元`);
  lines.push('===================================');

  let receiptString = lines.join('\n');

  return receiptString;
}



