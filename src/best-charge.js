function bestCharge(inputs) {


  const cartItems=buildCartItems(inputs,allItems);
  const receiptItems=buildReceiptItems(receiptItems);
  const receipt=buildReceipt(receiptItems);
  const receiptText=buildReceiptText(receipt);

  console.log(receiptText);

 }

function buildCartItems(inputs) {

  const cartItems = [];
  const allItems = loadAllItems();

  for (const input of inputs) {

    const id = input.slice(0, input.indexOf('x') - 1);
    const count = parseInt(input.slice(-1));

    let cartItem = cartItems.find(cartItem=>cartItem.item.id === id);
    if (cartItem || !cartItems.length) {

      const item = allItems.find(item=>item.id === id);
      cartItems.push({item, count});
    }
  }
  return cartItems;
}

function buildReceiptItems(cartItems) {

  const promotions = loadPromotions();

  return cartItems.map(cartItem=> {

    const promotion = buildPromotionType(cartItem, promotions);
    const {save,subtotal}=discount(cartItem.item.price, cartItem.count, promotions);

    return {cartItem, save, subtotal};

  })
}

function findPromotionType(id, promotions) {

  const promotion = promotions.find(promotion=>promotion.items.some(b=>b === id));

  if (promotion) {

    return promotion ? promotion.type : undefined;
  } else {
    return null;
  }

}

function discount(price, count, promotions) {

  let subtotal = price * count;
  let save = {discountname: 'null', savetoal: price};

  if (promotions) {
    save = {discountname: '指定菜品半价', savetoal: price / 2};
  }

  return {save, subtotal};
}


function getSaveItem(receiptItms) {

  let saveItem = [];

  for (const receipt of receiptItms) {

    const existDiscount = receipt.cartItem;
    if (existDiscount.save.discountname) {

      saveItem.push(existDiscount.item.name);
    }
  }
  return saveItem;
}

function buildReceipt(receiptItms) {

  let subtotal = 0;
  let save = 0;
  let saveWay = [];
  let saveItem=[];

  for (const receipt of receiptItms) {

    let subtotal = receiptItms.savetoal;
    let save = receiptItms.save.savetoal;


     saveItem.push( getSaveItem(receiptItms));

    if (subtotal > 30 && (subtotal - 6) >= subtotal - save) {

      saveWay.push({saveway: '指定菜品半价'}, {save: save})
    } else if (subtotal > 30 && (subtotal - 6) <= subtotal - save) {

      saveWay.push({saveway: '满30减6元'}, {save: save}, saveItem);
    }
  }
  return {receiptItms, saveWay, subtotal, saveItem};

}

function buildReceiptText(receiptItems) {

  let receiptText = receiptItems.map(receipt=> {

    const cartItem = receipt.cartItem;
    return `${cartItem.item.price} x${cartItem.count}=${cartItem.subtotal}`.join('\n');
  })

  return receiptText += `============= 订餐明细 =============
${cartItem}
-----------------------------------
  使用优惠:
${receipt.saveWay}${receipt.saveItem}
-----------------------------------
  总计：${receiptItems.subtotal}
===================================    `

}

