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
  let totalPrice = 0;
  for (let item of itemInfoList) {
    totalPrice += item.price * item.count;
  }
  return totalPrice;
  // todo
  // return itemInfoList.reduce((acc, cur) => {
  //   return acc += cur.price * cur.count;
  // }, 0);
}

function getPromotingItems(itemInfoList, allPromotions) {
  let promotingItems = [];
  for (let element of itemInfoList) {
    let found = allPromotions.find(item => item.hasOwnProperty('items')).items.find(id => id === element.id);
    if (found) {
      let item = itemInfoList.find(entry => entry.id === found);
      promotingItems.push(item);
    }
  }
  return promotingItems;
}

function getDiscount(promotingItems, itemInfoList) {
  let discount = 0;
  if (promotingItems.length >= 1) {
    for (let entry of promotingItems) {
      let found = itemInfoList.find(item => item.id === entry.id);
      if (found) {
        discount += found.count * found.price / 2;
      }
    }
  }
  return discount;
}

function getPromotion(totalPrice, promotingItems, discount) {
  let promotion = {};
  if (totalPrice < 30) {
    if (promotingItems.length < 1) {
      // promotion should be empty
    } else {
      promotion.type = '指定菜品半价';
      promotion.items = promotingItems;
      promotion.discount = discount;
    }
  } else {
    // totalPrice >= 30
    if (promotingItems.length < 1) {
      promotion.type = '满30减6元';
      promotion.discount = 6;
    } else {
      if (discount > 6) {
        promotion.type = '指定菜品半价';
        promotion.discount = discount;
        promotion.items = promotingItems;
      } else {
        promotion.type = '满30减6元';
        promotion.discount = 6;
      }
    }
  }
  return promotion;
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

function getFooter(itemsWithPromotion, totalPrice) {
  let footer = ``;

  let promotion = itemsWithPromotion.promotion;
  let type = promotion.type;

  if (type) {
    getFooterWhenExistPromotion();
  } else {
    getFooterWhenNonPromotion();
  }

  return footer;


  function getFooterWhenExistPromotion() {
    footer = `\n-----------------------------------\n使用优惠:\n`;
    if (type === '指定菜品半价') {
      footer += `指定菜品半价(${promotion.items.map(item => {
        return item.name
      }).join('，')})`;
    } else if (type === '满30减6元') {
      footer += '满30减6元';
    }
    footer += `，省${promotion.discount}元\n-----------------------------------
总计：${totalPrice - promotion.discount}元\n===================================`;
  }

  function getFooterWhenNonPromotion() {
    footer = `\n-----------------------------------
总计：${totalPrice}元
===================================`
  }

}

function generateSummary(totalPrice, itemsWithPromotion) {

  let header = `============= 订餐明细 =============\n`;

  let body = itemsWithPromotion.items.map(item => {
    return `${item.name} x ${item.count} = ${item.price * item.count}元`;
  }).join('\n');

  let footer = getFooter(itemsWithPromotion, totalPrice);

  return `${header}${body}${footer}`;

}

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
