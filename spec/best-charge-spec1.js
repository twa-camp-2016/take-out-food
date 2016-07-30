/*global describe,it,expect*/
'use strict';
describe('Take out food', function () {
  it('should get formattedTags',()=>{
    let input = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let output = formatTags(input);
    let expected = [{id:"ITEM0001",count:1},{id:"ITEM0013",count:2},{id:"ITEM0022",count:1}];
    expect(output).toEqual(expected);
  });
  it('should get cartItems',()=>{
    let input = [{id:"ITEM0001",count:1},{id:"ITEM0013",count:2},{id:"ITEM0022",count:1}];
    let output = getCartItems(input,loadAllItems());
    let expected = [{id:"ITEM0001",name:"黄焖鸡",price:18.00,count:1},{id:"ITEM0013",name:"肉夹馍",price:6.00,count:2},{id:"ITEM0022",name:"凉皮",price:8.00,count:1}];
    expect(output).toEqual(expected);
  });
  it('should get promotionItems',()=>{
    let input = [{id:"ITEM0001",name:"黄焖鸡",price:18.00,count:1},{id:"ITEM0013",name:"肉夹馍",price:6.00,count:2},{id:"ITEM0022",name:"凉皮",price:8.00,count:1}];
    let output = getPromotionItems(input,loadPromotions());
    let expected = [{id:"ITEM0001",name:"黄焖鸡",price:18.00,count:1,subprice:9.00},
      {id:"ITEM0013",name:"肉夹馍",price:6.00,count:2,subprice:0.00},
      {id:"ITEM0022",name:"凉皮",price:8.00,count:1,subprice:4.00}];
    expect(output).toEqual(expected);
  });
  it('should get priceItems',()=>{
    let input = [{id:"ITEM0001",name:"黄焖鸡",price:18.00,count:1,subprice:9.00},
      {id:"ITEM0013",name:"肉夹馍",price:6.00,count:2,subprice:0.00},
      {id:"ITEM0022",name:"凉皮",price:8.00,count:1,subprice:4.00}];
    let output = getPriceItems(input);
    let expected = [{id:"ITEM0001",name:"黄焖鸡",price:18.00,count:1,subprice:9.00,payprice:9.00,saved:9.00},
      {id:"ITEM0013",name:"肉夹馍",price:6.00,count:2,subprice:0.00,payprice:12.00,saved:0.00},
      {id:"ITEM0022",name:"凉皮",price:8.00,count:1,subprice:4.00,payprice:4.00,saved:4.00}];
    expect(output).toEqual(expected);
  });
  it('should get getTotalPrice',()=>{
    let input = [{id:"ITEM0001",name:"黄焖鸡",price:18.00,count:1,subprice:9.00,payprice:9.00,saved:9.00},
      {id:"ITEM0013",name:"肉夹馍",price:6.00,count:2,subprice:0.00,payprice:12.00,saved:0.00},
      {id:"ITEM0022",name:"凉皮",price:8.00,count:1,subprice:4.00,payprice:4.00,saved:4.00}];
    let output = getTotalPrice(input);
    let expected = {totalpayprice:25.00, totalsaved:13.00};
    expect(output).toEqual(expected);
  });
  it('should get receipt',()=>{
    let input1 = [{id:"ITEM0001",name:"黄焖鸡",price:18.00,count:1,subprice:9.00,payprice:9.00,saved:9.00},
      {id:"ITEM0013",name:"肉夹馍",price:6.00,count:2,subprice:0.00,payprice:12.00,saved:0.00},
      {id:"ITEM0022",name:"凉皮",price:8.00,count:1,subprice:4.00,payprice:4.00,saved:4.00}];
    let input2 = { totalpayprice:25.00, totalsaved:13.00};
    let output = getReceipt(input1,input2);
    let expected = {priceItems:[{id:"ITEM0001",name:"黄焖鸡",price:18.00,count:1,subprice:9.00,payprice:9.00,saved:9.00},
      {id:"ITEM0013",name:"肉夹馍",price:6.00,count:2,subprice:0.00,payprice:12.00,saved:0.00},
      {id:"ITEM0022",name:"凉皮",price:8.00,count:1,subprice:4.00,payprice:4.00,saved:4.00}],
      totalpayprice:25.00,
      totalsaved:13.00
    };
    expect(output).toEqual(expected);
  });
it('should get receiptString1',()=>{
  let input = {priceItems:[{id:"ITEM0001",name:"黄焖鸡",price:18.00,count:1,subprice:9.00,payprice:9.00,saved:9.00},
    {id:"ITEM0013",name:"肉夹馍",price:6.00,count:2,subprice:0.00,payprice:12.00,saved:0.00},
    {id:"ITEM0022",name:"凉皮",price:8.00,count:1,subprice:4.00,payprice:4.00,saved:4.00}],
    totalpayprice:25.00,
    totalsaved:13.00
  };
  let output = getReceiptString(input);
  let expected = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡,凉皮)，省13元
-----------------------------------
总计：25元
===================================`.trim();
  expect(output).toEqual(expected);
});
  it('should get receiptSring2',()=>{
    let input ={priceItems:[
      {id:"ITEM0013",name:"肉夹馍",price:6.00,count:4,subprice:0.00,payprice:24.00,saved:0.00},
      {id:"ITEM0022",name:"凉皮",price:8.00,count:1,subprice:4.00,payprice:4.00,saved:4.00}],
      totalpayprice:26.00,
      totalsaved:6.00
    };
    let output = getReceiptString(input);
    let expected =`
============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元，省6元
----------------------------
总计：26元
===================================`.trim()
    expect(output).toEqual(expected);
  })
  it('should get receiptString3',()=>{
    let input ={priceItems:[
      {id:"ITEM0013",name:"肉夹馍",price:6.00,count:4,subprice:0.00,payprice:24.00,saved:0.00}
    ],
      totalpayprice:22.00,
      totalsaved:0.00
    };
    let output = getReceiptString(input);
    let expected =`============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------

总计：22元
===================================`.trim();
    expect(output).toEqual(expected);
  })


//  it('should generate best charge when best is 指定菜品半价', function() {
//    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
//    let summary = bestCharge(inputs).trim();
//  let expected = `
//============= 订餐明细 =============
//黄焖鸡 x 1 = 18元
//肉夹馍 x 2 = 12元
//凉皮 x 1 = 8元
//-----------------------------------
//使用优惠:
//指定菜品半价(黄焖鸡,凉皮)，省13元
//-----------------------------------
//总计：25元
//===================================`.trim();
//    expect(summary).toEqual(expected)
//  });
//
//  it('should generate best charge when best is 满30减6元', function() {
//    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
//    let summary = bestCharge(inputs).trim();
//  let expected =`
//============= 订餐明细 =============
//肉夹馍 x 4 = 24元
//凉皮 x 1 = 8元
//-----------------------------------
//使用优惠:
//满30减6元，省6元
//----------------------------
//总计：26元
//===================================`.trim()
//    expect(summary).toEqual(expected)
//  });

//  it('should generate best charge when no promotion can be used', function() {
//    let inputs = ["ITEM0013 x 4"];
//    let summary = bestCharge(inputs).trim();
//  let expected =`============= 订餐明细 =============
//肉夹馍 x 4 = 24元
//-----------------------------------
//
//总计：22元
//===================================`.trim();
//    expect(summary).toEqual(expected)
//  });

});
