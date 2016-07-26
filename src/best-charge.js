let tags= ["ITEM0001x1", "ITEM0013x2", "ITEM0022x1"];
function getFoodCounts(tags) {
  let result=[];
  for(let myTag of tags)
  {
    let items=myTag.split("x");
    result.push({code:items[0],count:parseInt(items[1])});
  }
  return result;
}
function loadAllItems() {
  return [{
    code: 'ITEM0001',
    name: '黄焖鸡',
    price: 18.00
  }, {
    code: 'ITEM0013',
    name: '肉夹馍',
    price: 6.00
  }, {
    code: 'ITEM0022',
    name: '凉皮',
    price: 8.00
  }, {
    code: 'ITEM0030',
    name: '冰锋',
    price: 2.00
  }];

}
function _getElementBycodes(array,code){
  return array.find((arr)=>arr.code===code);
}
function builtItems(GetCounts,allItems){
 return GetCounts.map(({code,count})=>{
   let {name,price}=_getElementBycodes(allItems,code);
   return {code,name,count,price};
 });

 }


/*function loadPromotions() {
  return [{
    type:'满30减6元'
  }, {
    type:'指定菜品半价',
    items:['ITEM0001', 'ITEM0022']


  }];
}*/
function printReceipt(tags)
{
  //console.log(getFoodCounts(tags));
  let GetCounts=getFoodCounts(tags);
  let allItems=loadAllItems();
  console.log(builtItems(GetCounts,allItems));
}
printReceipt(tags);

