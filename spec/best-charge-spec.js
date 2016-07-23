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

describe('#1', function () {
  it('should formated Tags',function () {
      let tags = [
        "ITEM0001 x 1",
        "ITEM0013 x 2",
        "ITEM0022 x 1"
      ];

    let formatedItems = getFormatedTags(tags);
    let expected = [{
      id:'ITEM0001',
      count:1
    },{
      id:'ITEM0013',
      count:2
    },{
      id:'ITEM0022',
      count:1
    }];
    expect(formatedItems).toEqual(expected)
  });

});

describe('#2', function () {
  it('should get cartItems',function () {
    let formatedTags = [{
      id:'ITEM0001',
      count:1
    },{
      id:'ITEM0013',
      count:2
    },{
      id:'ITEM0022',
      count:1
    }];

    let allItems = loadAllItems();

    let cartItems = bulidCartItems(formatedTags,allItems);
    let expected = [{
      id:'ITEM0001',
      name:'黄焖鸡',
      price:18.00,
      count:1
    },{
      id:'ITEM0013',
      name:'肉夹馍',
      price: 6.00,
      count:2
    },{
      id:'ITEM0022',
      name: '凉皮',
      price: 8.00,
      count:1
    }];
    expect(cartItems).toEqual(expected);
  });
});

describe('#3', function () {
  it('should get promotedItems',function () {
    let cartItems = [{
      id:'ITEM0001',
      name:'黄焖鸡',
      price:18.00,
      count:1
    },{
      id:'ITEM0013',
      name:'肉夹馍',
      price: 6.00,
      count:2
    },{
      id:'ITEM0022',
      name: '凉皮',
      price: 8.00,
      count:1
    }];

    let promotions = loadPromotions();

    let promotedItems = getPromotedItems(cartItems,promotions);
    let expected = [{
      id:'ITEM0001',
      name:'黄焖鸡',
      price:18.00,
      count:1,
      originalPayPrice:18.00,
      presentPayPrice:9.00,
      saved:9.00,
    },{
      id:'ITEM0013',
      name:'肉夹馍',
      price: 6.00,
      count:2,
      originalPayPrice:12.00,
      presentPayPrice:12.00,
      saved:0.00,
    },{
      id:'ITEM0022',
      name: '凉皮',
      price: 8.00,
      count:1,
      originalPayPrice:8.00,
      presentPayPrice:4.00,
      saved:4.00,
    }];
    expect(promotedItems).toEqual(expected);
  });
});


describe('#4', function () {
  it('calculate totalPrices',function () {
    let promotedItems = [{
      id:'ITEM0001',
      name:'黄焖鸡',
      price:18.00,
      count:1,
      originalPayPrice:18.00,
      PresentPayPrice:9.00,
      saved:9.00,
    },{
      id:'ITEM0013',
      name:'肉夹馍',
      price: 6.00,
      count:2,
      originalPayPrice:12.00,
      PresentPayPrice:12.00,
      saved:0.00,
    },{
      id:'ITEM0022',
      name: '凉皮',
      price: 8.00,
      count:1,
      originalPayPrice:8.00,
      PresentPayPrice:4.00,
      saved:4.00
    }];

    let totalPrices =calculateTotalPrices(promotedItems);
    let expected = {
      totalOriginPayPrice:38.00,
      totalPresentPayPrice:25.00,
      totalSaved:13.00
    };
    expect(totalPrices).toEqual(expected);
  });
});

describe('#5', function () {
  it('build receipt string',function () {
    let promotedItems = [{
      id:'ITEM0001',
      name:'黄焖鸡',
      price:18.00,
      count:1,
      originalPayPrice:18.00,
      PresentPayPrice:9.00,
      saved:9.00
    },{
      id:'ITEM0013',
      name:'肉夹馍',
      price: 6.00,
      count:2,
      originalPayPrice:12.00,
      PresentPayPrice:12.00,
      saved:0.00
    },{
      id:'ITEM0022',
      name: '凉皮',
      price: 8.00,
      count:1,
      originalPayPrice:8.00,
      PresentPayPrice:4.00,
      saved:4.00
    }];
    let totalPrices = {
      totalOriginPayPrice:38.00,
      totalPresentPayPrice:25.00,
      totalSaved:13.00
    };

    let receipt =buildReceiptString(promotedItems,totalPrices);
    let expected = {
      receiptItems:[{
        name:'黄焖鸡',
        count:1,
        price:18.00,
        originalPayPrice:18.00,
        saved:9.00
      },{
        name:'肉夹馍',
        count:2,
        price: 6.00,
        originalPayPrice:12.00,
        saved:0.00
      },{
        name: '凉皮',
        count:1,
        price: 8.00,
        originalPayPrice:8.00,
        saved:4.00
      }],
      totalPayPrice:25.00,
      totalSaved:13.00
    };
    expect(receipt).toEqual(expected);
  });
});

describe('#6', function () {
  it('build finally receipt string',function () {
    let receipt = {
      receiptItems:[{
        name:'黄焖鸡',
        count:1,
        price:18.00,
        originalPayPrice:18.00,
        saved:9.00
      },{
        name:'肉夹馍',
        count:2,
        price: 6.00,
        originalPayPrice:12.00,
        saved:0.00
      },{
        name: '凉皮',
        count:1,
        price: 8.00,
        originalPayPrice:8.00,
        saved:4.00
      }],
      totalPayPrice:25.00,
      totalSaved:13.00
    };

    let receiptString = printReceipt(receipt);

    const expected = `============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`;

    expect(receiptString).toEqual(expected);
  });
});


