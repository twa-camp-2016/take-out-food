

describe('Take out food', function () {

it('should print food count',()=>{
  const args=["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
  let foodCounts=getFoodCount(args);
  const printCount=[
    { id: 'ITEM0001', count: 1 },
    { id: 'ITEM0013', count: 2 },
    { id: 'ITEM0022', count: 1 } ];
  expect(foodCounts).toEqual(printCount);
  });


  it('should print all food items',()=>{
    const tag=[ { id: 'ITEM0001', count: 1 },
      { id: 'ITEM0013', count: 2 },
      { id: 'ITEM0022', count: 1 } ];
    const tav=[{
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

    let builtAllitems=bulitFoodItems(tag,tav);
    const printAllItems=[ { id: 'ITEM0001', name: '黄焖鸡', count: 1, price: 18 },
      { id: 'ITEM0013', name: '肉夹馍', count: 2, price: 6 },
      { id: 'ITEM0022', name: '凉皮', count: 1, price: 8 } ];
    expect(builtAllitems).toEqual(printAllItems);
  });




  it('should print allItems massage',()=>{
    const tag=[ { id: 'ITEM0001', name: '黄焖鸡', count: 1, price: 18 },
      { id: 'ITEM0013', name: '肉夹馍', count: 2, price: 6 },
      { id: 'ITEM0022', name: '凉皮', count: 1, price: 8 } ];
    const tags=[{
      type: '满30减6元'
    }, {
      type: '指定菜品半价',
      items: ['ITEM0001', 'ITEM0022']
    }];
    let builtPromotionItems=promotionPrice(tag,tags);
    const printPromottedItems={ items:
      [ { id: 'ITEM0001', name: '黄焖鸡', count: 1, price: 18, perPrices: 18 },
        { id: 'ITEM0013', name: '肉夹馍', count: 2, price: 6, perPrices: 12 },
        { id: 'ITEM0022', name: '凉皮', count: 1, price: 8, perPrices: 8 } ],
      total: 38,
      saveMan: 6,
      afterTotal: 32,
      saveHalfPrice: 13,
      myTotalPrice: 25 ,
      halfName:[ '黄焖鸡', '凉皮' ]
    };
      expect(builtPromotionItems).toEqual(printPromottedItems);

  });

it('should print allItems massage',()=>{
  const inputs=[
    { id: 'ITEM0013', name: '肉夹馍', count: 4, price: 6 },
    { id: 'ITEM0022', name: '凉皮', count: 1, price: 8 } ];
  const tags=[{
    type: '满30减6元'
  }, {
    type: '指定菜品半价',
    items: ['ITEM0001', 'ITEM0022']
  }];
  let builtPromotionItems=promotionPrice(inputs,tags);
  const printPromottedItems={ items:
    [{ id: 'ITEM0013', name: '肉夹馍', count: 4, price: 6, perPrices: 24 },
      { id: 'ITEM0022', name: '凉皮', count: 1, price: 8, perPrices: 8 } ],
    total: 32,
    saveMan: 6,
    afterTotal: 26,
    saveHalfPrice: 4,
    myTotalPrice: 28 ,
    halfName:['凉皮'],
  };
  expect(builtPromotionItems).toEqual(printPromottedItems);
});



  it('should print allItems massage',()=>{
    const inputs=[
      { id: 'ITEM0013', name: '肉夹馍', count: 4, price: 6 },
     ];
    const tags=[{
      type: '满30减6元',
    }, {
      type: '指定菜品半价',
      items: ['ITEM0001', 'ITEM0022']
    }];
    let builtPromotionItems=promotionPrice(inputs,tags);
    const printPromottedItems={ items:
      [{ id: 'ITEM0013', name: '肉夹馍', count: 4, price: 6, perPrices: 24 },
        ],
      total: 24,
      saveMan: 0,
      afterTotal: 24,
      saveHalfPrice: 0,
      myTotalPrice: 24 ,
      halfName:[]
    };
    expect(builtPromotionItems).toEqual(printPromottedItems);
  });


  it('should generate best charge when best is 指定菜品半价', ()=> {
    const inputs = { items:
      [{ id: 'ITEM0001', name: '黄焖鸡', count: 1, price: 18, perPrices: 18 },
        { id: 'ITEM0013', name: '肉夹馍', count: 2, price: 6, perPrices: 12 },
        { id: 'ITEM0022', name: '凉皮', count: 1, price: 8, perPrices: 8 } ,
        ],
      total: 38,
      saveMan: 6,
      afterTotal: 32,
      saveHalfPrice: 13,
      myTotalPrice: 25,
      halfName:[ '黄焖鸡', '凉皮' ]
    };
    let summary=builtPrintItems(inputs);
    const expected = `
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
    let inputs = { items:
      [{ id: 'ITEM0013', name: '肉夹馍', count: 4, price: 6, perPrices: 24 },
        { id: 'ITEM0022', name: '凉皮', count: 1, price: 8, perPrices: 8 } ],
      total: 32,
      saveMan: 6,
      afterTotal: 26,
      saveHalfPrice: 4,
      myTotalPrice: 28,
      halfName:['凉皮'],
    };
    let summary = builtPrintItems(inputs);
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
    let inputs = { items:
      [{ id: 'ITEM0013', name: '肉夹馍', count: 4, price: 6, perPrices: 24 },
      ],
      total: 24,
      saveMan: 0,
      afterTotal: 24,
      saveHalfPrice: 0,
      myTotalPrice: 24,
      halfName:[],
    };
    let summary = builtPrintItems(inputs);
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim();
    expect(summary).toEqual(expected)
  });




});
