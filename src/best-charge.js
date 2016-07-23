
function bestCharge(selectedItems) {
  const cartItems = buildCartItems(selectedItems);
  const receiptItems = buildReceiptItems(cartItems,loadAllItems());
  const promotionItems = buildDiscountItems(receiptItems);
  const receipt = buildRecipt(promotionItems);
  const receiptText = buildReceiptText(receipt);

  return receiptText;
}

function buildCartItems(selectedItems) {
  return selectedItems.map(selectedItem => {
    return {id:selectedItem.slice(0,8),count:parseInt(selectedItem.slice(11))};
  });
}

function buildReceiptItems(cartItems,allItems) {
  /*
   const receiptItems = [];
   cartItems.forEach((cartItem) => {
   const item = allItems.find(item => item.id === cartItem.id);
   const subtotal = item.price * cartItem.count;
   receiptItems.push({item:item,count:cartItem.count,subtotal:subtotal});
   });
   return receiptItems;*/
  return cartItems.map(cartItem => {
    const item = allItems.find(item => item.id === cartItem.id);
    const subtotal = item.price * cartItem.count;
    return {item:item,count:cartItem.count,subtotal:subtotal}
  });

}

function buildDiscountItems(receiptItems) {
  const discountItems = receiptItems.map(receiptItem => {
    const IsDiscount = Is2Discount(receiptItem,loadPromotions());
    return {receiptItem,IsDiscount};
  });
  return discountItems;
}

function Is2Discount(receiptItem,promotions) {
  let isdiscount = 0;
  const discountItems = promotions.find(promotion => promotion.type === '指定菜品半价').items;
  discountItems.forEach((discountItem) => {
    if (discountItem === receiptItem.item.id){
      isdiscount = 1;
    }
  });
  return isdiscount;
}

function buildRecipt(discountItems) {
  const promotion = getPromotion(discountItems);
  return {discountItems,promotion}
}

function getPromotion(discountItems) {
  let saved = 0;
  let discountTotal = 0;
  let discountSave = 0;
  let reducedTotal = 0;
  let promotion;
  let total = discountItems.map(discountedItem => discountedItem.receiptItem.subtotal)
    .reduce((prev,next) => prev + next);
  if (total >= 30){
    reducedTotal = total - 6;
  }
  const discountedItems = [];
  discountItems.forEach((discountItem) => {
    if (discountItem.IsDiscount === 1){
      discountedItems.push(discountItem.receiptItem);
    }
  });
  /*  const discountedItems = discountItems.map(discountItem => {
   if (discountedItems.IsDiscount === 1){
   return discountItem.receiptItem;
   }
   });*/

  discountedItems.forEach((discountedItem) => {
    discountSave += discountedItem.item.price / 2;
  });
  /*  discountSave = discountedItems.map(discountedItem => discountedItem.item.price / 2).reduce((prev,next) => prev + next);*/

  discountTotal = total - discountSave;

  if (reducedTotal <= discountTotal){
    saved = 6, total = reducedTotal
  }else {
    saved = discountSave, total = discountTotal
  }
  promotion = {promotionType:'指定菜品半价', saved:saved, charge:total,discountedItems:discountedItems}

  return promotion;
}


function buildReceiptText(receipt) {

  const itemtexts = [];
  receipt.discountItems.forEach((discountItem) => {
    const rec = discountItem.receiptItem;
    itemtexts.push(`${rec.item.name} x ${rec.count} = ${rec.subtotal}元`) ;
  });
  const itemText = itemtexts.join('\n');

  /*  const itemsText = receipt.discountItems.map(discountItem => {
   const rec = discountItem.receiptItem;
   return `${rec.item.name} x ${rec.count} =  ${rec.subtotal}元`
   }).join('\n');*/

  let receiptText = `
============= 订餐明细 =============
${itemText}
-----------------------------------
总计：${receipt.promotion.charge}元
===================================`;
  if (receipt.promotion.promotionType === '满30减6元'){
    receiptText = `
============= 订餐明细 =============
${itemText}
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：${receipt.promotion.charge}元
===================================`;
  }
  if (receipt.promotion.promotionType === '指定菜品半价'){

    const names = receipt.promotion.discountedItems.map(discountedItem => discountedItem.item.name);
    receiptText = `
============= 订餐明细 =============
${itemText}
-----------------------------------
使用优惠:
指定菜品半价(${names.join()})\
，省${receipt.promotion.saved}元
-----------------------------------
总计：${receipt.promotion.charge}元
===================================`;
  }

  return receiptText
}
