function bestCharge(selectedItems) {
  return /*TODO*/;
}
let idItems = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
let allItems = loadAllItems();
let promotions = loadPromotions();
function formatItems(idItems) {
  let itemsCount = idItems.map(
    function (idItem) {
      let temp = idItem.split(" x ");
      return {
        id: temp[0],
        count: parseInt(temp[1])
      }
    }
  );
  return itemsCount;
}


function matchPromotions(itemsCount, promotions) {
  let itemsType = [];
  for (let i=0;i<itemsCount.length;i++){
    promotions.find(function (item) {
      if (item.items){
        let existItem = item.items.find(function (id) {
          return id===itemsCount[i].id;
        });
        if(existItem){
          type=item.type;
        }
      }else {
        type="满30减6元"
      }
    });
    itemsType.push(Object.assign({},itemsCount[i],{type:type}));
  }
  return itemsType;
    

}

// function getItemsInfo(itemsType, allItems) {
//   let itemsInfo = [];
//   for (let i = 0; i < itemsType.length; i++) {
//     for (let j = 0; j < allItems.length; j++) {
//       if (itemsType[i].id === allItems[j].id) {
//         itemsInfo = itemsType.push(Object.assign({}, allItems[j]));
//       }
//     }
//   }
//   return itemsInfo;
// }


function getDiscountSubtotal(itemsInfo) {
  let discountSubtotalInfo = [];
  let subtotal = 0;
  for (let i = 0; i < itemsInfo.length; i++) {
    if (itemsInfo[i].type === "指定菜品半价") {
      subtotal += itemsInfo[i].price * itemsInfo[i].count;
    } else if (itemsInfo[i].type === "满30减6元") {
      subtotal += itemsInfo[i].price * itemsInfo[i].count;
      if (subtotal > 30) {
        subtotal = subtotal - 6;
      }
    } else {
      subtotal += subtotal[i].price * subtotal[i].count;
    }
    discountSubtotalInfo.push(Object.assign({}, itemsInfo[i], {discountSubtotal: subtotal}));
  }
  return discountSubtotalInfo;
}


function getSubtotal(itemsInfo) {
  let subtotal = 0;
  for (let i = 0; i < itemsInfo.length; i++) {
    subtotal += itemsInfo[i].discountSubtotalInfo;
    subtotal.push(Object.assign({}, itemsInfo[i], {subtotal: subtotal}));
  }
  return subtotal;
}


function saveMoney(discountSubtotalInfo, subtotal) {
  let saveMoney = 0;

  for (let i = 0; i < subtotal.length; i++) {
    for (let j = 0; j < discountSubtotalInfo.length; j++) {
      if (subtotal[i].id === discountSubtotalInfo[j].id) {
        saveMoney += subtotal[i].subtotal - discountSubtotalInfo[j].discountSubtotal;
      }
    }
  }
  return saveMoney;
}


function getTotal(discountSubtotalInfo) {
  let total = 0;
  for (let i = 0; i < discountSubtotalInfo.length; i++) {
    total += discountSubtotalInfo[i].discountSubtotal;
  }
  return total;
}

function print(discountSubtotalInfo, total, saveMoney) {

  for (let i = 0; i < discountSubtotalInfo.length; i++) {
    let str = "============= 订餐明细 =============\n";
    str += discountSubtotalInfo[i].name + "x" + discountSubtotalInfo[i].price + "=" + total;
    str += "使用优惠:\n" + discountSubtotalInfo[i].type + "(" + discountSubtotalInfo[i].name + ")" + saveMoney + "\n";
    str += "-----------------------------------\n";
    str += "总计:" + total + "元\n";
    receipt += "===================================";
  }


}
function bestCharge(idItems) {
  let allItems = loadAllItems();
  let promotions = loadPromotions();
  let itemsCount = formatItems(idItems);
  let itemsType = matchPromotion(itemsCount, promotions);
  let itemsInfo = getItemsInfo(itemsType, allItems);
  let discountSubtotalInfo = getDiscountSubtotal(itemsInfo);
  let subtotal = getSubtotal(itemsInfo);
  let saveMoney = saveMoney(discountSubtotalInfo, subtotal);
  let total = getTotal(discountSubtotalInfo);
  print(discountSubtotalInfo, total, saveMoney);
}


