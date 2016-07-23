/*describe('Take out food', function () {

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

});*/
describe("formatInput",function () {
  it("should get items id and count",function () {
    let input=["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let result=[
      { id: 'ITEM0001', count: 1 },
      { id: 'ITEM0013', count: 2 },
      { id: 'ITEM0022', count: 1 }
    ];
    let cartItems=formatInput(input);
    expect(cartItems).toEqual(result);
  });
});
describe("mergeCartItems",function () {
  it("should all information",function () {
    let input=[
      { id: 'ITEM0001', count: 1 },
      { id: 'ITEM0013', count: 2 },
      { id: 'ITEM0022', count: 1 }
    ];
    let result=[
      { id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1 },
      { id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2 },
      { id: 'ITEM0022', name: '凉皮', price: 8, count: 1 }
    ];
    let cartItems=mergeCartItems(input);
    expect(cartItems).toEqual(result);
  });
});
describe("getSubtotal",function () {
  it("should add subtotal to cartItem",function () {
    let input=[
      { id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1 },
      { id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2 },
      { id: 'ITEM0022', name: '凉皮', price: 8, count: 1 }
    ];
    let result=[
      { id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1 ,subtotal:18},
      { id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2 ,subtotal:12},
      { id: 'ITEM0022', name: '凉皮', price: 8, count: 1 ,subtotal:8}
    ];
    let cartItemsSub=getSubtotal(input);
    expect(cartItemsSub).toEqual(result);
  });
});

describe("mergePtomotionsInfo",function () {
  it("should add promotions information to cartItems",function () {
    let input=[
      { id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1 ,subtotal:18},
      { id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2 ,subtotal:12},
      { id: 'ITEM0022', name: '凉皮', price: 8, count: 1 ,subtotal:8}
    ];
    let result=[
      { id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1 ,subtotal:18,type:'指定菜品半价'},
      { id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2 ,subtotal:12},
      { id: 'ITEM0022', name: '凉皮', price: 8, count: 1 ,subtotal:8}
    ];
    let cartItemsPromotionsInfo=mergePromotionsInfo(input);
    expect(cartItemsPromotionsInfo).toEqual(result);
  });
});
describe("getCharge",function () {
  it("should add save charge to it",function () {
    let input=[
      { id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1 ,subtotal:18,type:'指定菜品半价'},
      { id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2 ,subtotal:12},
      { id: 'ITEM0022', name: '凉皮', price: 8, count: 1 ,subtotal:8}
    ];
    let result=[
      { id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1 ,subtotal:18,type:'指定菜品半价',subSave:9},
      { id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2 ,subtotal:12,subSave:0},
      { id: 'ITEM0022', name: '凉皮', price: 8, count: 1 ,subtotal:8,subSave:0}
    ];
    let charge=getCharge(input);
    expect(charge).toEqual(result);
  });
});
describe("getTotal",function () {
  it("should add promotions information to cartItems",function () {
    let input=[
      { id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1 ,subtotal:18,type:'指定菜品半价',subSave:9},
      { id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2 ,subtotal:12,subSave:0},
      { id: 'ITEM0022', name: '凉皮', price: 8, count: 1 ,subtotal:8,subSave:0}
    ];
    let result=[
      { id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1 ,subtotal:18,type:'指定菜品半价',subSave:9},
      { id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2 ,subtotal:12,subSave:0},
      { id: 'ITEM0022', name: '凉皮', price: 8, count: 1 ,subtotal:8,subSave:0},
      {优惠类型:'指定菜品半价', save:9},
      {total:29}
    ];
    let total=getTotal(input);
    expect(total).toEqual(result);
  });
});
