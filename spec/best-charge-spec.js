// let{  bestCharge,
//   getFormattedTags,
//   getCartItems,
//   getPromotionItems,
//   getTotalPrice,
//   getPrintModel,
//   getPrint} = require("../src/best-charge");
// let{loadAllItems}=require("../src/items");
// let{loadPromotions}=require("../src/promotions");
// describe("1", function () {
//   it("getFormattedTags", function () {
//     let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
//     let formattedTags = getFormattedTags(inputs);
//     let expected = [{id: "ITEM0001", count: 1},
//       {id: "ITEM0013", count: 2},
//       {id: "ITEM0022", count: 1}];
//     expect(formattedTags).toEqual(expected);
//   });
// })
// describe("2", function () {
//   it("getFormattedTags", function () {
//     let formattedTags = [
//       {id: "ITEM0001", count: 1},
//       {id: "ITEM0013", count: 2},
//       {id: "ITEM0022", count: 1}];
//     let allItems = loadAllItems();
//     let countedInputs = getCartItems(allItems, formattedTags);
//     let expected = [
//       {id: "ITEM0001", name: '黄焖鸡', price: 18, count: 1},
//       {id: "ITEM0013", name: '肉夹馍', price: 6, count: 2},
//       {id: "ITEM0022", name: '凉皮', price: 8, count: 1}];
//     expect(countedInputs).toEqual(expected);
//   });
// })
// describe('3', function () {
//   it('getPromotionItems', function () {
//     let countedInputs = [
//       {id: "ITEM0001", name: '黄焖鸡', price: 18, count: 1},
//       {id: "ITEM0013", name: '肉夹馍', price: 6, count: 2},
//       {id: "ITEM0022", name: '凉皮', price: 8, count: 1}];
//     let promotions = loadPromotions();
//     let promotionItems = getPromotionItems(countedInputs, promotions);
//     let exptcted = [
//       {id: "ITEM0001", name: '黄焖鸡', price: 18, count: 1, payPrice1: 18, saved1: 9, payPrice: 9},
//       {id: "ITEM0013", name: '肉夹馍', price: 6, count: 2, payPrice1: 12, saved1: 0, payPrice: 12},
//       {id: "ITEM0022", name: '凉皮', price: 8, count: 1, payPrice1: 8, saved1: 4, payPrice: 4}];
//     expect(promotionItems).toEqual(exptcted);
//   });
// })
// describe('4', function () {
//   it('totalPrices', function () {
//     let promotionItems = [
//       {id: "ITEM0001", name: '黄焖鸡', price: 18, count: 1, payPrice1: 18, saved1: 9, payPrice: 9},
//       {id: "ITEM0013", name: '肉夹馍', price: 6, count: 2, payPrice1: 12, saved1: 0, payPrice: 12},
//       {id: "ITEM0022", name: '凉皮', price: 8, count: 1, payPrice1: 8, saved1: 4, payPrice: 4}];
//     let totalPrices = getTotalPrice(promotionItems);
//     let expected = {totalPayPrice: 38, totalSaved1: 13, type: '指定菜品半价', totalSaved: 13, pay: 25};
//     expect(totalPrices).toEqual(expected);
//   });
// })
//
// describe('4-2', function () {
//   it('totalPrices', function () {
//     let promotionItems = [
//       {id: "ITEM0001", name: '黄焖鸡', price: 18, count: 2, payPrice1: 36, saved1: 6, payPrice: 30}];
//     let totalPrices = getTotalPrice(promotionItems);
//     let expected = {totalPayPrice: 36, totalSaved1: 6, type: '满30减6', totalSaved: 6, pay: 30};
//     expect(totalPrices).toEqual(expected);
//   });
// });
// describe('5', function () {
//   it('getPrintModel', function () {
//     let promotionItems = [
//       {id: "ITEM0001", name: '黄焖鸡', price: 18, count: 1, payPrice1: 18, saved1: 9, payPrice: 9},
//       {id: "ITEM0013", name: '肉夹馍', price: 6, count: 2, payPrice1: 12, saved1: 0, payPrice: 12},
//       {id: "ITEM0022", name: '凉皮', price: 8, count: 1, payPrice1: 8, saved1: 4, payPrice: 4}];
//     let totalPrices = {totalPayPrice: 38, totalSaved1: 13, type: '指定菜品半价', totalSaved: 13, pay: 25};
//     let receiptModel = getPrintModel(promotionItems, totalPrices);
//     let expected = {
//       receiptItems: [{name: '黄焖鸡', count: 1, payPrice1: 18},
//         {name: '肉夹馍', count: 2, payPrice1: 12},
//         {name: '凉皮', count: 1, payPrice1: 8}],
//       savedItems: [{name: '黄焖鸡', count: 1, saved1: 9},
//         {name: '凉皮', count: 1, saved1: 4}],
//       type: '指定菜品半价',
//       totalSaved: 13,
//       pay: 25
//     };
//     expect(receiptModel).toEqual(expected);
//   })
// });
// describe('6', function () {
//   it('getPrint', function () {
//     let receiptModel = {
//       receiptItems: [{name: '黄焖鸡', count: 1, payPrice1: 18},
//         {name: '肉夹馍', count: 2, payPrice1: 12},
//         {name: '凉皮', count: 1, payPrice1: 8}],
//       savedItems: [{name: '黄焖鸡', count: 1, saved1: 9},
//         {name: '凉皮', count: 1, saved1: 4}],
//       type: '指定菜品半价',
//       totalSaved: 13,
//       pay: 25
//     }
//     let receiptString = getPrint(receiptModel);
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
//     expect(receiptString).toEqual(expected)
//   });
// })
// describe('7', function () {
//   it('should generate best charge when best is 指定菜品半价', function () {
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
// })
// describe('7-1', function () {
//   it('should generate best charge when best is 满30减6元', function () {
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
// });
// describe('7-2', function () {
//   it('should generate best charge when no promotion can be used', function () {
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
// });

