


function formatInputs(inputs) {
  let formatedInputs=inputs.map(function (input) {
    let arr=input.split("x");
    return{
      id:arr[0].trim(),
      count:parseInt(arr[1])
    }
  });
  return formatedInputs;
}

function getCartItems(formatedInputs) {
  let total=0;
  let allItems=loadAllItems();
  let cartItems=[];
  for(let i=0;i<allItems.length;i++){
    for(let j=0;j<formatedInputs.length;j++){
      if(formatedInputs[j].id===allItems[i].id){
        cartItems.push(Object.assign({},allItems[i],{count:formatedInputs[j].count}));
      }
    }
  }
  return cartItems;
}

function getTotal(cartItems) {
  let total=0;
  for(let i=0;i<cartItems.length;i++){
    total+=cartItems[i].price*cartItems[i].count;
  }
  return total;
}

function calculateHalfDiscount(cartItems) {
  let halfDisItems=[];
  let proInfo=loadPromotions();
  for(let i=0;i<cartItems.length;i++){
    for(let j=0;j<proInfo[1].items.length;j++){
      if(proInfo[1].items[j]===cartItems[i].id){
        let halfPrice=parseFloat(cartItems[i].price/2)*parseFloat(cartItems[i].count);
        halfDisItems.push(Object.assign({},cartItems[i],{halfDiscount:halfPrice}));
      }
    }
  }
  return halfDisItems;

}

function chooseDiscount(cartItems) {
  let discountOne=6;
  let discoutTwo=0;
  let savedMoney=0;
  let halfDisItems=calculateHalfDiscount(cartItems);
  let total=getTotal(cartItems);
  for(let i=0;i<halfDisItems.length;i++){
    discoutTwo+=halfDisItems[i].halfDiscount;
  }

  if(total>30&&discoutTwo>discountOne){
    savedMoney=discoutTwo;
    cartItems.push({type:'指定菜品半价'});
  }
  else if(total>30){
    savedMoney=total-discountOne;
    cartItems.push({type:'满30减6元'});
  }
  else{
    savedMoney=0;
    cartItems.push({type:'null'});
  }
  return cartItems;
}

function print(cartItems) {
  let choosedSummary=chooseDiscount(cartItems);
  let halfDisItems=calculateHalfDiscount(cartItems);
  let total=0;
  let savedMoney=0;
  let discountOne=6;
  let discoutTwo=0;

  for(let i=0;i<halfDisItems.length;i++){
    discoutTwo+=halfDisItems[i].halfDiscount;
  }

  let text='\n============= 订餐明细 =============\n';
  for(let i=0;i<cartItems.length-1;i++) {
    total+=cartItems[i].count * cartItems[i].price;

    text += cartItems[i].name + ' x ' + cartItems[i].count + ' = ' + cartItems[i].count * cartItems[i].price + '元\n';

  }
  text+='-----------------------------------\n';
  if(total>30&&discoutTwo>discountOne){
    savedMoney=discoutTwo;
    let text1='使用优惠:\n'+'指定菜品半价(黄焖鸡，凉皮)，省'+savedMoney+'元\n'+'-----------------------------------\n'+'总计：'+(total-savedMoney)+'元\n'+'===================================';
    text+=text1;
  }
  else if(total>30){
    savedMoney=total-discountOne;
    let text2='使用优惠:\n'+'满30减6元，省'+6+'元\n'+'-----------------------------------\n'+'总计：'+(total-6)+'元\n'+'===================================';
    text+=text2;
  }
  else{
    savedMoney=0;
    let text3='总计：'+total+'元\n'+'===================================';
    text+=text3;
  }

  /*if(choosedSummary[3].type==='指定菜品半价'){

    let text1='使用优惠:\n'+'指定菜品半价(黄焖鸡，凉皮)，省'+savedMoney+'元\n'+'-----------------------------------\n'+'总计：'+(total-savedMoney)+'元\n'+'===================================';
     text+=text1;
  }
  else if(choosedSummary[3].type==='满30减6元'){
    let text2='使用优惠:\n'+'满30减6元，省'+6+'元\n'+'-----------------------------------\n'+'总计：'+(total-6)+'元\n'+'===================================';
    text+=text2;
  }
  else {
    let text3='总计：'+total+'元\n'+'===================================';
    text+=text3;
  }*/
  return text;
}

function bestCharge(selectedItems) {
  let formatedInputs=formatInputs(selectedItems);
  let cartItems=getCartItems(formatedInputs);
  // let choosedSummary=chooseDiscount(cartItems);
  return print(cartItems);
}
