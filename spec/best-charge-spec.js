describe('Take out food', function () {
  it('should getCountedIds', ()=> {
    let ids = [
      "ITEM0001 x 1",
      "ITEM0013 x 2",
      "ITEM0022 x 1"
    ];
    let countedIds= getCountedIds(ids);

    let expected = [ { id: 'ITEM0001 ', count: 1 },
      { id: 'ITEM0013 ', count: 2 },
      { id: 'ITEM0022 ', count: 1 } ]

    expect(countedIds).toEqual(expected)
  });

  it('should getBuyedItems', ()=> {
    let countedIds = [ { id: 'ITEM0001 ', count: 1 },
      { id: 'ITEM0013 ', count: 2 },
      { id: 'ITEM0022 ', count: 1 } ];
    let allItems = loadAllItems();

    let buyedItems= getBuyedItems(countedIds, allItems);

    let expected = [ { id: 'ITEM0001 ', name: '黄焖鸡', price: 18.00, count: 1 },
      { id: 'ITEM0013 ', name: '肉夹馍', price: 6.00, count: 2 },
      { id: 'ITEM0022 ', name: '凉皮', price: 8.00, count: 1 } ]

    expect(buyedItems).toEqual(expected)
  });

  it('should getPromotionItems', ()=> {
    let buyedItems = [ { id: 'ITEM0001 ', name: '黄焖鸡', price: 18.00, count: 1 },
      { id: 'ITEM0013 ', name: '肉夹馍', price: 6.00, count: 2 },
      { id: 'ITEM0022 ', name: '凉皮', price: 8.00, count: 1 } ];
    let promotions = loadPromotions();

    let promotionItems = getPromotionItems(buyedItems, promotions);

    let expected = [ { id: 'ITEM0001 ', name: '黄焖鸡', price: 18.00, count: 1, type: '指定菜品半价' },
      { id: 'ITEM0013 ', name: '肉夹馍', price: 6.00, count: 2 },
      { id: 'ITEM0022 ', name: '凉皮', price: 8.00, count: 1, type: '指定菜品半价' } ]

    expect(promotionItems).toEqual(expected)
  });

  it('should getItemPrices', ()=> {
    let promotionItems = [ { id: 'ITEM0001 ', name: '黄焖鸡', price: 18.00, count: 1, type: '指定菜品半价' },
      { id: 'ITEM0013 ', name: '肉夹馍', price: 6.00, count: 2 },
      { id: 'ITEM0022 ', name: '凉皮', price: 8.00, count: 1, type: '指定菜品半价' } ];

    let itemPrices = caculatePromotedItems(promotionItems);

    let expected = [ { id: 'ITEM0001 ', name: '黄焖鸡', price: 18.00, count: 1, type: '指定菜品半价', payPrice: 9.00, saved: 9.00 },
      { id: 'ITEM0013 ', name: '肉夹馍', price: 6.00, count: 2 , payPrice: 12.00, saved: 0 },
      { id: 'ITEM0022 ', name: '凉皮', price: 8.00, count: 1, type: '指定菜品半价', payPrice: 4.00, saved: 4.00  } ]

    expect(itemPrices).toEqual(expected)
  });

  it('should getTotalPrices', ()=> {
    let itemPrices = [ { id: 'ITEM0001 ', name: '黄焖鸡', price: 18.00, count: 1, type: '指定菜品半价', payPrice: 9.00, saved: 9.00 },
      { id: 'ITEM0013 ', name: '肉夹馍', price: 6.00, count: 2 , payPrice: 12.00, saved: 0 },
      { id: 'ITEM0022 ', name: '凉皮', price: 8.00, count: 1, type: '指定菜品半价', payPrice: 4.00, saved: 4.00  } ];

    let totalPrices = getTotalPrices(itemPrices);

    let expected = {
      totalPayPrice: 38.00,
      totalSaved: 0
    }
    expect(totalPrices).toEqual(expected)
  });

  it('should getTotalPrices', ()=> {
    let itemPrices = [ { id: 'ITEM0001 ', name: '黄焖鸡', price: 18.00, count: 1, type: '指定菜品半价', payPrice: 9.00, saved: 9.00 },
      { id: 'ITEM0013 ', name: '肉夹馍', price: 6.00, count: 2 , payPrice: 12.00, saved: 0 },
      { id: 'ITEM0022 ', name: '凉皮', price: 8.00, count: 1, type: '指定菜品半价', payPrice: 4.00, saved: 4.00  } ];

    let totalPrices = {
      totalPayPrice: 25.00,
      totalSaved: 13.00
    }

    let receipts = buildReceipts(itemPrices, totalPrices);

    let expected = [{

    }]

    expect(receipts).toEqual(expected)
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
