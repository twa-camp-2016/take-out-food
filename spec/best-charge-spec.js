const bestCharge = require('../src/best-charge');
const allItems = require('../src/items');
const loadPromotions = require('../src/promotions');
describe('Take out food', function () {

  it('get correct cartItems', () => {
    const inputs = ["ITEM0001 x 1", "ITEM0013 x 2"];
    const cartItems = bestCharge.buildCartItems(inputs, allItems());
    const expectCartItems = [
      {
        item: { id: 'ITEM0001', name: '黄焖鸡', price: 18.00},
        count: 1
      },
      {
        item: {id: 'ITEM0013', name: '肉夹馍', price: 6.00},
        count: 2
      }
    ];

    expect(cartItems).toEqual(expectCartItems);
  });

  it('buildReceiptItems:get receiptItems', ()=> {
    const cartItems = [
      {
        item: {id: 'ITEM0001', name: '黄焖鸡', price: 18.00},
        count: 1
      },
      {
        item: { id: 'ITEM0013', name: '肉夹馍', price: 6.00},
        count: 2
      }
    ];
    const receiptItems = bestCharge.buildReceiptItems(cartItems, loadPromotions());
    const expectReceiptItems = [
      {
        cartItem: {
          item: { id: 'ITEM0001', name: '黄焖鸡', price: 18.00}, count: 1 },
        subtotal: 9.00,
        saved: 9.00
             },
      {
        cartItem: {
          item: { id: 'ITEM0013', name: '肉夹馍', price: 6.00}, count: 2 },
        subtotal: 12.00,
        saved: 0
      }
    ];
    expect(receiptItems).toEqual(expectReceiptItems);
  });

  it('buildReceipt: get receipt', ()=> {
    const inputs = [
      {
        cartItem: {item: {id: 'ITEM0001', name: '黄焖鸡', price: 18.00}, count: 1 },
        subtotal: 9.00,
        saved: 9.00
      },
      {
        cartItem: { item: { id: 'ITEM0013', name: '肉夹馍', price: 6.00}, count: 2},
        subtotal: 12.00,
        saved: 0
      }
    ];
    const receipt = bestCharge.buildReceipt(inputs, loadPromotions());
    const expectReceipt = {
      receiptItems: [{
        cartItem: {item: {id: 'ITEM0001', name: '黄焖鸡', price: 18}, count: 1},
        subtotal: 9,
        saved: 9
      },
        {
          cartItem: {item: {id: 'ITEM0013', name: '肉夹馍', price: 6}, count: 2},
          subtotal: 12,
          saved: 0
        }
      ],
      savedTotal: {savedTotal: 9, type: '指定菜品半价'}, total: 21
    };

    expect(receipt).toEqual(expectReceipt);
  });

  it('getReceiptText: get receipt Text', () => {
    const inputs = {
      receiptItems: [
        {
          cartItem: { item: { id: 'ITEM0001', name: '黄焖鸡', price: 18.00}, count: 1},
          subtotal: 9.00,
          saved: 9.00
        },
        {
          cartItem: { item: { id: 'ITEM0013', name: '肉夹馍', price: 6.00}, count: 2},
          subtotal: 12.00,
          saved: 0
        }
      ],
      savedTotal: {type: '指定菜品半价', savedTotal: 9.00},
      total: 21.00
    };
    const receiptText = bestCharge.getReceiptText(inputs).trim();
    const expectReceiptText = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡)，省9元
-----------------------------------
总计：21元
===================================`.trim();
    expect(receiptText).toEqual(expectReceiptText);
  });


  it('should generate best charge when best is 指定菜品半价', () => {
    const inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    const summary = bestCharge.bestCharge(inputs).trim();
    const expected = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`.trim();
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when best is 满30减6元', function () {
    const inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    const summary = bestCharge.bestCharge(inputs).trim();
    const expected = `
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
    const inputs = ["ITEM0013 x 4"];
    const summary = bestCharge.bestCharge(inputs).trim();
    const expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim();
    expect(summary).toEqual(expected)
  });

});
