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
describe("getItemsId",function () {
  it("put one tag to two parts",function () {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let result = getItemsId(inputs);
    let expected = [{id:"ITEM0001",amount:1},{id:"ITEM0013",amount:2},{id:"ITEM0022",amount:1}];
    expect(result).toEqual(expected);
  });
});
describe("getCartItems",function () {
  it("get items from cart",function () {
    let inputs = [{id:"ITEM0001",amount:1}, {id:"ITEM0013",amount:2}];
    let result = getCartItems(inputs);
    let expected = [
      {id:"ITEM0001",amount:1,name: '黄焖鸡', price: 18.00},
      {id:"ITEM0013",amount:2, name: '肉夹馍', price: 6.00},
      ];
    expect(result).toEqual(expected);
  });
});
describe("caculateSubtotal",function () {
  it("caculate the items of subtotal",function () {
    let inputs = [
      {id:"ITEM0001",amount:1,name: '黄焖鸡', price: 18.00},
      {id:"ITEM0013",amount:2, name: '肉夹馍', price: 6.00},
    ];
    let result = caculateSubtotal(inputs);
    let expected = [
      {id:"ITEM0001",amount:1,name: '黄焖鸡', price: 18.00,subtotal:18.00},
      {id:"ITEM0013",amount:2, name: '肉夹馍', price: 6.00,subtotal:12.00},
    ];
    expect(result).toEqual(expected);
  });
});
describe("matchItemsType",function () {
  it("caculate the items of subtotal",function () {
    let inputs =  [
      {id:"ITEM0001",amount:1,name: '黄焖鸡', price: 18.00,subtotal:18.00},
      {id:"ITEM0013",amount:2, name: '肉夹馍', price: 6.00,subtotal:12.00},
    ];
    let result = matchItemsType(inputs);
    let expected = [
      {id:"ITEM0001",amount:1,name: '黄焖鸡', price: 18.00,subtotal:18.00,type: '指定菜品半价'},
      {id:"ITEM0013",amount:2, name: '肉夹馍', price: 6.00,subtotal:12.00},
    ];
    expect(result).toEqual(expected);
  });
});
describe("caculateBenefitSubtotal",function () {
  it("caculate the items of subtotal",function () {
    let inputs =  [
      {id:"ITEM0001",amount:1,name: '黄焖鸡', price: 18.00,subtotal:18.00,type: '指定菜品半价'},
      {id:"ITEM0013",amount:2, name: '肉夹馍', price: 6.00,subtotal:12.00},
    ];
    let result = caculateBenefitSubtotal(inputs);
    let expected = [
      {id:"ITEM0001",amount:1,name: '黄焖鸡', price: 18.00,subtotal:18.00,type: '指定菜品半价',benefitSubtotal:9.00},
      {id:"ITEM0013",amount:2, name: '肉夹馍', price: 6.00,subtotal:12.00},
    ];
    expect(result).toEqual(expected);
  });
});
describe("caculateBenefitTotal",function () {
  it("caculate the items of subtotal",function () {
    let inputs =  [
      {id:"ITEM0001",amount:1,name: '黄焖鸡', price: 18.00,subtotal:18.00,type: '指定菜品半价',benefitSubtotal:9.00},
      {id:"ITEM0013",amount:2, name: '肉夹馍', price: 6.00,subtotal:12.00},
    ];
    let result = caculateBenefitTotal(inputs);
    let expected = 21.00;

    expect(result).toEqual(expected);
  });
});
describe("caculateSavedMoney",function () {
  it("caculate the items of SavedMoney",function () {
    let inputs =  [
      {id:"ITEM0001",amount:1,name: '黄焖鸡', price: 18.00,subtotal:18.00,type: '指定菜品半价',benefitSubtotal:9.00},
      {id:"ITEM0013",amount:2, name: '肉夹馍', price: 6.00,subtotal:12.00},
    ];
    let result = caculateSavedMoney(inputs);
    let expected = 9.00;

    expect(result).toEqual(expected);
  });
});
describe("denefitAllItemsType",function () {
  it("caculate the Allitems of type",function () {
    let inputs =  [
      {id:"ITEM0001",amount:1,name: '黄焖鸡', price: 18.00,subtotal:18.00,type: '指定菜品半价',benefitSubtotal:9.00},
      {id:"ITEM0013",amount:2, name: '肉夹馍', price: 6.00,subtotal:12.00},
    ];
    let result = denefitAllItemsType(inputs);
    let expected = [
      { id: 'ITEM0001', amount: 1, name: '黄焖鸡', price: 18, subtotal: 18, type: '指定菜品半价', benefitSubtotal: 9, type1: '满30减6元' },
      { id: 'ITEM0013', amount: 2, name: '肉夹馍', price: 6, subtotal: 12, type1: '满30减6元' }
      ];

    expect(result).toEqual(expected);
  });
});
