function bestCharge(selectedItems) {
  return /*TODO*/;
}
let idItems = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];

let allItems = loadAllItems();

let promotions = loadPromotions();

function getIdCountSum(idItems) {
   let idCountSum = idItems.map(
    function (idItem) {
      let temp = idItem.split(" x ");
      return {
        id: temp[0],
        amount: parseInt(temp[1])
      }
    }
  );
  return idCountSum;
}


function matchPromotion(promotions, idCountSum) {
  let promotionType = [];
  for (let i = 0; i < idCountSum.length; i++) {
    for (let j = 0; j < promotion.length; j++) {
      let temp = promotion[j].items;
      if (idCountSum[i].id === temp[j].id) {
        promotionType.push(Object.assign({}, idCountSum[i], {type: promotions[j].type}));
      }
    }
  }
  return promotionType;
}

function getPromotionSubtotal(promotionType, allItems) {
  let promotionSubtotal = [];
  let subtotal = 0;
  for (let i = 0; i < promotionType.length; i++) {
    for (let j = 0; j < allItems.length; j++) {
      if (promotionType[i].id === allItems[j].id) {
        if (promotionType[i].type === "指定菜品半价") {
          subtotal += allItems[j].price / 2 * promotionType[i].amount;
        }
        if (promotionType[i].type === "满30减6元") {
          subtotal1 += allItems[j].price * promotionType[i].amount;
          subtotal = subtotal1 - 6;
        } else {
          subtotal = allItems[j].price * promotionType[i].amount;
        }
        promotionSubtotal.push(Object.assign({}, allItems[i], {promotionSubtotal: promotionSubtotal}))
      }
    }
  }
  return promotionSubtotal;
}


function getSubtotal(promotionSubtotal) {
  let subtotal = 0;
  for (let i = 0; i < promotionSubtotal.length; i++) {
    subtotal += promotionSubtotal[i].promotionSubtotal
  }
  return subtotal;
}

function saveMoney(promotionSubtotal, subtotal) {
  let saveMoney = [];
  let money = 0;
  for (let i = 0; i < promotionSubtotal.length; i++) {
    for (let j = 0; j < subtotal.length; j++) {
      if (promotionSubtotal[i].id === subtotal[i].id) {
        money += subtotal[j].subtotal - promotionSubtotal[i].promotionSubtotal;
      }
    }
    saveMoney.push(Object.assign({}, promotionSubtotal[i], {money: money}))
  }
  return saveMoney;
}

function getTotal(subtotal) {
  let total = 0;
  for (let i = 0; i < subtotal.length; i++) {
    total += subtotal[i].subtotal;
  }
  return total;
}

function print(total, saveMoney) {

  for (let i = 0; i < saveMoney.length; i++) {
    let receipt="============= 订餐明细 =============\n"
    receipt+=saveMoney[i].name+"x"+saveMoney[i].price+"="+total;
    receipt+="使用优惠:\n"+"指定菜品半价"+"("+saveMoney[i].name+")"+saveMoney[i].money;
    receipt+="-----------------------------------\n";
    receipt+="总计:"+total+"元";
    receipt+="===================================";
  }

}
function bestCharge(idItems) {
  let idCountSum = getIdCountSum(idItems);
  let promotionType = matchPromotion(promotions, allItems);
  let promotionSubtotal = getPromotionSubtotal(promotionType, allItems);
  let saveMoney = saveMoney(promotionSubtotal, subtotal);
  let total = getTotal(subtotal);
}

bestCharge();