describe('1', function () {
  it('getFormatted', function () {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let formattedItems = getFormatted(inputs);
    let expected = [{id: "ITEM0001", count: 1}, {id: "ITEM0013", count: 2}, {id: "ITEM0022", count: 1}];
    expect(formattedItems).toEqual(expected);
  });
})
describe('2', function () {
  it('getCartItems', function () {
    let formattedItems = [{id: "ITEM0001", count: 1}, {id: "ITEM0013", count: 2}, {id: "ITEM0022", count: 1}];
    let allItems = loadAllItems();
    let cartItems = getCartItems(allItems, formattedItems);
    let expected = [
      {id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1},
      {id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2},
      {id: 'ITEM0022', name: '凉皮', price: 8, count: 1}];
    expect(cartItems).toEqual(expected);
  });
})
describe('3', function () {
  it('getHalfPriceItems', function () {
    let cartItems = [
      {id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1},
      {id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2},
      {id: 'ITEM0022', name: '凉皮', price: 8, count: 1}];
    let promotions = loadPromotions();
    let halfPriceItems = getHalfPriceItems(promotions, cartItems);
    let expected = [
      {id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1, payPrice: 9, saved: 9},
      {id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2, payPrice: 12, saved: 0},
      {id: 'ITEM0022', name: '凉皮', price: 8, count: 1, payPrice: 4, saved: 4}]
    expect(halfPriceItems).toEqual(expected);
  });
})
describe('4', function () {
  it('getHalfTotalPrice', function () {
    let halfPriceItems = [
      {id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1, payPrice: 9, saved: 9},
      {id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2, payPrice: 12, saved: 0},
      {id: 'ITEM0022', name: '凉皮', price: 8, count: 1, payPrice: 4, saved: 4}];
    let totalHalfPrices = getHalfTotalPrice(halfPriceItems);
    let expected = {totalHalfPayPrice: 25, totalHalfSaved: 13};
    expect(totalHalfPrices).toEqual(expected);
  });
})
describe('5', function () {
  it('getSubtractedPrice', function () {
    let cartItems = [
      {id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1},
      {id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2},
      {id: 'ITEM0022', name: '凉皮', price: 8, count: 1}];
    let totalSubtractionPrice = getSubtractedPrice(cartItems);
    let expected = {totalSubtractedPrice: 38,totalSubtractedSaved:6};
    expect(totalSubtractionPrice).toEqual(expected);
  });
})
describe('5-1', function () {
  it('getSubtractedPrice', function () {
    let cartItems = [
      {id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1},]
    let totalSubtractionPrice = getSubtractedPrice(cartItems);
    let expected = {totalSubtractedPrice: 18,totalSubtractedSaved:0};
    expect(totalSubtractionPrice).toEqual(expected);
  });
})
describe('6', function () {
  it('getCompared', function () {
    let totalHalfPrices={totalHalfPayPrice: 25, totalHalfSaved: 13};
    let totalSubtractionPrice={totalSubtractedPrice: 38,totalSubtractedSaved:6};
    let savedItems = getCompared(totalSubtractionPrice, totalHalfPrices);
    let expected = {type: '指定菜品半价', save: 13, total: 25}  ;
    expect(savedItems).toEqual(expected);
  });
})
describe('6-1', function () {
  it('getCompared', function () {
    let totalHalfPrices={totalHalfPayPrice: 25, totalHalfSaved: 2};
    let totalSubtractionPrice={totalSubtractedPrice: 38,totalSubtractedSaved:6};
    let savedItems = getCompared(totalSubtractionPrice, totalHalfPrices);
    let expected = {type: '满30减6元', save: 6, total: 32} ;
    expect(savedItems).toEqual(expected);
  });
})

describe('7', function () {
  it('getPrintModel', function () {
    let cartItems=[
      {id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1},
      {id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2},
      {id: 'ITEM0022', name: '凉皮', price: 8, count: 1}];
    let savedItems={type: '指定菜品半价', save: 13, total: 25};
    let receiptModel = getPrintModel(cartItems, savedItems);
    let expected = { receiptItems:
      [ { name: '黄焖鸡', count: 1, price: 18 },
        { name: '肉夹馍', count: 2, price: 6 },
        { name: '凉皮', count: 1, price: 8 } ],
      type: '指定菜品半价',
      save: 13,
      total: 25 } ;
    expect(receiptModel).toEqual(expected);
  });
})
describe('8', function () {
  it('printSting', function () {
    let receiptModel = { receiptItems:
      [ { name: '黄焖鸡', count: 1, price: 18 },
        { name: '肉夹馍', count: 2, price: 6 },
        { name: '凉皮', count: 1, price: 8 } ],
      type: '指定菜品半价',
      save: 13,
      total: 25 }
    let receiptString = printSting(receiptModel);
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
    expect(receiptString).toEqual(expected);
  });
})
describe('9', function () {
  it('should generate best charge when best is 指定菜品半价', function () {
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
})
describe('9-1', function () {
  it('should generate best charge when best is 满30减6元', function () {
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
});
describe('9-2', function () {
  it('should generate best charge when no promotion can be used', function () {
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







