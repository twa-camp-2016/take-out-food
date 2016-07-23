'use strict'

describe('Take out food', function () {


  xit('should formattedIds #1', function() {
    let ids = [
      "ITEM0001 x 1",
      "ITEM0013 x 2",
      "ITEM0022 x 1"];
    let formattedAllIds = formattedIds(ids);
    let expected = [
      {id:"ITEM0001",count: 1},
      {id :"ITEM0013" ,count: 2},
      { id :"ITEM0022" ,count: 1}
      ];

    expect(formattedAllIds).toEqual(expected)
  });

  it('should formattedIds #2', function() {
    let formattedAllIds = [
      {id:"ITEM0001",count: 1},
      {id :"ITEM0013" ,count: 2},
      { id :"ITEM0022" ,count: 1}
    ];

    let countId =  countIds(formattedAllIds);
    let expected = [ { id: 'ITEM0001', count: 1 },
      { id: 'ITEM0013', count: 2 },
      { id: 'ITEM0022',count: 1 }];

    expect(countId ).toEqual(expected)
  });

  it('should formattedIds #3', function() {
    let countIds = [
      {id:"ITEM0001",count: 1},
      {id :"ITEM0013" ,coutn: 2},
      { id :"ITEM0022" ,count: 1}
    ];
    let countedAllIds = buildAllItems(allItems,countedAllIds);
    let allItems =loadAllItems();
    let newAllItems =buildAllItems(allItems,countedAllIds);

    let expected = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count: 1

      },
        {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
          count:2
      },
      {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        coutn:1
      }
      ];

    expect(newAllItems).toEqual(expected)
  });

  it('should formattedIds #4', function() {
    let newAllItems = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count: 1

      },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count:2
      },
      {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        coutn:1
      }
    ];
   let promotedItems = promotedAllItems (cartItems);

    let expected = [
      {


      }
    ];

    expect(promotedItems).toEqual(expected)
  });


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
===================================`.trim()
    expect(summary).toEqual(expected)
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
===================================`.trim()
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
===================================`.trim()
    expect(summary).toEqual(expected)
  });

});

