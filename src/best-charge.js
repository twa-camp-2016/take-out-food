function loadAllItems() {
  return [{
    id: 'ITEM0001',
    name: '黄焖鸡',
    price: 18.00
  }, {
    id: 'ITEM0013',
    name: '肉夹馍',
    price: 6.00
  }, {
    id: 'ITEM0022',
    name: '凉皮',
    price: 8.00
  }, {
    id: 'ITEM0030',
    name: '冰锋',
    price: 2.00
  }];
}

function loadPromotions() {
  return [{
    type: '满30减6元'
  }, {
    type: '指定菜品半价',
    items: ['ITEM0001', 'ITEM0022']
  }];
}

function formatTags(tags) {
  return tags.map((tag) => {
    let [id, count] = tag.split(' x ');
    return {
      id: id,
      count: parseInt(count)
    }
  })
}
let tags= ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];

function fixPrice(number) {
  return parseFloat(number.toFixed(2));
}

function getExistIdFromArray(id, array) {
  for (let Item of array) {
    if (Item.id === id) {
      return Item;
    }
  }
  return null;
}

function buildCartItems(formatTags, allItems) {
  let result = [];
  for (let formatTag of formatTags) {
    let item = getExistIdFromArray(formatTag.id, allItems);
    let cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      count: formatTag.count
    }
    result.push(cartItem);
  }
  return result;
}

function buildPromotedItems(cartItems, promotions) {
  let currentPromotion = promotions.find((promotion) => {
    return promotion.type === '指定菜品半价';
  })
  return cartItems.map((cartItem) => {
    let hasPromoted = currentPromotion.items.includes(cartItem.id);
    let nolmalPrice = cartItem.price * cartItem.count;
    let halfSaved = hasPromoted ? nolmalPrice / 2 : 0;
    return Object.assign({}, cartItem, {halfSaved: fixPrice(halfSaved), nolmalPrice});
  })
    ;
}

function calculateTotalPrices(promotedItems) {
  return promotedItems.reduce((result, promotedItem) => {
      result.totalHalfSaved += promotedItem.halfSaved;
      result.totalnoPromotedPrice += promotedItem.nolmalPrice;
      return result;
    },
    {
      totalHalfSaved: 0, totalnoPromotedPrice: 0
    }
  )
}

function buildReceipt(promotedItems, {totalHalfSaved, totalnoPromotedPrice}) {

  let halfsavedItems = promotedItems.filter((promotedItem) => {
      return promotedItem.halfSaved > 0;
    })
    ;

  let savedItems = halfsavedItems.map((halfsavedItem) => {
      return {
        name: halfsavedItem.name,
      }
    }
  )
  let fullDiscountPayPrice = totalnoPromotedPrice > 30 ? totalnoPromotedPrice - 6 : totalnoPromotedPrice;
  let totalDiscountSaved = totalnoPromotedPrice > 30 ? 6 : 0;
  let halfDiscountPayPrice = totalnoPromotedPrice - totalHalfSaved;
  return {
    promotedItems: promotedItems.map(({name, price, count, nolmalPrice, halfSaved}) => {
        return {name, price, count, nolmalPrice, halfSaved}
      }
    ),
    savedItems,
    fullDiscountPayPrice,
    halfDiscountPayPrice,
    totalHalfSaved,
    totalDiscountSaved

  }
}


function bulidReceiptString(receipt) {
  let line;
  let itemLine = [];
  let lines = [`============= 订餐明细 =============`];
  for (let item of receipt.promotedItems) {
    line = `${item.name} x ${item.count} = ${item.price*item.count}元`;
    lines.push(line);
  };

  line = `-----------------------------------`;
  lines.push(line)

  if (receipt.totalHalfSaved > 0 || receipt.totalDiscountSaved > 0) {
    line = `使用优惠:`;
    lines.push(line);
    if (receipt.fullDiscountPayPrice < receipt.halfDiscountPayPrice) {
      line = `满30减6元，省6元`;
      lines.push(line);
      line = `-----------------------------------`;
      lines.push(line);
      line = `总计：${receipt.fullDiscountPayPrice}元`;
      lines.push(line);
      line = `===================================`;
      lines.push(line);
      return lines.join('\n');
    }

    if (receipt.fullDiscountPayPrice > receipt.halfDiscountPayPrice) {
      line = `指定菜品半价(`;
      for (let item of receipt.savedItems) {
        itemLine.push(item.name);
      }
      line += itemLine.join('，');
      line += ')，';
      line += `省${receipt.totalHalfSaved}元`
      lines.push(line);
      line = `-----------------------------------`;
      lines.push(line);
      line = `总计：${receipt.halfDiscountPayPrice}元`;
      lines.push(line);
      line = `===================================`;
      lines.push(line);
      return lines.join('\n');
    }
  }
  line = `总计：${receipt.fullDiscountPayPrice}元`;
  lines.push(line);
  line = `===================================`;
  lines.push(line);

  return lines.join('\n');
}

function bestCharge(tags){
  let tag = formatTags(tags);
  let allItems = loadAllItems();
  let cartItems = buildCartItems(tag, allItems);
  let promotions = loadPromotions();
  let promotedItems = buildPromotedItems(cartItems, promotions);
  let calculatedTotalPrices = calculateTotalPrices(promotedItems);
  let builtReceipt = buildReceipt(promotedItems, calculatedTotalPrices);
  let receiptString = bulidReceiptString(builtReceipt);
   return  receiptString;
}
module.exports={
  formatTags,
  buildCartItems,
  buildPromotedItems,
  calculateTotalPrices,
  buildReceipt,
  bulidReceiptString,
  bestCharge
};
