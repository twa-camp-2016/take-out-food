

describe('Take out food', function () {

 it ('should print food counts',()=>{
 const tas=[

 "ITEM0001*1",
 "ITEM0013*2",
 "ITEM0022*1"
 ];
 const printCount=[ { code: 'ITEM0001 ', count: ' 1' },
 { code: 'ITEM0013 ', count: ' 2' },
 { code: 'ITEM0022 ', count: ' 1' } ];
 expect(getFoodCounts(tas)).toEqual(printCount);
 });


 it ('should print food items',()=>{
 const tas=[ { code: 'ITEM0001 ', count: ' 1' },
 { code: 'ITEM0013 ', count: ' 2' },
 { code: 'ITEM0022 ', count: ' 1' } ];
 const printItems=[ { code: 'ITEM0001', name: '黄焖鸡', count: '1', price: 18 },
 { code: 'ITEM0013', name: '肉夹馍', count: '2', price: 6 },
 { code: 'ITEM0022', name: '凉皮', count: '1', price: 8 } ];
 expect(builtItems(tas)).toEqual(printItems);
 });


 it ('should print food before payPrice',()=>{
 const tas=[ { code: 'ITEM0001', name: '黄焖鸡', count: '1', price: 18 },
 { code: 'ITEM0013', name: '肉夹馍', count: '2', price: 6 },
 { code: 'ITEM0022', name: '凉皮', count: '1', price: 8 } ];
 const printPrice=[ { code: 'ITEM0001', name: '黄焖鸡', count: 1, price: 18, perAll: 18 },
 { code: 'ITEM0013', name: '肉夹馍', count: 2, price: 6, perAll: 12 },
 { code: 'ITEM0022', name: '凉皮', count: 1, price: 8, perAll: 8 } ];
 expect(getBeforeAllPrice(tas)).toEqual(printPrice);
 });


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
