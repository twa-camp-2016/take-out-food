function bestCharge(selectedItems) {
  const cartItems = buildCartItems(selectedItems);
  const chargeItems = chooseCharge(cartItems);
  const receipt = buildReceipt(chargeItems);
  
  return buildReceiptText(receipt);
}

function buildCartItems(tags) {
  const items = loadAllItems();
  let cartItems = [];

  for (const tag of tags) {
    const tagArray = tag.split(' x ');
    const id = tagArray[0];
    const count = parseFloat(tagArray[1]);

    let item = items.find(item => item.id == id);
    let originCost = item.price * count;

    cartItems.push({item, count, originCost});
  }

  return cartItems;
}

function chooseCharge(cartItems) {
  let promotion = getBestPromotion(cartItems);

  return {cartItems, promotion};
}

function getBestPromotion(cartItems) {
  let originTotal = 0;

  for (let cartItem of cartItems) {
    originTotal += cartItem.originCost;
  }

  let promotion = dealHalfPrice(cartItems, originTotal);

  if (originTotal >= 30 && promotion.saved <= 6) {
    return {
      originTotal: originTotal,
      promotionType: '满30减6元',
      saved: 6,
      names: []
    }
  } else {
    return promotion;
  }

}

function dealHalfPrice(cartItems, originTotal) {
  const promotions = loadPromotions();
  let names = [];
  saved = 0;
  let promotionType = undefined;

  for (let cartItem of cartItems) {
    let promotion = promotions.find((promotion) => {
      if (promotion.items && promotion.items.includes(cartItem.item.id)) {
        names.push(cartItem.item.name);
        saved += cartItem.originCost / 2;
        promotionType = promotion.type;
        return promotion;
      }
    });
  }

  return {originTotal, promotionType, saved, names}
}

function buildReceipt(chargeItems) {
  let total = chargeItems.promotion.originTotal - chargeItems.promotion.saved;

  return {chargeItems, total};

}

function buildReceiptText(receipt) {
  const cartItemText = buildCartItemText(receipt.chargeItems.cartItems);
  const promotionText = buildPromotionText(receipt.chargeItems.promotion);
  return `
============= 订餐明细 =============
${cartItemText}
-----------------------------------
${promotionText}总计：${receipt.total}元
===================================`;
}

function buildPromotionText(promotion) {
  let namesText = '';

  if (promotion.promotionType === undefined) {
    return '';
  } else {

    if (promotion.names.length > 0) {
      namesText = '(' + promotion.names.map(name => `${name}`).join('，') + ')'
    }

    return `使用优惠:
${promotion.promotionType}${namesText}，省${promotion.saved}元
-----------------------------------
`;
  }
}

function buildCartItemText(cartItems) {

  return cartItems.map(cartItem => {
    return `${cartItem.item.name} x ${cartItem.count} = ${cartItem.originCost}元`
  }).join('\n')
}



