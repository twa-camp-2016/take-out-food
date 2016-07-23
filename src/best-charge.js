function bestCharge(selectedItems) {

  return /*TODO*/;
}
function _getExistId(array, id) {
  for (arr of array) {
    if (arr.id === id) {
      return arr;
    }
  }
  return null;
}
//# 1
function formattedTags(tags) {
  let result = [];
  for (let tag of tags) {
    let [id,count] = tag.split('x');

    result.push({
      id: id.trim(),
      count: parseFloat(count)
    })
  }
  return result;
}
//# 2 全部商品
function cartItems(formattefTags, allItems) {
  let result = [];
  let totalPrice = 0;
  for (formattefTag of formattefTags) {
    let items = _getExistId(allItems, formattefTag.id);
    let cartItem = {
      id: items.id,
      name: items.name,
      count: formattefTag.count,
      price: items.price,
      payPrice: formattefTag.count * items.price
    };
    result.push(cartItem);
  }

  return result;
}
//计算半价商品的总计
function _calculate(cartItems, promotions) {
  let totalPrice = 0;
  let save = 0;
  for (let cartItem of cartItems) {
    totalPrice += cartItem.payPrice;
  }
  for (let cartItem of cartItems) {
    for (let promotion of promotions) {
      if (promotion.type === '指定菜品半价') {
        for (item of promotion.items) {
          if (cartItem.id === item) {
           cartItem.payPrice = parseFloat(cartItem.count * cartItem.price * 0.5);
          }
        }
      }
    }

  }

  return {totalPrice};

}
//# 3 优惠后商品

function promotionItems(cartItems, promotions) {
  let result = [];
  let totalPrice = 0;

  for (let cartItem of cartItems) {
    totalPrice += cartItem.payPrice;//获得总计
    result.push(cartItem);
  }
  if (totalPrice > 30) {
    let payPrice1 = parseFloat(totalPrice - 6);
    let totalPay = _calculate(cartItems, promotions);
    if (totalPrice > payPrice1) {
      {
        return totalPrice > payPrice1 ? {pro:result,totalPrice:payPrice1} : {pro:result,totalPrice:totalPrice};
      }
    }
  }
  else//< 30
  {
    for (let cartItem of cartItems) {
      let total = _calculate(cartItem, promotions);//总计，总节省
    }
  }
  return {
    result,
    totalPrice: total.payPrice
  };
}

function buildRecipt(promotions) {
  let lines = ['============= 订餐明细 ============='];
  for (promotion of promotions) {
    line += `${promotion.name} x ${promotion.count} = ${promotion.payPrice}(元)+\n`;
    lines.push('-----------------------------------');
  }
}



