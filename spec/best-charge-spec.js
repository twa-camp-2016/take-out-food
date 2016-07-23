describe('getformattedTags', function () {
  it('getformattedTags', function () {
    let tags = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let formattedTags = getFormattedTags(tags);
    let expected = [{id: 'ITEM0001', count: 1},
      {id: 'ITEM0013', count: 2},
      {id: 'ITEM0022', count: 1}];
    expect(formattedTags).toEqual(expected);
  });
})
describe('getCartItem', function () {
 it('getCartItem',function(){
   allItems = [{
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
   let formattedTags =[ { id: 'ITEM0001', count: 1 },
     { id: 'ITEM0013', count: 2 },
     { id: 'ITEM0022', count: 1 } ];
    let cartItems = getCartItems(allItems,formattedTags);
    let expected = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count:1
      },{
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count:2
      },
      {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
    count:1}];
    expect(cartItems).toEqual(expected);
  } );
})
describe('getPromotionItems', function () {
  it('getPromotionItems',function(){
    let cartItems = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count:1
      },{
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count:2
      },
      {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        count:1}];
    let promotions = [{
      type: '满30减6元'
    }, {
      type: '指定菜品半价',
      items: ['ITEM0001', 'ITEM0022']
    }];
    let promotionItems = getPromotionItems(promotions,cartItems);
    let expected = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count:1,
      payPrice:18,
      saved:9
    },{
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      count:2,
      payPrice:12,
      saved:0
    },{
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00,
      count:1,
      payPrice:8,
      saved:4}];
    expect(promotionItems).toEqual(expected);
  });
})


  // it('getTotalPrice',function(){} );
  // it('getReceiptModel',function(){} );
  // it('PrintReceipt',function(){} );
//   //
//   it('should generate best charge when best is 指定菜品半价', function() {
//     let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
//     let summary = bestCharge(inputs).trim();
//     let expected = `
// ============= 订餐明细 =============
// 黄焖鸡 x 1 = 18元
// 肉夹馍 x 2 = 12元
// 凉皮 x 1 = 8元
// -----------------------------------
// 使用优惠:
// 指定菜品半价(黄焖鸡，凉皮)，省13元
// -----------------------------------
// 总计：25元
// ===================================`.trim()
//     expect(summary).toEqual(expected)
//   });
//
//   it('should generate best charge when best is 满30减6元', function() {
//     let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
//     let summary = bestCharge(inputs).trim();
//     let expected = `
// ============= 订餐明细 =============
// 肉夹馍 x 4 = 24元
// 凉皮 x 1 = 8元
// -----------------------------------
// 使用优惠:
// 满30减6元，省6元
// -----------------------------------
// 总计：26元
// ===================================`.trim()
//     expect(summary).toEqual(expected)
//   });
//
//   it('should generate best charge when no promotion can be used', function() {
//     let inputs = ["ITEM0013 x 4"];
//     let summary = bestCharge(inputs).trim();
//     let expected = `
// ============= 订餐明细 =============
// 肉夹馍 x 4 = 24元
// -----------------------------------
// 总计：24元
// ===================================`.trim()
//     expect(summary).toEqual(expected)
//   });
//
// });
