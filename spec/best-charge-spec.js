'use strict';

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

});

describe('unit test', () => {

  describe('buildItems', () => {

    let selectedItems = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    it('should return itemsMessage', ()=> {
      const itemsMessage = [
        {
          item: {
            id: 'ITEM0001',
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
          count : 1
        }
      ];

      expect(buildItems(selectedItems)).toEqual(itemsMessage);
    });
  });

  describe('buildSubtotal',() => {
    const cartItems = [
      {
        item: {
          id: 'ITEM0001',
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
        count : 1
      }
    ];

    it('should return contedItems' , () => {
      const countedItems = [
        {
          cartItem:
          {
            item: {
              id: 'ITEM0001',
              name: '黄焖鸡',
              price: 18.00
            },
            count:1
          },
          subtotal:18.00
        },
        {
          cartItem:
          {
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
          cartItem:
          {
            item:{
              id: 'ITEM0022',
              name: '凉皮',
              price: 8.00
            },
            count : 1
          },
          subtotal:8.00
        }
      ];
      expect(buildSubtotal(cartItems)).toEqual(countedItems);
    });
  });

  describe('buildTotal',() => {
    const countedItems = [
      {
        cartItem:
        {
          item: {
            id: 'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count:1
        },
        subtotal:18.00
      },
      {
        cartItem:
        {
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
        cartItem:
        {
          item:{
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          },
          count : 1
        },
        subtotal:8.00
      }
    ];

    it('should return total', () => {
      const sumedTotal = [
        {
          countedItem:
          {
            item: {
              id: 'ITEM0001',
              name: '黄焖鸡',
              price: 18.00
            },
            count:1
          },
          subtotal:18.00
        },
        {
          countedItem:
          {
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
          countedItem:
          {
            item:{
              id: 'ITEM0022',
              name: '凉皮',
              price: 8.00
            },
            count : 1
          },
          subtotal:8.00
        },
        {
          total:38.00
        },

      ];
      expect(buildTotal(countedItems)).toEqual(sumedTotal);
    });
  });
});
