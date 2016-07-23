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

describe("splitInfo test", function () {
  it("splitedItemsInfo should be ", function () {
    let idInfo = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let splitItemsInfo = [{id: 'ITEM0001', count: 1},
      {id: 'ITEM0013',count: 2},
      {id: 'ITEM0022',count: 1}];
    expect(splitInfo(idInfo)).toEqual(splitItemsInfo);
  });
});

describe("matchPromotions test",function () {
  it("promotionAddtion should be ",function () {
    let splitedItemsInfo = [{id: 'ITEM0001', count: 1},
      {id: 'ITEM0013',count: 2},
      {id: 'ITEM0022',count: 1}];

    let promotionInfo = function loadPromotions() {
      return [{
        type: '满30减6元'
      }, {
        type: '指定菜品半价',
        items: ['ITEM0001', 'ITEM0022']
      }];
    }

    let promotionAddtion = [{id: 'ITEM0001', count: 1,type:'指定菜品半价'},
      {id: 'ITEM0013',count: 2,type:'满30减6元'},
      {id: 'ITEM0022',count: 1,type:'指定菜品半价'}];

    expect(matchPromotions(splitedItemsInfo,promotionInfo)).toEqual(promotionAddtion);
  });
});

describe("matchItemsInfo test",function () {
  it("selectedInfo should be ",function () {
    let selectedInfo = [{id: 'ITEM0001', name:'黄焖鸡',price:18.00,count: 1,type:'指定菜品半价'},
      {id: 'ITEM0013',name:'肉夹馍',price:6.00,count: 2,type:'满30减6元'},
      {id: 'ITEM0022',name:'凉皮',price:8.00,count: 1,type:'指定菜品半价'}];

    let allItems = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00
    }, {
      id: 'ITEM0030',
      name: '冰锋',
      price: 2.00
    }];

    let promotionAddtion = [{id: 'ITEM0001', count: 1,type:'指定菜品半价'},
      {id: 'ITEM0013',count: 2,type:'满30减6元'},
      {id: 'ITEM0022',count: 1,type:'指定菜品半价'}];
    expect(matchItemsInfo(promotionAddtion,allItems)).toEqual(selectedInfo);

});
});

describe("caculateUncutTotal test",function () {
  it("uncutTotal should be ",function () {
    let selectedInfo = [{id: 'ITEM0001', name:'黄焖鸡',price:18.00,count: 1,type:'指定菜品半价'},
      {id: 'ITEM0013',name:'肉夹馍',price:6.00,count: 2,type:'满30减6元'},
      {id: 'ITEM0022',name:'凉皮',price:8.00,count: 1,type:'指定菜品半价'}];
    let uncutTotal = [{uncutTotal:38}]
    expect(caculateUncutTotal(selectedInfo)).toEqual(uncutTotal);
  });
});

describe ("caculateHalfPriceTotal test",function () {
  it("halfPriceTotal should be ",function () {
    let selectedInfo = [{id: 'ITEM0001', name:'黄焖鸡',price:18.00,count: 1,type:'指定菜品半价'},
      {id: 'ITEM0013',name:'肉夹馍',price:6.00,count: 2,type:'满30减6元'},
      {id: 'ITEM0022',name:'凉皮',price:8.00,count: 1,type:'指定菜品半价'}];
    
    let halfPriceTotal = [{halfPriceTotal:25}];
    
    let uncutTotal = [{uncutTotal:38}];
    
    expect(caculateHalfPriceTotal(selectedInfo,uncutTotal)).toEqual(halfPriceTotal);
  });
});

describe("caculateCutSixTotal test",function () {
  it("cuttedSixTotal should be ",function () {
    let selectedInfo = [{id: 'ITEM0001', name:'黄焖鸡',price:18.00,count: 1,type:'指定菜品半价'},
      {id: 'ITEM0013',name:'肉夹馍',price:6.00,count: 2,type:'满30减6元'},
      {id: 'ITEM0022',name:'凉皮',price:8.00,count: 1,type:'指定菜品半价'}];
    
    let uncutTotal = [{uncutTotal:38}];
    
    let cuttedSixTotal = [{cuttedSixTotal:32}];
    
    expect(caculateCutSixTotal(selectedInfo)).toEqual(cuttedSixTotal);
  });
});

describe("chooseCut test",function () {
  it("finalTotal should be ",function () {
    let halfPriceTotal = [{halfPriceTotal:25}];

    let cuttedSixTotal = [{cuttedSixTotal:32}];
    
    let finalTotal = [{finalTotal:25,type:'指定菜品半价'}];
    
    expect(chooseCut(halfPriceTotal,cuttedSixTotal)).toEqual(finalTotal);
  });
});

describe("caculateSpare test ",function () {
  it("spare should be ",function () {
    let uncutTotal = [{uncutTotal:38}];
    let finalTotal = [{finalTotal:25,type:'指定菜品半价'}];
    let spare = [{spare:13}];
    expect(caculateSpare(uncutTotal,finalTotal)).toEqual(spare);
  });
});

describe("writeDetails test",function () {
  it ("details should be ",function () {
    let selectedInfo = [{id: 'ITEM0001', name:'黄焖鸡',price:18.00,count: 1,type:'指定菜品半价'},
      {id: 'ITEM0013',name:'肉夹馍',price:6.00,count: 2,type:'满30减6元'},
      {id: 'ITEM0022',name:'凉皮',price:8.00,count: 1,type:'指定菜品半价'}];

    let finalTotal = [{finalTotal:25,type:'指定菜品半价'}];

    let spare = [{spare:13}];
    
    let details = `============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`;
    
    expect(writeDetails(selectedInfo,finalTotal,spare)).toEqual(details);
  })
});
