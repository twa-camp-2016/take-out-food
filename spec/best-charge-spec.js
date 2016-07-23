describe('Take out food', function () {
  const allItems = loadAllItems();
  const promotions = loadPromotions();

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

  it('指定菜品半价,should print correct cartItems', function() {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];

    const cartItems = buildCartItems(inputs,allItems);

    let expected = [{
      item:{
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00
      },
      count:1
     },
      {
      item:{
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00
      },
      count :2
      },
      {
        item: {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00
        },
        count: 1
      }];
    expect(cartItems).toEqual(expected)
  });
  it('指定菜品半价,should print correct promotionItems', function() {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];

    const cartItems = buildCartItems(inputs,allItems);
    const promotionItems = buildPromotionItems(cartItems,promotions);
    let expected = {
      cartItems: [{
        item: {
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00
        },
        count: 1
      },
        {
          item: {
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count: 2
        },
        {
          item: {
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          },
          count: 1
        }],
      savedPromotions:[{
        promotion:
        {
          type: '满30减6元'
        },
        saved:6,
        total:32
      },
        {
         promotion:{
           type: '指定菜品半价',
           items: ['ITEM0001', 'ITEM0022']
         },
          saved: 13,
          total:25
        }]
    };
    expect(promotionItems).toEqual(expected)
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

  it('满30减6元,should print correct cartItems', function() {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    const cartItems = buildCartItems(inputs,allItems);

    let expected = [
      {
        item:{
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00
        },
        count :4
      },
      {
        item: {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00
        },
        count: 1
      }];
    expect(cartItems).toEqual(expected)
  });

 it('should generate best charge when no promotion can be used', function() {
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

  it('when no promotion can be used,should print correct cartItems', function() {
    let inputs = ["ITEM0013 x 4"];
    const cartItems = buildCartItems(inputs,allItems);

    let expected = [
      {
        item:{
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00
        },
        count :4
      }
     ];
    expect(cartItems).toEqual(expected)
  });


});
