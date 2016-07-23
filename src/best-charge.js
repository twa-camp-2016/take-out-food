function formatTags(inputs) {
    return inputs.map((input) => {
        let [id,count] = input.split(" x");
        return {id, count: parseInt(count)};
    });
}

function _getExitElementById(array, id) {
    return array.find((element) => element.id === id);
}

function buildCartItems(formattedTags, allItems) {
    return formattedTags.map(({id, count}) => {
        let {name, price} = _getExitElementById(allItems, id);
        return {id, name, price, count};
    });
}

function buildPromotedItems(cartItems, promotions) {
    let currentPromotion = promotions.find((promotion) => promotion.type === '指定菜品半价');
    for(let cartItem of cartItems){
        let totalNoPromotion += cartItem.price * cartItem.count;
    }
    return cartItems.map((cartItem) => {
        let totalPrice = cartItem.price * cartItem.count;
        let hasPromoted = currentPromotion.items.includes(cartItem.id) ;
        let saved = hasPromoted ? cartItem.price / 2 : 0;
        let payPrice = totalPrice - saved;
        return Object.assign({}, cartItem, {totalPrice,payPrice, saved});
    });
}

function calculateTotalPrice(promotedItems) {
    return promotedItems.reduce((result, promotedItem) => {
           result.totalPayPrice += promotedItem.payPrice;
           result.totalSaved += promotedItem.saved;
        return result;  
    }, {totalPayPrice: 0, totalSaved: 0});
}

function buildReceiptItems(promoteddItems,totalPrice) {
    let savedItems = promoteddItems.filter((promoteddItem) => promoteddItem.saved > 0);
    let {name,}
}


function bestCharge(selectedItems) {
    // return /*TODO*/;

}
