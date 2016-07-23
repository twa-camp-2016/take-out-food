/*function bestCharge(selectedItems) {
  return Charge(selectedItems).trim();
}*/

function bestCharge(inputs){
   const allItems = loadAllItems();
   const cartItems = buildCartItems(inputs,allItems);

   const allPromotions = loadPromotions();
   const receiptItems = buildReceiptItems(cartItems,allPromotions);

   const receipt = buildReceipt(receiptItems);

   const receiptText = buildReceiptText(receipt);

   return receiptText.trim();
}

function buildCartItems(inputs,allItems) {
    return inputs.map(input => {
    const inputArray = input.split(' x ');
    const id = inputArray[0];
    let count = parseFloat(inputArray[1]);

    const item = allItems.find(item => item.id === id)
    return {item,count};
  });
}

function buildReceiptItems(cartItems,allPromotions) {
    return cartItems.map(cartItem => {
      const promotionType = findPromotionType(cartItem.item.id,allPromotions);
      const {halfSave,subtotal} = discount(cartItem.count,cartItem.item.price,promotionType);
      return {cartItem,halfSave,subtotal,promotionType};
    });
}

function findPromotionType(id,promotions) {

  for(const promotion of promotions){
    if(promotion.hasOwnProperty('items')){
      let promotionType = promotion.items.some(i => i === id);
      return promotionType ? promotion.type : undefined;
    }
  }
}

function discount(count,price,promotionType) {
  let subtotal = count * price;
  let halfSave = 0;

  if(promotionType === '指定菜品半价'){
    halfSave = subtotal/2;
  }

  return {halfSave,subtotal};
}

function buildReceipt(receiptItems) {
  let totals = 0;
  let saveTotals = 0;
  let promotiontype;
  let cart = '';

  for(const receiptItem of receiptItems){
    totals += receiptItem.subtotal;
    saveTotals += receiptItem.halfSave;

    if(receiptItem.promotionType ==='指定菜品半价'){
      cart += receiptItem.cartItem.item.name + '，';
    }
  }

  const {total,saveTotal,promotionType} = findBestTpy(totals,saveTotals,promotiontype);
  if(totals > 30 && 6 < saveTotals){
    cart = '(' + cart.slice(0,-1) + ')';
  }
  return {receiptItems,promotionType,total,saveTotal,cart};
}


function findBestTpy(total,saveTotal,promotionType) {

   if(total >= 30 && 6 >= saveTotal){
      total -= 6;
      saveTotal = 6;
      promotionType = '满30减6元';
  }else if(total >= 30 &&  6 < saveTotal){
     total -= saveTotal;
     promotionType = '指定菜品半价';
  }else{
     promotionType = undefined;
  }
  return {total,saveTotal,promotionType}
}

function buildReceiptText(receipt) {
  const receiptText = receipt.receiptItems
    .map(receiptItem => {
      const cartItem = receiptItem.cartItem;

      return `${cartItem.item.name} x ${cartItem.count} = ${receiptItem.subtotal}元`;
    }).join('\n');
  return output(receiptText,receipt);
}

function output(receiptText,receipt) {

  let text;
  if (receipt.promotionType === '指定菜品半价') {
   text =  `
============= 订餐明细 =============
${receiptText}
-----------------------------------
使用优惠:
${receipt.promotionType}${receipt.cart}，省${receipt.saveTotal}元
-----------------------------------
总计：${receipt.total}元
===================================`;
  } else if (receipt.promotionType === '满30减6元') {
    text = `
============= 订餐明细 =============
${receiptText}
-----------------------------------
使用优惠:
${receipt.promotionType}，省${receipt.saveTotal}元
-----------------------------------
总计：${receipt.total}元
===================================`;
  } else {
    text =  `
============= 订餐明细 =============
${receiptText}
-----------------------------------
总计：${receipt.total}元
===================================`;
  }
  return text;
}
