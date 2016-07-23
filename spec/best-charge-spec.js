// var main = require('../main/best-charge.js');

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


  const allItems = loadAllItems();

  it('buildOrderItems', function () {
    let inputs = ["ITEM0013 x 2"];
    let countItems = buildOrderItems(inputs, allItems);
    let expected = [
      {
        item: {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00
        },
        count: 2
      }
    ];
    expect(countItems).toEqual(expected);
  });

  const promotions = loadPromotions();

  it('buildBestChargeItems', function () {
    let input = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let countItems = buildOrderItems(input, allItems);
    let savedItems = buildBestChargeItems(countItems, promotions);
    let expected = [
      {
        orderItem: {
          item: {
            id: 'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count: 1
        },
        subtotal: 18,
        saved: 9
      },
      {
        orderItem: {
          item: {
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count: 2
        },
        subtotal: 12,
        saved: 0
      },
      {
        orderItem: {
          item: {
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          },
          count: 1
        },
        subtotal: 8,
        saved: 4
      }
    ];
    expect(savedItems).toEqual(expected);

  });
  
  it('buildReceiptItems', function () {
    let input = ["ITEM0013 x 4"];
    let countItems = buildOrderItems(input, allItems);
    let savedItems = buildBestChargeItems(countItems, promotions);
    let receipt = buildReceiptItems(savedItems);
    let expected = {
      bestChargeItems: [
        {
          orderItem: {
            item: {
              id: 'ITEM0013',
              name: '肉夹馍',
              price: 6.00
            },
            count: 4
          },
          subtotal: 24,
          saved: 0
        }
      ],
      total: 24,
      savedTotal: 0
    };

    expect(receipt).toEqual(expected);
  });
  
  it('buildReceiptItems', function () {
    let input = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let countItems = buildOrderItems(input, allItems);
    let savedItems = buildBestChargeItems(countItems, promotions);
    let receipt = buildReceiptItems(savedItems);
    let expected = {
      bestChargeItems: [
        {
          orderItem: {
            item: {
              id: 'ITEM0013',
              name: '肉夹馍',
              price: 6.00
            },
            count: 4
          },
          subtotal: 24,
          saved: 0
        },
        {
          orderItem: {
            item: {
              id: 'ITEM0022',
              name: '凉皮',
              price: 8.00
            },
            count: 1
          },
          subtotal: 8,
          saved: 4
        }
      ],
      total: 26,
      savedTotal: 6
    };

    expect(receipt).toEqual(expected);
  });

  it('buildReceiptItems', function () {
    let input = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let countItems = buildOrderItems(input, allItems);
    let savedItems = buildBestChargeItems(countItems, promotions);
    let receipt = buildReceiptItems(savedItems);
    let expected = {
      bestChargeItems: [
        {
          orderItem: {
            item: {
              id: 'ITEM0001',
              name: '黄焖鸡',
              price: 18.00
            },
            count: 1
          },
          subtotal: 18,
          saved: 9
        },

        {
          orderItem: {
            item: {
              id: 'ITEM0013',
              name: '肉夹馍',
              price: 6.00
            },
            count: 2
          },
          subtotal: 12,
          saved: 0
        },
        {
          orderItem: {
            item: {
              id: 'ITEM0022',
              name: '凉皮',
              price: 8.00
            },
            count: 1
          },
          subtotal: 8,
          saved: 4
        }
      ],
      total: 25,
      savedTotal: 13
    };

    expect(receipt).toEqual(expected);
  });

})
;

