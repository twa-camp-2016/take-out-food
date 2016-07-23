describe('Take out food', function () {

  it('should format tags', function() {
    let tags = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let formattedTags=getFormattedTags(tags);
    let expected =[{
      id:"ITEM0001",
      count:1},
      {
        id:"ITEM0013",
        count:2
      },
      {
        id:"ITEM0022",
        count:1
      }];
    expect(formattedTags).toEqual(expected)
  });

  it('should build cartItems', function() {
    let formattedTags= [
      {
        id:"ITEM0013",
        count:2
      }];
    let allItems=loadAllItems();
    let cartItems=buildCartItems(formattedTags,allItems);
    let expected =[
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count:2
      }];
    expect(cartItems).toEqual(expected)
  });

  it('should build promotedItems1', function() {
    let cartItems= [
      {
        type: '满30减6元',
        // id: 'ITEM0013',
        name: '肉夹馍',
        // price: 6.00,
        // count:2
      }];
    let promotions=loadPromotions();
    let promotedItems=buildPromotedItems(cartItems,promotions);
    let expected =[
      {
        cartItems:[{
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00,
          count:2
        }],
        payPrice:12,
        saved:0
      }
    ];
    expect(promotedItems).toEqual(expected)
  });
  it('should build promotedItems2', function() {
    let cartItems= [
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count:6
      }];
    let promotions=loadPromotions();
    let promotedItems=buildPromotedItems(cartItems,promotions);
    let expected =[
      {
        cartItems:[{
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00,
          count:6
        }],
        savedItems:[{
          type: '满30减6元',
          // id: 'ITEM0013',
          name: '肉夹馍',
          // price: 6.00,
          // count:6
        }],
        payPrice:36.00,
        saved:6.00
      }
    ];
    expect(promotedItems).toEqual(expected)
  });
  it('should build promotedItems3', function() {
    let cartItems= [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count:2
    }];
    let promotions=loadPromotions();
    let promotedItems=buildPromotedItems(cartItems,promotions);
    let expected =[
      {
        cartItems:[{
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00,
          count:2
        }],
        savedItems:[{
          type: '满30减6元',
          // id: 'ITEM0001',
          name: '黄焖鸡',
          // price: 18.00,
          // count:2
        }],
        payPrice:12,
        saved:6
      }
    ];
    expect(promotedItems).toEqual(expected)
  });
  it('should totalPrices', function() {
    let cartItems= [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count:2
    }];
    let promotions=loadPromotions();
    let promotedItems=buildPromotedItems(cartItems,promotions);
    let expected =[
      {
        cartItems:[{
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00,
          count:2
        }],
        savedItems:[{
          type: '满30减6元',
          // id: 'ITEM0001',
          name: '黄焖鸡',
          // price: 18.00,
          // count:2
        }],
        payPrice:12,
        saved:6
      }
    ];
    expect(promotedItems).toEqual(expected)
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
