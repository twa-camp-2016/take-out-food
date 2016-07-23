'use strict';

function bestCharge(selectedItems) {

    const allItems = loadAllItems();
    const orderItems = buildOrderItems(selectedItems, allItems);

    const promotions = loadPromotions();
    const itemCharges = buildItemCharges(orderItems, promotions);
    const orders = buildPrintOrders(itemCharges);
    return orders;
}

function buildOrderItems(selectedItems, allItems) {
    const orderItems = [];

    for (let selectedItem of selectedItems) {
        const id = selectedItem.substring(0, 8);
        const count = parseInt(selectedItem.substring(11, selectedItem.length));

        const item = allItems.find(item=>item.id === id);
        orderItems.push({item, count});
    }

    return orderItems;
}

function calculateHalfPrice(orderItems, promotions) {
    let totalPrice = 0;
    for (const orderItem of orderItems) {
        let halfItem = promotions.some(item=>item === orderItem.item.id);
        let price = halfItem ? orderItem.item.price / 2 : orderItem.item.price;
        totalPrice += price * orderItem.count;
    }

    return totalPrice;
}

function buildItemCharges(orderItems, promotions) {
    let itemCharges = {};
    let allItemCharges = [];
    let totalPrice = 0;
    
    for (const orderItem of orderItems) {
        totalPrice += orderItem.item.price * orderItem.count;
    }
    let moreThirtyPrice = totalPrice > 30 ? totalPrice - 6 : totalPrice;
    let halfPrice = calculateHalfPrice(orderItems, promotions[1].items);
    allItemCharges.push(totalPrice, moreThirtyPrice, halfPrice);
    let minPrice = allItemCharges[0];
    for (const itemCharge of allItemCharges) {
        minPrice = minPrice < itemCharge ? minPrice : itemCharge;
    }
    let saved = totalPrice - minPrice;
    if (minPrice == totalPrice)
        itemCharges = {orderItem: orderItems, type: '全价', charge: totalPrice, saved: saved};
    else if (minPrice === moreThirtyPrice)
        itemCharges = {orderItem: orderItems, type: '满30减6元', charge: moreThirtyPrice, saved: saved};
    else
        itemCharges = {orderItem: orderItems, type: '指定菜品半价', charge: halfPrice, saved: saved};

    return itemCharges;
}

function buildPrintOrders(itemCharges) {
    let orders = '';
    for (let itemCharge of itemCharges.orderItem) {
        orders += `${itemCharge.item.name} x ${itemCharge.count} = ${itemCharge.item.price * itemCharge.count}元
`;
    }
    if(itemCharges.type==='指定菜品半价')

    return `============= 订餐明细 =============
${orders}-----------------------------------
使用优惠:
${itemCharges.type}(黄焖鸡，凉皮)，省${itemCharges.saved}元
-----------------------------------
总计：${itemCharges.charge}元
===================================`;
    else if(itemCharges.type==='满30减6元')
        return `============= 订餐明细 =============
${orders}-----------------------------------
使用优惠:
${itemCharges.type}，省${itemCharges.saved}元
-----------------------------------
总计：${itemCharges.charge}元
===================================`;
    else
        return `============= 订餐明细 =============
${orders}-----------------------------------
总计：${itemCharges.charge}元
===================================`

}




