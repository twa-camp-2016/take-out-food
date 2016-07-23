'use strict';

const app = require('../src/best-charge');
const allItems = require('../src/items');
const allPromotions = require('../src/promotions');

describe('Take out food', ()=> {

  it('buildCartItems', ()=> {
    const selectedItem = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
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
    expect(app.buildCartItems(selectedItem, allItems())).toEqual(expectCartItems);
  });

  it('buildReceiptItems', ()=> {
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
      }
    ];
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
        subtotal: 18.00,
        saved: 9.00
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
        subtotal: 12.00,
        saved: 0.00
      }
    ];
    expect(app.buildReceiptItems(cartItems,allPromotions())).toEqual(expectReceiptItems);
  });

  it('buildReceipt', ()=> {
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
        subtotal: 18.00,
        saved: 9.00
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
        subtotal: 12.00,
        saved: 0.00
      }
    ];
    const expectreceipt = {
      receiptItems:[
        {
          cartItem: {
            item: {
              id: 'ITEM0001',
              name: '黄焖鸡',
              price: 18.00
            },
            count: 1
          },
          subtotal: 18.00,
          saved: 9.00
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
          subtotal: 12.00,
          saved: 0.00
        }
      ],
      total:21.00,
      savedType:{
        type:'指定菜品半价',
        names:['黄焖鸡']
      },
      savedTotal:9.00
    };
    expect(app.buildReceipt(receiptItems)).toEqual(expectreceipt);
  });

  it('buildReceiptText', ()=> {
    const receipt = {
      receiptItems:[
        {
          cartItem: {
            item: {
              id: 'ITEM0001',
              name: '黄焖鸡',
              price: 18.00
            },
            count: 1
          },
          subtotal: 18.00,
          saved: 9.00
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
          subtotal: 12.00,
          saved: 0.00
        }
      ],
      total:21.00,
      savedType:{
        type:'指定菜品半价',
        names:['黄焖鸡']
      },
      savedTotal:9.00
    };
    const expectReceiptText = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡)，省9元
-----------------------------------
总计：21元
===================================`.trim()
    expect(app.buildReceiptText(receipt)).toEqual(expectReceiptText);
  });


  it('should generate best charge when best is 指定菜品半价', ()=> {
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

  it('should generate best charge when best is 满30减6元', ()=> {
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

  it('should generate best charge when no promotion can be used', ()=> {
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
