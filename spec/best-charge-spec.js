
describe('Take out food', function () {
  it("0.test compare",()=>{
    let input1 = [{id:1,count:1},{id:2,count:2}];
    let input2 = 1;
    let output = compare(input1,input2);
    let expected ={id:1,count:1};
    expect(output).toEqual(expected);
  })
  it("1.should format tags",()=>{
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let outputs = formatTags(inputs);
    let expected = [{id:"ITEM0001",count:1},{id:"ITEM0013",count:2},{id:"ITEM0022",count:1}];
    expect(outputs).toEqual(expected);
  })
  it("2.should get cartItems",()=>{
    let inputs =[{id:"ITEM0001",count:1},{id:"ITEM0013",count:2},{id:"ITEM0022",count:1}];
    let allItems =loadAllItems();
    let outputs = getCartItems(inputs,allItems);
    let expected =  [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count:1
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      count:2
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00,
      count:1
    }];
    expect(outputs).toEqual(expected);
  })
  //it("3.should get promotionItems",()=>{
  //  let input = [{
  //    id: 'ITEM0001',
  //    name: '黄焖鸡',
  //    price: 18.00,
  //    count:1
  //  }, {
  //    id: 'ITEM0013',
  //    name: '肉夹馍',
  //    price: 6.00,
  //    count:2
  //  }, {
  //    id: 'ITEM0022',
  //    name: '凉皮',
  //    price: 8.00,
  //    count:1
  //  }];
  //  let promotions = loadPromotions();
  //  let output = getPromotionItems(input,promotions);
  //  expected =  [{
  //    id: 'ITEM0001',
  //    name: '黄焖鸡',
  //    price: 18.00,
  //    count:1,
  //    subprice:9.00
  //  }, {
  //    id: 'ITEM0013',
  //    name: '肉夹馍',
  //    price: 6.00,
  //    count:2,
  //    subprice:0.00
  //  }, {
  //    id: 'ITEM0022',
  //    name: '凉皮',
  //    price: 8.00,
  //    count:1,
  //    subprice:4.00
  //  }];
  //  expect(output).toEqual(expected);
  //})
  it("4.should get priceItems",()=>{
    let promotionItems = [{
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00,
          count:1,
          subprice:9.00
        }, {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00,
          count:2,
          subprice:0.00
        }, {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00,
          count:1,
          subprice:4.00
        }];
    let output = getPriceItems(promotionItems);
    let expected = [{
      name: '黄焖鸡',
      price: 18.00,
      count:1,
      subprice:9.00,
      payprice:9.00,
      saved:9.00
    }, {
      name: '肉夹馍',
      price: 6.00,
      count:2,
      subprice:0.00,
      payprice:12.00,
      saved:0.00
    }, {
      name: '凉皮',
      price: 8.00,
      count:1,
      subprice:4.00,
      payprice:4.00,
      saved:4.00
    }];
    expect(output).toEqual(expected);
  })
  it("5.should get totalprice",()=>{
    let input = [{
      name: '黄焖鸡',
      price: 18.00,
      count:1,
      subprice:9.00,
      payprice:9.00,
      saved:9.00
    }, {
      name: '肉夹馍',
      price: 6.00,
      count:2,
      subprice:0.00,
      payprice:12.00,
      saved:0.00
    }, {
      name: '凉皮',
      price: 8.00,
      count:1,
      subprice:4.00,
      payprice:4.00,
      saved:4.00
    }];
    let output = getTotalPrice(input);
    let expected = {
      totalpayprice:25.00,
      totalsaved:13.00
    }
    expect(output).toEqual(expected);
  })
  it("6.should get receipt",()=>{
    let totalprice = {
      totalpayprice:25.00,
      totalsaved:13.00
    };
    let priceItems = [{
      name: '黄焖鸡',
      price: 18.00,
      count:1,
      subprice:9.00,
      payprice:9.00,
      saved:9.00
    }, {
      name: '肉夹馍',
      price: 6.00,
      count:2,
      subprice:0.00,
      payprice:12.00,
      saved:0.00
    }, {
      name: '凉皮',
      price: 8.00,
      count:1,
      subprice:4.00,
      payprice:4.00,
      saved:4.00
    }];
    let output = getReceipt(priceItems,totalprice);
    let expected = {
      receiptItems:[{
        name: '黄焖鸡',
        price: 18.00,
        count:1,
        subprice:9.00,
        payprice:9.00,
        saved:9.00
      },{
        name: '肉夹馍',
        price: 6.00,
        count:2,
        subprice:0.00,
        payprice:12.00,
        saved:0.00
      },{
        name: '凉皮',
        price: 8.00,
        count:1,
        subprice:4.00,
        payprice:4.00,
        saved:4.00
      }],
      totalpayprice:25.00, totalsaved:13.00
    };
  })
it("7.should get receiptString",()=>{
  let input = {
    receiptItems:[{
      name: '黄焖鸡',
      price: 18.00,
      count:1,
      subprice:9.00,
      payprice:9.00,
      saved:9.00
    },{
      name: '肉夹馍',
      price: 6.00,
      count:2,
      subprice:0.00,
      payprice:12.00,
      saved:0.00
    },{
      name: '凉皮',
      price: 8.00,
      count:1,
      subprice:4.00,
      payprice:4.00,
      saved:4.00
    }],
    totalpayprice:25.00, totalsaved:13.00
  };
  let output = getReceiptString(input);
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
  expect(output).toEqual(expected);
})
//  it('should generate best charge when best is 指定菜品半价', function() {
//    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
//    let summary = bestCharge(inputs).trim();
//    let expected = `
//============= 订餐明细 =============
//黄焖鸡 x 1 = 18元
//肉夹馍 x 2 = 12元
//凉皮 x 1 = 8元
//-----------------------------------
//使用优惠:
//指定菜品半价(黄焖鸡，凉皮)，省13元
//-----------------------------------
//总计：25元
//===================================`.trim()
//    expect(summary).toEqual(expected)
//  });

//  it('should generate best charge when best is 满30减6元', function() {
//    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
//    let summary = bestCharge(inputs).trim();
//    let expected = `
//============= 订餐明细 =============
//肉夹馍 x 4 = 24元
//凉皮 x 1 = 8元
//-----------------------------------
//使用优惠:
//满30减6元，省6元
//-----------------------------------
//总计：26元
//===================================`.trim()
//    expect(summary).toEqual(expected)
//  });
//
//  it('should generate best charge when no promotion can be used', function() {
//    let inputs = ["ITEM0013 x 4"];
//    let summary = bestCharge(inputs).trim();
//    let expected = `
//============= 订餐明细 =============
//肉夹馍 x 4 = 24元
//-----------------------------------
//总计：24元
//===================================`.trim()
//    expect(summary).toEqual(expected)
//  });

});
