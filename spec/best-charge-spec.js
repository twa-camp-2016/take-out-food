describe('formatItems',function () {
  it('should split selectedItems to id and count',function () {
    let selectedItems = ["ITEM0001 x 1"];
    let result = formatItems(selectedItems);
    expect(result).toEqual([{"id":"ITEM0001","count":1}]);
  });
});
describe('matchAllItems',function () {
  it('should show information of good',function () {
    let ItemAndCount = [{"id":"ITEM0001","count":1}];
    let result = matchAllItems(ItemAndCount,allItems);
    expect(result).toEqual([{"id":"ITEM0001","name":"黄焖鸡","price":18,"count":1}]);
  });
});
describe('calculateOriginSubtotal',function () {
  it('should calculate originSubtotal of every good',function () {
    let cartItems = [{"id":"ITEM0001","name":"黄焖鸡","price":18,"count":1}];
    let result = calculateOriginSubtotal(cartItems);
    expect(result).toEqual([{"id":"ITEM0001","name":"黄焖鸡","price":18,"count":1,"originSubtotal":18}]);
  });
});
describe('calculateFirstSaving',function () {
  it('should calculate firstSaving of goods',function () {
    let originSubtotalList = [{"id":"ITEM0001","name":"黄焖鸡","price":18,"count":1,"originSubtotal":18}];
    let result = calculateFirstSaving(originSubtotalList,allPromotions);
    expect(result).toEqual(0);
  });
});
describe('calculateSecondSaving',function () {
  it('should calculate secondSaving of goods',function () {
    let originSubtotalList = [{"id":"ITEM0001","name":"黄焖鸡","price":18,"count":1,"originSubtotal":18}];
    let result = calculateSecondSaving(originSubtotalList,allPromotions);
    expect(result).toEqual(9);
  });
});
describe('getBestSaving',function () {
  it('should get bestSaving of goods',function () {
    let firstSaving = 0;
    let secondSaving = 9;
    let result = getBestSaving(firstSaving,secondSaving);
    expect(result).toEqual(9);
  });
});
describe('calculateTotal',function () {
  it('should get total of goods',function () {
    let originSubtotalList = [{"id": "ITEM0001","name": "黄焖鸡","price": 18.00,"count":1,"originSubtotal": 18.00}];
    let bestSaving = 9;
    let result = calculateTotal(originSubtotalList,bestSaving);
    expect(result).toEqual(9);
  });
});

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
