let selectedItems=[
  "ITEM0001 x 1",
  "ITEM0013 x 2",
  "ITEM0022 x 1"
];


function getSelectedItems(selectedItems) {
  let selectedItemsList=[];
  selectedItemsList=selectedItems.map(function (item) {
    let arr=[];
    arr=item.split(" x ");
    //console.log(arr[0]);
    return arr.length === 2?
    {id:arr[0],count:parseFloat(arr[1])}:
    {id:arr[0],count:1}
  })
  //console.log(selectedItemsList);
  return selectedItemsList;
}


function matchItems(allItemsList,selectedItemsList) {
  let matchedItemsList=[];
  for (let j=0;j<selectedItemsList.length;j++){
    matchedItemsList.push(selectedItemsList[j]);
  }

  for (let i=0;i<allItemsList.length;i++){
    exist=matchedItemsList.find(function (item) {
      return item.id === allItemsList[i].id;
    })
    if (exist){
      exist.name=allItemsList[i].name;
      exist.price=allItemsList[i].price;
    }

  }
  return matchedItemsList;
}



function calSubtotal(matchedItemsList) {
  let subtotalItemsList=[];
  for (let i=0;i<matchedItemsList.length;i++){
    subtotalItemsList.push(matchedItemsList[i]);
  }
  for (let j=0;j<subtotalItemsList.length;j++){
    subtotalItemsList[j].subtotal=parseFloat(subtotalItemsList[j].count)*parseFloat(subtotalItemsList[j].price);
  }

  return subtotalItemsList;
}


function calFirstTotal(subtotalItemsList) {
  let firstTotal=0;
  for (let i=0;i<subtotalItemsList.length;i++){
  firstTotal=parseFloat(firstTotal)+parseFloat(subtotalItemsList[i].subtotal)
  }
  return firstTotal;
}

//

function matchPromotionsType(subtotalItemsList,promotionsList) {
  let typeItemsList=[];
  let promotinonOne=promotionsList[1].items;
  for (let i=0;i<subtotalItemsList.length;i++){
    typeItemsList.push(Object.assign({},subtotalItemsList[i],{type:''}));
  }

  for (let j=0;j<typeItemsList.length;j++){
    for (let k=0;k<promotinonOne.length;k++){
      if (typeItemsList[j].id===promotinonOne[k])
      {
        typeItemsList[j].type=promotionsList[1].type;
        //console.log( typeItemsList[j].type);
      }

    }
  }

  return typeItemsList;
}




function calSaving(typeItemsList,firstTotal) {
  let savingList=[];
  let sav1=0,sav2=0;
  let type1='';
  let saving=0;
  for (let i=0;i<typeItemsList.length;i++){
    savingList.push(typeItemsList[i]);
  }
  //savingList.saving=0;
 for (let item of savingList){
  if (item.type==='指定菜品半价') {
    sav1 = parseFloat(sav1) + parseFloat(item.subtotal / 2);
  }
 }
  sav2=firstTotal>30?6:0;
  if (sav1>sav2 || sav1==sav2){
    saving=sav1;
    type1='指定菜品半价';
  }
  else if (sav1<sav2){
    type1='满30减6元';
  }
  else if (sav1==0 && sav2==0){
    type1=''
  }

  savingList.push({type1:type1,saving:saving});
  console.log(savingList);
  return savingList;
}


function calTotal(savingList,firstTotal) {
  let i=0;
  for (i=0;i<savingList.length;i++){
    if (savingList[i].saving)
    {
      console.log(savingList[i].saving)
      return parseFloat(firstTotal-savingList[i].saving);
    }
  }

}




function print1(typeItemsList,savingList,charge) {
  let str1=" ============= 订餐明细 ============="+"\n";
  let str2=''
  for (let i = 0; i < typeItemsList.length; i++) {
    str2 = str2 + typeItemsList[i].name+" " + 'X' + " "+typeItemsList[i].count +" "+"="+" "+typeItemsList[i].subtotal+ '\n';
  }
  let str3='------------------'+"\n"
  let str4='使用优惠:'+'\n'+"指定菜品半价";
  let str5="(";
  let str6='';
  for (j=0;j<typeItemsList.length;j++){
    if (typeItemsList[j].type==='指定菜品半价'){
      str6=str6+typeItemsList[j].name+",";
    }
    //str6=str6+",";
  }
  let str7="),省"+savingList[3].saving+"元"+"\n";
  let str8='-----------------------------------'+"\n"+"总计："+charge+"元"+"\n";
  let str9="===================================";

  let str=str1+str2+str3+str4+str5+str6+str7+str8+str9;
  return str;
}


function bestCharge(selectedItems) {

  let selectedItemsList=getSelectedItems(selectedItems);
  let allItemsList=loadAllItems();
  let promotionsList=loadPromotions();
  let matchedItemsList=matchItems(allItemsList,selectedItemsList);
  let subtotalItemsList=calSubtotal(matchedItemsList);
  let typeItemsList=matchPromotionsType(subtotalItemsList,promotionsList);
  let firstTotal=calFirstTotal(subtotalItemsList);
  let savingList=calSaving(typeItemsList,firstTotal);
  let charge=calTotal(savingList,firstTotal);
  console.log(charge);
  let p=print1(typeItemsList,savingList,charge);
  console.log(p);
  return p;
}

bestCharge(selectedItems);
