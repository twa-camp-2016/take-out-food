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


describe("formatTags",function () {
  it("return right eachTagAmount",function () {
    let selectedItems=["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let result=formatTags(selectedItems);
    let subAmount=[{ id: 'ITEM0001 ', amount: 1 },{ id: 'ITEM0013 ', amount: 2 },{ id: 'ITEM0022 ', amount: 1 }]
    expect(result).toEqual(subAmount);
  });
});

describe("matchInformation",function () {
  it("return right matchInformation",function () {
    let allItems=loadAllItems();
    let subAmount=[{id:'ITEM0001',amount:1},{id:'ITEM0013',amount:2},{id:'ITEM0022',amount:1}];
    let subCount=[{ id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1 },
      { id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2 },
      { id: 'ITEM0022', name: '凉皮', price: 8, count: 1 }]
    let result=matchInformation(subAmount,allItems)
    expect(result).toEqual(subCount);
  });
});

describe("calculateSubTotal",function () {
  it("return right calculateSubTotal",function () {
    let subCount=[{ id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1 },
      { id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2 },
      { id: 'ITEM0022', name: '凉皮', price: 8, count: 1 }]
    let result=calculateSubTotal(subCount);
    let subTotal=[{ id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1 ,subTotal:18},
      { id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2 ,subTotal:12},
      { id: 'ITEM0022', name: '凉皮', price: 8, count: 1 ,subTotal:8}]
    expect(result).toEqual(subTotal);
  })
})

describe("calculateTotal",function () {
  it("return right total",function () {
    let subTotal=[{ id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1 ,subTotal:18},
      { id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2 ,subTotal:12},
      { id: 'ITEM0022', name: '凉皮', price: 8, count: 1 ,subTotal:8}]
    let result=calculateTotal(subTotal);
    let total=38;
    expect(result).toEqual(total);
  })
})

describe("calculateSaves",function () {
  it("return right saves",function () {
    let promotions=[{
      type: '满30减6元'
    }, {
      type: '指定菜品半价',
      items: ['ITEM0001', 'ITEM0022']
    }];
    let subTotal=[{ id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1 ,subTotal:18},
      { id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2 ,subTotal:12},
      { id: 'ITEM0022', name: '凉皮', price: 8, count: 1 ,subTotal:8}]
    let saves=[{ name: '肉夹馍', saves: 9 }, { name: '肉夹馍', saves: 4 }];
    let result=calculateSaves(subTotal,promotions);
    expect(result).toEqual(saves);
  })
})

describe("selectBestTotal",function () {
  it("return right bestTotal",function () {
    let total=38;
    let saves=13;
    let bestTotal=[{ type: '指定菜品半价' ,save: 13 } ];
    let result=selectBestTotal(total,saves);
    expect(result).toEqual(bestTotal);
  })
})


