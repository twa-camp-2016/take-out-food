//拆分商品id和数量
let inputs=[{"ITEM0001 * 1","ITEM0013 * 2","ITEM0022 * 1"}];
//let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
//let inputs = ["ITEM0013 x 4"];
function formatTags(inputs) {
  let barcodes = [];
  for (let i = 0; i < inputs.length; i++) {
    let temp = inputs[i].split('*');
    if (temp.length === 2) {
      barcodes.push({id: temp[0], count:temp[1]});
    }
  }
  return barcodes;
}
//获得商品信息
function getItems(barcodes){
  let allItems=loadAllItems();
  let cartItems=[];
  for(let i=0;i<barcodes.length;i++){
    for (let j=0;j<allItems.length;j++){
      if(barcodes[i].id===allItems[j].id){
        cartItems.push(Object.assign({},{id:barcodes[i].id},{name:allItems[j].name},{price:allItems[j].price},{count:barcodes[i].count}));
      }
    }
    return cartItems;
  }
}
//获取原始总计
function getOriginalTotal(cartItems){
  let originalTotal=[];
  for( let i=0;i<cartItems.length;i++){
    originalTotal[i]=cartItems[i].count*cartItems[i].price;
    originalTotal.push(Object.assign({},{originalTotal:originalTotal[i]});
  }
return originalTotal;
}
//获取满30优惠
function getOnePromotionItems(cartItems,originalTotal) {
  let discountTypes=loadPromotions();
  let itemsOneDiscount=[];
  for (let item of discountTypes){
  //  let savemoney=0;
    let subtotal=0;
  for(let i=0;i<cartItems.length;i++){
    if(originalTotal[i]>30){
      subtotal[i]=originalTotal[i]-6;
      itemsOneDiscount.push(Object.assign({},subtotal[i],{type:item.type}));
    }
    else{
      itemsOneDiscount.push(Object.assign({},originalTotal[i]));
    }
  }
  return itemsOneDiscount;
}
}
//获取半价商品优惠
function getTwoPromotionItems(cartItems,originalTotal) {
  let discountTypes = loadPromotions();
  let itemsTwoDiscount = [];
  for (let item of discountTypes) {
    let savemoney = 0;
    let num = 0;
    let subtotal=0;
    let exist = itemsDiscount.find(function (item) {
      return cartItems[i].id === ['ITEM0001', 'ITEM0022'];
    });
    if (exist) {
      cartItems[i].price = parseInt(item.price / 2);
      subtotal[i]=cartItems[i].price*cartItems[i].count;
      savemoney=originalTotal[i]-subtotal[i];
      itemsOneDiscount.push(Object.assign({},subtotal[i], {type: item.type}));
    }
    else {
      itemsOneDiscount.push(Object.assign({}, originalTotal[i]));
    }
    return itemsTwoDiscount;
  }
}
//获取最便宜优惠
function getPromotionItems(itemsOneDiscount,itemsTwoDiscount) {
  let itemsDiscount=[];
  for( let i=0;i<itemsOneDiscount.length;i++){
    for( let j=0;j<itemsTwoDiscount.length;j++){
      if(itemsOneDiscount[i]===itemsTwoDiscount[j]&&itemsOneDiscount[i]<itemsTwoDiscount[j]){
        itemsDiscount.push(Object.assign({},itemsOneDiscount));
      }
      else{
        itemsDiscount.push(Object.assign({},itemsTwoDiscount));
      }
    }
  }
      return itemsDiscount;
}

//实际总价
function getTotal(itemsDiscount) {
  let totalPrice=0;


  for( let i=0;i<itemsDiscount.length;i++){
    totalPrice=totalPrice+itemsDiscount[i];
  }
return totalPrice;
}
function print() {
  let

}


function bestCharge(selectedItems) {
  let barcodes=formatTags(inputs);
  let cartItems=getItems(barcodes);
  let originalTotal=getOriginalTotal(cartItems);
  let itemsOneDiscount=getOnePromotionItems(cartItems,originalTotal);
  let itemsTwoDiscount=getTwoPromotionItems(cartItems,originalTotal);
  let itemsDiscount=getPromotionItems(itemsOneDiscount,itemsTwoDiscount);
  let total=getTotal(itemsDiscount);
  return /*TODO*/;
}
