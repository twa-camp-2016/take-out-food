/**
 * Created by SONY on 2016/7/25.
 */
'use strict';
function formatTags(tags){
  return tags.map((tag)=>{
    let [id,count] = tag.split("x");
    return {id:id.trim(),count:parseFloat(count)};
  })
}
function compare(array,id){
  return array.find((arr)=> arr.id === id);

  return null;
}
function getExist(array,id){
  for(let arr of array){
    if(arr === id){
      return arr;
    }
  }
  return null;
}
function getCartItems(formattedTags,allItems){
  let result = [];
  for(let formattedTag of formattedTags){
    let item = compare(allItems,formattedTag.id);
    if(item !== null){
      let cartItem = {
        id:item.id,
        name:item.name,
        price:item.price,
        count:formattedTag.count
      };
      result.push(cartItem);
    }
  }
  return result;
}
function getPromotionItems(cartItems,promotions){
  let result = [];
  let promotion = promotions[1];
  //console.log(promotion)
  for(let cartItem of cartItems){
    let existElement = getExist(promotion.items,cartItem.id);
    if(existElement){
      let subpayprice = cartItem.price/2;
      result.push({
        id:cartItem.id,
        name:cartItem.name,
        price:cartItem.price,
        count:cartItem.count,
        subprice:subpayprice
      })
    }else{
      result.push({
        id:cartItem.id,
        name:cartItem.name,
        price:cartItem.price,
        count:cartItem.count,
        subprice:0
      })
    }
  }
  return result;
}
function getPriceItems(promotionItems){
  let result = [];
  for(let promotionItem of promotionItems){
    let payprice =(promotionItem.price-promotionItem.subprice)*promotionItem.count;
    let saved = promotionItem.price*promotionItem.count-payprice;
      result.push({
        id:promotionItem.id,
        name:promotionItem.name,
        price:promotionItem.price,
        count:promotionItem.count,
        subprice:promotionItem.subprice,
        payprice:payprice,
        saved:saved
      })
  }
  return result;
}
function getTotalPrice(priceItems){
  let result1 = {totalpayprice:0,totalsaved:0};
  let result2 = {totalpayprice:0,totalsaved:0};
  let sum = 0;
  let totalpayprice = 0;
  let totalsaved = 0;
  for(let priceItem of priceItems){
    totalpayprice += priceItem.payprice;
    totalsaved += priceItem.saved;
    sum += priceItem.count*priceItem.price;
  }
  result1.totalpayprice = totalpayprice;
  result1.totalsaved = totalsaved;
  if(sum >= 30){
    result2.totalpayprice = sum - 6;
    result2.totalsaved = 6;
  }else{
    result2.totalpayprice = sum;
    result2.totalsaved = 0;
  }
  if(result1.totalpayprice >= result2.totalpayprice){
    return result2;
  }else{
    return result1;
  }
}
function getReceipt(priceItems,totalprice){
  return {
    priceItems:priceItems,
    totalpayprice:totalprice.totalpayprice,
    totalsaved:totalprice.totalsaved
  }
}
function getReceiptString(receipt){
  let savedItems = [];
  let line = '============= 订餐明细 =============';
  for(let receiptItem of receipt.priceItems){
    line +='\n';
    line += `${receiptItem.name} x ${receiptItem.count} = ${receiptItem.price*receiptItem.count}元`;
    if(receiptItem.saved !== 0){
      savedItems.push(receiptItem.name);
    }
  }
  line += '\n';
  line += '-----------------------------------';
  let savedItemsString = savedItems.toString();
  let saved = '';
  if(receipt.totalsaved > 6){
    saved = `使用优惠:
指定菜品半价(${savedItemsString})，省${receipt.totalsaved}元
-----------------------------------`;
  }else if(receipt.totalsaved === 6){
    saved = `使用优惠:
满30减6元，省6元
----------------------------`;
  }
  let total = `总计：${receipt.totalpayprice}元`;
const result = `
${line}
${saved}
${total}
===================================
`.trim();
  return result;
}
function loadPromotions() {
  return [{
    type: '满30减6元'
  }, {
    type: '指定菜品半价',
    items: ['ITEM0001', 'ITEM0022']
  }];
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

function bestCharge(tags){
  let formattedTags = formatTags(tags);
  let allItems = loadAllItems();
  let cartItems = getCartItems(formattedTags,allItems);
  let promotions = loadPromotions();
  let promotionItems = getPromotionItems(cartItems,promotions);
  let priceItems = getPriceItems(promotionItems);
  let totalPrice = getTotalPrice(priceItems);
  let receipt = getReceipt(priceItems,totalPrice);
  let receiptString = getReceiptString(receipt);
  return receiptString;
}
let input = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];

console.log(bestCharge(input));

