let allItems=loadAllItems();
let promotions=loadAllItems();

function bestCharge(selectedItems) {
  let subAmount= formatTags(selectedItems);
  let subCount= matchInformation(subAmount,allItems);
  let subTotal= calculateSubTotal(subCount);
  let total=calculateTotal(subTotal);
  let saves=calculateSaves(subTotal,promotions);
  let bestTotal= selectBestTotal(total,saves);
  return print(bestTotal,saves,subTotal,total);

}

function formatTags(selectedItems) {
  let subAmount=[];
  for(let i=0;i<selectedItems.length;i++){
    let arr=selectedItems[i].split("x");
    subAmount.push(Object.assign({},{id:arr[0]},{amount:parseInt(arr[1])}));
  }
  console.log(subAmount)
  return subAmount;
}

function matchInformation(subAmount,allItems) {
  let subCount=[];
  for(let i=0;i<subAmount.length;i++){
    for(let j=0;j<allItems.length;j++){
      if(subAmount[i].id===allItems[j].id)
        subCount.push(Object.assign({},allItems[j],{count:subAmount[i].amount}))
    }
  }
  console.log(subCount)
  return subCount;
}

function calculateSubTotal(subCount) {
  let subTotal=[];
  for(let i=0;i<subCount.length;i++){
    let sum=0;
    sum=subCount[i].price*subCount[i].count;
    subTotal.push(Object.assign({},subCount[i],{subTotal:sum}));
  }
  console.log(subTotal);
  return subTotal;
}

function calculateTotal(subTotal) {
  let total=0;
  for(let i=0;i<subTotal.length;i++){
    total+=subTotal[i].subTotal;
  }
  console.log(total)
  return total;
}

function calculateSaves(subTotal,promotions) {
  let saves=[];
  let save=0;
  for(let i=0;i<subTotal.length;i++){
    for(let j=0;j<promotions[1].items.length;j++){
      if(subTotal[i].id===promotions[1].items[j]){
        save=(subTotal[i].subTotal)/2;
        saves.push(Object.assign({},{name:subTotal[1].name},{saves:save}))
      }
    }
  }
  console.log(saves)
  return saves;
}

function selectBestTotal(total,saves) {
  let bestTotal=[];
  if(total>30 && saves===6){
    bestTotal.push(Object.assign({},{type: '满30减6元'},{save:6}))
    console.log(bestTotal);
    return bestTotal;
  }
  else if(total>30 && saves>6){
    bestTotal.push(Object.assign({},{type: '指定菜品半价'},{save:saves}))
    console.log(bestTotal);
    return bestTotal;
  }
  else if(total<30 && saves===0){
    console.log(bestTotal);
    return bestTotal;
  }
  else{
    bestTotal.push(Object.assign({},{type: 'null'},{save:-1}))
  }
}

function print(bestTotal,saves,subTotal,total) {
  let result='';
  console.log(bestTotal);
  result+="============== 订餐明细 ============="+"\n";
  for(let i=0;i<subTotal.length;i++){
    result+=(subTotal[i].name+"x"+subTotal[i].count+"="+subTotal[i].subTotal+"元"+"\n");
  }
  result+="-----------------------------------"+"\n";
  if(bestTotal[0].type!='满30减6元' && bestTotal[0].type!='指定菜品半价'){
    result+=("总计"+total+"元\n"+" ===================================")
  }
  else if(bestTotal[0].type==='满30减6元'){
    result+="使用优惠:"+"\n"+
    "满30减6元，省6元"+"\n"+
    "-----------------------------------"+"\n"+
      "总计："+total-6+"元\n"+"===================================";
  }
  else if(bestTotal[0].type==='指定菜品半价'){
    result+="使用优惠:"+"\n"+
            "指定菜品半价(";
    for(let j=0;j<saves.length;j++){
      result+=saves[j].name+"，";
    }
    result+=")，省"+bestTotal[0].save+"元 "+"\n"+
      "-----------------------------------"+"\n"+
      "总计："+bestTotal[0].save+"元\n"+"===================================";
  }
  return result.trim();
}
