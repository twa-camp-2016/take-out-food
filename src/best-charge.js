function bestCharge(selectedItems) {
    const promotions = loadPromotions();
    const allItems = loadAllItems();

    const cartItems = buildCartItems(selectedItems, allItems);
    const promotionItems = buildPromotionItems(cartItems, promotions);
    const receipt = buildReceipt(promotionItems);
    const receiptText = getReceipt(receipt);

    return receiptText;

}
function buildCartItems(selectedItems, allItems) {
    /* const cartItems = [];
     return selectedItems.map(selectedItem => {
     const splitItem = selectedItem.split(' x ');
     const barcode = splitItem[0];
     const count = parseInt(splitItem[1]);

     const item = allItems.find(item => item.id === barcode);

     cartItems.push({item, count});

     return cartItems;
     })
     */


    const cartItems = [];

    selectedItems.forEach(selectedItem => {
        const splitItem = selectedItem.split(' x ');
        const barcode = splitItem[0];
        const count = parseInt(splitItem[1]);

        const item = allItems.find(item => item.id === barcode);

        cartItems.push({item, count});

    })

    return cartItems;
}

function buildPromotionItems(cartItems, promotions) {
    //const promotionsItems = [];

    return cartItems.map(cartItem => {
        const promotionType = getPromotionType(cartItem.item.id, promotions);
        const {subtotal, saved, savedType} = discount(cartItem.item.price, cartItem.count, promotionType);

        return {cartItem, subtotal, saved, savedType};
    });
}

function getPromotionType(id, promotions) {

    let promotion = promotions.find(promotion => {
        if (promotion.items) {
            return promotion.items.includes(id);
        }
    });


    return promotion ? promotion.type : '满30减6元';
}

function discount(price, count, promotionType) {
    let subtotal = price * count;
    let savedWithHalf = 0;
    let saved = 0;
    let savedType = '';

    if (promotionType === '满30减6元' && subtotal >= 30) {
        saved = subtotal - 6;
        savedType = '满30减6元'
    }
    else if (promotionType === '指定菜品半价') {
        saved = subtotal / 2;
        savedType = '指定菜品半价'
    }
    else {
        savedType = ''
    }
    return {subtotal, saved, savedType};
}

function buildReceipt(promotionItems) {
    let cheap = 0;
    let cheapType = '';
    let total = 0;
    let savedWithHalf = 0;
    let savedWithOut = 0;

    promotionItems.forEach(promotionItem => {

        total += promotionItem.subtotal;
    })

    promotionItems.forEach(promotionItem => {

        if (promotionItem.savedType === '指定菜品半价') {
            savedWithHalf += promotionItem.saved
        }
    })

    cheap = savedWithHalf > 6 ? savedWithHalf : 6;

    if (cheap  === 6 && total >= 30) {
        total -= cheap;cheapType = '满30减6元'
    }
    if (cheap === savedWithHalf){
        total -=cheap;cheapType = '指定菜品半价';
    }

    return {promotionItems, total, cheap, cheapType};
}

function getReceipt(receipt) {
    let receiptText = receipt.promotionItems.map(promotionItem => {
        const cartItem = promotionItem.cartItem;
        return `${cartItem.item.name} x ${cartItem.count} = ${promotionItem.subtotal}元`
    }).join('\n')


    let name = receipt.promotionItems.map(promotionItem => {
        const cartItem = promotionItem.cartItem;
        let name = '';
       if (promotionItem.savedType === '指定菜品半价') {
           name = `${cartItem.item.name}`
            return name;
        }
    })

    let names ='';
    name.forEach(name => {
        if(name != undefined){
            names +=name+'，'
        }
    })

    names.splice(names.length-1,1);

    let strWithout = '';

    if (receipt.cheapType === '指定菜品半价') {
        strWithout = `-----------------------------------
使用优惠:
指定菜品半价(${names})，\
省${receipt.cheap}元`
    }

    const sum = parseInt(receipt.total) + parseInt(receipt.cheap)

    if (receipt.cheapType === '满30减6元') {
        strWithout = `-----------------------------------
使用优惠:
满30减6元，\
省${receipt.cheap}元`
    }

    if (strWithout === '') {
        return `
============= 订餐明细 =============
${receiptText}
-----------------------------------
总计：${receipt.total}元
===================================`.trim()
    }

    else {
        return `
============= 订餐明细 =============
${receiptText}
${strWithout}
-----------------------------------
总计：${receipt.total}元
===================================`.trim()
    }
}
