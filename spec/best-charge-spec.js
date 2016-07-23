// describe('Take out food', function () {
//
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
//
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
//
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
//
// });

describe("test getIdCountSum", function () {
  it("get idCountSum", function () {
    let idItems = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];

    let result = getIdCountSum(idItems);
    expect(result).toEqual([
      {
        "id":"ITEM0001",
        "amount":1
      },
      {
        "id":"ITEM0013",
        "amount":2
      },
      {
        "id":"ITEM0022",
        "amount":1
      }
    ]);
  })
});


describe("test matchPromotion", function () {
  it("get promotionType", function () {
    let promotions = [{
      type: '满30减6元'
    }, {
      type: '指定菜品半价',
      items: ['ITEM0001', 'ITEM0022']
    }];

    let idCountSum = [
      {
        id:"ITEM0001",
        amount:1
      },
      {
        id:"ITEM0013",
        amount:2
      },
      {
        id:"ITEM0022",
        amount:2
      }
    ];
    let result = matchPromotion(promotions, idCountSum);

    expect(result).toEqual([
      {
        id:"ITEM0001",
        amount:1,
        type:"指定菜品半价"
      },
      {
        id:"ITEM0013",
        amount:2,
        type:"满30减6元"
      },
      {
        id:"ITEM0022",
        amount:2,
        type:"指定菜品半价"
      }]
    );
  })
})

// describe("test getPromotionSubtotal", function () {
//   it("get promotionSubtotal", function () {
//     let promotionType = [
//       {
//         "ITEM0001", 1, "指定菜品半价"
//       },
//       {
//         "ITEM0013", 6, "满30减6元"
//       },
//       {
//         "ITEM0022", 2, "指定菜品半价"
//       }];
//     let allItems = [
//       {
//         id: 'ITEM0001',
//         name: '黄焖鸡',
//         price: 18.00
//       }, {
//         id: 'ITEM0013',
//         name: '肉夹馍',
//         price: 6.00
//       }, {
//         id: 'ITEM0022',
//         name: '凉皮',
//         price: 8.00
//       }, {
//         id: 'ITEM0030',
//         name: '冰锋',
//         price: 2.00
//       }];
//
//     let result = getPromotionSubtotal(promotionType, allItems);
//     expect(result).toEqual([
//         {
//           id: 'ITEM0001',
//           name: '黄焖鸡',
//           price: 18.00,
//           type: "指定菜品半价",
//           amount: 1,
//           promotionSubtotal: 9
//         },
//         {
//           id: 'ITEM0013',
//           name: '肉夹馍',
//           price: 6.00,
//           type: "满30减6元",
//           amount: 6,
//           promotionSubtotal: 30
//         },
//         {
//           id: 'ITEM0022',
//           name: '凉皮',
//           price: 8.00,
//           type: "指定菜品半价",
//           amount: 2,
//           promotionSubtotal: 8
//         }
//
//       ]
//     );
//   })
// })
//
// describe("test getSUbtotal",function () {
//  
// })
//


