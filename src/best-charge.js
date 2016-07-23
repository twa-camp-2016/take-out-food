function bestCharge(selectedItems) {
  return /*TODO*/;
 /*
  let parsedItems =parseSelectedItems(selectedItems);
  let Items = loadAllItems();
  let cartItemsCount = getCartItemsCount(Items,parsedItems);
  let promotionItems = loadPromotions();
  let cartItemsCountType = getCartItemsCountType(cartItemsCount,promotionItems);

*/
  function parseSelectedItems(selectedItems)
  {
    return selectedItems.map(function(selectedItem){
      let selectedItemsPart = selectedItem.split("x");
      return {id: selectedItemsPart[0], count: parseFloat(selectedItemsPart[1]) || 1 };
    })
  }

}
 function getCartItemsCount(Items,parsedItems)
 {
   let cartItemsCount =[];
  for(let i =0; i< parsedItems.length; i++)
  {
    for(let j=0; j< Items.length; j++)
    {
      if (parsedItems[i].id=== Items[j].id)
      {
        cartItemsCount.push(Object.assign({},Items[j],{count:parsedItems[i].count}));
      }
    }
  }
  return  cartItemsCount;
 }

 function getCartItemsCountType(cartItemsCount,promotionItems)
 {
   let cartItemsCountType =[];
   for(let i =0; i< promotionItems.length;i++)
   {
      if(promotionItems[i].type === '指定菜品半价')
      {
        for(let j= 0; j< promotionItems[i].items.length; j++)
        {
          for(let m = 0; m <cartItemsCount.length;m++ )
          {
            if(cartItemsCount[m].id === promotionItems[i].items[j])
            {
              cartItemsCountType.push(Object.assign({},cartItemsCount[m],{type:promotionItems[i].type}));
            }
            else
            {
              cartItemsCountType.push(Object.assign({},cartItemsCount[m],{type:'满30减6元'}));

            }
          }

        }
      }


   }
   return cartItemsCountType;
 }

 function getPromotionItems(cartItemsCountType)
 {
   let promotionItems = [];
   for(let i=0; i < cartItemsCountType.length; i++)
   {
     if(cartItemsCountType[i].type === '指定菜品半价' )
    {
       let money = parseFloat(cartItemsCountType[i].price / 2);
        let promotionPrice = money * cartItemsCountType[i].count;
        let promotionedPrice = promotionPrice;
      promotionItems.push(Object.assign({},cartItemsCountType[i],
        {promotionPrice:promotionPrice, promotionedPrice: promotionedPrice}));
    }
    else
     {
       promotionItems.push(Object.assign({},cartItemsCountType[i],
         {promotionPrice:0, promotionedPrice:cartItemsCountType[i].price * cartItemsCountType[i].count }));

     }
   }
   return promotionItems;
 }

 function  getSubTotal(promotionItems)
 {
   let subTotalItems =[];
   for(let i=0; i < promotionItems.length; i++)
   {
     let subTotal = promotionItems[i].price *  promotionItems[i].count;
     subTotalItems.push(Object.assign({},promotionItems[i],{subTotal: subTotal} ));
   }
   return subTotalItems;
 }

 function getSaveMoney(promotionItems)
 {
   let saveMoney = 0;
   for(let i = 0; i < promotionItems.length; i++ )
   {
     let saveMoney +=  promotionItems[i].promotionPrice;
   }
   return saveMoney;
 }

 function getTotal(promotionItems)
 {
   let total = 0;
   for(let i = 0; i < promotionItems.length; i++ )
   {
     let total +=  promotionItems[i].promotionedPrice;
   }
   return total;

 }
