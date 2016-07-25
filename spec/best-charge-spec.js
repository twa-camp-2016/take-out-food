
describe("formatItems",function () {
  it("should return format items",function () {
    let items=["ITEM0001 x 1"];
    let result=formatItems(items);
    expect(result).toEqual([{id:"ITEM0001",count:1}]);
  })
})

describe("getSelectedItems",function () {
  it("should return selected items",function () {
    let items=[{id:"ITEM0001",count:1}];
    let result=getSelectedItems(loadAllItems(),items);
    expect(result).toEqual([
      {
        id:"ITEM0001",
        name: '黄焖鸡',
        price: 18.00,
        count:1}]);
  })
})

describe("calculateSubtotal",function () {
  it("should return subtotal items",function () {
    let items=[
      {
        id:"ITEM0001",
        name: '黄焖鸡',
        price: 18.00,
        count:1}];
    let result=calculateSubtotal(items);
    expect(result).toEqual([
      {
        id:"ITEM0001",
        name: '黄焖鸡',
        price: 18.00,
        count:1,
      subtotal:18}]);
  })
})

describe("calculateSaving",function () {
  it("should return saving items",function () {
    let items=[
      {
        id:"ITEM0001",
        name: '黄焖鸡',
        price: 18.00,
        count:1,
        subtotal:18}];
    let result=calculateSaving(items,loadPromotions());
    expect(result).toEqual([
      {
        id:"ITEM0001",
        name: '黄焖鸡',
        price: 18.00,
        count:1,
        subtotal:18,
        saving:9}]);
  })
})
describe("getAllSaving",function () {
  it("should reutn allSaving",function () {
    let items=[
      {
        id:"ITEM0001",
        name: '黄焖鸡',
        price: 18.00,
        count:1,
        subtotal:18,
        saving:9}];
    let result=getAllSaving(items);
    expect(result).toEqual(9);
  })
})
describe("getTotal",function () {
  it("should reutn total",function () {
    let items=[
      {
        id:"ITEM0001",
        name: '黄焖鸡',
        price: 18.00,
        count:1,
        subtotal:18,
        saving:9}];
    let result=getTotal(items);
    expect(result).toEqual(18);
  })
})
describe("getBestSaving",function () {
  it("should return bestSaving ",function () {
    let total=18;
    let allSaving=9;
    let items=[
      {
        id:"ITEM0001",
        name: '黄焖鸡',
        price: 18.00,
        count:1,
        subtotal:18,
        saving:9}];
    let result=getBestSaving(total,allSaving,items);
    expect(result).toEqual({items:[
      {
        id:"ITEM0001",
        name: '黄焖鸡',
        price: 18.00,
        count:1,
        subtotal:18,
        saving:9}], bestSaving: 9, type: "指定菜品半价"});
  })
})
describe("getFinalTotal",function () {
  it("should return total",function () {
    let items={items:[
      {
        id:"ITEM0001",
        name: '黄焖鸡',
        price: 18.00,
        count:1,
        subtotal:18,
        saving:9}], bestSaving: 9, type: "指定菜品半价"};
    let result=getFinalTotal(items,18);
    expect(result).toEqual(9);
  })
})
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


