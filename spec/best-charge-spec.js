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
describe("test",function(){
  it("getformatIds",function () {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let formatIds=getFormatIds(inputs);
    const expectText=[ { id: 'ITEM0001', count: 1 },
      { id: 'ITEM0013', count: 2 },
      { id: 'ITEM0022', count: 1 } ]
    expect(formatIds).toEqual(expectText);

  });
  it("getBuyedItems",function(){
    let formatIds =[ { id: 'ITEM0001', count: 1 },
      { id: 'ITEM0013', count: 2 },
      { id: 'ITEM0022', count: 1 } ]
    let allItems = loadAllItems();
    let buyItems=getBuyedItems(formatIds, allItems);
    const expectText=[ { id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1 },
        { id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2 },
        { id: 'ITEM0022', name: '凉皮', price: 8, count: 1 } ]

      ;
    expect(buyItems).toEqual(expectText);
  })
  it("getPromotItems",function(){
        let buyItems=[ { id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1 },
            { id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2 },
            { id: 'ITEM0022', name: '凉皮', price: 8, count: 1 } ];
    let promotions = loadPromotions();
      let promotionItems=getPromotItems(buyItems,promotions);
    const expectText=[ { id: 'ITEM0001',
      count: 1,
      name: '黄焖鸡',
      price: 18,
      type: 18,
      payPrice: 9,
      saved: 9 },
      { id: 'ITEM0013',
        count: 2,
        name: '肉夹馍',
        price: 6,
        type: 6,
        payPrice: 12,
        saved: 0 },
      { id: 'ITEM0022',
        count: 1,
        name: '凉皮',
        price: 8,
        type: 8,
        payPrice: 4,
        saved: 4 } ];
    expect(promotionItems).toEqual(expectText);
  })
  it("getPromotItems",function(){
    let promotionItems=[ { id: 'ITEM0001',
      count: 1,
      name: '黄焖鸡',
      price: 18,
      type: 18,
      payPrice: 9,
      saved: 9 },
      { id: 'ITEM0013',
        count: 2,
        name: '肉夹馍',
        price: 6,
        type: 6,
        payPrice: 12,
        saved: 0 },
      { id: 'ITEM0022',
        count: 1,
        name: '凉皮',
        price: 8,
        type: 8,
        payPrice: 4,
        saved: 4 } ];
    let totalPrices = getTotalPrices(promotionItems);
    const expectText={ totalPayPrice: 25, totalSaved: 13 }
    expect(totalPrices).toEqual(expectText);
  })
  it("getPromotItems",function(){
    let promotionItems=[ { id: 'ITEM0001',
      count: 1,
      name: '黄焖鸡',
      price: 18,
      type: 18,
      payPrice: 9,
      saved: 9 },
      { id: 'ITEM0013',
        count: 2,
        name: '肉夹馍',
        price: 6,
        type: 6,
        payPrice: 12,
        saved: 0 },
      { id: 'ITEM0022',
        count: 1,
        name: '凉皮',
        price: 8,
        type: 8,
        payPrice: 4,
        saved: 4 } ];
    let totalPrices ={ totalPayPrice: 25, totalSaved: 13 }
    let promotions = loadPromotions();
    let receipt=getReceipt(promotionItems, totalPrices, promotions);
    const expectText={ receiptItems:
      [ { name: '黄焖鸡', price: 18, count: 1, payPrice: 9, saved: 9 },
        { name: '肉夹馍', price: 6, count: 2, payPrice: 12, saved: 0 },
        { name: '凉皮', price: 8, count: 1, payPrice: 4, saved: 4 } ],
      totalPayPrice: 25,
      totalSaved: 13 }
    expect(receipt).toEqual(expectText);
  })
});

