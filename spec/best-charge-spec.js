
describe('Take out food', function () {

  let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
  const allItems = loadAllItems();
  const allPromotions = loadPromotions();

  it('should generate best charge when best is 指定菜品半价', function () {
    let summary = bestCharge(inputs).trim();
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
===================================`.trim();
    expect(summary).toEqual(expected)

  });

  it('buildItemsCount should be true', ()=> {

    const itemsCount = buildItemsCount(inputs, allItems);
    const expectOutput = [
      {item: allItems[0], count: 1},
      {item: allItems[1], count: 2},
      {item: allItems[2], count: 1}
    ];
    expect(itemsCount).toEqual(expectOutput);
  });

  it('buildItemsSTotal should be true', ()=> {

    const itemsCount = buildItemsCount(inputs, allItems);
    const itemsSubtotal = buildItemsTotal(itemsCount);

    const expectOutPut ={itemsCount:itemsCount,total:38};

    expect(itemsSubtotal).toEqual(expectOutPut);
  });
  it('buildItemsPromotion should be true',()=>{

    const itemsCount = buildItemsCount(inputs, allItems);
    const itemsSubtotal = buildItemsTotal(itemsCount);
    const itemsPromotion = buildItemsPromotion(itemsSubtotal,allPromotions);

    const expectOutput = {itemsSubtotal,promotionType:allPromotions[1],save:13,promotionItems:['黄焖鸡','凉皮']};
    expect(itemsPromotion).toEqual(expectOutput);
  });
  it('buildItemsReceipt',()=>{
    const itemsCount = buildItemsCount(inputs, allItems);
    const itemsSubtotal = buildItemsTotal(itemsCount);
    const itemsPromotion = buildItemsPromotion(itemsSubtotal,allPromotions);
    const itemsReceipt = buildItemsReceipt(itemsPromotion);
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
===================================`.trim();
    expect(itemsReceipt).toEqual(expected)
  })
});


describe('Take out food', function () {

  it('should generate best charge when best is 满30减6元', function () {
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
});
describe('Take out food', function () {

  it('should generate best charge when no promotion can be used', function () {
    let inputs = ["ITEM0013 x 4"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim();
    expect(summary).toEqual(expected)
  });


});
