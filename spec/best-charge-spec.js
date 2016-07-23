describe('Take out food', function () {

  it ('buildFormattedTags',function(){
    let tags=[
      "ITEM0001 x 1",
      "ITEM0013 x 2",
      "ITEM0022 x 1"
    ];
    let formattedTags = buildFormattedTags(tags);
    let expectItems = [
      {
        id: "ITEM0001",
        count: 1
      },
      {
        id: "ITEM0013",
        count: 2
      },
      {
        id: "ITEM0022",
        count: 1
      }
    ];
    expect(formattedTags).toEqual(expectItems);
  });

  it ('buildCartItems',function(){
    let inputItems=[
      {
      id: "ITEM0001",
      count: 1
      },
      {
        id: "ITEM0013",
        count: 2
      },
      {
        id: "ITEM0022",
        count: 1
      }];
    let allItems=loadAllItems();
    let cartItems=buildCartItems(inputItems,allItems);
    let expectItems=[
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
    expect(cartItems).toEqual(expectItems);
  });

  it('buildPromotionItems',function(){
    let inputs=[
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
      }
    ];
    let promotions=loadPromotions();
    let promotionItems=buildPromotionItems(inputs,promotions);
    let expectItems=[
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count: 1,
        type: '指定菜品半价',
        saved: 9,
        shouldPay:18,
        payPrice: 9
      },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count: 2,
        type:'',
        saved: 0,
        shouldPay:12,
        payPrice: 12
      },
      {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        count: 1,
        type: '指定菜品半价',
        saved: 4,
        shouldPay:8,
        payPrice: 4
      }
    ];
    expect(promotionItems).toEqual(expectItems);
  });

  it('calculateTotalPay',function(){
    let inputs=[
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count: 1,
        type: '指定菜品半价',
        saved: 9,
        shouldPay:18,
        payPrice: 9
      },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count: 2,
        type:'',
        saved: 0,
        shouldPay:12,
        payPrice: 12
      },
      {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        count: 1,
        type: '指定菜品半价',
        saved: 4,
        shouldPay:8,
        payPrice: 4
      }
    ];
    let totalPay=buildTotalPay(inputs);
    let expectItem={
      totalPayPrice:25,
      totalSaved:13,
      type:'指定菜品半价',
      shouldPay:38
      };
    expect(totalPay).toEqual(expectItem);
  });

  it('buildReceipt',function(){
    let totalPay={
      totalPayPrice:25,
      totalSaved:13,
      type:'指定菜品半价',
      shouldPay:38
    };
    let promotionItems=[
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count: 1,
        type: '指定菜品半价',
        saved: 9,
        shouldPay:18,
        payPrice: 9
      },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count: 2,
        type:'',
        saved: 0,
        shouldPay:12,
        payPrice: 12
      },
      {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        count: 1,
        type: '指定菜品半价',
        saved: 4,
        shouldPay:8,
        payPrice: 4
      }
    ];
    let receipt=buildReceipt(promotionItems,totalPay);
    let expectItem={
      receiptItems:[
        {
          name: '黄焖鸡',
          count:1,
          shouldPay:18,
          type: '指定菜品半价'
        },
        {
          name: '肉夹馍',
          count: 2,
          shouldPay:12,
          type: ''
        },
        {
          name: '凉皮',
          count: 1,
          shouldPay:8,
          type: '指定菜品半价'
        }
      ],
      type:'指定菜品半价',
      totalPayPrice:25,
      totalSaved:13,
    };
    expect(receipt).toEqual(expectItem);
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
