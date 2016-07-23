function bestCharge(selectedItems) {
  let allItems = loadAllItems();
  let itemLists = buildItemList(selectedItems,allItems);
  let allPromotions = loadPromotions();
  let promotionItems = buildPromotionItems(itemLists,allPromotions);
  let receipt = buildReceiptItems(promotionItems);
  console.log(receipt);
  return receipt;
}

function getExistElementByBarCode(array, id){
  for(let item of array){
    if(item.id == id){
      return item;
    }
  }
  return null;
}
function formattedTags(selectedItems){
  let result = [];

  for(let selected of selectedItems){
    let temp = selected.split('x');
    result.push({id:temp[0].replace(" ",""),count:parseInt(temp[1])});
  }
  return result;
}
function buildItemList(selectedItems,allItems){
  let result = [];
  let items = formattedTags(selectedItems);
  for(let item of items){

    let temp = getExistElementByBarCode(allItems,item.id);
    let itemList = {
      id:item.id,
      name:temp.name,
      price:temp.price,
      count:item.count
    };
    result.push(itemList);
  }
  return result;
}

function buildPromotionItems(itemLists,allPromotions){
  let halfPrice = _halfPrice(itemLists);
  let reduceThirty = _reduceThirty(itemLists);

  if(reduceThirty.total <= halfPrice.total){
    reduceThirty.promoteType = '满30减6元';
    return reduceThirty;
  }else{
    halfPrice.promoteType = '指定菜品减半';
    return halfPrice;
  }
}

function _halfPrice(itemLists){
  let result = [];
  let saved = 0;
  let total = 0;
  for(let item of itemLists){
    if(item.id == 'ITEM0001' || item.id == 'ITEM0022'){
      item.promoteType = '指定菜品减半';
      item.saved = item.price * 0.5;
      saved += item.saved;
    }
    item.payPrice = item.price * item.count;
    total = total + item.payPrice;
    result.push(item);
  }
  total = total-saved;
  return {result,saved,total};
}

function _reduceThirty(itemLists){
  let result = [];
  let saved = 0;
  let total = 0;
  for(let item of itemLists){
    item.payPrice = item.price * item.count;
    saved += item.price;
    total += item.payPrice;
  }
  if(total >= 30){
    total = total-6;
  }
  return {result,saved,total};
}

function buildReceiptItems(promotionItems){
  let receiptString = `\n============= 订餐明细 =============\n`;

  for(let item of promotionItems.result){
    receiptString += `${item.name} x ${item.count} = ${item.payPrice}元\n`;
  }
  if(promotionItems.promoteType == '指定菜品减半'){
    receiptString += `-----------------------------------\n使用优惠:\n指定菜品半价`;
    let list =[];
    for(let item of promotionItems.result){
      if(item.promoteType == '指定菜品减半'){
        list.push(item.name);
      }
    }
    receiptString +=`(${list.join("，")})，省${promotionItems.saved}元\n-----------------------------------\n总计：${promotionItems.total}元\n===================================`;
  }else if(promotionItems.promoteType == '满30减6元'){
    receiptString += `-----------------------------------\n使用优惠:\n满30减6，省6元\n-----------------------------------\n总计：${promotionItems.total}元\n===================================`;


  }
  return receiptString;
}


