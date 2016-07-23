//'use strict';
'use strict';
function bestCharge(tags) {
  const allItems = loadAllItems();
  const selectedItems = buildSelectedItems(tags, allItems);

  const promotions = loadPromotions();
  const receipt = buildReceipt(selectedItems, promotions);
  //
  // const someItemReceipt=buidSomeItemReceipt(selectedItems);

  // const  bestChargesItems=CompareTwoPromotions(halfPriceReceipt,someItemReceipt);

   const receiptText=buildReceiptText(receipt);

  return  receiptText;
}

function buildSelectedItems(tags, allItems) {
  const selectedItems = [];

  for (let tag of tags) {
    const tagArray = tag.split(' ');
    const barcode = tagArray[0];
    const count = parseFloat(tagArray[2]);
    const item = allItems.find(allItem=>allItem.id === barcode);
    selectedItems.push({item, count});
  }
  return selectedItems;
}


function buildReceipt(selectedItems, promotions) {

  const halfPriceItems = buildHalfPriceItems(selectedItems, promotions);

  const totalDiscountItems = buildTotalDiscountItems(selectedItems, promotions);

  return getTotal(halfPriceItems,totalDiscountItems);

}


function buildHalfPriceItems(selectedItems, promotions) {

  return selectedItems.map(selectedItem=> {
    const item = selectedItem.item;

    const count = selectedItem.count;
    let subtotal = item.price * count;
    let saved = 0;

    const promotion = promotions.find(promotion=>
    promotion.type === '指定菜品半价' && promotion.items.some(id=>id === item.id));
    if (promotion) {
      saved = (item.price / 2) * count;
    }
    subtotal -= saved;
    return {selectedItem, subtotal, saved}
  });
}


function buildTotalDiscountItems(selectedItems, promotions) {

  return selectedItems.map(selectedItem=> {
    const item = selectedItem.item;

    const count = selectedItem.count;
    let subtotal = item.price * count;

    return {selectedItem, subtotal}
  });
}


function getTotal(halfPriceItems,totalDiscountItems) {

  let halfPriceItemsTotal=0;
  let   halfPriceItemssaved=0;
  let   totalDiscountItemsTotal=0;

  for (let halfPriceItem of halfPriceItems) {
     halfPriceItemsTotal+=halfPriceItem .subtotal;
    halfPriceItemssaved+=halfPriceItem.saved;
  }
  for (let totalDiscountItem of totalDiscountItems) {
    totalDiscountItemsTotal +=totalDiscountItem .subtotal;

}
  if (totalDiscountItemsTotal > 30) {
     totalDiscountItemsTotal -= 6;
  }

   return halfPriceItemsTotal > totalDiscountItemsTotal ? {
    receiptItems: totalDiscountItems,
     total: totalDiscountItemsTotal,
     type:'满30减6元'
   } : {receiptItems:halfPriceItems, total: halfPriceItemsTotal,savedTotal:halfPriceItemssaved,type:'指定菜品半价'};

}


function buildReceiptText(receipt) {
    const receiptItems=receipt.receiptItems;
  let typeInfo='';

  const receiptText=receiptItems.map(receiptItem=>{

    const selectedItem=receiptItem.selectedItem;

     return `${selectedItem.item.name} x ${selectedItem.count} = ${receiptItem.subtotal}元`;
  }).join('\n');


  if(receipt.type='满30减6元') {
     typeInfo=`使用优惠:
满30减6元，省6元`
  }
  else if(receipt.type='指定菜品半价')  {
    typeInfo=`使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省${receipt.savedTotal}元`
}
  else{

    return  `
============= 订餐明细 =============
${receiptText}
-----------------------------------
总计：${receipt.total}元
===================================`.trim();
  }

    return `
============= 订餐明细 =============
${receiptText}
-----------------------------------
${typeInfo}
-----------------------------------
总计：${receipt.total}元
===================================`.trim();

}

