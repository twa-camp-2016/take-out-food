
let items=["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];

function formatItems(items)
{
  return items.map(function (item) {
    let temp=removeAllSpace(item);
    let tempArray=temp.split("x");
    return {id:tempArray[0],count:parseFloat(tempArray[1])||1};
  })
}
console.log(formatItems(items));

function getSelectedItems(idItems,allItems){
  let selectedItems=[];

  for( let i=0;i<allItems.length;i++){
    let existItems=idItems.find(function (item) {
      return item.id===allItems[i].id;
    });
    if(existItems){
     selectedItems.push(Object.assign({},allItems[i],{count:existItems.count}));
    }
  }

  return selectedItems;
}

function calculateSubtotal(selectedItems){
  let subtotalItems=[];

  for(let i=0;i<selectedItems.length;i++)
  {
    let subtotal=selectedItems[i].count*(selectedItems[i].price);
    subtotalItems.push(Object.assign({},selectedItems[i],{subtotal:subtotal}));
  }

  return subtotalItems;
}


function calculateSaving(allPromotions,subtotalItems) {
  let savedItems=[];
  let promotionTwo=allPromotions[1].items;

  for(let i=0;i<subtotalItems.length;i++){
    let existItems=promotionTwo.find(function (item) {
      return item===subtotalItems[i].id;
    })
    if(existItems){
      let saving=subtotalItems[i].price/2;
      savedItems.push(Object.assign({},subtotalItems[i],{saving:saving}));
    }else{
      savedItems.push(Object.assign({},subtotalItems[i],{saving:0}));
    }
  }

  return savedItems;
}


function calculateAllSaving(savedItems) {
  let allSaving=0;
  let allSavedItems=[];
  for(let i=0;i<savedItems.length;i++){
    allSaving+=savedItems[i].saving;
  }
  allSavedItems.push(Object.assign({},savedItems,{allSaving:allSaving}));

  return allSavedItems;
}
let a=formatItems(items);
let selectedItems=getSelectedItems(a,loadAllItems());
let subtotalItems =calculateSubtotal(selectedItems);
let savedItems= calculateSaving(loadPromotions(),subtotalItems);
console.log(calculateAllSaving(savedItems));

let allSavedItems=calculateAllSaving(savedItems);
function getTotal(savedItems){
  let total=0;

  for(let i=0;i<savedItems.length;i++){
    total+=savedItems[i].subtotal;
  }

  return total;
}
let total=getTotal(savedItems);
console.log(total);

function getBestSavingItems(allSavedItems,total,allPromotions){
  let tempSaving=0;

  let bestSavingItems=[];
  if(total>=30)
  {
    tempSaving=6;
  }
  if(tempSaving>allSavedItems.allSaving){
    allSavedItems.allSaving=tempSaving;
    bestSavingItems.push(Object.assign({},allSavedItems,{type:allPromotions[0].type}));
  }else{

    bestSavingItems.push(Object.assign({},allSavedItems,{type:allPromotions[1].type}));
  }
  return bestSavingItems;
}
let bestSavingItems=getBestSavingItems(allSavedItems,total,loadPromotions());
console.log(bestSavingItems);

function getFinalTotal(total,bestSavingItems){
  let finalTotal;

  finalTotal=total-bestSavingItems[0].allSaving;
  return finalTotal;

}
let finalTotal=getFinalTotal(total,bestSavingItems);
console.log(finalTotal);

//去空格
function removeAllSpace(str) {
  return str.replace(/\s+/g, "");
}

function bestCharge(selectedItems)  {
  let formatItems=formatItems(items);
  let selectedItems=getSelectedItems(formatItems,loadAllItems());
  let subtotalItems =calculateSubtotal(selectedItems);
  let savedItems= calculateSaving(loadPromotions(),subtotalItems);
  let allSavedItems=calculateAllSaving(savedItems);
  let total=getTotal(savedItems);
  let bestSavingItems=getBestSavingItems(allSavedItems,total,loadPromotions());
  let finalTotal=getFinalTotal(total,bestSavingItems);
}
