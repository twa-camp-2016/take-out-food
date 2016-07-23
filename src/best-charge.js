function bestCharge(selectedItems) {
  let formattedItems = formatItems(selectedItems);
  let allItems = loadAllItems();
  let itemInfoList = getItemInfoList(allItems, formattedItems);
  let totalPrice = calculateTotalPrice(itemInfoList);
  let allPromotions = loadPromotions();
  let itemsWithPromotion = getPromotionInfo(totalPrice, allPromotions, itemInfoList);
  let summary = generateSummary(totalPrice, itemsWithPromotion);
  return summary;
}

function formatItems(selectedItems) {
  return selectedItems.map(item => {
    let itemPart = item.split(' x ');
    return {
      id: itemPart[0],
      count: Number.parseInt(itemPart[1])
    }
  });
}

function getItemInfoList(allItems, formattedItems) {
  return formattedItems.map(item=> {
    let found = allItems.find(entry => entry.id === item.id);
    return Object.assign({}, item, found);
  })
}

function calculateTotalPrice(itemInfoList) {
  return itemInfoList.reduce((acc, cur) => acc += cur.price * cur.count, 0);
}

function getPromotionInfo(totalPrice, allPromotions, itemInfoList) {
  let promotingItems = getPromotingItems(itemInfoList, allPromotions);
  let discount = getDiscount(promotingItems, itemInfoList);
  let promotion = getPromotion(totalPrice, promotingItems, discount);
  let promotionInfo = {
    items: itemInfoList,
    promotion: promotion
  };

  return promotionInfo;
}

function generateSummary(totalPrice, itemsWithPromotion) {
  let header = `============= 订餐明细 =============\n`;
  let body = itemsWithPromotion.items.map(item => {
    return `${item.name} x ${item.count} = ${item.price * item.count}元`;
  }).join('\n');
  let footer = getFooter(itemsWithPromotion, totalPrice);

  return `${header}${body}${footer}`;
}

// method used only in this file as private
function getFooter(itemsWithPromotion, totalPrice) {
  let footer = ``;
  let promotion = itemsWithPromotion.promotion;
  let type = promotion.type;

  if (type) {
    footer += getFooterWhenExistPromotion(type, promotion, totalPrice);
  } else {
    footer += getFooterWhenNonPromotion(totalPrice);
  }

  return footer;
}

function getFooterWhenExistPromotion(type, promotion, totalPrice) {
  let footer = `\n-----------------------------------\n使用优惠:\n`;
  if (type === '指定菜品半价') {
    footer += `${type}(${promotion.items.map(item =>item.name).join('，')})`;
  } else if (type === '满30减6元') {
    footer += `${type}`;
  }
  footer += `，省${promotion.discount}元\n-----------------------------------\n总计：${totalPrice - promotion.discount}元\n===================================`;
  return footer;
}

function getFooterWhenNonPromotion(totalPrice) {
  return `\n-----------------------------------\n总计：${totalPrice}元\n===================================`;
}

function getPromotingItems(itemInfoList, allPromotions) {
  return itemInfoList.reduce((acc, cur) => {
      let found = allPromotions.find(item => item.hasOwnProperty('items')).items.find(id => id === cur.id);
      if (found) {
        let item = itemInfoList.find(entry => entry.id === found);
        acc.push(item);
      }
      return acc;
    }
    , []);
}

function getDiscount(promotingItems, itemInfoList) {
  return promotingItems.length < 1
    ? 0
    : promotingItems.reduce((acc, cur) => {
    let found = itemInfoList.find(item=>item.id === cur.id);
    return acc += found.count * found.price / 2;
  }, 0);
}

function getPromotion(totalPrice, promotingItems, discount) {
  let promotion = {};

  if (promotingItems.length < 1) {
    if (totalPrice < 30) {
      // empty non-promotion
    }
    else {
      promotion.type = '满30减6元';
      promotion.discount = 6;
    }
  }
  else {
    if (totalPrice > 30 && discount <= 6) {
      promotion.type = '满30减6元';
      promotion.discount = 6;
    }
    else {
      promotion.type = '指定菜品半价';
      promotion.items = promotingItems;
      promotion.discount = discount;
    }
  }

  return promotion;
}
