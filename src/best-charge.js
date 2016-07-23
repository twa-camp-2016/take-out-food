'use strict';

function bestCharge(tags) {
    const allItems = loadAllItems();
    const menuItems = buildMenuItems(tags, allItems);

    const promotions = loadPromotions();
    const receiptItems = buildReceiptItems(menuItems, promotions);

    const receipt = buildReceipt(receiptItems);
    const receiptText = buildReceiptText(receipt);

      return receiptText;
}

function buildMenuItems(tags, allItems) {
    const menuItems = [];

    for (let tag of tags) {
        const tagArray = tag.split(' x ');
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
    let discountPrice = 0;
    let discountSaved = 6;

    for (let receiptItem of receiptItems) {
        halfPrice += receiptItem.halftotal;
        halfSaved += receiptItem.saved;
        discountPrice += receiptItem.actualTotal;
    }
    discountPrice = discountPrice - 6;
    return {receiptItems, halfPrice, halfSaved, discountPrice, discountSaved};
}


function buildReceiptText(receipt) {
    let promotion = '';
    let savedMoney = 0;
    let total = 0;
    if (receipt.discountSaved > receipt.halfSaved) {
        promotion = '满30减6元';
        savedMoney = receipt.discountSaved;
        total = receipt.discountPrice;
    }
    else {
        promotion = '指定菜品半价';
        savedMoney = receipt.halfSaved;
        total =parseFloat(receipt.halfPrice);

    }

    let halfItems = [];

    let receiptText = receipt.receiptItems.map(meunItem => {
        const item = meunItem.receiptItem;
        if (meunItem.saved !== 0.00) {
            const name = item.item.name;
            halfItems.push(name);
        }
        return `${item.item.name} x ${item.count} = ${meunItem.actualTotal}元`;
    }).join('\n');

    let halfName = halfItems.join(',');

    return `============= 订餐明细 =============
${receiptText}
-----------------------------------
使用优惠:
${promotion}(${halfName})，省${savedMoney}元
-----------------------------------
总计：${total}元
===================================`;
}





