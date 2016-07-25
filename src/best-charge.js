'use strict';

function formattedItems(inputs)
{
  return inputs.map(function (input) {
    let temp=input.split(' x ');
    return { id:temp[0], count:parseInt(temp[1])};
  });
}

function generateInputsItems(inputItems,allItems)
{
    let result=[];
    for(let i=0;i<inputItems.length;i++)
    {
      let exist=allItems.find(function (item) {
        return item.id===inputItems[i].id;
      });
      if(exist)
      {
        result.push(Object.assign({},exist,{count:inputItems[i].count}));
      }
    }
    return result;
}


function computeSubtotal(inputAllItems)
{
    let result=[];
    for(let i=0;i<inputAllItems.length;i++)
    {
      result.push(Object.assign({},inputAllItems[i],{subtotal:inputAllItems[i].count*inputAllItems[i].price}));
    }
    return result;
}

function computeTotal(inputSubtotalItems)
{
  let sum=0;
  for(let i=0;i<inputSubtotalItems.length;i++)
  {
    sum+=inputSubtotalItems[i].subtotal;
  }
  return sum;
}

function generatePromotionItems(inputsSubtotalItems,promotionArray)
{
  let result=[];
  for(let i=0;i<inputsSubtotalItems.length;i++)
  {
    for(let j=0;j<promotionArray.length;j++)
    {
      let proType=promotionArray[j].type;
      if(proType==='指定菜品半价')
      {
        let exist=promotionArray[j].items.find(function (item) {return item===inputsSubtotalItems[i].id;
        });
        if(exist)
        {
          result.push(Object.assign({},inputsSubtotalItems[i],{promotionSubtotal:inputsSubtotalItems[i].subtotal/2}));
        }
        else
        {
          result.push(Object.assign({},inputsSubtotalItems[i],{promotionSubtotal:inputsSubtotalItems[i].subtotal}));
        }
      }
    }
  }
  return result;
}

function computeRealTotal(promotionItems,total)
{

  let realTotal=0;
  for(let i=0;i<promotionItems.length;i++)
  {
    realTotal+=promotionItems[i].promotionSubtotal;
  }
  if(total>=30)
  {
    if(total-6>=realTotal)
    {
      return realTotal;
    }
    else
    {
      return total-6;
    }
  }
  else
  {
    return realTotal;
  }
}

function print(promotionItems,realTotal,total)
{
  let result='============= 订餐明细 =============';
  for(let i=0;i<promotionItems.length;i++)
  {
    result+='\n'+promotionItems[i].name+' x '+promotionItems[i].count+' = '+promotionItems[i].subtotal+'元';
  }
  result+='\n-----------------------------------';
  if(total===realTotal)
  {
    result+='\n总计：'+realTotal+'元';
  }
  else if( total-6===realTotal)
  {
    result+='\n使用优惠:\n满30减6元，省6元';
    result+='\n-----------------------------------';
    result+='\n总计：'+realTotal+'元';
  }
  else
  {
    result+='\n使用优惠:\n指定菜品半价(';
    for(let j=0;j<promotionItems.length;j++)
    {
      if(promotionItems[j].subtotal===2*promotionItems[j].promotionSubtotal)
      {
        result+=promotionItems[j].name;
        result+='，';
      }
    }
    result=result.substring(0,result.length-1);
    result+=')，省'+(total-realTotal)+'元';
    result+='\n-----------------------------------';
    result+='\n总计：'+realTotal+'元';
  }
  result+='\n===================================';
  return result;
}

function  bestCharge(inputs)
{
  let allItems=loadAllItems();
  let promotionArray=loadPromotions();
  let inputsItems=formattedItems(inputs);
  let inputAllItems=generateInputsItems(inputsItems,allItems);
  let inputSubtotalItems=computeSubtotal(inputAllItems);
  let total=computeTotal(inputSubtotalItems);
  let promotionItems=generatePromotionItems(inputSubtotalItems,promotionArray);
  let realTotal=computeRealTotal(promotionItems,total);
  let result=print(promotionItems,realTotal,total);
  return result;
}

bestCharge(inputs);
