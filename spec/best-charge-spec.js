const items = require('../src/items');
const promotions = require('../src/promotions');

const app = require('../src/best-charge');

describe('take out food unit tests', () => {

  it('get cartItems', () => {

    const inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    const allItems = items.loadAllItems();
    const cartItems = app.buildCartItems(inputs, allItems);

    const expectCartItems = [
      {
        item:{
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00
        },
        count: 1
      },
      {
        item:{
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00
        },
        count: 2
      },
      {
        item:{
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00
        },
        count: 1
      }
    ];

    expect(cartItems).toEqual(expectCartItems);
  });

  it('get ReceiptItems', () => {

    const cartItems = [
      {
        item:{
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00
        },
        count: 1
      },
      {
        item:{
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00
        },
        count: 2
      },
      {
        item:{
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00
        },
        count: 1
      }
    ];

    const receiptItems = app.buildReceiptItems(cartItems);

    const expectReceiptItems = [
      {
        cartItem: {
          item:{
            id: 'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count: 1
        },
        subtotal: 18.00,
        saved: 9.00,
        promotionType:'指定菜品半价'

      },
      {
        cartItem: {
          item:{
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count: 2
        },
        subtotal: 12.00,
        saved: 0,
        promotionType: undefined
      },
      {
        cartItem: {
          item:{
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          },
          count: 1
        },
        subtotal: 8.00,
        saved: 4.00,
        promotionType:'指定菜品半价'
      }
    ];

    expect(receiptItems).toEqual(expectReceiptItems);
  });

  it('get best charge', () => {
    const receiptItems = [
      {
        cartItem: {
          item:{
            id: 'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count: 1
        },
        subtotal: 18.00,
        saved: 9.00,
        promotionType:'指定菜品半价'

      },
      {
        cartItem: {
          item:{
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count: 2
        },
        subtotal: 12.00,
        saved: 0,
        promotionType: undefined
      },
      {
        cartItem: {
          item:{
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          },
          count: 1
        },
        subtotal: 8.00,
        saved: 4.00,
        promotionType:'指定菜品半价'
      }
    ];
    const bestChargeItems = app.getBestCharge(receiptItems);
    const expectBestCharge = {
      cartItems:receiptItems,
      savedTotal : 13.00,
      total: 25.00
    };

    expect(bestChargeItems).toEqual(expectBestCharge);
  });

  it('buildReceipt', () => {
    const bestChargeItems = {
      cartItems:[
        {
          cartItem: {
            item:{
              id: 'ITEM0001',
              name: '黄焖鸡',
              price: 18.00
            },
            count: 1
          },
          subtotal: 18.00,
          saved: 9.00,
          promotionType:'指定菜品半价'

        },
        {
          cartItem: {
            item:{
              id: 'ITEM0013',
              name: '肉夹馍',
              price: 6.00
            },
            count: 2
          },
          subtotal: 12.00,
          saved: 0,
          promotionType: undefined
        },
        {
          cartItem: {
            item:{
              id: 'ITEM0022',
              name: '凉皮',
              price: 8.00
            },
            count: 1
          },
          subtotal: 8.00,
          saved: 4.00,
          promotionType:'指定菜品半价'
        }
      ],
      savedTotal : 13.00,
      total: 25.00
    };



    const receipt = app.buildReceipt(bestChargeItems);
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


    expect(receipt).toEqual(expected);
  });
});

describe('Take out food', function () {

  it('should generate best charge when best is 指定菜品半价', function() {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = app.bestCharge(inputs).trim();
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
    let summary = app.bestCharge(inputs).trim();
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
    let summary = app.bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

});
