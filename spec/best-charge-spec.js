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
    let result = formatItems(idItems);
    expect(result).toEqual([
      {
        "id":"ITEM0001",
        "count":1
      },
      {
        "id":"ITEM0013",
        "count":2
      },
      {
        "id":"ITEM0022",
        "count":1
      }
    ]);
  })
});


describe("test getItemsInfo", function () {
  it("get promotionType", function () {
    let promotions = [{
      type: '满30减6元'
    }, {
      type: '指定菜品半价',
      items: ['ITEM0001', 'ITEM0022']
    }];

    let itemsCount = [
      {
        id:"ITEM0001",
        count:1
      },
      {
        id:"ITEM0022",
        count:1
      }
    ];
    let result = matchPromotions(itemsCount, promotions);
    expect(result).toEqual([
      {
        id:"ITEM0001",
        count:1,
        type:"指定菜品半价"
      },
      {
        id:"ITEM0022",
        count:1,
        type:"指定菜品半价"
      }]
    );
  })
})

// describe("test getItemsInfo",function () {
//   it("get itemsInfo",function () {
//     let itemsType=[
//       {
//         id:"ITEM0001",
//         count:1,
//         type:"指定菜品半价"
//       }];
//     let allItems=[
//       {
//         id: 'ITEM0001',
//         name: '黄焖鸡',
//         price: 18.00
//       }, {
//         id: 'ITEM0013',
//         name: '肉夹馍',
//         price: 6.00
//       }];
//     let result=getItemsInfo(itemsType, allItems);
//     expect(result).toEqual([
//       {
//         id:"ITEM0001",
//         count:1,
//         type:"指定菜品半价",
//         name:'黄焖鸡',
//         price:6.00
//       }
//     ]);
//   })
// })



describe("test getDiscountSubtotal",function () {
  it("get discountSubtotal",function () {
    let itemsInfo=[
      {
        id:"ITEM0001",
        count:6,
        type:"指定菜品半价",
        name:'黄焖鸡',
        price:6.00
      }];
    let result=[{
      id:"ITEM0001",
      count:6,
      type:"指定菜品半价",
      name:'黄焖鸡',
      price:6.00,
      discountSubtotal:30
    }]
  })
})



describe("test getSubtotal",function () {
  it("get subtotal",function () {
    let itemsInfo=[
      {
        id:"ITEM0001",
        count:6,
        type:"指定菜品半价",
        name:'黄焖鸡',
        price:6.00
      }];
    let result=getSubtotal(itemsInfo);
    expect(result).toEqual([{
      id:"ITEM0001",
      count:6,
      type:"指定菜品半价",
      name:'黄焖鸡',
      price:6.00,
      discountSubtotal:36
    }]);
  })
})


describe("test saveMoney",function () {
  it("get saveMoney",function () {
    let discountSubtotalInfo=[
      {
        id:"ITEM0001",
        count:6,
        type:"指定菜品半价",
        name:'黄焖鸡',
        price:6.00,
        discountSubtotal:30
      }];
    
    let subtotal=[
      {
        id:"ITEM0001",
        count:6,
        type:"指定菜品半价",
        name:'黄焖鸡',
        price:6.00,
        discountSubtotal:30
      }];
    
    let result=6;
    expect(result).toBe();
  })
})
