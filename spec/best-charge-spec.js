'use strict'

const main = require('../src/best-charge');
const loadItem = require('../src/items');
const loadpro = require('../src/promotions');

describe('Take out food', function () {

  xit('should generate best charge when best is 指定菜品半价', function() {
    const inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    const summary = main.bestCharge(inputs).trim();
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
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  xit('should generate best charge when best is 满30减6元', function() {
    const inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    const summary = bestCharge(inputs).trim();
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

  xit('should generate best charge when no promotion can be used', function() {
    const inputs = ["ITEM0013 x 4"];
    const summary = bestCharge(inputs).trim();
    const expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('build cartItems', () => {
    const selectedItems = ['ITEM0001 x 1', 'ITEM0013 x 2', 'ITEM0022 x 1'];
    const allItems = loadItem.loadAllItems();
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

    const cartItems = main.buildCartItems(allItems, selectedItems);
    expect(cartItems).toEqual(expectCartItems);
  });

  it('build receiptCartItems', () => {
    const allPromotions = loadpro.loadPromotions();
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

    const receiptCartItems = main.buildReceiptCartItems(cartItems, allPromotions);
    const expectCartItems = [
      {
        receiptCartItem:
        {
          item:{
            id: 'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count: 1
        },
        subTotal: 18.00,
        canSave: 9.00
      },
      {
        receiptCartItem:
        {
          item:{
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count: 2
        },
        subTotal: 12.00,
        canSave: 0.00
      },
      {
        receiptCartItem:
        {
          item:{
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          },
          count: 1
        },
        subTotal: 8.00,
        canSave: 4.00
      }

    ];
    expect(receiptCartItems).toEqual(expectCartItems);
  });

  it('calculateReceiptItems', () => {
    const receipCartItems = [
      {
        receiptCartItem:
        {
          item:{
            id: 'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count: 1
        },
        subTotal: 18.00,
        canSave: 9.00
      },
      {
        receiptCartItem:
        {
          item:{
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count: 2
        },
        subTotal: 12.00,
        canSave: 0.00
      },
      {
        receiptCartItem:
        {
          item:{
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          },
          count: 1
        },
        subTotal: 8.00,
        canSave: 4.00
      }
    ];

    const expectReceipCartItems =
      {
        receiptItems: receipCartItems,
        total: 38.00,
        canSaved: 13.00
      };
    const receiptItems = main.calculateReceiptItems(receipCartItems);

    expect(expectReceipCartItems).toEqual(receiptItems);
  });

  it('buildReceipt', () => {
    const receipCartItems = [
      {
        receiptCartItem:
        {
          item:{
            id: 'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count: 1
        },
        subTotal: 18.00,
        canSave: 9.00
      },
      {
        receiptCartItem:
        {
          item:{
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count: 2
        },
        subTotal: 12.00,
        canSave: 0.00
      },
      {
        receiptCartItem:
        {
          item:{
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          },
          count: 1
        },
        subTotal: 8.00,
        canSave: 4.00
      }
    ];
    const items =
      {
        receiptItems: receipCartItems,
        total: 38.00,
        canSaved: 13.00
      };

    const expectReceipt = {receipt: items, promotion:{type:'指定菜品半价', saved: 13.00, nameOfItems: '黄焖鸡，凉皮'} };
    const receipt = main.buildReceipt(items, loadpro.loadPromotions());
    expect(receipt).toEqual(expectReceipt);
  });

  it('receiptText', () => {
    const receipCartItems = [
      {
        receiptCartItem:
        {
          item:{
            id: 'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count: 1
        },
        subTotal: 18.00,
        canSave: 9.00
      },
      {
        receiptCartItem:
        {
          item:{
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count: 2
        },
        subTotal: 12.00,
        canSave: 0.00
      },
      {
        receiptCartItem:
        {
          item:{
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          },
          count: 1
        },
        subTotal: 8.00,
        canSave: 4.00
      }
    ];
    const receipt = {
      receipt:
      {
        receiptItems: receipCartItems,
        total: 38.00,
        canSaved: 13.00
      },
      promotion:
      {
        type:'指定菜品半价',
        saved: 13.00,
        nameOfItems: '黄焖鸡，凉皮'
      }
    }

    const printText = main.buildReceiptText(receipt);
    const expectText = `
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
    expect(printText).toEqual(expectText);
  });

});
