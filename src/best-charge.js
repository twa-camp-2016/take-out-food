'use strict';

function bestCharge(selectedItems) {
  const allItems = loadAllItems();
  const items = buildItems(selectedItems, allItems);
  const cartItems = buildCartItems(items);

}

function buildItems(selectedItems, allItems) {
  const items = [];
  for (let selectedItem of selectedItems) {
    const itemArray = selectedItem.toString().split(' x ');
    const id = itemArray[0];
    const count = parseInt(itemArray[1]);

    const item = allItems.find(item=>item.id == id);
    items.push({item, count});
  }
  return items;
}

function buildCartItems(cartItems) {
  return cartItems.map(cartItem=> {
    const subTotal = cartItem.count * cartItem.item.price;
    return {cartItem, subTotal};
  });
}

