describe("formatTags", function () {
  it("one to two", function () {
    let inputs = [{"ITEM0001 * 1","ITEM0013 * 2", "ITEM0022 * 1"}];
    let barcodes=formatTags(inputs);
    let result = formatTags(inputs);
    expect(result).toEqual([{"id": "ITEM0001", "count": 1},
      {"id": "ITEM0013", "count": 2},
      {"id": "ITEM0022", "count": 1}]);
  });
})
describe("getItems", function () {
  it("items is this", function () {
    let result = getItems(inputs);
    expect(result).toEqual([{"id": 'ITEM0001', "name": "黄闷鸡", "price": 18, count = 1},
    {"id":'ITEM0013', "name":"肉夹馍", "price":6, count: 2},
    {"id":'ITEM0022', "name":"凉皮", "price":8, count:1}]);
  });
})
describe("getOriginalTotal",function () {
  it("originalTotal is this",function () {
    let result=getOriginalTotal(cartItems);
    expect(result).toEqual(38);
  });
})
describe("getOnePromotionItems",function () {
  it("first promotionItems is this",function () {
    let result=getOnePromotionItems(cartItems,originalTotal);
    ecpect(result).toEqual({"subtotal":26},"type": '满30减6元');
  });
})
describe("getTwoPromotionItems",function () {
  it("second promotionItems is this",function () {
    let result=getTwoPromotionItems(cartItems,originalTotal);
    expect(result).toEqual({"subtotal:25", "type": '指定菜品半价'})
  });
})
describe("getPromotionItems",function () {
  it("items")

})

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

});


