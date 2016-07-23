'use strict'
function bestCharge(inputs) {
  const allItems = loadAllItems();
  const promotions = loadPromotions();

  const cartItems = buildCartItems(inputs, allItems);
  const receiptItems = buildReceiptItems(cartItems, promotions);
  const receipt = buildReceipt(receiptItems);
  const receiptText = toPrintReceipt(receipt);

  return receiptText;
}
let buildCartItems=(inputs,allItems)=>{

  let cartItems=[];
  inputs.map(input=>{
    const splitedInput=input.split('x');
    const id=splitedInput[0].trim();
    const count=parseInt(splitedInput[1].trim());

    let item=allItems.find(item=>item.id===id);
        cartItems.push({item,count});
  });
  return cartItems;
};

let buildReceiptItems=(cartItems,promotions)=>{

   return cartItems.map(cartItem=>{
    let subtotal=cartItem.item.price*cartItem.count;
    let promotionType=getPromotionType(cartItem.item.id,promotions[1].items);
     let saved=0;
     if(promotionType==='指定菜品半价')
     {
       saved=cartItem.item.price/2;
     }
    return {cartItem,subtotal,saved,promotionType}
  });
};
let getPromotionType=(id,promotions1)=>{

  const item=promotions1.find(item=>item===id);

  return item ? '指定菜品半价':'满30减6元';
};
let buildReceipt=(receiptItems)=>{
  let total = 0,saved=0;
  let savedTotal = 0,save=0;
  let promotion;
  for (const receiptItem of receiptItems) {
    total += receiptItem.subtotal;
    saved+=receiptItem.saved;
    if(total>30){
      save=saved>6?saved:6;
    }
    else{
      save=saved;
    }

  }
  savedTotal =save;
  let preferentialTotal=total-savedTotal;
  if(save===6){promotion='满30减6元';}
  else if(save===0){promotion=undefined;}
  else{promotion='指定菜品半价';}
  return {receiptItems, preferentialTotal, savedTotal,promotion}
};
let toPrintReceipt=(receipt)=>{

  let receiptItemsText = receipt.receiptItems
    .map(receiptItem => {
      const cartItem = receiptItem.cartItem;
      return `${cartItem.item.name} x ${cartItem.count} = ${receiptItem.subtotal}元`;}).join('\n');

  let title=`============= 订餐明细 =============
${receiptItemsText}
-----------------------------------`;
  let footer=`总计：${receipt.preferentialTotal}元
===================================`;
  let discountItems=receipt.receiptItems.filter(discountItem=>discountItem.promotionType==='指定菜品半价');
  if(receipt.promotion==='满30减6元'){
  return title+'\n'+`使用优惠:
满30减6元，省6元
-----------------------------------`+'\n'+footer;
}
  else if(receipt.promotion==='指定菜品半价'){
    return title+'\n'+`使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省${receipt.savedTotal}元
-----------------------------------`+'\n'+footer;
  }
  else{
    return title+'\n'+footer;
  }
};
