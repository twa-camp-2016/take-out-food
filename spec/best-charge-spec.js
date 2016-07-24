describe('Take out food', function () {
  let allPromotion = loadPromotions();
  let allItems = loadAllItems();
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

//测试 formatTags
describe('formatTags',function(){
  it('first',function(){
    let actual = formatTags(["ITEM0013 x 4"]);
    let expected = [{id:'ITEM0013',amount:4}];
    expect(actual).toEqual(expected);
  });
  it('second',function(){
    let actual = formatTags(["ITEM0013 x 4","ITEM0022 x 1"]);
    let expected = [{id:'ITEM0013',amount:4},{id:'ITEM0022',amount:1}];
    expect(actual).toEqual(expected);
  });
});

//测试 mergeId
describe('mergeId',function(){
  it('first',function(){
    let actual = mergeId([{id:'ITEM0013',amount:4},{id:'ITEM0013',amount:1}]);
    let expected = [{id:'ITEM0013',amount:5}];
    expect(actual).toEqual(expected);
  });
  it('second',function(){
    let actual = mergeId([{id:'ITEM0013',amount:3},{id:'ITEM0013',amount:1},{id:'ITEM0022',amount:4}]);
    let expected = [{id:'ITEM0013',amount:4},
                    {id:'ITEM0022',amount:4}];
    expect(actual).toEqual(expected);
  });
});

//测试 getPromotionsInfo
describe('getPromotionsInfo',function(){
  it('first',function(){
    let actual = getPromotionsInfo(allPromotion,[{id:'ITEM0022',amount:5}]);
    let expected = [{id:'ITEM0022',amount:5,type:'指定菜品半价'}];
    expect(actual).toEqual(expected);
  });
  it('second',function(){
    let actual = getPromotionsInfo(allPromotion,[{id:'ITEM0022',amount:5},
                                                 {id:'ITEM0001',amount:1},
                                                 {id:'ITEM0003',amount:3}]);
    let expected = [{id:'ITEM0022',amount:5,type:'指定菜品半价'},
                    {id:'ITEM0001',amount:1,type:'指定菜品半价'},
                    {id:'ITEM0003',amount:3}];
    expect(actual).toEqual(expected);
  });
});

//测试 getAllInfo

describe('getAllInfo',function(){
  it('first',function(){
    let actual = getAllInfo(allItems,[{id:'ITEM0022',amount:5,type:'指定菜品半价'}]);
    let expected = [{id:'ITEM0022',amount:5,type:'指定菜品半价',name:"凉皮",price:8.00}];
    expect(actual).toEqual(expected);
  });
  it('second',function(){
    let actual = getAllInfo(allItems,[{id:'ITEM0022',amount:5,type:'指定菜品半价'},
                                      {id:'ITEM0001',amount:5}]);
    let expected = [{id:'ITEM0022',amount:5,type:'指定菜品半价',name:"凉皮",price:8.00},
                    {id:'ITEM0001',amount:5,name:"黄焖鸡",price:18.00}];
    expect(actual).toEqual(expected);
  });
});

//测试 compareDiscount
describe('compareDiscount',function(){
  it('first',function(){
    let actual = compareDiscount([{id:'ITEM0022',amount:5,type:'指定菜品半价',name:"凉皮",price:8.00}]);
    let expected = {type:'指定菜品半价',discount:20,total:40};
    expect(actual).toEqual(expected);
  });
  it('second',function(){
    let actual = compareDiscount([{id:'ITEM0022',amount:5,type:'指定菜品半价',name:"凉皮",price:8.00},
                                  {id:'ITEM0001',amount:5,name:"黄焖鸡",price:18.00}]);
    let expected = {type:'指定菜品半价',discount:110,total:130};
    expect(actual).toEqual(expected);
  });
})
});






