describe('Take out food', function () {

  it('should generate best charge when best is 指定菜品半价', function() {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`.trim();
    expect(summary).toEqual(expected);
  });

  it('should generate best charge when best is 满30减6元', function() {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：26元
===================================`.trim();
    expect(summary).toEqual(expected)
  });

//   it('should generate best charge when no promotion can be used', function() {
//     let inputs = ["ITEM0013 x 4"];
//     let summary = bestCharge(inputs).trim();
//     let expected = `
// ============= 订餐明细 =============
// 肉夹馍 x 4 = 24元
// -----------------------------------
// 总计：24元
// ===================================`.trim()
//     expect(summary).toEqual(expected)
//   });


  it('tags',() =>{
    let selectedItems = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let formatTags = formattedTags(selectedItems);

    let expected = [
      {id:'ITEM0001',count:1},
      {id:'ITEM0013',count:2},
      {id:'ITEM0022',count:1}
    ];

    expect(formatTags).toEqual(expected);
  });
  it('build Item List',()=>{
    let selectedItems = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let allItems = loadAllItems();
    let itemLists = buildItemList(selectedItems,allItems);

    let expected = [
      {id:'ITEM0001',name:'黄焖鸡',price:18,count:1},
      {id:'ITEM0013',name:'肉夹馍',price:6,count:2},
      {id:'ITEM0022',name:'凉皮',price:8,count:1},
    ];

    expect(itemLists).toEqual(expected);
  });
  it('build Promotion Items', () => {
    let allPromotions = loadPromotions();
    let allItems = loadAllItems();
    // let itemLists = [
    //   {id:'ITEM0001',name:'黄焖鸡',price:18,count:1},
    //   {id:'ITEM0013',name:'肉夹馍',price:6,count:2},
    //   {id:'ITEM0022',name:'凉皮',price:8,count:1}
    // ];

    let selectedItems = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let itemLists = buildItemList(selectedItems,allItems);
    let promoteItems = buildPromotionItems(itemLists,allPromotions);

    let expected = {
        result:[
          {id:'ITEM0001',name:'黄焖鸡',price:18,count:1,promoteType:'指定菜品减半',saved:9,payPrice:18},
          {id:'ITEM0013',name:'肉夹馍',price:6,count:2,payPrice:12},
          {id:'ITEM0022',name:'凉皮',price:8,count:1,promoteType:'指定菜品减半',saved:4,payPrice:8},
        ],
        saved:13,
        total:25,
        promoteType:'指定菜品减半'
      };

    expect(promoteItems).toEqual(expected);
  });
  it('build Receipt Items',()=>{
    // let allItems = loadAllItems();
    // let allPromotions = loadPromotions();
    // let selectedItems = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    // let itemLists = buildItemList(selectedItems,allItems);
    // let promotionItems = buildPromotionItems(itemLists,allPromotions);

    let promotionItems = {
      result:[
        {id:'ITEM0001',name:'黄焖鸡',price:18,count:1,promoteType:'指定菜品减半',saved:9,payPrice:18},
        {id:'ITEM0013',name:'肉夹馍',price:6,count:2,payPrice:12},
        {id:'ITEM0022',name:'凉皮',price:8,count:1,promoteType:'指定菜品减半',saved:4,payPrice:8},
      ],
      saved:13,
      total:25,
      promoteType:'指定菜品减半'
    };
    let receiptString = buildReceiptItems(promotionItems);

    let expected = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`;

    expect(receiptString).toEqual(expected);
  });
});









