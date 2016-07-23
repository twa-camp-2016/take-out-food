"use strict";
describe('Take out food', function () {

  it('should generate best charge when best is 指定菜品半价', function () {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
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
===================================`.trim()
    expect(summary).toEqual(expected)
  });

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
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when no promotion can be used', function () {
    let inputs = ["ITEM0013 x 4"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim()
    expect(summary).toEqual(expected)
  });
  let selectedItems;
  let items;
  let foodItems;
  let foodPromotioons;
  it("splitItems", ()=> {
    selectedItems = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    const expectText = [{id: "ITEM0001", count: 1}, {id: "ITEM0013", count: 2}, {id: "ITEM0022", count: 1}];
    expect(splitItems(selectedItems)).toEqual(expectText);
  })

  it("buildFoodItems", ()=> {
    items = splitItems(selectedItems);
    const expectText = [
      {item: {id: "ITEM0001", count: 1}, foodInformation: {name: '黄焖鸡', price: 18.00, subtotal: 18}},
      {item: {id: "ITEM0013", count: 2}, foodInformation: {name: '肉夹馍', price: 6.00, subtotal: 12}},
      {
        item: {id: "ITEM0022", count: 1}, foodInformation: {name: '凉皮', price: 8.00, subtotal: 8}
      }]
    expect(buildFoodItems(items)).toEqual(expectText);
  })

  it("buildFoodPromotions", ()=> {
    foodItems = buildFoodItems(items);
    const expectText = {
      foodItems,
      promotions: [
        {type: '指定菜品半价', foods: ['黄焖鸡', '凉皮'], saved: 13},
        {type: '满30减6元', saved: 6}
      ]
    }
    expect(buildFoodPromotions(foodItems)).toEqual(expectText);
  })

  it("selectBestPromotion", ()=> {
    foodPromotioons = buildFoodPromotions(foodItems);
    const expectText =
    {type: '指定菜品半价', foods: ['黄焖鸡', '凉皮'], saved: 13};

    expect(selectBestPromotion(foodPromotioons)).toEqual(expectText);
  })
})

