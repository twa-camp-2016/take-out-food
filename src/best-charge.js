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

function getPromotionInfo(totalPrice, allPromotions, itemInfoList) {

  // get promoting items
  let promotingItems = [];
  for (let element of itemInfoList) {
    let found = allPromotions.find(item => item.hasOwnProperty('items')).items.find(id => id === element.id);
    if (found) {
      let item = itemInfoList.find(entry => entry.id === found);
      promotingItems.push(item);
    }
  }


  let disount = 0;

  if (promotingItems.length >= 1) {
    for (let entry of promotingItems) {
      let found = itemInfoList.find(item => item.id === entry.id);
      if (found) {
        disount += found.count * found.price / 2;
      }
    }
  }

  let promotion = {};

  if (totalPrice < 30) {
    if (promotingItems.length < 1) {
      // promotion should be empty
    } else {
      promotion.type = '指定菜品半价';
      promotion.items = promotingItems;
      promotion.discount = disount;
    }
  } else {
    // totalPrice >= 30
    if (promotingItems.length < 1) {
      promotion.type = '满30减6元';
      promotion.discount = 6;
    } else {
      if (disount > 6) {
        promotion.type = '指定菜品半价';
        promotion.discount = disount;
        promotion.items = promotingItems;
      } else {
        promotion.type = '满30减6元';
        promotion.discount = 6;
      }
    }
  }

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


  let footer;

  if (itemsWithPromotion.promotion.type === '指定菜品半价') {
    footer = `\n-----------------------------------
使用优惠:
指定菜品半价(${itemsWithPromotion.promotion.items.map(item => {
      return item.name
    }).join('，')})，省${itemsWithPromotion.promotion.discount}元
-----------------------------------
总计：${totalPrice - itemsWithPromotion.promotion.discount}元
===================================`
  } else if (itemsWithPromotion.promotion.type === '满30减6元') {
    footer = `\n-----------------------------------
使用优惠:
满30减6元，省${itemsWithPromotion.promotion.discount}元
-----------------------------------
总计：${totalPrice - itemsWithPromotion.promotion.discount}元
===================================`
  } else {
    footer = `\n-----------------------------------
总计：${totalPrice}元
===================================`
  }

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
