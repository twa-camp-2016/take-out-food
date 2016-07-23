'use strict';

const main = require('../src/best-charge');
const loadAllItems = require('../src/items');
const loadPromotions = require('../src/promotions');

describe('Take out food', function () {

  it('buildCartItems', () => {
    const inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];

    const expectCartItems = [
      {
        item: {id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00
        },
        count: 1
      },
      {
        item: {
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

    expect(main.buildCartItems(inputs,loadAllItems())).toEqual(expectCartItems);

  });

  it('getBestPromotions', () => {

  });

  it('buildReceipt', () => {
    const cartItems =[
      {
        item: {id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00
        },
        count: 1
      },
      {
        item: {
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

    const expectReceiptItems = [
      {
        cartItem : {
          item: {id: 'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count: 1
        },
        subTotal: 9,
        saved: 9
      },
      {
        cartItem: {
          item: {
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count: 2
        },
        subTotal: 12,
        saved:0
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
        subTotal: 4,
        saved: 4
      }
    ];

    expect(main.buildReceiptItems(cartItems, loadPromotions())).toEqual(expectReceiptItems);
  });

  it('buildReceipt', () => {
    const receiptItems = [
      {
        cartItem : {
          item: {id: 'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count: 1
        },
        subTotal: 9,
        saved: 9
      },
      {
        cartItem: {
          item: {
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count: 2
        },
        subTotal: 12,
        saved:0
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
        subTotal: 4,
        saved: 4
      }
    ];

    const expectReceipt = {
      receiptItems: [
        {
          cartItem : {
            item: {id: 'ITEM0001',
              name: '黄焖鸡',
              price: 18.00
            },
            count: 1
          },
          subTotal: 9,
          saved: 9
        },
        {
          cartItem: {
            item: {
              id: 'ITEM0013',
              name: '肉夹馍',
              price: 6.00
            },
            count: 2
          },
          subTotal: 12,
          saved:0
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
          subTotal: 4,
          saved: 4
        }
      ],
      total: 25,
      savedTotal: 13
    }

    expect(main.buildReceipt(receiptItems)).toEqual(expectReceipt);
  });

  it('buildReceiptText', () => {
    const receipt = {
      receiptItems: [
        {
          cartItem : {
            item: {id: 'ITEM0001',
              name: '黄焖鸡',
              price: 18.00
            },
            count: 1
          },
          subTotal: 9,
          saved: 9
        },
        {
          cartItem: {
            item: {
              id: 'ITEM0013',
              name: '肉夹馍',
              price: 6.00
            },
            count: 2
          },
          subTotal: 12,
          saved:0
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
          subTotal: 4,
          saved: 4
        }
      ],
      total: 25,
      savedTotal: 13
    };

    const expectReceiptText =`
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

    expect(main.buildReceiptText(receipt).trim()).toEqual(expectReceiptText);
  });

  it('should generate best charge when best is 指定菜品半价', function() {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = main.bestCharge(inputs).trim();
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
    let summary = main.bestCharge(inputs).trim();
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
    let summary = main.bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

});
