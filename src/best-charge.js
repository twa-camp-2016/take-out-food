function bestCharge(selectedItems) {
  let allitems = loadAllItems();
  let promotions = loadPromotions();
  let countedIds = getCountedIds(selectedItems);
  let MenuMessages =getMenuMessages(countedids,allitems);
  let promotedMenuMessages = getpromotedMenuMessages(menuMessages,promotions);
  let FinalMenu = getFinalMenu(promotedMenuMessages);
  let bildMenustring = bildMenustring(finalMenue)
  /*TODO*/;

}
function getCountedIds(ids) {
  let result = [];
  for(let littleid of ids){
    let subscript = littleid.indexOf("x");
    let count = id.(subscript+1);
    let id = "";
    for(let i=0;i< subscript-1;i++){
      id+=littleid.i;
    }
    result.push({id:id,count:count})  ;
  }
return result;

}

function getMenuMessages(countedids,allitems) {
  let result =[];let saved = 0;
  for (let allitem of allitems){
    for(let countedid of countedids){
      if(countedid.id===allitem.id)
        result.push({
          id:countedid.id,
          price:allitem.price,
          name:allitem.name,
          count:countedid.count,
          saved:0
        });
    }
  }

return result ;

}


function getpromotedMenuMessages(menuMessages,promotions) {
let result = [];
  for (let promotion of promotions) {
    for (let i = 0; i < promotion[1][items].length; i++) {
      for (let menuMessage of menuMessages)
        if (menuMessage.id === promotion)
        {
          menuMessage.saved = menuMessage.price * menuMessage.count;
        }
      result.push({
        id:menuMessage.id,
        name:menuMessage.name,
        count:menuMessage.count,
        price:menuMessage.price,
        saved:menuMessage.price * menuMessage.count/2
      });
    }
  }
return result;
}

function getFinalMenu(promotedMenuMessages) {
  let totalsaved = 0;let payprice = 0; let result = [] ;let bestChargeprice = 0;
  for (let promotedMenuMessage of promotedMenuMessages) {
    totalsaved += promotedMenuMessage.saved;
    payprice += promotedMenuMessage.price * promotedMenuMessage.count;

    if(totalsaved>&&payprice<30){
      let promotionType = loadPromotion[1][items].1;

    else {
      promotionType = loadPromotion[1][items].0;
        totalsaved = 6 ;

      }
      resut.push(saved:promotedMenuMessage.saved,
        totalSaved:totalsaved,
        promotionType:promotionType,
        name:promotedMenuMessage.name,
        count:promotedMenuMessage.count,
        payprice:payprice,
        bestChargeprice:payprice - totalsaved
      );
    }
  }
return result;
}


function bildMenustring(finalMenues) {
  for (let finalMenue of finalMenues) {
    let count = finalMenue.count;
    let name = finalMenue.name;
    let saved = finalMenue.saved;
    let payprice = finalMenue.payprice;
    let promotionType = finalMenue.prototype;
    let totalSaved = finalMenue.totalSaved;
    let totalpayprice = finalMenue.bestChargeprice;
  }
  for (let i = 0; i < finalMenues.length; i++) {

    if (saved != 0)
      let const
    printString += `$name x $count= $payprice元`;
    printString += "\n";
  }
const  result = `============= 订餐明细 =============
$printString
-----------------------------------
使用优惠:
$promotionType, 省$totalSaved元
-----------------------------------
总计：totalpayprice元
===================================
`
  return result;
}







































