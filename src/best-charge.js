function formatInput(selecteItem) {
    let formatedItems = selecteItem.map(function (item) {
        let arr = item.split('x');
        return {
            id: arr[0].trim(),
            count: parseInt(arr[1])
        }
    });
    return formatedItems;
}

function getCartItems(formatedItems) {
    let cartItems = [];
    let allItems = loadAllItems();
    for (let i of allItems) {
        for (let j of formatedItems) {
            if (i.id === j.id) {
                cartItems.push(Object.assign({}, i, {count: j.count}));
            }
        }
    }
    return cartItems;
}

function getTotal(cartItems) {
    let total = 0;
    for (let i of cartItems) {
        total += i.price * i.count;
    }
    return total;
}

function isHalfDiscount(cartItems, proInfo) {
    let halfPriceItems=[];
    for (let i of cartItems) {
        for (let j of proInfo[1].items)
        if (i.id===j) {
            halfPriceItems.push(i.name);
        }
    }
    return halfPriceItems;
}


function chooseDiscount(cartItems) {
    let total=getTotal(cartItems);
    let proInfo=loadPromotions;
    let halfPriceItems=isHalfDiscount(cartItems,proInfo);
    let text='';
    let savedHalfMoney=0;
    for(let item of cartItems){
          for(let i of halfPriceItems){
              if(item.name===i){
                  savedHalfMoney+=item.price/2*item.count;
              }
          }
    }
    if(total>30&&savedHalfMoney>6){
        text='使用优惠:\n'+
            '指定菜品半价('+halfPriceItems+')，省'+savedHalfMoney+'元';
    }
    else if(total>30){
        text='使用优惠:\n'+
        '满30减6元，省6元';
    }
    return text;

}
