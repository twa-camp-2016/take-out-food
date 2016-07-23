function bestCharge(selectedItems) {
     let allItems = loadAllItems();
     let formattedItems = formatItem(selectedItems);
     let cartItems = buildCartItem(formattedItems,allItems);
     let promotions = loadPromotions();
     let promotedItems = builPromotedItem(cartItems,promotions);

     let totalprice = calculatePrice(promotedItems);
     let lowone = lowerPrice(totalprice);

     let receipt = buildReceipt(lowone);


      return /*TODO*/;
}

function formatItem(selectedItems) {
      return selectedItems.map((selectedItem)=>{
            if(selectedItem.includes(' x ')){
             let [id,count]=selectedItem.split(' x ');
               return {
                   id: id,
                   count: parseFloat(count)
               }
            }else{
                return{
                   id: selectedItem,
                   count: 1
                }
            }
      });
}

function _byExistElementByItem(array,id){
       return array.find((element)=>element.id===id);
}

 function buildCartItem(formattedItems, allItems) {
         return formattedItems.map(({count,id})=>{
              let{name,price} = _byExistElementByItem(allItems,id);
              return{name,id,price,count}
         });
}

function builPromotedItem(cartItems,promotions) {

            let currentpromotion = promotions.find((promotion)=>promotion.type === '指定菜品半价');
            return promoted = cartItems.map((cartItem)=>{
                    let hasPromoted =  currentpromotion.items.includes(cartItem.id);
                    let totalPrice = cartItem.count * cartItem.price;
                    let saved = hasPromoted ? totalPrice * 0.5:0;
                    let payPrice1 = totalPrice -saved;
                    return Object.assign({},cartItem,{payPrice1,saved:_fixPrice(saved),totalPrice});
             });
}
function _fixPrice(number) {
          return parseFloat(number.toFixed(2));
}

function calculatePrice(promotedItems){
          let totalPayPice = promotedItems.reduce((result,promotedItem)=>{
               result.totalPrice += promotedItem.totalPrice;
               result.totalSaved += promotedItem.saved;
               result.totalPrice1 += promotedItem.payPrice1;
               return result;
          },{totalPrice:0,totalSaved:0,totalPrice1:0,lastprice:0,type:''});
         if(totalPayPice.totalPrice >30){
                  totalPayPice.totalPrice2 = totalPayPice.totalPrice -6;
         }

         if(totalPayPice.totalPrice1<=totalPayPice.totalPrice2){
                  totalPayPice.lastprice = totalPayPice.totalPrice1;
                  totalPayPice.type = '指定菜品半价';
         }else{
                 totalPayPice.lastprice = totalPayPice.totalPrice2;
         }
         return totalPayPice;
}














