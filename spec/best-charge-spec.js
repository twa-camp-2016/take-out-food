'use strict';

describe("formattedTags",function () {
  it("it should return the array",function(){
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let result=formattedTags(inputs);
    let expected=[ { id: 'ITEM0001', count: 1 },
      { id: 'ITEM0013', count: 2 },
      { id: 'ITEM0022', count: 1 } ];
    expect(result).toEqual(expected);
  });
});
describe("generateAboutItems",function () {
  it("should return the merged inputs and items",function () {
    let inputs=[ { id: 'ITEM0001', count: 1 },
      { id: 'ITEM0013', count: 2 },
      { id: 'ITEM0022', count: 1 } ];
    let allItems=[ { id: 'ITEM0001', name: '黄焖鸡', price: 18 },
      { id: 'ITEM0013', name: '肉夹馍', price: 6 },
      { id: 'ITEM0022', name: '凉皮', price: 8 },
      { id: 'ITEM0030', name: '冰锋', price: 2 } ];

    let result=generateAboutItems(allItems,inputs);
    let expected=[ { id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1 },
      { id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2 },
      { id: 'ITEM0022', name: '凉皮', price: 8, count: 1 } ];
    expect(result).toEqual(expected);
  });
});

describe("computeSubtotal",function () {
  it("should return the subtotal before the promotion ",function () {
    let inputs=[ { id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1 },
      { id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2 },
      { id: 'ITEM0022', name: '凉皮', price: 8, count: 1 } ];
    let result=computeSubtotal(inputs);
    let expected=[ { id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1, subtotal: 18 },
      { id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2, subtotal: 12 },
      { id: 'ITEM0022', name: '凉皮', price: 8, count: 1, subtotal: 8 } ];
    expect(result).toEqual(expected);
  });
});

describe("computeTotal",function () {
  it("should return the total",function(){
    let inputs=[ { id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1, subtotal: 18 },
      { id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2, subtotal: 12 },
      { id: 'ITEM0022', name: '凉皮', price: 8, count: 1, subtotal: 8 } ];
    let result=computeTotal(inputs);
    let expected=38;
    expect(result).toEqual(expected);
  });
});

describe("generatePromotions",function(){
  it("should return the promotion items",function () {
    let inputs=[ { id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1, subtotal: 18 },
      { id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2, subtotal: 12 },
      { id: 'ITEM0022', name: '凉皮', price: 8, count: 1, subtotal: 8 } ];

    let  inputs1= [ { type: '满30减6元' },
      { type: '指定菜品半价', items: [ 'ITEM0001', 'ITEM0022' ] } ];
    let result=generatePromotions(inputs,inputs1);

    let expected=
      [ { id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1, subtotal: 9 },
        { id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2, subtotal: 12 },
        { id: 'ITEM0022', name: '凉皮', price: 8, count: 1, subtotal: 4 } ];
    expect(result).toEqual(expected);
  });
});

describe("computeSavedTotal",function () {
  it("return the savedTotal",function(){
    let promotionItems=
      [ { id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1, subtotal: 9 },
        { id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2, subtotal: 12 },
        { id: 'ITEM0022', name: '凉皮', price: 8, count: 1, subtotal: 4 } ];
    let result=computeSavedTotal(promotionItems);
    let expected=25;
    expect(result).toEqual(expected);
  });
});

describe('Take out food', function () {

  it('should generate best charge when best is 指定菜品半价', function() {
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
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when no promotion can be used', function() {
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
});
