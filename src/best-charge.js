function bestCharge(selectedItems) {
  let allItems=loadAllItems();
  let promotions=loadPromotions();
  let formattedTags=buildFormattedTags(selectedItems);
  let cartItems=buildCartItems(formattedTags,allItems);
  let promotionItems=buildPromotionItems(cartItems,promotions);
  let totalPay=buildTotalPay(promotionItems);
  let receipt=buildReceipt(promotionItems,totalPay);
  let receiptString=buildReceiptString(receipt);
  return receiptString;
}

function buildFormattedTags(tags){
  return tags.map((tag)=>{
    let [id,count]=tag.split(' x ');
    return {id:id,count:parseInt(count)}
  })
}

function _exitById(array,id){
  return array.find((item)=>item.id===id);
}
function buildCartItems(formattedTags,allItems){
  return formattedTags.map(({id, count})=>{
    // let {id, name, price}=_exitById(allItems,id);
    // return  {id, name, price, count};
    let found=allItems.find((item)=>item.id===id);
    return {id, name:found.name, price:found.price,count};
  })
}
function buildPromotionItems(cartItems,promotions){
  let promotion = promotions.find((item)=>item.type=="指定菜品半价");
  return cartItems.map(({id, name, price, count})=>{
    let hasPromotted=promotion.items.find((item)=>item===id);
    let shouldPay=count*price;
    let saved=hasPromotted?shouldPay*0.5:0;
    let type=hasPromotted?'指定菜品半价':'';
    let payPrice=shouldPay-saved;
    return {id, name, price, count, type, saved, shouldPay, payPrice}
  })
}
function buildTotalPay(promotionItems){
  let newResult = promotionItems.reduce((result,{type,saved,payPrice,shouldPay})=>{
    result.totalPayPrice+=payPrice;
    result.totalSaved+=saved;
    result.type=type;
    result.shouldPay+=shouldPay;
    return result;
  },{totalPayPrice:0,totalSaved:0,type:'',shouldPay:0});
  console.log(newResult);
  if(newResult.shouldPay>30&&newResult.shouldPay-6<newResult.totalPayPrice){
    newResult.type='满30减6元';
    newResult.totalPayPrice=newResult.shouldPay-6;
    newResult.totalSaved=6;
  }
  return newResult;
}
function buildReceipt(promotionItems,totalPay){
  let receiptItems=promotionItems.map(({type,name, count,shouldPay})=>{
    return {name,count,shouldPay,type};
  });

  return {
    receiptItems,
    type: totalPay.type,
    totalPayPrice: totalPay.totalPayPrice,
    totalSaved: totalPay.totalSaved
  }
}
function buildReceiptString(receipt){
  let receipts='';
  let middle='';
  let foods=[];
  receipt.receiptItems.forEach(({type,name, count, shouldPay})=>{
    receipts+=`${name} x ${count} = ${shouldPay}元\n`;
    if(type!==''){
      foods.push(name);
    }
  });
  if(receipt.totalSaved>0){
    if(receipt.type!==""&&receipt.type!=='满30减6元') {
      middle += `使用优惠:
${receipt.type}(${foods.join('，')})，省${receipt.totalSaved}元
-----------------------------------\n`;
    }
    if(receipt.type==='满30减6元'){
      middle+=`使用优惠:
满30减6元，省6元
-----------------------------------\n`;
    }
  }
  let expected = `
============= 订餐明细 =============
${receipts}-----------------------------------
${middle}总计：${receipt.totalPayPrice}元
===================================`;
  return expected;
}
