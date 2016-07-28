/*global describe,it,expect*/
'use strict';

describe("test",function(){
  it("getFormatIds",function(){
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let formatIds=getFormatIds(inputs);
    const expectText=[ { id: 'ITEM0001', count: 1 },
        { id: 'ITEM0013', count: 2 },
        { id: 'ITEM0022', count: 1 } ]
      ;
    expect(formatIds).toEqual(expectText);
  });
  it("buyedItems",function(){
    let formatIds=[ { id: 'ITEM0001', count: 1 },
        { id: 'ITEM0013', count: 2 },
        { id: 'ITEM0022', count: 1 } ]
      ;
    let allItems=loadAllItems();
    let buyedItems=getBuyedItems(formatIds,allItems);
    const expectText=[ { id: 'ITEM0001', count: 1, name: '黄焖鸡', price: 18 },
        { id: 'ITEM0013', count: 2, name: '肉夹馍', price: 6 },
        { id: 'ITEM0022', count: 1, name: '凉皮', price: 8 } ]
      ;
    expect(buyedItems).toEqual(expectText);
  });
  it("promotionItems",function(){
    let buyedItems=[ { id: 'ITEM0001', count: 1, name: '黄焖鸡', price: 18 },
        { id: 'ITEM0013', count: 2, name: '肉夹馍', price: 6 },
        { id: 'ITEM0022', count: 1, name: '凉皮', price: 8 } ]
      ;
    let promotions=loadPromotions();
    //debugger;
    let promotionItems=getPromotItems(buyedItems,promotions);
    const expectText=[ { id: 'ITEM0001',
      count: 1,
      name: '黄焖鸡',
      price: 18,
      type: '指定菜品半价',
      payPrice: 18,
      saved: 0 },
      { id: 'ITEM0013',
        count: 2,
        name: '肉夹馍',
        price: 6,
        type: '满30减6元',
        payPrice: 12,
        saved: 0 },
      { id: 'ITEM0022',
        count: 1,
        name: '凉皮',
        price: 8,
        type: '指定菜品半价',
        payPrice: 8,
        saved: 0 } ];
    expect(promotionItems).toEqual(expectText);
  });
  it("totalPrices",function(){
    let promotionItems=[ { id: 'ITEM0001',
      count: 1,
      name: '黄焖鸡',
      price: 18,
      type: '指定菜品半价',
      payPrice: 18,
      saved: 0 },
      { id: 'ITEM0013',
        count: 2,
        name: '肉夹馍',
        price: 6,
        type: '满30减6元',
        payPrice: 12,
        saved: 0 },
      { id: 'ITEM0022',
        count: 1,
        name: '凉皮',
        price: 8,
        type: '指定菜品半价',
        payPrice: 8,
        saved: 0 } ];
    let totalPay = getTotalPrices(promotionItems);
    const expectText={ totalPrices: 25, totalSaved: 13 };
    expect(totalPay).toEqual(expectText);
  });
  it("getReceipt",function(){
    let promotionItems=[ { id: 'ITEM0001',
      count: 1,
      name: '黄焖鸡',
      price: 18,
      type: '指定菜品半价',
      payPrice: 18,
      saved:9 },
      { id: 'ITEM0013',
        count: 2,
        name: '肉夹馍',
        price: 6,
        type: '满30减6元',
        payPrice: 12,
        saved: 0 },
      { id: 'ITEM0022',
        count: 1,
        name: '凉皮',
        price: 8,
        type: '指定菜品半价',
        payPrice: 8,
        saved: 4 } ];
    let totalPay ={ totalPrices: 25, totalSaved: 13 };
    let receipt=getReceipt(promotionItems,totalPay);
    const expectText={ promotionItems:
      [ { id: 'ITEM0001',
        count: 1,
        name: '黄焖鸡',
        price: 18,
        type: '指定菜品半价',
        payPrice: 18,
        saved: 9 },
        { id: 'ITEM0013',
          count: 2,
          name: '肉夹馍',
          price: 6,
          type: '满30减6元',
          payPrice: 12,
          saved: 0 },
        { id: 'ITEM0022',
          count: 1,
          name: '凉皮',
          price: 8,
          type: '指定菜品半价',
          payPrice: 8,
          saved: 4} ],
      totalPrices: 25,
      totalSaved: 13 };
    expect(receipt).toEqual(expectText);
  });
  it("getReceiptString",function(){
    let receipt={ promotionItems:
      [ { id: 'ITEM0001',
        count: 1,
        name: '黄焖鸡',
        price: 18,
        type: '指定菜品半价',
        payPrice: 18,
        saved: 9 },
        { id: 'ITEM0013',
          count: 2,
          name: '肉夹馍',
          price: 6,
          type: '满30减6元',
          payPrice: 12,
          saved: 0 },
        { id: 'ITEM0022',
          count: 1,
          name: '凉皮',
          price: 8,
          type: '指定菜品半价',
          payPrice: 8,
          saved: 4 } ],
      totalPrices: 25,
      totalSaved: 13 };
    let receiptString=getReceiptString(receipt);
    const expectText=`
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
    expect(receiptString).toEqual(expectText);
  });
});

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
 ===================================`.trim();
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when no promotion can be used', function() {
    let inputs = ["ITEM0013 x 4"];
    debugger;
    let summary = bestCharge(inputs).trim();
    let expected = `
 ============= 订餐明细 =============
 肉夹馍 x 4 = 24元
 -----------------------------------
 总计：24元
 ===================================`.trim();
    expect(summary).toEqual(expected);
  });
});
