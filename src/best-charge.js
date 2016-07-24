//#1
function formatInputs(inputs) {
    return inputs.map((input) => {
        let [id, count] = input.split('x');
        return {id: id.trim(), count: parseInt(count.trim())};
    });
}

//#2
function _getExistentElementById(array, id) {
    return array.find(element => element.id === id);
}
function buildItems(formattedInputs, allItems) {
    return formattedInputs.map(({id,count}) => {
        let {name,price} = _getExistentElementById(allItems, id);
        return {id, name, price, count};
    });
}

//#3
function calculateItemsCharge(items) {
    return items.map((item) => {
        let itemCharge = item.count * item.price;
        return Object.assign({}, item, {itemCharge: itemCharge});
    });
}

//#4
function choosePromotions(itemsWithCharge, promotions) {
    let promotionOne = promotions.find((promotion) => promotion.type === '满30减6元');
    let promotionTwo = promotions.find((promotion) => promotion.type === '指定菜品半价');
    let promotionTwoItemsSaved = 0;
    let promotionOneItemsSaved = 0;
    let totalPrice = 0;
    //promotionOne
    itemsWithCharge.forEach((item) => {
        totalPrice += item.itemCharge;
    });
    if (totalPrice > 30) {
        promotionOneItemsSaved = parseInt((totalPrice / 30) * 6);
    }
    //promotionTwo
    let promotedItemName = [];
    itemsWithCharge.forEach((item) => {
        let hasPromoted = promotionTwo.items.includes(item.id);
        if (hasPromoted) {
            promotionTwoItemsSaved += item.itemCharge / 2;
            promotedItemName.push(item.name);
        }
    });
    //choose the best promotion
    if (promotionTwoItemsSaved > promotionOneItemsSaved) {
        let promotionType = promotionTwo.type;
        let saved = promotionTwoItemsSaved;
        return {promotionType, promotedItemName, saved};
    } else {
        let promotionType = promotionOne.type;
        let saved = promotionOneItemsSaved;
        return {promotionType, saved};
    }
}

//#5
function calculateCharge(itemsWithCharge, bestPromotion) {
    let charge = itemsWithCharge.reduce((result, {itemCharge}) => {
        return result += itemCharge;
    }, 0);
    charge -= bestPromotion.saved;
    return charge;
}

//#6
function buildReceipt(itemsWithCharge, bestPromotion, charge) {
    return {
        items: itemsWithCharge.map(({name,count,itemCharge}) => {
            return {name, count, itemCharge};
        }),
        bestPromotion,
        charge
    };
}

function buildReceiptString(receipt) {
    let lines = ['============= 订餐明细 ============='];
    for (let {name,count,itemCharge} of receipt.items) {
        let line = `${name} x ${count} = ${itemCharge}元`;
        lines.push(line);
    }
    let hasPromoted = receipt.bestPromotion.saved > 0;
    if (hasPromoted) {
        lines.push(`-----------------------------------`);
        lines.push(`使用优惠:`);
        if (receipt.bestPromotion.promotionType === '满30减6元') {
            lines.push(`${receipt.bestPromotion.promotionType}，省${receipt.bestPromotion.saved}元`);
        } else {
            var name = receipt.bestPromotion.promotedItemName.join('，');
            lines.push(`${receipt.bestPromotion.promotionType}(${name})，省${receipt.bestPromotion.saved}元`);
        }
    }

    lines.push(`-----------------------------------`);
    lines.push(`总计：${receipt.charge}元`);
    lines.push(`===================================`);

    let receiptString = lines.join('\n');
    return receiptString;
}

function bestCharge(inputs) {
    let allItems = loadAllItems();
    let promotions = loadPromotions();
    let formattedInputs = formatInputs(inputs);
    let items = buildItems(formattedInputs, allItems);
    let itemsWithCharge = calculateItemsCharge(items);
    let bestPromotion = choosePromotions(itemsWithCharge, promotions);
    let charge = calculateCharge(itemsWithCharge, bestPromotion);
    let receipt = buildReceipt(itemsWithCharge, bestPromotion, charge);
    return buildReceiptString(receipt);
}
