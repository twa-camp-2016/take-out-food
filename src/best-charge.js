
  let selectedItems = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];

  function formatItems(selectedItems) {
    return selectedItems.map(function(selectedItems){
      let temp = selectedItems.split("x");
      let index1 = temp[0].split(" ");
      let index2 = temp[1].split(" ");
      return {
        id:index1[0],
        count:parseInt(index2[1])
      }
    });
  }
  console.log(formatItems(selectedItems));

  function loadAllItems() {
    return [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00
    }, {
      id: 'ITEM0030',
      name: '冰锋',
      price: 2.00
    }];
  }

  function getDetailItems (formatted,allItems) {
    let detailItems = [];
    for ( let i = 0;i < formatted.length;i++ ){
      let exist = formatted.find(function(items){
        return items.id === formatted[i].id});
        if(exist){
          detailItems.push(Object.assign({},allItems[i],{count:formatted[i].count}));
        }
      }
    return detailItems;
  }
  console.log(getDetailItems(formatItems(selectedItems),loadAllItems()));

  function getSubtotal(detailItems){
    let subtotal = [];
    for(let i = 0;i < detailItems.length;i++) {
      let money = (detailItems[i].price * detailItems[i].count);
      subtotal.push(Object.assign({}, detailItems[i], {subtotal: money}));
    }
    return subtotal;
  }
  console.log(getSubtotal(getDetailItems(formatItems(selectedItems),loadAllItems())));

  function getOriginTotal(subtotal){
    let origined = 0;
    for(let i = 0 ;i<subtotal.length;i++){
       origined += subtotal[i].subtotal;
    }
    let originTotal = {originTotal:origined};
    return originTotal;
  }
  console.log(getOriginTotal(getSubtotal(getDetailItems(formatItems(selectedItems),loadAllItems()))));

  function loadPromotions() {
    return [{
      type: '满30减6元'
    }, {
      type: '指定菜品半价',
      items: ['ITEM0001', 'ITEM0022']
    }];
  }

  function choosePromotions(subtotal,originTotal,promotions){
      for(let i = 0 ;i < promotions[1].items.length;i++){
        let exist = promotions[1].items.find(function(items){
          return items.id === promotions[1].items[i]});
        let total;
        let bestPromotions = [];
        if(exist) {
          if (originTotal.originTotal >= 30) {
            let total1 = originTotal.originTotal - 6;
            originTotal.originTotal -= exist.subtotal / 2;
            let total2 = originTotal.originTotal;
          } else {
            originTotal.originTotal -= exist.subtotal / 2;
            let  total3 = originTotal.originTotal;
          }
          for(let i = 0;i<promotions.length;i++ ){
            let bestPromotions = [];
            if(total2 >= total1 || total3 ){
              bestPromotions.push(promotions[0],{savedMoney:6});
            }else {
              bestPromotions.push(promotions[1].type,{savedMoney:originTotal.originTotal-total2});
            }
          }
        }
          else{
            if(originTotal >= 30){
              let total = originTotal.originTotal - 6;
            }
          bestPromotions.push(promotions[0],{savedMoney:6});
          }
        
      }

  return bestPromotions;
  }
  console.log(choosePromotions(getSubtotal(getDetailItems(formatItems(selectedItems),loadAllItems())),
    getOriginTotal(getSubtotal(getDetailItems(formatItems(selectedItems),loadAllItems())))),loadPromotions());
  

  function bestCharge(selectedItems){
    let formatted = formatItems(selectedItems);
    let allItems = loadAllItems();
    let detailItems = getDetailItems(formatted,allItems);sub
    let subtotal = getSubtotal(detailItems);
    let originTotal = getOriginTotal(subtotal);
    let promotions = loadPromotions();
    let bestPromotions = choosePromotions(subtotal,originTotal,promotions);
    let total = getTotal(bestPromotions);
    let receipt = print(detailItems,bestPromotions,total);
  }
