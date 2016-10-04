
// let{
//   formatTags,
//   buildCartItems,
//   buildPromotedItems,
//   calculateTotalPrices,
//   buildReceipt,
//   bestCharge
// }=require('../src/best-charge');

describe('Take out food', function () {

  it('should formatTags', function() {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let expected =[ { id: 'ITEM0001', count: 1 },
      { id: 'ITEM0013', count: 2 },
      { id: 'ITEM0022', count: 1 } ];
    expect(formatTags(inputs)).toEqual(expected)
  });

  it('should build Cart Items', function() {
    let inputs = [ { id: 'ITEM0001', count: 1 },
      { id: 'ITEM0013', count: 2 },
      { id: 'ITEM0022', count: 1 } ];

    allItems=[{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00
    }, {
      id: 'ITEM0030',
      name: '冰锋',
      price: 2.00
    }];
    let expected =[ { id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1 },
      { id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2 },
      { id: 'ITEM0022', name: '凉皮', price: 8, count: 1 } ];
    expect(buildCartItems(inputs,allItems)).toEqual(expected)
  });


  it('it should build  Promoted  Items', function() {
    let inputs = [{id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1},
      {id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2},
      {id: 'ITEM0022', name: '凉皮', price: 8, count: 1}];
    let promotions = [{
      type: '满30减6元'
    }, {
      type: '指定菜品半价',
      items: ['ITEM0001', 'ITEM0022']
    }];

    let expected =[ { id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18,
      count: 1,
      halfSaved: 9,
      nolmalPrice: 18 },
      { id: 'ITEM0013',
        name: '肉夹馍',
        price: 6,
        count: 2,
        halfSaved: 0,
        nolmalPrice: 12 },
      { id: 'ITEM0022',
        name: '凉皮',
        price: 8,
        count: 1,
        halfSaved: 4,
        nolmalPrice: 8 } ];
    expect(buildPromotedItems(inputs,promotions)).toEqual(expected)
  });




  it('should calculate 没有优惠过的总价和半价商品一共优惠了多少钱', function() {
    let inputs =[ { id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18,
      count: 1,
      halfSaved: 9,
      nolmalPrice: 18 },
      { id: 'ITEM0013',
        name: '肉夹馍',
        price: 6,
        count: 2,
        halfSaved: 0,
        nolmalPrice: 12 },
      { id: 'ITEM0022',
        name: '凉皮',
        price: 8,
        count: 1,
        halfSaved: 4,
        nolmalPrice: 8 } ] ;
    expected={ totalHalfSaved: 13, totalnoPromotedPrice: 38 };
    expect(calculateTotalPrices(inputs)).toEqual(expected)
  });

  it('should build Receipt', function() {
    let inputs =[ { id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18,
      count: 1,
      halfSaved: 9,
      nolmalPrice: 18 },
      { id: 'ITEM0013',
        name: '肉夹馍',
        price: 6,
        count: 2,
        halfSaved: 0,
        nolmalPrice: 12 },
      { id: 'ITEM0022',
        name: '凉皮',
        price: 8,
        count: 1,
        halfSaved: 4,
        nolmalPrice: 8 } ] ;
    calculatedTotalPrices={ totalHalfSaved: 13, totalnoPromotedPrice: 38 };
    expected={ promotedItems:
      [ { name: '黄焖鸡', price: 18, count: 1, nolmalPrice: 18, halfSaved: 9 },
        { name: '肉夹馍', price: 6, count: 2, nolmalPrice: 12, halfSaved: 0 },
        { name: '凉皮', price: 8, count: 1, nolmalPrice: 8, halfSaved: 4 } ],
      savedItems: [ { name: '黄焖鸡' }, { name: '凉皮' } ],
      fullDiscountPayPrice: 32,
      halfDiscountPayPrice: 25,
      totalHalfSaved: 13,
      totalDiscountSaved: 6 };
   let result=buildReceipt(inputs,calculatedTotalPrices);
    expect(result).toEqual(expected)
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
