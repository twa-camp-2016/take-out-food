describe('formatTags',function(){
  it('show barcodes',function(){
    let tags= ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let barcodes=[{id:'ITEM0001',count:1},
                  {id:'ITEM0013',count:2},
                  {id:'ITEM0022',count:1}
      ];
    expect(formatTags(tags)).toEqual(barcodes);
  });
});

describe('getOrders',function(){
  it('show orders',function(){
    let orders=[{id: 'ITEM0001', name: '黄焖鸡', price: 18.00,count:1},
                {id: 'ITEM0013', name: '肉夹馍', price: 6.00,count:2},
                {id: 'ITEM0022',name: '凉皮', price: 8.00,count:1}];
    let barcodes=[{id:'ITEM0001',count:1},
      {id:'ITEM0013',count:2},
      {id:'ITEM0022',count:1}
    ];
    expect(getOrders(barcodes,loadAllItems())).toEqual(orders);
  })
})

describe('getSubtotal',function(){
  it('show detailedOrders',function(){
    let orders=[{id: 'ITEM0001', name: '黄焖鸡', price: 18.00,count:1},
      {id: 'ITEM0013', name: '肉夹馍', price: 6.00,count:2},
      {id: 'ITEM0022',name: '凉皮', price: 8.00,count:1}];
    let detailedOrders=[{id: 'ITEM0001', name: '黄焖鸡', price: 18.00,count:1,subtotal:18},
      {id: 'ITEM0013', name: '肉夹馍', price: 6.00,count:2,subtotal:12},
      {id: 'ITEM0022',name: '凉皮', price: 8.00,count:1,subtotal:8}];
    expect(getSubtotal(orders)).toEqual(detailedOrders);
  })
});

describe('getTotal',function(){
  it('show total',function(){
    let detailedOrders=[{id: 'ITEM0001', name: '黄焖鸡', price: 18.00,count:1,subtotal:18},
      {id: 'ITEM0013', name: '肉夹馍', price: 6.00,count:2,subtotal:12},
      {id: 'ITEM0022',name: '凉皮', price: 8.00,count:1,subtotal:8}];
    expect(getTotal(detailedOrders)).toEqual(38);
  });
});

describe('findPromotionTypes',function(){
  it('show typeName',function(){
    let detailedOrders=[{id: 'ITEM0001', name: '黄焖鸡', price: 18.00,count:1,subtotal:18},
      {id: 'ITEM0013', name: '肉夹馍', price: 6.00,count:2,subtotal:12},
      {id: 'ITEM0022',name: '凉皮', price: 8.00,count:1,subtotal:8}];
      let promotions=loadPromotions();
      expect(findPromotionTypes(detailedOrders, promotions)).toEqual([{name:'黄焖鸡'},{name:'凉皮'}]);
  })
});

describe('onePromotion',function(){
  it('show promotionTotal',function(){
    let detailedOrders=[{id: 'ITEM0001', name: '黄焖鸡', price: 18.00,count:1,subtotal:18},
      {id: 'ITEM0013', name: '肉夹馍', price: 6.00,count:2,subtotal:12},
      {id: 'ITEM0022',name: '凉皮', price: 8.00,count:1,subtotal:8}];
    let promotions=loadPromotions();
    expect(onePromotion(detailedOrders,promotions)).toEqual([{id: 'ITEM0001', name: '黄焖鸡', price: 18.00,count:1,promotionSubtotal:9},
      {id: 'ITEM0013', name: '肉夹馍', price: 6.00,count:2,promotionSubtotal:12},
      {id: 'ITEM0022',name: '凉皮', price: 8.00,count:1,promotionSubtotal:4}]);
  });
});

describe('findPromotion',function(){
  it('show result',function(){
    let total=38;
    let promotionDetailedOrders=[{id: 'ITEM0001', name: '黄焖鸡', price: 18.00,count:1,promotionSubtotal:9},
      {id: 'ITEM0013', name: '肉夹馍', price: 6.00,count:2,promotionSubtotal:12},
      {id: 'ITEM0022',name: '凉皮', price: 8.00,count:1,promotionSubtotal:4}];
    let promotions=loadPromotions();
    expect(findPromotion(promotionDetailedOrders,promotions,total)).toEqual({
      type:'指定菜品半价',
      promotionTotal:25
    });
  });
});

describe('print',function(){
  it('show print',function(){
    let promotionType={
      type:'指定菜品半价',
      promotionTotal:25
    };
    let detailedOrders=[{id: 'ITEM0001', name: '黄焖鸡', price: 18.00,count:1,subtotal:18},
      {id: 'ITEM0013', name: '肉夹馍', price: 6.00,count:2,subtotal:12},
      {id: 'ITEM0022',name: '凉皮', price: 8.00,count:1,subtotal:8}];
    let total=38;
    let typeName=[{name:'黄焖鸡'},{name:'凉皮'}];
    let result=print(promotionType,detailedOrders,total,typeName).trim();
    expect(result).toEqual(`
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`.trim());
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
