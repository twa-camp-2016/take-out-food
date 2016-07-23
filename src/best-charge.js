function bestCharge(selectedItems) {

  const foodItems = buildFoodItems(selectedItems);

  const foodPromotions = buildFoodPromotions(foodItems);

  const promotion = selectBestPromotion(foodPromotions);

  return buildFoodReceipt(foodPromotions, promotion);
}

function buildFoodItems(selectedItems) {
  const allItems = loadAllItems();

  return selectedItems.map(selectedItem=> {
    const itemArray = selectedItem.split(" x ");
    const id = itemArray[0];
    const count = parseFloat(itemArray[1]);

    const allItem = allItems.find(allItem => id === allItem.id);
    const name = allItem.name;
    const price = allItem.price;
    const subtotal = price * count;
    return {id, count, name, price, subtotal};
  })
}


function buildFoodPromotions(foodItems) {
  const allpromotions = loadPromotions();
  const foods = [];
  let saves = [0, 0];

  let total = 0;
  const promotionType = ['满30减6元', '指定菜品半价'];
  foodItems.forEach(foodItem=> {
    if ((allpromotions[1].items.some(item=> item === foodItem.id))) {
      foods.push(foodItem.name);
      saves[0] += foodItem.price / 2;
    }
    const subtotal = foodItem.subtotal;
    total += subtotal;
  });
  if (total >= 30) {
    saves[1] = 6;
  }

  const promotions = [{type: promotionType[1], foods, saved: saves[0]}, {type: promotionType[0], saved: saves[1]}];

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

function buildFoodReceipt(foodPromotions, promotion) {
  const foodItems = foodPromotions.foodItems;
  let total = 0;
  let saved = 0;
  let promotionText = '';
  let foodsText = foodItems.map(foodItem=> {
    const count = foodItem.count;
    const subtotal = foodItem.subtotal;
    total += subtotal;

    return `${foodItem.name} x ${count} = ${subtotal}元
`
  }).join("");
  if (promotion) {
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
    saved = promotion.saved;
  }

  let TrueTotal = total - saved;
  const finalToTalText = `总计：${TrueTotal}元`;
  return `
============= 订餐明细 =============
${foodsText}-----------------------------------${promotionText}
${finalToTalText}
===================================`;

}
