function bestCharge(selectedItems) {
  return /*TODO*/;
}

function _getExitElementById(array, ids) {
  let result = array.find((countItem)=> {

    return countItem.id === ids;

  });
  return result;
}

function countId(tags) {
  let result = tags.map((tag) => {
    if (tag.includes("x")) {
      let temps = tag.split("x");
      {
        return {id: temps[0], count: parseInt(temps[1])}
      }
    }

  });
  return result;
}

function buildMenuItems(countIds, allItems) {
  let result = [];
  for (let countId of countIds) {
    let Item = _getExitElementById(allItems, countId.id);
    let menuItems = {
      id: Item.id,
      name: Item.name,
      price: Item.price,
      count: countId.count

    }
    result.push(menuItems);
  }
  return result;
}


function buildPromotedMenu(menuItems, promotions) {
  let result = [];

  let subtractpromotion = false;
  let currentPromotion = promotions.find((promotion) =>promotion.type === '指定菜品半价');
  if (currentPromotion.type === '指定菜品半价') {
    subtractpromotion = true;
  }
  let saved = 0;
  let payPrice = 0
  let originpayPrice=0;
  for(menuItem of menuItems){

    originpayPrice+= menuItem.price * menuItem.count;
  }
  for (let menuItem of menuItems) {

    if (originpayPrice < 30) {
      for (let item of currentPromotion.items) {
        if (subtractpromotion && menuItem.id === item.items) {
          payPrice = originpayPrice * 0.5;
          saved = originpayPrice - payPrice;
        }
      }
    }
    else {
      saved = 6;
      payPrice = originpayPrice - 6;
    }
    result.push(
      {
        id: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        count: menuItem.count,
        payprice:payPrice,
        saved:saved
      }
    );
    return result;

  }

}
function calateTotal(promotions){
  let result = [];
  let totalPayPrice = 0;
  let totalSaved = 0;
  for (let promotion of promotions) {
    totalPayPrice += promotion.payPrice;
    totalSaved += promotion.saved;
    result = {totalPayPrice, totalSaved};

  }
  return result;

}
function buildRecipt(promotions,totalPrices){
  let promoteItems=[];
  for(let element of promotions ) {
    promoteItems.push({
      id: element.id,
      name: element.name,
      price: element.price,
      count: element.count,
      payPrice: element.payPrice,
      saved: element.saved


    });

  }
    return {
      promoteItems,

      totalPayPrice: totalPrices.totalPayPrice,

      totalSaved: totalPrices.totalSaved
    }



}

