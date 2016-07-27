'use strict';
/*global describe,beforeEach,expect,it,spyOn,require*/
const {
  bestCharge,
  getItemArray,
  getSubtotalArray,
  firstPromotion,
  secondPromotion,
  promotionTypeItem,
  getItemList,
  getPromotionList,
  printList
} = require('../src/best-charge');
const loadAllItems = require('../src/items');
const loadAllPromotions = require('../src/promotions');

describe('Take out food', function () {

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
===================================`.trim();
    expect(summary).toEqual(expected);
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
===================================`.trim();
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
===================================`.trim();
    expect(summary).toEqual(expected)
  });

  it('should get correct splittedItems',() => {
    const selectedItems = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    const allItems = loadAllItems();
    const itemArray = getItemArray(selectedItems,allItems);

    const expectText = [
      {
        item:{
          id:'ITEM0001',
          name: '黄焖鸡',
          price: 18.00
        },
        count:1
      },
      {
        item:{
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00
        },
        count:2
      },
      {
        item:{
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00
        },
        count:1
      }
    ];
    expect(itemArray).toEqual(expectText);
  });

  it('get correct subtotal array',() => {
    const itemArray = [
    {
        item:{
          id:'ITEM0001',
          name: '黄焖鸡',
          price: 18.00
        },
        count:1
      },
      {
        item:{
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00
      },
        count:2
      },
      {
        item:{
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00
        },
        count:1
      }
    ];
    const totalArray = getSubtotalArray(itemArray);

    const expectText = [
      {
        countItem:{
          item:{
            id:'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count:1
        },
        subtotal:18.00
      },
      {
        countItem:{
          item:{
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count:2
        },
        subtotal:12.00
      },
      {
        countItem:{
          item:{
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          },
          count:1
        },
        subtotal:8.00
      }
    ];

    expect(totalArray).toEqual(expectText);
  });

  it('should get promotion one saves',() => {
    const totalArray = [
      {
        countItem:{
          item:{
            id:'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count:1
        },
        subtotal:18.00
      },
      {
        countItem:{
          item:{
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count:2
        },
        subtotal:12.00
      },
      {
        countItem:{
          item:{
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          },
          count:1
        },
        subtotal:8.00
      }
    ];

    const savesA = firstPromotion(totalArray);
    const expectText = {total:38,saves_A:6};

    expect(savesA).toEqual(expectText);
  });

  it('should get correct promotion two saves',() => {
    const totalArray = [
      {
        countItem:{
          item:{
            id:'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count:1
        },
        subtotal:18.00
      },
      {
        countItem:{
          item:{
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count:2
        },
        subtotal:12.00
      },
      {
        countItem:{
          item:{
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          },
          count:1
        },
        subtotal:8.00
      }
    ];
    const allPromotions = loadAllPromotions();
    const savesB = secondPromotion(totalArray,allPromotions);
    const expectText = {total:38,saves_B:13};

    expect(savesB).toEqual(expectText);
  });

  it('should get correct items',() => {
    const savesA = {total:38,saves_A:6};
    const savesB = {total:38,saves_B:13};

    const typeArray = promotionTypeItem(savesA, savesB);
    const expectText =
      {
        type:'指定菜品半价',
        saves:13
      };
    expect(typeArray).toEqual(expectText);
  });

  it('should get correct items',() => {
    const savesA = {total:24,saves_A:0};
    const savesB = {total:24,saves_B:0};

    const typeArray = promotionTypeItem(savesA, savesB);
    const expectText =
    {
      type:'不打折',
      saves:0
    };
    expect(typeArray).toEqual(expectText);
  });
  it('should get correct list',() => {

    const totalArray = [
      {
        countItem:{
          item:{
            id:'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count:1
        },
        subtotal:18.00
      },
      {
        countItem:{
          item:{
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count:2
        },
        subtotal:12.00
      },
      {
        countItem:{
          item:{
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          },
          count:1
        },
        subtotal:8.00
      }
    ];
    const list = getItemList(totalArray);
    const expectText =  `黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元`;

    expect(list).toEqual(expectText);
  });

  it('should get correct promotion list',() => {
    const typeArray =
      {
        type:'指定菜品半价',
        saves:13
      };
    const promotionList = getPromotionList(typeArray);
    const expectText = `使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元`;

    expect(promotionList).toEqual(expectText);
  });

  it('should get correct item list',() => {
    const list =  `黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元`;
    const promotionList = `使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元`;
    const typeArray =
    {
      type:'指定菜品半价',
      saves:13
    };
    const total = 38;
    const receipt = printList(promotionList,list,total,typeArray);

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
===================================`;
    expect(receipt).toEqual(expectText);
  });
});
