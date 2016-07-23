
describe("formateBarcodes",function () {
     it("formate all id and count",function () {
          let inputs=[
            "ITEM0001 x 1",
            "ITEM0013 x 2",
            "ITEM0022 x 1"
          ];
          let expected=[
            {"id":"ITEM0001", "count":1},
            {"id":"ITEM0013", "count":2},
            {"id":"ITEM0022", "count":1},
          ];
       let result=formateBarcodes(inputs);
       expect(result).toEqual(expected);
     })
})
describe ("getAllItems",function () {
  it("get All Items  detail information",function () {
          let allBarcodes=[
            {"id":"ITEM0001", "count":1},
            {"id":"ITEM0013", "count":2},
            {"id":"ITEM0022", "count":1},
          ];
          let expected=[
            {"id":"ITEM0001", "count":1,"name":"黄焖鸡","price":18},
            {"id":"ITEM0013", "count":2,"name":"肉夹馍","price":6},
            {"id":"ITEM0022", "count":1,"name":"凉皮","price":8}
          ];
    let result=getAllItems(allBarcodes);
    expect(result).toEqual(expected);
  })
})

describe("getPromotions",function () {
  it("get AllItems  Promotions",function () {
    let allItems=[
      {"id":"ITEM0001", "count":1,"name":"黄焖鸡","price":18},
      {"id":"ITEM0022", "count":1,"name":"凉皮","price":8}
    ];
    let expected=[
      {"id":"ITEM0001", "count":1,"name":"黄焖鸡","price":18,"type":"指定菜品半价"},
      {"id":"ITEM0022", "count":1,"name":"凉皮","price":8,"type":"指定菜品半价"},
      {"type1":"满30减6"}
    ];
    let result=getPromotions(allItems);
    expect(result).toEqual(expected);
  })
})

describe ("getdispromoteSubtotal",function () {
  it("get  before  promote subtotal",function () {
       let itemsDispromotion=[
         {"id":"ITEM0001", "count":1,"name":"黄焖鸡","price":18,"type":"指定菜品半价"},
         {"id":"ITEM0022", "count":1,"name":"凉皮","price":8,"type":"指定菜品半价"}
       ];
       let expected=[
         {"id":"ITEM0001", "count":1,"name":"黄焖鸡","price":18,"type":"指定菜品半价","dispromotesubtotal":18},
         {"id":"ITEM0022", "count":1,"name":"凉皮","price":8,"type":"指定菜品半价","dispromotesubtotal":8}
       ];
      let result=getdispromoteSubtotal(itemsDispromotion);
      expect(result).toEqual(expected);
  })
})

describe ("getdispromoteTotal",function () {
  it("get before promote total",function () {
    let dispromoteSubtotal=[
      {"id":"ITEM0001", "count":1,"name":"黄焖鸡","price":18,"type":"指定菜品半价","dispromotesubtotal":18},
      {"id":"ITEM0022", "count":1,"name":"凉皮","price":8,"type":"指定菜品半价","dispromotesubtotal":8}
    ];
   let result=getdispromoteTotal(dispromoteSubtotal);
    expect(result).toEqual(26);
  })
})

describe("getpromoteSubtotal",function () {
  it("get promote  subtotal",function () {
      let dispromoteSubtotal=[
        {"id":"ITEM0001", "count":1,"name":"黄焖鸡","price":18,"type":"指定菜品半价","dispromotesubtotal":18},
        {"id":"ITEM0022", "count":1,"name":"凉皮","price":8,"type":"指定菜品半价","dispromotesubtotal":8},
      ];
      let dispromoteTotal=26;
     let expected=[
       {"id":"ITEM0001", "count":1,"name":"黄焖鸡","price":18,"type":"指定菜品半价","dispromotesubtotal":18},
       {"id":"ITEM0022", "count":1,"name":"凉皮","price":8,"type":"指定菜品半价","dispromotesubtotal":8},
       {"promotetotal":13},
       {type:"使用优惠:'指定菜品半价'"},
       {"saving":13}
     ];
    let result=getPromoteDetail(dispromoteSubtotal,dispromoteTotal);
    expect(result).toEqual(expected);
  })
})

// describe('Take out food', function () {
//
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
