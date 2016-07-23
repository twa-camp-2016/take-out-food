function formatItems(items) {
  return items.map((item) => {
    let temp = item.split(' ');
    let id = temp[0];
    let count = parseInt(temp[2]);

    return {
      id,
      count
    }
  });
}

function returnEqualIdItem(array, barcode) {
  return array.find((item) => item.barcode === barcode);
}

function buildDetailedIems(formatedItems, allItems) {
  return formatedItems.map((formatedItem) => {
    for (let item of allItems) {
      if (formatedItem.id === item.id)
        return {
          id: formatedItem.id,
          name: item.name,
          count: formatedItem.count,
          price: item.price
        };
    }
  });
}

function buildPromotedItems(detailedItems, promotions) {
  return detailedItems.map((detailedItem) => {
    let isHalfPrice = false;
    let totalPrice = 0;

    for (let promotion of promotions) {
      if (promotion.type === '指定菜品半价') {
        let item = promotion.items.find((item) => {
          return item === detailedItem.id;
        });

        if (item)
          isHalfPrice = true;
      }
    }
    totalPrice = parseFloat((detailedItem.price * detailedItem.count).toFixed(2));
    return {
      id: detailedItem.id,
      count: detailedItem.count,
      name: detailedItem.name,
      price: detailedItem.price,
      isHalfPrice,
      totalPrice
    };
  });
}

function calculateTotalPrice(promotedItems) {
  let totalHalfPrices = 0;
  let totalPrices = 0;
  let halfPrice = 0;
  let promotionPrice = 0;
  let type = '';
  let totalPayPrices = 0;
  let totalSaved = 0;

  for (let promotedItem of promotedItems) {
    totalPrices += promotedItem.totalPrice;
    if (promotedItem.isHalfPrice === true)
      totalHalfPrices += promotedItem.price * promotedItem.count / 2;
  }
  if (totalPrices > 30)
    promotionPrice = totalPrices - 6;
  else
    promotionPrice = totalPrices;
  halfPrice = totalPrices - totalHalfPrices;

  if (totalPrices < 30 && totalHalfPrices === 0) {
    type = '没有优惠';
    totalPayPrices = totalHalfPrices;
  }
  else if (promotionPrice <= halfPrice) {
    type = '满30减6元';
    totalPayPrices = totalPrices - 6;
    totalSaved = 6;
  }
  else {
    type = '指定菜品半价';
    totalPayPrices = totalPrices - totalHalfPrices;
    totalSaved = totalHalfPrices;
  }

  return {
    totalPayPrices,
    totalSaved,
    type
  };
}

function buildReceipt(promotedItems, total) {
  let items = [];

  items = promotedItems.map((promotedItem) => {
    return {
      name: promotedItem.name,
      count: promotedItem.count,
      isHalfPrice: promotedItem.isHalfPrice,
      price: promotedItem.price
    };
  });

  return {
    items,
    totalSaved: total.totalSaved,
    totalPrice: total.totalPayPrices,
    promotedType: total.type
  };
}

function buildReceiptString(receipt) {
  let lines = [];

  lines.push(`============= 订餐明细 =============`);
  for (let item of receipt.items)
    lines.push(`${item.name} x ${item.count} = ${item.payPrice}元`);
  if (receipt.type !== '没有优惠') {
    lines.push(`-----------------------------------`);
    lines.push(`使用优惠:`);
    if (receipt.type === '指定菜品半价') {
      let halfPriceName = '';
      for (let item of receipt.items)
        if (item.isHalfPrice === true) {
          halfPriceName += item.name;
        }
      lines.push(`指定菜品半价(${halfPriceName})，省${receipt.totalSaved}元`);
    }
    else if (receipt.type === '满30减6元')
      lines.push(`满30减6元，省6元`);
  }

  lines.push(`-----------------------------------`);
  lines.push(`总计：${receipt.totalPrice}元`);
  lines.push(`===================================`);
  return lines.join('\n');
}

function bestCharge(selectedItems) {
  let formatedItems = formatItems(selectedItems);
  let detailedItems = buildDetailedIems(formatedItems, loadAllItems());
  let promotedItems = buildPromotedItems(detailedItems, loadPromotions());
  let total = calculateTotalPrice(promotedItems);
  let receipt = buildReceipt(promotedItems, total);
  let lines = buildReceiptString(receipt);
  return lines;
}

//bestCharge();
