'use strict';

function bestCharge(selectedItems) {
    return /*TODO*/;
}

function buildMenuItems(allItems, tags) {
    const menuItems = [];

    for (let tag of tags) {
        const tagArray = tag.split('x');
        const id = tagArray[0];
        const count = parseInt(tagArray[1]);
        const item = findExist(allItems, id);
        if (item) {
            menuItems.push({item, count});
        }
    }
    return menuItems;
}

function findExist(allItems, id) {
    return allItems.find(item => item.id === id);
}

function buildReceiptItems(menuItems, promotions) {

    return menuItems.map(menuItem => {
        const promotionType = getPromotionType(menuItem.item.id, promotions);
        const {actualTotal,saved} = discount(promotionType, menuItem.item.price, menuItem.count);

        return {receiptItem: menuItem, actualTotal, saved}
    });
}

function getPromotionType(id, promotions) {
    const promotion = promotions.find(promotion=>promotion.items.includes(id));
    return promotion ? promotion.type : undefined;
}


function discount(promotionType, price, count) {
    let actualTotal = price * count;
    let halfTotal = 0;
    let saved = 0;

    if (promotionType === "指定菜品半价") {
        halfTotal = parseFloat(price * count / 2);
        saved = parseFloat(price * count / 2);
    }
    return {actualTotal, halfTotal, saved};
}

function buildReceipt(receiptItems) {

    let halfPrice = 0;
    let halfSaved = 0;
    let discount = 0;
    let discountSaved = 6;

    for (let receiptItem of receiptItems) {
        halfPrice += receiptItem.halftotal;
        halfSaved += receiptItem.saved;
        discount += receiptItem.actualTotal;
    }
    discount = discount - 6;
    return {receipt:receiptItems, halfPrice, halfSaved, discount, discountSaved};
}


function buildReceiptText(receipt) {
    let promotion = '';
    if (receipt.discountPrice > receipt.halfPrice) {
        promotion = '满30减6元';
    }
    else {
        promotion = '指定菜品半价';
    }

    let receiptText = receipt.receipItems.map(menuReceipt => {
        const item = menuReceipt.receiptItem;
        return `${item.name}`
    })

}



