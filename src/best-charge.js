function bestCharge(tags) {
  let barcodes = formatTags(tags);
  let items = loadAllItems();
  let cartItems = getCartItems(barcodes, items);
  let subTotalItems = getSubTotalItems(cartItems);
  let total = getTotal(subTotalItems);
  let promotions = loadPromotions();
  let discountTypeItems = getDiscountType(subTotalItems, promotions);
  let discountTotalType = getDiscountTotal(discountTypeItems, total);
  let discountType = getSaveMoney(total, discountTotalType);
  return print(discountTypeItems, discountType);
}

function formatTags(tags){
  return tags.map((tag) => {
    let splitTag = tag.split(" x ");
    return {
      id: splitTag[0],
      count: parseFloat(splitTag[1])
    }
  })
}

function getCartItems(barcodes, items){
  let cartItems = [];
  for(let barcode of barcodes){
    let existItem = items.find((item) => {
      return item.id === barcode.id
      }
    );
    cartItems.push(Object.assign({}, existItem, {count: barcode.count}));
  }
  return cartItems;
}

function getSubTotalItems(cartItems){
  let subTotalItems = [];
  for(let item of cartItems){
    let subTotal = item.count * item.price;
    subTotalItems.push(Object.assign({}, item, {subTotal: subTotal}));
  }
  return subTotalItems;
}

function getTotal(subTotalItems){
  let total = 0;
  for(let item of subTotalItems){
    total += item.subTotal;
  }
  return total;
}

function getDiscountType(subTotalItems, promotions){
  let discountTypeItems = [];

  for(let element of subTotalItems){
    let halfPromotion = {};
    for(let promotion of promotions){
      if(promotion.type === "指定菜品半价");
        halfPromotion = promotion;
    }
    let existItem = halfPromotion.items.find((item) => {
      return item === element.id;
    });
    if(existItem){
      element.type = "指定菜品半价";
    }else{
      element.type = "满30减6元";
    }
    discountTypeItems.push(Object.assign({}, element, {type: element.type}));
  }
  return discountTypeItems;
}

function getDiscountTotal(discountTypeItems, total) {
  let discountTotalType = {};
  let discountTotal = 0;
  let discountTotalOne = total;
  let discountTotalTwo = 0;
  let type = '';
  let flag = false;

  for (let item of discountTypeItems) {
    if (item.type === '指定菜品半价') {
      discountTotalOne -= item.subTotal / 2;
      flag = true;
    }
  }

  if(total > 30 && flag) {
    discountTotalTwo = total - 6;
    if(discountTotalOne > discountTotalTwo){
      discountTotal = discountTotalTwo;
      type = "满30减6元";
    }else{
      discountTotal = discountTotalOne;
      type = '指定菜品半价';
    }
  }else if(total > 30){
    discountTotal = total - 6;
    type = "满30减6元";
  }else{
    discountTotal = total;
    type = "";
  }

  discountTotalType.type = type;
  discountTotalType.discountTotal = discountTotal

  return discountTotalType;
}

function getSaveMoney(total, discountTotalType){
  let save = total - discountTotalType.discountTotal;
  let discountType = Object.assign({}, discountTotalType, {save: save});
  return discountType;
}

function print(discountTypeItems, discountType){
  let halfName = [];
  for(let item of discountTypeItems){
    if(item.type === "指定菜品半价"){
      halfName.push(item.name);
    }
  }
  let receipt = "============= 订餐明细 =============\n";
  for(let item of discountTypeItems){
    receipt += item.name + " x " + item.count + " = " + item.subTotal + "元\n"
  }

  if(discountType.type === "指定菜品半价"){
    receipt += ("-----------------------------------\n" + "使用优惠:\n" + discountType.type + "(" + halfName.join() + ")，省" + discountType.save + "元\n");
  }else if(discountType.type === "满30减6元"){
    receipt += ("-----------------------------------\n" + "使用优惠:\n" + discountType.type + "，省" + discountType.save + "元\n")
  }

  receipt += "-----------------------------------\n" + "总计：" + discountType.discountTotal + "元\n" +
    "===================================";
  console.log(discountType.discountTotal)

  return receipt;
}













