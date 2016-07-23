function formatTags(tags){
  return tags.map((tag)=>{
    let [id,count] = tag.split("x");
    return {id:id.trim(),count:parseFloat(count)}
  });
}
function compare(array,id){
  for(let arr of array){
    if(arr.id === id){
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
  for(let cartItem of cartItems){
    let existElement = compare(promotion.items,cartItem.id);
    if(existElement){
      let sub = parseFloat(cartItem.price)/2;
      console.log("aaaaaaaaaa"+cartItem.price);
      result.push({
        id:cartItem.id,
        name:cartItem.name,
        price:cartItem.price,
        count:cartItem.count,
        subprice:sub
      });
    }else{
      result.push({
        id:cartItem.id,
        name:cartItem.name,
        price:cartItem.price,
        count:cartItem.count,
        subprice:0
      });
    }
  }
  return result;
}
function getPriceItems(promotionItems){
  let result = [];
  for(let promotionItem of promotionItems){
    if(promotionItem.subprice === 0.00){
      let pay = promotionItem.price*promotionItem.count;
      result.push({
        name:promotionItem.name,
        price:promotionItem.price,
        count:promotionItem.count,
        subprice:promotionItem.subprice,
        payprice:pay,
        saved:0.00
      });
    }else{
      let pay = promotionItem.subprice*promotionItem.count;
      let save = promotionItem.subprice*promotionItem.count;
      result.push({
        name:promotionItem.name,
        price:promotionItem.price,
        count:promotionItem.count,
        subprice:promotionItem.subprice,
        payprice:pay,
        saved:save
      });
    }
  }
  return result;
}
function getTotalPrice(priceItems){
  let result1 = {totalpayprice:0,totalsaved:6.00};
  let result2 = {totalpayprice:0,totalsaved:0};
  let sum = 0;
  let subtotal = 0;
  let subsaved = 0;
  for(let priceItem of priceItems){
     sum += priceItem.price*priceItem.count;
     subtotal += priceItem.payprice;
    subsaved += priceItem.saved;
  }
  result2.totalpayprice = subtotal;
  result2.totalsaved = subsaved;
  if(sum>30.00){
    result1.totalpayprice = sum - 6.00;
  }

  if(result1.totalpayprice <= result2.totalpayprice){
    return result1;
  }else{
    return result2;
  }
  return null;
}
function getReceipt(priceItems,totalprice){
  let receiptItems = [];
  for(let priceItem of priceItems){
    receiptItems.push({
      name:priceItem.name,
      price:priceItem.price,
      count:priceItem.count,
      subprice:priceItem.subprice,
      payprice:priceItem.payprice,
      saved:priceItem.saved
    })
  }
  return {
    receiptItems,
    totalpayprice:totalprice.totalpayprice,
    totalsaved:totalprice.totalsaved
  }
}
function getReceiptString(receipt){
  let lines = [];
  for(let item of receipt){
   let line = `${item.name} x ${item.count} = ${item.payprice}(元)`;
    if(item.saved>0){
      fovorItems.push(item.name);
    }
  }
  lines.push(line);
  let totalpayprice = receipt.totalpayprice;
  let totalsaved = receipt.totalsaved;
  let receiptString  = "";
  let fovorItems = [];
 for(let item of receipt){
  receiptString += `${item.name} x ${item.count} = ${item.payprice}(元)`;
   receiptString += "\n";
   if(item.saved>0){
     fovorItems.push(item.name);
   }
}
  let fovorItemsSting = fovorItems.toString();
  let fovorString = `使用优惠:
  指定菜品半价(${fovorItemsSting})，省${totalsaved}元
  -------------------------------`;
  const  result =`===========订单明细==========
  ${receiptString}----------------------
  ${fovorString}
  总计：${totalpayprice}元
===========================`.trim();
  return result;
}
function bestCharge(tags) {
  let formattedTags = formatTags(tags);
  let cartItems  = getCartItems(formattedTags,loadAllItems());
  let promotionItems = getPromotionItems(cartItems,loadPromotions());
  let priceItems = getPriceItems(promotionItems);
  let totalprice = getTotalPrice(priceItems);
  let receipt = getReceipt(priceItems,totalprice);
  let receiptString = getReceiptString(receipt);
  return receiptString;
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

let input = [{
  id: 'ITEM0001',
  name: '黄焖鸡',
  price: 18.00,
  count:1
}, {
  id: 'ITEM0013',
  name: '肉夹馍',
  price: 6.00,
  count:2
}, {
  id: 'ITEM0022',
  name: '凉皮',
  price: 8.00,
  count:1
}];
promotions = [{
  type: '满30减6元'
}, {
  type: '指定菜品半价',
  items: ['ITEM0001', 'ITEM0022']
}];
console.log(getPromotionItems(input,promotions));
//console.log(loadAllItems());
