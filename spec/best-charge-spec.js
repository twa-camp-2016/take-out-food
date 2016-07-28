'use strict';
describe('Take out food', function () {

  it('splitItems is running', ()=> {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let expectResult = [
      {
        id: 'ITEM0001',
        count: 1
      },
      {
        id: 'ITEM0013',
        count: 2
      },
      {
        id: 'ITEM0022',
        count: 1
      }];
    let testResult = splitItems(inputs);
    expect(testResult).toEqual(expectResult);
  });

  it('splitItems is running', ()=> {
    let inputs = [
      {
        id: 'ITEM0001',
        count: 1
      },
      {
        id: 'ITEM0013',
        count: 2
      },
      {
        id: 'ITEM0022',
        count: 1
      }];
    let expectResult = [
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
        count: 2
      },
      {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        count: 1
      }];
    let testResult = buildAllinfoItems(inputs);
    expect(testResult).toEqual(expectResult);
  });


  it('buildReceiptPrice is running', ()=> {
    let inputs = [
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
        count: 2
      },
      {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        count: 1
      }];
    let expectResult = [
      {
        item: {
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00,
          count: 1
        },
        originalPrice: 18.00,
        discountPrice: 9,
        promotionType: '指定菜品半价'
      },
      {
        item: {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00,
          count: 2
        },
        originalPrice: 12.00,
        discountPrice: 12,
        promotionType: '满30减6元'
      },
      {
        item: {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00,
          count: 1
        },
        originalPrice: 8.00,
        discountPrice: 4,
        promotionType: '指定菜品半价'
      }];
    let testResult = buildReceiptPrice(inputs);
    expect(testResult).toEqual(expectResult);
  });

  it('buildTotalPrice is running', ()=> {
    let inputs = [
      {
        item: {
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00,
          count: 1
        },
        originalPrice: 18.00,
        discountPrice: 9,
        promotionType: '指定菜品半价'
      },
      {
        item: {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00,
          count: 2
        },
        originalPrice: 12.00,
        discountPrice: 12,
        promotionType: '满30减6元'
      },
      {
        items: {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00,
          count: 1
        },
        originalPrice: 8.00,
        discountPrice: 4,
        promotionType: '指定菜品半价'
      }];
    let expectResult = {
      receipt: [{
        item: {
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00,
          count: 1
        },
        originalPrice: 18.00,
        discountPrice: 9,
        promotionType: '指定菜品半价'
      },
        {
          item: {
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00,
            count: 2
          },
          originalPrice: 12.00,
          discountPrice: 12,
          promotionType: '满30减6元'
        },
        {
          items: {
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00,
            count: 1
          },
          originalPrice: 8.00,
          discountPrice: 4,
          promotionType: '指定菜品半价'
        }],
      fullCut: 25,
      totalPrice: 38
    };
    let testResult = buildTotalPrice(inputs);
    expect(testResult).toEqual(expectResult);
  });


  it('should generate best charge when best is 指定菜品半价', function () {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:指定菜品半价
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`.trim();
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
使用优惠:满30减6元
省6元
-----------------------------------
总计：26元
===================================`.trim();
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
===================================`.trim();
    expect(summary).toEqual(expected)
  });

});
