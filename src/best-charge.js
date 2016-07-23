function bestCharge(selectedItems) {
  const allItems = loadAllItems();
  const orderItems = buildOrderItems(selectedItems, allItems);
}

function buildOrderItems(selectedItems, allItems) {
  const orderItems = [];
  for (const  selectedItem of selectedItems) {
    const selectedItemArray = selectedItem.split(' x ');
    const id = selectedItemArray[0];
    const count = parseInt(selectedItemArray[1]);
    const item = allItems.find(item=>item.id === id);
    orderItems.push({item, count});
  }
  return orderItems;
}

