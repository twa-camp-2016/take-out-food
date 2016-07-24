'use strict';
let bestCharge = require('../src/best-charge');
let allItems = require('../src/items');
let loadPromotions = require('../src/promotions');
describe('Take out food', function () {

  it('get correct dishItems', () => {
    let inputs = ["ITEM0001x1", "ITEM0013x2"];
    let dishItems = bestCharge.buildDishItem(inputs, allItems());
    let expectDishItems = [
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

    expect(dishItems).toEqual(expectDishItems);
  });

  it('buildMenuItems', ()=> {
    let dishItems = [
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
    let menuItems = bestCharge.buildMenuItem(dishItems, loadPromotions());
    let expectMenuItems = [
      {
        dishItem: {
          item: {
            id: 'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count: 1
        },
        subtotal: 9.00,
        saved: 9.00
      },
      {
        dishItem: {
          item: {
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count: 2
        },
        subtotal: 12.00,
        saved: 0
      }
    ];
    expect(menuItems).toEqual(expectMenuItems);
  });

  it('buildMenuReceipt', ()=> {
    let inputs = [
      {
        dishItem: {
          item: {
            id: 'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count: 1
        },
        subtotal: 9.00,
        saved: 9.00
      },
      {
        dishItem: {
          item: {
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count: 2
        },
        subtotal: 12.00,
        saved: 0
      }
    ];
    let menuReceipt = bestCharge.buildMenuReceipt(inputs, loadPromotions());
    let expectMenuReceipt = {
      menuItems: [
        {
          dishItem: {
            item: {
              id: 'ITEM0001',
              name: '黄焖鸡',
              price: 18.00
            },
            count: 1
          },
          subtotal: 9.00,
          saved: 9.00
        },
        {
          dishItem: {
            item: {
              id: 'ITEM0013',
              name: '肉夹馍',
              price: 6.00
            },
            count: 2
          },
          subtotal: 12.00,
          saved: 0
        }
      ],
      savedTotal: 9.00,
      total: {total: 21, promotionType: '指定菜品半价'}
    };
    expect(menuReceipt).toEqual(expectMenuReceipt);
  });

  it('getMenuAccount', () => {
    let inputs = {
      menuItems: [
        {
          dishItem: {
            item: {
              id: 'ITEM0001',
              name: '黄焖鸡',
              price: 18.00
            },
            count: 1
          },
          subtotal: 9.00,
          saved: 9.00
        },
        {
          dishItem: {
            item: {
              id: 'ITEM0013',
              name: '肉夹馍',
              price: 6.00
            },
            count: 2
          },
          subtotal: 12.00,
          saved: 0
        }
      ],
      savedTotal: 9.00,
      total: {promotionType: '指定菜品半价', total: 21.00}
    };
    let receipt = bestCharge.getReceiptText(inputs).trim();
let expectReceipt = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
-----------------------------------
使用优惠:
指定菜品半价黄焖鸡,省9元
-----------------------------------
总计：21元
===================================`.trim();
expect(receipt).toEqual(expectReceipt);
});


  it('should generate best charge when best is 指定菜品半价', function () {
    let inputs = ["ITEM0001x1", "ITEM0013x2", "ITEM0022x1"];
    let summary = bestCharge.bestCharge(inputs).trim();

    let expected = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价黄焖鸡,凉皮,省13元
-----------------------------------
总计：25元
===================================`.trim();

    expect(summary).toEqual(expected)
  });

  it('should generate best charge when best is 满30减6元', function () {
    let inputs = ["ITEM0013x4", "ITEM0022x1"];
    let summary = bestCharge.bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元,省6元
-----------------------------------
总计：26元
===================================`.trim();
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when no promotion can be used', function () {
    let inputs = ["ITEM0013x4"];
    let summary = bestCharge.bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim();
    expect(summary).toEqual(expected)
  });


});
