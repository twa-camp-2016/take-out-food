

//#1
function formatInputs(inputs) {
    //debugger;
    return inputs.map((input) => {
        //if(input.includes('x')) {
        let [id, count] = input.split('x');
        return {id: id.trim(), count: parseInt(count.trim())};
        //}
    });
}

//#2

function _getExistentElementById(array, id) {
    return array.find(element => element.id === id);
}
function buildItems(formattedInputs, allItems) {
    //debugger;
    return formattedInputs.map(({id,count}) => {
        let {name,price} = _getExistentElementById(allItems, id);
        return {id, name, price, count};
    });
}


//#3
function calculateItemsCharge(items) {
    return items.map((item) => {
        let itemCharge = item.count * item.price;
        return Object.assign({}, item, {itemCharge: parseFloat(itemCharge.toFixed(0))});
    });
}

//#4
function choosePromotions(itemsWithCharge, promotions) {
    let promotionOne = promotions.find((promotion) => promotion.type === '满30减6元');
    let promotionTwo = promotions.find((promotion) => promotion.type === '指定菜品半价');
    //return itemsWithCharge.reduce((result,item) => {
    //    let hasPromoted = promotionTwo.items.includes(item.id);
    //    let itemSaved = hasPromoted ? item.itemCharge / 2 : 0;
    //    //return Object.assign({}, promotionTwo, item.name, itemSaved);
    //    //return hasPromoted;
    //    //return itemSaved;
    //    result.type
    //},{});


    let result = [];
    let prpmotionTwoItemSaved = 0;
    let prpmotionOneItemSaved = 0;

    let promotedItemName = [];
    itemsWithCharge.forEach((item) => {

        let hasPromoted = promotionTwo.items.includes(item.id);
        if (hasPromoted) {

            prpmotionTwoItemSaved += hasPromoted ? item.itemCharge / 2 : 0;
            promotedItemName.push(item.name);

        }
        //result.push(itemSaved);
    });
    debugger;

    //promotionTwo
    let totalPrice = 0;
    itemsWithCharge.forEach((item) => {
        //let hasPromoted = promotionTwo.items.includes(item.id);
        totalPrice += item.itemCharge;

    });
    if (totalPrice > 30) {
        prpmotionOneItemSaved = (totalPrice / 30) * 6;
    }

    //choose
    //let type;
    //let type = prpmotionTwoItemSaved > prpmotionOneItemSaved ? promotionTwo.type :promotionOne.type;
    //
    //let type = promotionTwo.type;
    //let saved ;//= prpmotionTwoItemSaved;

    if (prpmotionTwoItemSaved > prpmotionOneItemSaved) {
        type = promotionTwo.type;
        saved = prpmotionTwoItemSaved;
        return {type, promotedItemName, saved};
    } else {
        type = promotionOne.type;
        saved = prpmotionOneItemSaved;
        return {type, saved};
    }


    //return {type, promotedItemName, saved};

}

//#5
function calculateCharge(itemsWithCharge,bestPromotion) {
    let charge = 0;
    itemsWithCharge.forEach((item) => {
        charge += item.itemCharge;
    });
    charge -= bestPromotion.saved;
    return {charge};
}

//#6
function buildReceipt(itemsWithCharge,bestPromotion,charge) {
    return {
        items:itemsWithCharge.map(({name,count,itemCharge}) => {
            return {name, count, itemCharge};
        }),
        bestPromotion,
        charge

    };
}

function buildReceiptString() {

}

function bestCharge(selectedItems) {
    return ;
}



//Expected Object({ type: '指定菜品半价', promotedItemName: [ '黄焖鸡', '凉皮' ], prpmotionTwoItemSaved: 13 })
//to equal Object({ type: '指定菜品半价', savedItems: [ '黄焖鸡', '凉皮' ], saved: 13 }).