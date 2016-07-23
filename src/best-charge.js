function formatTags(tags) {                                      //formatTags
  return tags.map(
    function (tag) {
      let temp=tag.split(' x ');
      return {id:temp[0], count:parseInt(temp[1])};
    }
  );
}
function getItemsCount(items, ids) {                            //getItemsCount
  let itemsCount=new Array();
  for(let i in ids)
    for(let j in items)
      if(items[j].id===ids[i].id){
        itemsCount[i]={
          id:items[j].id,
          name:items[j].name,
          price:items[j].price,
          count:ids[i].count
        };
        break;
      }
  return itemsCount;
}
function getItemsSubtotal(itemsCount) {                          //getItemsSubtotal
  let itemsSubtotal=new Array();
  for(let i in itemsCount)
    itemsSubtotal[i]={
      id:itemsCount[i].id,
      name:itemsCount[i].name,
      price:itemsCount[i].price,
      count:itemsCount[i].count,
      subtotal:itemsCount[i].price*itemsCount[i].count
    }
  return itemsSubtotal;
}
function getPromotion(itemsSubtotal,promotions) {                 //getPromotion
  let save=new Array();
  let names=new Array();

  let total=0;
  for(let i in itemsSubtotal)
    total += itemsSubtotal[i].subtotal;

  for(let i in promotions)
    switch(promotions[i].type){
      case '满30减6元':
        if(total>30)
          save[i]=6;
        else save[i]=0;
        break;

      case '指定菜品半价':
        save[i]=0;
        for(let j in promotions[i].items){
          let k;
          for(k in itemsSubtotal)
            if(itemsSubtotal[k].id===promotions[i].items[j])
              break;
          if(k===itemsSubtotal.length)
            save[i]+=0;
          else{
            save[i]+=itemsSubtotal[k].subtotal/2;
            names.push(itemsSubtotal[k].name);
          }
        }
        break;
    }

    if((save[0]===0)&&(save[1]===0))
      return {type:'',save:0,names:[]};
    else if(save[0]>=save[1])
      return {type:promotions[0].type,save:save[0],names:[]};
    else
      return {type:promotions[1].type,save:save[1],names:names};
}
function spliceString(itemsSubtotal,promotion) {
  let receipt='';
  receipt+='============= 订餐明细 =============';
  for(let i in itemsSubtotal)
    //黄焖鸡 x 1 = 18元
    receipt+=('\n'+itemsSubtotal[i].name+' x '+itemsSubtotal[i].count+' = '+itemsSubtotal[i].subtotal+'元');
  receipt+='\n-----------------------------------';
  if(promotion.type!==''){
    receipt+='\n使用优惠:';
    receipt+=('\n'+promotion.type);
    if(promotion.type==='指定菜品半价'){
      let names='';
      let j;
      for(j=0;j<promotion.names.length-1;j++)
        names+=promotion.names[j]+',';
      names+=promotion.names[j];

      receipt+=('('+names+')');
    }
    receipt+=('，省'+promotion.save+'元');
    receipt+='\n-----------------------------------';
  }

  let total=0;
  for(let i in itemsSubtotal)
    total+=itemsSubtotal[i].subtotal;

  receipt+=('\n总计：'+(total-promotion.save)+'元');
  receipt+='\n===================================';
  return receipt;
}














function bestCharge(selectedItems) {
  return /*TODO*/;
}

/*

 */
