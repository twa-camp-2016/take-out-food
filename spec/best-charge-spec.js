'use strict';

describe("formattedItems",function () {
  it("should return the formatted array",function () {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let result=formattedItems(inputs);
    let expected=[{id:'ITEM0001',count:1},
      {id:'ITEM0013',count:2},{id:'ITEM0022',count:1} ];
    expect(result).toEqual(expected);
  });
});
describe("generateInputsItems",function () {
  it("should return the array after add the count ",function () {
      let items= [ { id: 'ITEM0001', name: '黄焖鸡', price: 18 },
          { id: 'ITEM0013', name: '肉夹馍', price: 6 },
          { id: 'ITEM0022', name: '凉皮', price: 8 },
          { id: 'ITEM0030', name: '冰锋', price: 2 } ];
      let inputsItems=[{id:'ITEM0001',count:1},
      {id:'ITEM0013',count:2},{id:'ITEM0022',count:1} ];
    let result=generateInputsItems(inputsItems,items);
    let expected=[{id: 'ITEM0001', name: '黄焖鸡', price: 18,count:1},
      {id:'ITEM0013', name: '肉夹馍', price: 6,count:2},{id: 'ITEM0022', name: '凉皮', price: 8,count:1}];
    expect(result).toEqual(expected);
  });
});

describe("computeSubtotal",function () {
  it("should return the add subtotal array",function () {
    let inputAllItems=[{id: 'ITEM0001', name: '黄焖鸡', price: 18,count:1},
      {id:'ITEM0013', name: '肉夹馍', price: 6,count:2},{id: 'ITEM0022', name: '凉皮', price: 8,count:1}];
    let result=computeSubtotal(inputAllItems);
    let expected=[{id: 'ITEM0001', name: '黄焖鸡', price: 18,count:1,subtotal:18},{id:'ITEM0013', name: '肉夹馍', price: 6,count:2,subtotal:12},{id: 'ITEM0022', name: '凉皮', price: 8,count:1,subtotal:8}];
    expect(result).toEqual(expected);
  });
});
describe("computeTotal",function () {
  it("should return the total ",function () {
    let inputAllItems=[{id: 'ITEM0001', name: '黄焖鸡', price: 18,count:1,subtotal:18},{id:'ITEM0013', name: '肉夹馍', price: 6,count:2,subtotal:12},{id: 'ITEM0022', name: '凉皮', price: 8,count:1,subtotal:8}];
    let result=computeTotal(inputAllItems);
    let expected=38;
    expect(result).toEqual(expected);
  });
});


describe("generatePromotionItems",function () {
  it("should return the promotionItems",function () {
    let inputAllItems=[{id: 'ITEM0001', name: '黄焖鸡', price: 18,count:1,subtotal:18},{id:'ITEM0013', name: '肉夹馍', price: 6,count:2,subtotal:12},{id: 'ITEM0022', name: '凉皮', price: 8,count:1,subtotal:8}];
    let promotionArray=[ { type: '满30减6元' },
      { type: '指定菜品半价', items: [ 'ITEM0001', 'ITEM0022' ] } ];
    let result=generatePromotionItems(inputAllItems,promotionArray);
    let expected=[{id: 'ITEM0001', name: '黄焖鸡', price: 18,count:1,subtotal:18,promotionSubtotal:9},{id:'ITEM0013', name: '肉夹馍', price: 6,count:2,subtotal:12,promotionSubtotal:12},{id: 'ITEM0022', name: '凉皮', price: 8,count:1,subtotal:8,promotionSubtotal:4}];
    expect(result).toEqual(expected);
  });
});describe("computeRealTotal",function () {
  it("should return the bestCharge",function () {
    let input=[{id: 'ITEM0001', name: '黄焖鸡', price: 18,count:1,subtotal:18,promotionSubtotal:9},{id:'ITEM0013', name: '肉夹馍', price: 6,count:2,subtotal:12,promotionSubtotal:12},{id: 'ITEM0022', name: '凉皮', price: 8,count:1,subtotal:8,promotionSubtotal:4}];
    let total=38;
    let result=computeRealTotal(input,total);
    let expected=25;
    expect(result).toEqual(expected);
  });
});


describe("print",function () {
  it("should return the receipt ",function () {
    let input=[{id: 'ITEM0001', name: '黄焖鸡', price: 18,count:1,subtotal:18,promotionSubtotal:9},{id:'ITEM0013', name: '肉夹馍', price: 6,count:2,subtotal:12,promotionSubtotal:12},{id: 'ITEM0022', name: '凉皮', price: 8,count:1,subtotal:8,promotionSubtotal:4}];
    let total=38;
    let realTotal=25;
    let result=print(input,realTotal,total).trim();
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
