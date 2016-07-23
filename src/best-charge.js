function bestCharge(selectedItems) {
  return /*TODO*/;
}

function countIds(tags) {
  return tags.map((tag) => {
    let [id,count] = tag.split(' x ');
    return {id,count:parseFloat(count)};
    });
}

function _getExistElementByIds(array, id) {
  return array.find((element) => element.id===id);
}

function buildCartItems(countedIds,allItems) {
  return countedIds.map(({id,count}) => {
    let {name,price} = _getExistElementByIds(allItems,id);
    return {id,name,price,count};
    })
}


