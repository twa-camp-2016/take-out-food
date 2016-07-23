function bestCharge(selectedItems) {
  const allItems = loadAllItems();
  const cartItems = buildCartItems(selectedItems, allItems);

  const promotions = loadPromotions();
  const promotionItems = buildPromotionItems(cartItems, promotions);

  const receiptText = printReceipt(promotionItems);

  return receiptText;
}

function buildCartItems(selectedItems, allItems) {
  const cartItems = [];
  for (const selectedItem of selectedItems) {
    const splittedItem = selectedItem.split(' x');
    const barcode = splittedItem[0];
    const count = parseFloat(splittedItem[1]);

    const item = allItems.find(item => item.id === barcode);
    if (item) {
      cartItems.push({item, count});
    }
  }
  return cartItems;
}

function buildPromotionItems(cartItems, promotions) {

  const savedPromotions = buildSavedPromotions(cartItems, promotions);

  return {cartItems, savedPromotions};
}

function buildSavedPromotions(cartItems, promotions) {
  let Total = 0;

  for (const cartItem of cartItems) {
    Total += cartItem.item.price * cartItem.count;
  }
  return promotions.map(promotion => {

    if (promotion.type === '满30减6元') {
      let saved = 0;
      if (Total >= 30) {
        saved = 6;
      }
      let total = Total - saved;

      return {promotion, saved, total};
    }

    else if (promotion.type === '指定菜品半价') {
      let saved = 0;
      for (const cartItem of cartItems) {
        if (promotion.items.find(item => item === cartItem.item.id)) {
          saved += parseFloat(cartItem.item.price / 2 * cartItem.count);
        }
      }
      let total = Total - saved;

      return {promotion, saved, total};
    }
  });
}

function printReceipt(promotionItems) {
  let receiptText = promotionItems.cartItems.map(cartItem=> {
    return `${cartItem.item.name} x ${cartItem.count} = ${cartItem.item.price * cartItem.count}元`
  }).join('\n');

  let smallTotal = promotionItems.savedPromotions.reduce((a, b)=> {
    return (a.total > b.total) ? b : a;
  });

  let text = buildText(promotionItems, smallTotal);

  return `
============= 订餐明细 =============
${receiptText}
${text}
总计：${smallTotal.total}元
===================================`
}

function buildText(promotionItems, smallTotal) {
  let text = '';

  if (smallTotal.promotion.type === '指定菜品半价') {
    let promotionProducts = promotionItems.savedPromotions[1].promotion.items.map(item => {
      return promotionItems.cartItems.find(cartItem => cartItem.item.id === item)
    });

    text = `-----------------------------------
使用优惠:
${smallTotal.promotion.type}\
(${promotionProducts[0].item.name}，${promotionProducts[1].item.name})，\
省${smallTotal.saved}元
-----------------------------------`
  }
  if (smallTotal.promotion.type === '满30减6元') {
    text = `-----------------------------------
使用优惠:
${smallTotal.promotion.type}，省${smallTotal.saved}元
-----------------------------------`
  }
  if (smallTotal.saved === 0) {
    text = `-----------------------------------`;
  }

  return text;
}
