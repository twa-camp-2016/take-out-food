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
        item: {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00
        },
        count: 1
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
        item: {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00
        },
        count: 1
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
          count: 1
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
          count: 2
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
          count: 1
        },
        saved: 4.00,
        subtotal: 4.00
      }
    ];

    expect(receiptItems).toEqual(expectReceiptItems);
  });

  describe('buildReceipt', () => {

    it('promotionType is 指定菜品半价', () => {

      const receiptItems = [
        {
          cartItem: {
            item: {
              id: 'ITEM0001',
              name: '黄焖鸡',
              price: 18.00
            },
            count: 1
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
            count: 2
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
            count: 1
          },
          saved: 4.00,
          subtotal: 4.00
        }
      ];
      const receipt = charge.buildReceipt(receiptItems);

      const expectReceipt = {
        receiptItems: receiptItems,
        promotionType: '指定菜品半价',
        savedTotal: 13,
        actualTotal: 25
      };

      expect(receipt).toEqual(expectReceipt);

    });

    it('promotionType is 满30减6元', () => {

      const receiptItems = [
        {
          cartItem: {
            item: {
              id: 'ITEM0013',
              name: '肉夹馍',
              price: 6.00
            },
            count: 4
          },
          saved: 0.00,
          subtotal: 24.00
        },
        {
          cartItem: {
            item: {
              id: 'ITEM0022',
              name: '凉皮',
              price: 8.00
            },
            count: 1
          },
          saved: 4.00,
          subtotal: 4.00
        }
      ];
      const receipt = charge.buildReceipt(receiptItems);

      const expectReceipt = {
        receiptItems: receiptItems,
        promotionType: '满30减6元',
        savedTotal: 6,
        actualTotal: 26
      };

      expect(receipt).toEqual(expectReceipt);

    });

    it('has no promotion', () => {

      const receiptItems = [
        {
          cartItem: {
            item: {
              id: 'ITEM0013',
              name: '肉夹馍',
              price: 6.00
            },
            count: 4
          },
          saved: 0.00,
          subtotal: 24.00
        }
      ];
      const receipt = charge.buildReceipt(receiptItems);

      const expectReceipt = {
        receiptItems: receiptItems,
        promotionType: '满30减6元',
        savedTotal: 0,
        actualTotal: 24
      };

      expect(receipt).toEqual(expectReceipt);
    });
  });

  describe('generateReceiptText', () => {

    it('promotionType is 指定菜品半价', () => {

      const receiptItems = [
        {
          cartItem: {
            item: {
              id: 'ITEM0001',
              name: '黄焖鸡',
              price: 18.00
            },
            count: 1
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
            count: 2
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
            count: 1
          },
          saved: 4.00,
          subtotal: 4.00
        }
      ];
      const receipt = {
        receiptItems: receiptItems,
        promotionType: '指定菜品半价',
        savedTotal: 13,
        actualTotal: 25
      };

      const receiptText = charge.generateReceiptText(receipt);

      const expectReceiptText = `============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`;

      expect(receiptText).toEqual(expectReceiptText);

    });

    it('promotionType is 满30减6元', () => {

      const receiptItems = [
        {
          cartItem: {
            item: {
              id: 'ITEM0013',
              name: '肉夹馍',
              price: 6.00
            },
            count: 4
          },
          saved: 0.00,
          subtotal: 24.00
        },
        {
          cartItem: {
            item: {
              id: 'ITEM0022',
              name: '凉皮',
              price: 8.00
            },
            count: 1
          },
          saved: 4.00,
          subtotal: 4.00
        }
      ];
      const receipt = {
        receiptItems: receiptItems,
        promotionType: '满30减6元',
        savedTotal: 6,
        actualTotal: 26
      };

      const receiptText = charge.generateReceiptText(receipt);

      const expectReceiptText = `============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：26元
===================================`;

      expect(receiptText).toEqual(expectReceiptText);
    });

    it('has no promotion', () => {

      const receiptItems = [
        {
          cartItem: {
            item: {
              id: 'ITEM0013',
              name: '肉夹馍',
              price: 6.00
            },
            count: 4
          },
          saved: 0.00,
          subtotal: 24.00
        }
      ];
      const receipt = {
        receiptItems: receiptItems,
        promotionType: undefined,
        savedTotal: 0,
        actualTotal: 24
      };

      const receiptText = charge.generateReceiptText(receipt);

      const expectReceiptText = `============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`;

      expect(receiptText).toEqual(expectReceiptText);
    });
  });
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
===================================`.trim();
  expect(summary).toEqual(expected);
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
===================================`.trim();
  expect(summary).toEqual(expected);
});

it('should generate best charge when no promotion can be used', function () {
  let inputs = ["ITEM0013 x 4"];
  let summary = charge.bestCharge(inputs).trim();
  let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim();
  expect(summary).toEqual(expected);
});