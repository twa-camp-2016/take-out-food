
describe("formatItems",function () {
  it("should return id and count",function () {
    let tempArray=["ITEM0001 x 1"];
    let result=formatItems(tempArray);
    expect(result).toEqual([{id:"ITEM0001",count:1}]);
  })
})

describe("getSelectedItems",function () {
  it("should return selected items",function () {
    let tempArray=[{id: 'ITEM0001',count: 1}];
    let result=getSelectedItems(tempArray,loadAllItems());
    expect(result).toEqual([{id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count: 1}]);
  })
})

describe("calculateSubtotal",function () {
  it("should return including subtotal",function () {
    let tempArray=[ {id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count: 1}];
    let result=calculateSubtotal(tempArray);
    expect(result).toEqual([ {id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count: 1,
      subtotal:18}]);
  })
})

describe("calculateSaving",function () {
  it("should return including saving",function () {
    let tempArray=[ {id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count: 1,
      subtotal:18}];
    let result=calculateSaving(loadPromotions(),tempArray);
    expect(result).toEqual([ {id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count: 1,
      subtotal:18,
      saving:9}]);
  })
})

describe("calculateAllSaving",function () {
  it("should return including saving",function () {
    let tempArray=[ {id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count: 1,
      subtotal:18,
      saving:9}];
    let temp={allSaving:9};
    let result=calculateAllSaving(tempArray);
    expect(result).toEqual([ [{id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count: 1,
      subtotal:18,
      saving:9}],temp]
      );
  })
})

describe("getTotal",function () {
  it("should return including total",function () {
    let tempArray=[ {id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count: 1,
      subtotal:18,
      saving:9}];
    let result=getTotal(tempArray);
    expect(result).toEqual(18);
  })
})

describe("getBestSavingItems",function () {
  it("should return including best items",function () {
    let tempArray=[ {id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count: 1,
      subtotal:18,
      saving:9}];
    let result=getBestSavingItems(allSavedItems,allSaving,total,allPromotions);
    expect(result).toEqual(18);
  })
})


describe("getFinalTotal",function () {
  it("should return final total",function () {
    let tempArray=[ {id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count: 1,
      subtotal:18}];
    let result=getFinalTotal(total,allSavedItems);
    expect(result).toEqual(18);
  })
})
/*
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

});*/
