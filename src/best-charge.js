function bestCharge(selectedItems) {
  const allItems = loadAllItems();
  const cartItems = buildCartItems(selectedItems, allItems);
  const promotions = loadPromotions();
  const receiptItems = buildReceiptItems(cartItems, promotions);
  const receipt = buildReceipt(receiptItems);
  const bestCharge = buildBestCharge(receipt);

  return bestCharge;
}

function buildCartItems(selectedItems, items) {
  const cartItems = [];
  const splitItems = selectedItems.map(selectedItem=>selectedItem.split('x'));
  for (let splitItem of splitItems) {
    let item = items.find(item=>item.id === splitItem[0].slice(0, -1));
    cartItems.push({item, count: parseInt(splitItem[1].slice(1, 2))});
  }
  return cartItems;
}

function buildReceiptItems(cartItems, promotions) {
  return cartItems.map(cartItem=> {
    const promotionType = findPromotionType(cartItem.item.id, promotions);
    const {subtotal, saved}=discount(cartItem.count, cartItem.item.price, promotionType);
    return {cartItem, subtotal, saved};
  })
}

function findPromotionType(id, promotions) {
  const promotion = promotions.find(promotion=> {
      if (promotion.items) {
        return promotion.items.some(i=>i === id)
      }
    }
  )
  return promotion ? promotion.type : undefined;
}

function discount(count, price, promotionType) {
  let subtotal = count * price;
  let saved = 0;
  if (promotionType === '指定菜品半价') {
    saved = parseInt(count * price / 2);
  }

  return {subtotal, saved};
}

function buildReceipt(receiptItems) {
  let beforeTotal = 0;
  let savedTotal = 0;
  for (let receiptItem of receiptItems) {
    savedTotal += receiptItem.saved;
    beforeTotal += receiptItem.subtotal;
  }
  let total = beforeTotal - savedTotal;
  let compareTotal = beforeTotal - parseInt(parseInt((beforeTotal / 30)) * 6);

  if (total > compareTotal) {
    total = compareTotal;
    savedTotal = beforeTotal - compareTotal;
    return {receiptItems, total, savedTotal, promotionType: '满30减6元'};
  }
  else if (total < beforeTotal) {
    return {receiptItems, total, savedTotal, promotionType: '指定菜品半价'};
  }
  else {
    return {receiptItems, total, savedTotal, promotionType: ''};
  }
}

function findname(receiptItems) {
  const nameText=receiptItems.map(receiptItem=>{
      if(receiptItem.saved!=0) {
        return `${receiptItem.cartItem.item.name}`
      }
    })
    .join();
  return `${nameText.slice(0,3)}，${nameText.slice(5,7)}`;
}

function buildBestCharge(receipt) {
  let promotion;
  let  receiptItemNames=[];
  let bestCharge = receipt.receiptItems.map(receiptItem=> {
    const cartItem = receiptItem.cartItem;
    return `${cartItem.item.name} x ${cartItem.count} = ${receiptItem.subtotal}元`
  }).join('\n');

  let name;
  if(receipt.promotionType==='指定菜品半价'){
    name = `(${findname(receipt.receiptItems)})，`;
  }
  if(receipt.promotionType==='满30减6元'){
    name = '，';
  }
  if (receipt.savedTotal === 0) {
    promotion = `-----------------------------------`
  } else {
    promotion = `-----------------------------------
使用优惠:
${receipt.promotionType}${name}省${receipt.savedTotal}元
-----------------------------------`
  }
  let bestChargeText = `============= 订餐明细 =============
${bestCharge}
${promotion}
总计：${receipt.total}元
===================================`;

  return bestChargeText;
}
