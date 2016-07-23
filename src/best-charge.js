function bestCharge(selectedItems) {
  const allItems = loadAllItems();
  const orderItems = buildOrderItems(selectedItems, allItems);
  const allPromotions = loadPromotions();
  const receiptItems = buildReceiptItems(orderItems);
}

function buildOrderItems(selectedItems, allItems) {
  const orderItems = [];
  for (const selectedItem of selectedItems) {
    const selectedItemArray = selectedItem.split(' x ');
    const id = selectedItemArray[0];
    const count = parseInt(selectedItemArray[1]);
    const item = allItems.find(item=>item.id === id);
    orderItems.push({item, count});
  }
  return orderItems;
}

function buildReceiptItems(orderItems) {
  return orderItems.map(orderItem=> {
    const subtotal = orderItem.count*orderItem.item.price;
    return {orderItem, subtotal};
  });
}
