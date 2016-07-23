function bestCharge(selectedItems) {
  const items = splitItems(selectedItems);

  const foodItems = buildFoodItems(items);

  const foodPromotions = buildFoodPromotions(foodItems);

  const promotion = selectBestPromotion(foodPromotions);

  return receipt = buildFoodReceipt(foodPromotions, promotion);
}

function splitItems(selectedItems) {

  return selectedItems.map(selectedItem=> {
    const itemArray = selectedItem.split(" x ");
    const id = itemArray[0];
    const count = parseFloat(itemArray[1]);

    return {id, count};
  })
}

function buildFoodItems(items) {
  const allItems = loadAllItems();

  return items.map(item=> {
    const id = item.id;
    const allItem = allItems.find(allItem => id === allItem.id)
    const name = allItem.name;
    const price = allItem.price;
    const subtotal = price * item.count;
    const foodInformation = {name, price, subtotal};

    return {item, foodInformation};
  })
}

function buildFoodPromotions(foodItems) {
  const allpromotions = loadPromotions();
  const foods = [];
  let saves = [0, 0];
  let promotions;
  let total = 0;
  const promotionType = ['满30减6元', '指定菜品半价'];

  foodItems.forEach(foodItem=> {
    if ((allpromotions[1].items.some(item=> item === foodItem.item.id))) {
      foods.push(foodItem.foodInformation.name)
      saves[0] += foodItem.foodInformation.price / 2;
    }
    const subtotal = foodItem.foodInformation.subtotal;
    total += subtotal;
  })
  if (total >= 30) {
    saves[1] = 6;
  }
  promotions = [{type: promotionType[1], foods, saved: saves[0]}, {type: promotionType[0], saved: saves[1]}];
  const foodPromotions = {foodItems, promotions};

  return foodPromotions;
}

function selectBestPromotion(foodPromotions) {
  const promotionFirst = foodPromotions.promotions[0];
  const promotionSecond = foodPromotions.promotions[1];

  if (promotionFirst.saved === 0 && promotionSecond.saved === 0) {
    return undefined;
  }
  return promotionFirst.saved < promotionSecond.saved ? promotionSecond : promotionFirst;
}

function buildPromotionText(promotion) {
  if (promotion.type === '指定菜品半价') {
    promotionText = `
使用优惠:
${promotion.type}(${promotion.foods.join("，")})，省${promotion.saved}元
-----------------------------------`
  }
  if (promotion.type === '满30减6元') {
    promotionText = `
使用优惠:
${promotion.type}，省${promotion.saved}元
-----------------------------------`
  }
  return promotionText;
}

function buildfoodsText(foodItems, total) {
  let foodsText = foodItems.map(foodItem=> {
    const information = foodItem.foodInformation;
    const count = foodItem.item.count;
    const subtotal = foodItem.foodInformation.subtotal;
    total += subtotal;

    return `${information.name} x ${count} = ${subtotal}元
`
  }).join("");
  return {total: total, foodsText: foodsText};
}

function buildFoodReceiptText(foodsText, promotionText, finalToTalText) {
  const foodReceipt = `
============= 订餐明细 =============
${foodsText}-----------------------------------${promotionText}
${finalToTalText}
===================================`;
  return foodReceipt;
}

function buildFoodReceipt(foodPromotions, promotion) {
  const foodItems = foodPromotions.foodItems;
  let total = 0;
  let promotionText = "";
  let saved = 0;

  const foodsItemsText = buildfoodsText(foodItems, total);
  const foodsText = foodsItemsText.foodsText;
  total = foodsItemsText.total;
  if (promotion) {
    promotionText = buildPromotionText(promotion);
    saved = promotion.saved;
  }
  let finalTotal = total - saved;
  const finalToTalText = `总计：${finalTotal}元`;
  const foodReceipt = buildFoodReceiptText(foodsText, promotionText, finalToTalText);

  return foodReceipt;
}
