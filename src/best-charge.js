function bestCharge(selectedItems) {
  let items = loadAllItems();
  let promotions = loadPromotions();
  let barcodes = formatTags(tags);
  let cartItems = getCartItems(barcodes, items);
  let subTotalItems = getSubTotalItems(cartItems);
}
let tags = [
  "ITEM0001 * 1",
  "ITEM0013 * 2",
  "ITEM0022 * 1"
];

function formatTags(tags){
  return tags.map((tag) => {
    let splitTag = tag.split("*");
    return {id: splitTag[0], count: parseFloat(splitTag[1])};
    });
}

function  getCartItems(barcodes, items){
  let cartItems = [];
  for(let barcode of barcodes){
    let existItem = items.find((item) => {
      return item.id === barcode.id;
    });
    cartItems.push(Object.assign({}, existItem, {count: barcode.count}));
  }
  return cartItems;
}

function getSubTotalItems(cartItems){
  let subTotalItems = [];
  let subTotal = 0;
  for(let item of cartItems){
    subTotal = item.count * item.price;
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

function getDiscountTotal(total, subTotalItems, promotions){
  let itemsDiscountTotal = [];
  let discountTotal = total;
  let type = "";
  let name = [];
  for(let item of subTotalItems){
    let existItem = promotions.find((promotion) => {
      let element = {};
      if(promotion.type === '指定菜品半价'){
        element = promotion;
      }else{
        return;
      }
      return element.items.find((id) => {
        return id === item.id;
      });
    });
    if(existItem) {
      type = existItem.type;
      discountTotal -= item.subTotal / 2;
      name .push(item.name);
    }
  }
  itemsDiscountTotal.push({type: type, discountTotal: discountTotal, name: name});

  if(total > 30){
    type = '满30减6元';
    discountTotal = total - 6;
    itemsDiscountTotal.push({type: type, discountTotal: discountTotal});
  }
    itemsDiscountTotal.push({type: "", discountTotal: total});

  return itemsDiscountTotal;
}

function getSaveMoney(total, itemsDiscountTotal) {
  let saveType = [];
  let save = 0;
  for (let item of itemsDiscountTotal) {
    if (item.type === '指定菜品半价'){
      save = total - item.discountTotal;
      saveType.push(Object.assign({}, item, {save: save}))
    }else if(item.type === '满30减6元'){
      save = total - item.discountTotal;
      saveType.push(Object.assign({}, item, {save: save}))
    }else{
      saveType.push(Object.assign({}, item, {save: 0}))
    }
  }
  return saveType;
}

function print(subTotalItems, saveType){
  let receipt = "============= 订餐明细 =============\n";
  for(let item of subTotalItems){
    receipt += (item.name + " x " + item.count + " = " + item.subTotal + "元" + "\n");
  }

  for(let item of saveType){
    let name = "";
    for(let temp of item.name){
      name += (temp + "，");
    }
    if(item.type === '满30减6元'){
      receipt += "-----------------------------------\n" + "使用优惠:\n" + "满30减6元，省" + item.save + "元\n"+
        "-----------------------------------\n" + "总计：" + item.discountTotal + "元\n" +
          "===================================";
    }else if(item.type === "指定菜品半价"){
      receipt += "-----------------------------------\n" + "使用优惠:\n" + "指定菜品半价(" + name + ")" + item.name[0] + "，省" + item.save + "元\n"+
        "-----------------------------------\n" + "总计：" + item.discountTotal + "元\n" +
        "===================================";
    }else{
      receipt += "-----------------------------------\n" +
        "-----------------------------------\n" + "总计：" + item.discountTotal + "元\n" +
        "===================================";
    }
  }




  return receipt;
}









