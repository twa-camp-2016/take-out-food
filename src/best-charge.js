
function formateBarcodes(inputs) {
  let allBarcodes=inputs.map(function (tag) {
        let bar=tag.split('x');
        return {
          id:bar[0].trim(),
          count:parseInt(bar[1].trim()),
        }
  })
  return allBarcodes;
}

function getAllItems(allBarcodes) {
        let showItems=loadAllItems();
        let allItems=[];
        let exist;
        for(let i=0;i<allBarcodes.length;i++)
        {
            for(m of showItems) {
                 if(m.id===allBarcodes[i].id)
              allItems.push(Object.assign({}, allBarcodes[i], m));
            }
        }
        return allItems;
}

function getPromotions(allItems) {
  let promotions = loadPromotions();
  let itemsPromotion = [];
  for (let i = 0; i < allItems.length; i++) {
    for (m of promotions)
      if (m.items) {
        for (j = 0; j < m.items.length; j++) {
          if (allItems[i].id === m.items[j]) {
            itemsPromotion.push(Object.assign({}, allItems[i], {type: m.type}));
            break;
          }
        }
      }
  }
  itemsPromotion.push({type1:"满30减6"});
         return itemsPromotion;
}


function getdispromoteSubtotal(itemsDispromotion)
{
     let dispromoteSubtotal=[];
     let subtotal=0;
     for(i=0;i<itemsDispromotion.length;i++)
     {
            subtotal=itemsDispromotion[i].price*itemsDispromotion[i].count;
            dispromoteSubtotal.push(Object.assign({},itemsDispromotion[i],{dispromotesubtotal:subtotal}));
     }
     return dispromoteSubtotal;
}

function getdispromoteTotal(dispromoteSubtotal){
     let total=0;
     for(let i=0;i<dispromoteSubtotal.length;i++)
     {
       total+= dispromoteSubtotal[i].dispromotesubtotal;
     }
     return total;
}

function getPromoteDetail(dispromoteSubtotal,dispromoteTotal){
    let promoteDetail=[];
    let promoteTotal=0;
    let saving=0;
          for (let i = 0; i < dispromoteSubtotal.length; i++) {
        if (dispromoteSubtotal[i].type === "指定菜品半价") {
          saving += dispromoteSubtotal[i].dispromotesubtotal / 2;
        }
      }
    if(saving>6) {
      promoteTotal = dispromoteTotal - saving;
      dispromoteSubtotal.push({promotetotal: promoteTotal}, {type:"使用优惠:'指定菜品半价'"},{saving: saving});
    }
    else
    {
      promoteTotal=dispromoteTotal-6;
      dispromoteSubtotal.push({promotetotal: promoteTotal}, {type:"使用优惠：'满30减6'"},{saving: 6});
    }
      for(m of dispromoteSubtotal)
    {
      promoteDetail.push(m);
    }
    return promoteDetail;
    console.log(JSON.stringify(promoteDetail,null,4))
}
// function bestCharge(selectedItems) {
//   return /*TODO*/;
//}
