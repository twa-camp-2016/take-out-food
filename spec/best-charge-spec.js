"use strict";

const charge = require('../src/best-charge');
const allItems = require('../src/items');
const promotions = require('../src/promotions');

describe('Take out food', function () {

  it('buildCartItems', () => {

    const selectedItems = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    const cartItems = charge.buildCartItems(selectedItems, allItems.loadAllItems());

    const expectCartItems = [
      {
        item: {
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00
        },
        count: 1,
        total: 18.00
      },
      {
        item: {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00
        },
        count: 2,
        total: 12.00
      },
      {
        item: {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00
        },
        count: 1,
        total: 8.00
      }
    ];

    expect(cartItems).toEqual(expectCartItems);
  });

  it('buildReceiptItems', () => {

    const cartItems = [
      {
        item: {
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00
        },
        count: 1,
        total: 18.00
      },
      {
        item: {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00
        },
        count: 2,
        total: 12.00
      },
      {
        item: {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00
        },
        count: 1,
        total: 8.00
      }
    ];
    const receiptItems = charge.buildReceiptItems(cartItems, promotions.loadPromotions());

    const expectReceiptItems = [
      {
        cartItem: {
          item: {
            id: 'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count: 1,
          total: 18.00
        },
        saved: 9.00,
        subtotal: 9.00
      },
      {
        cartItem: {
          item: {
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count: 2,
          total: 12.00
        },
        saved: 0.00,
        subtotal: 12.00
      },
      {
        cartItem: {
          item: {
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          },
          count: 1,
          total: 8.00
        },
        saved: 4.00,
        subtotal: 4.00
      }
    ];

    expect(receiptItems).toEqual(expectReceiptItems);
  });

  it('buildPromotionReceipt', () => {

    const receiptItems = [
      {
        cartItem: {
          item: {
            id: 'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count: 1,
          total: 18.00
        },
        saved: 9.00,
        subtotal: 9.00
      },
      {
        cartItem: {
          item: {
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count: 2,
          total: 12.00
        },
        saved: 0.00,
        subtotal: 12.00
      },
      {
        cartItem: {
          item: {
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          },
          count: 1,
          total: 8.00
        },
        saved: 4.00,
        subtotal: 4.00
      }
    ];
    const promotionReceipt = charge.buildReceiptItems(receiptItems, promotions.loadPromotions());

    const expectPromotionReceipt = {
      promotionType: '指定菜品半价',
      promotionNames: ['黄焖鸡', '凉皮'],
      savedTotal: 13
    };

    expect(promotionReceipt).toEqual(expectPromotionReceipt);
  });

  it('buildReceipt', () => {

    const selectedItems = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    const receipt = charge.buildCartItems(selectedItems, allItems.loadAllItems());

    const expectCartItems = [
      {
        item: {
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00
        },
        count: 1,
        total: 18.00
      },
      {
        item: {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00
        },
        count: 2,
        total: 12.00
      },
      {
        item: {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00
        },
        count: 1,
        total: 8.00
      }
    ];

    expect(cartItems).toEqual(expectCartItems);

  });

  it('should generate best charge when best is 指定菜品半价', function () {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = charge.bestCharge(inputs).trim();
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
    let summary = charge.bestCharge(inputs).trim();
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
    let summary = charge.bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

});