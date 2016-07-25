function bestCharge(tags) {
  let barcodes = formatTags(tags);
  let items = loadAllItems();
  let cartItems = getCartItems(barcodes, items);
  let subTotalItems = getSubTotalItems(cartItems);
  let total = getTotal(subTotalItems);
  let promotions = loadPromotions();
  let cartItemsPromotions = getCartItemsPromotions(subTotalItems, promotions);
  let discountTotalType = getDiscountTotal(cartItemsPromotions, total);
  let saveType = getSaveMoney(discountTotalType, total);
  return print(cartItemsPromotions, saveType);
}

function formatTags(tags) {
  return tags.map((tag) => {
    let splitTag = tag.split(" x ");
    return {
      id: splitTag[0],
      count: parseFloat(splitTag[1])
    }
  })
}

function getCartItems(barcodes, items) {
  let cartItems = [];
  for(let barcode of barcodes) {
    let existItem = items.find((item) => {
      return item.id === barcode.id;
    })
    cartItems.push(Object.assign({}, existItem, {count: barcode.count}));
  }
  return cartItems;
}

function getSubTotalItems(cartItems) {
  let subTotalItems = [];
  let subTotal = 0;
  for(let item of cartItems){
    subTotal = item.price * item.count;
    subTotalItems.push(Object.assign({}, item, {subTotal: subTotal}))
  }

  return subTotalItems;
}

function getTotal(subTotalItems) {
  let total = 0;
  for(let item of subTotalItems){
    total += item.subTotal;
  }
  return total;
}

function getCartItemsPromotions(subTotalItems, promotions) {
  let cartItemsPromotions = [];
  let existPromotion = {};
  for(let item of subTotalItems){
    let existItem = promotions.find((promotion) => {
      if(promotion.type === "指定菜品半价"){
        return promotion.items.find((id) => {
          return id === item.id;
        });
      }else{
        return;
      }
    })
    if(existItem){
      cartItemsPromotions.push(Object.assign({}, item, {type: "指定菜品半价"}))
    }else{
      cartItemsPromotions.push(Object.assign({}, item, {type: "满30减6元"}))
    }
  }
  return cartItemsPromotions;
}

function getDiscountTotal(cartItemsPromotions, total){
  let discountTotalType = {};
  let discountTotal = 0;
  let discountTotalOne = total;
  let discountTotalTwo = 0;
  let flag = false;
  let type = "";
  for(let item of cartItemsPromotions){
    if(item.type === "指定菜品半价"){
      discountTotalOne -= item.subTotal / 2;
      flag = true;
    }
  }

  if(total > 30 && flag){
    discountTotalTwo = total - 6;
    if(discountTotalOne < discountTotalTwo){
      type = "指定菜品半价";
      discountTotal = discountTotalOne;
    }else{
      type = "满30减6元";
      discountTotal = discountTotalTwo;
    }
  }else if(total < 30 && flag){
    type = "指定菜品半价";
    discountTotal = discountTotalOne;
  }else {
    tyep = "";
    discountTotal = total;
  }

  discountTotalType.type = type;
  discountTotalType.discountTotal = discountTotal;
  console.log(discountTotalType)
  return discountTotalType;
}

function getSaveMoney(discountTotalType, total) {
  let saveType = {};
  let save = total - discountTotalType.discountTotal;
  discountTotalType.save = save;
  saveType = discountTotalType
  return saveType;
}

function print(cartItemsPromotions, saveType){
  let receipt = "============= 订餐明细 =============\n";
  let names = "";
  for(let item of cartItemsPromotions){
    receipt += item.name + " x " + item.count + " = " + item.subTotal + "元\n";
  }


  if(saveType.type === "指定菜品半价"){
    for(let item of cartItemsPromotions){
      if(item.type === "指定菜品半价"){
        names += (item.name + "，");
      }
    }
    receipt += "-----------------------------------\n" + "使用优惠:\n" +  saveType.type + "(" + names.substring(0, names.length-1)
    + ")，省" + saveType.save + "元\n"
  }else if(saveType.type === "满30减6元"){
    receipt += "-----------------------------------\n" + "使用优惠:\n" +  saveType.type + "，省" + saveType.save + "元\n"
  }

  receipt += "-----------------------------------\n" + "总计：" + saveType.discountTotal + "元\n"
  + "===================================\n";
console.log(receipt)
  return receipt;
}




