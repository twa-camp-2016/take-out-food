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

describe("formatItems", function () {

  it('should format each one to a object', function () {
    let input = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let expected = [
      {
        id: "ITEM0001",
        amount: 1
      },
      {
        id: "ITEM0013",
        amount: 2
      },
      {
        id: "ITEM0022",
        amount: 1
      }
    ];
    let output = formatItems(input);
    expect(output).toEqual(expected);
  });

});

describe("subdivideItems", function () {

  it("should give a subdivision to each one", function () {
    let input = [
      {
        id: "ITEM0001",
        amount: 1
      },
      {
        id: "ITEM0013",
        amount: 2
      },
      {
        id: "ITEM0022",
        amount: 1
      }
    ];
    let expected = [
      {
        id: "ITEM0001",
        amount: 1,
        name: '黄焖鸡',
        price: 18.00
      },
      {
        id: "ITEM0013",
        amount: 2,
        name: '肉夹馍',
        price: 6.00
      },
      {
        id: "ITEM0022",
        amount: 1,
        name: '凉皮',
        price: 8.00
      }
    ];
    let argument = loadAllItems();
    let output = subdivideItems(input, argument);
    expect(output).toEqual(expected);
  });

});

describe("subtotalItems", function () {

  it("should count the subtotal for each one" , function () {
    let input = [
      {
        id: "ITEM0001",
        amount: 1,
        name: '黄焖鸡',
        price: 18.00
      },
      {
        id: "ITEM0013",
        amount: 2,
        name: '肉夹馍',
        price: 6.00
      },
      {
        id: "ITEM0022",
        amount: 1,
        name: '凉皮',
        price: 8.00
      }
    ];
    let expected = [
      {
        id: "ITEM0001",
        amount: 1,
        name: '黄焖鸡',
        price: 18.00,
        subtotal: 18.00
      },
      {
        id: "ITEM0013",
        amount: 2,
        name: '肉夹馍',
        price: 6.00,
        subtotal: 12.00
      },
      {
        id: "ITEM0022",
        amount: 1,
        name: '凉皮',
        price: 8.00,
        subtotal: 8.00
      }
    ];
    let output = subtotalItems(input);
    expect(output).toEqual(expected);
  });

});

describe("addEachPromotion", function () {

  it("should add a type to each item", function () {
    let input = [
      {
        id: "ITEM0001",
        amount: 1,
        name: '黄焖鸡',
        price: 18.00,
        subtotal: 18.00
      },
      {
        id: "ITEM0013",
        amount: 2,
        name: '肉夹馍',
        price: 6.00,
        subtotal: 12.00
      },
      {
        id: "ITEM0022",
        amount: 1,
        name: '凉皮',
        price: 8.00,
        subtotal: 8.00
      }
    ];
    let expected = [
      {
        id: "ITEM0001",
        amount: 1,
        name: '黄焖鸡',
        price: 18.00,
        subtotal: 18.00,
        type: "指定菜品半价"
      },
      {
        id: "ITEM0013",
        amount: 2,
        name: '肉夹馍',
        price: 6.00,
        subtotal: 12.00,
        type: "无"
      },
      {
        id: "ITEM0022",
        amount: 1,
        name: '凉皮',
        price: 8.00,
        subtotal: 8.00,
        type: "指定菜品半价"
      }
    ];
    let argument = loadPromotions();
    let output = addEachPromotion(input, argument);
    expect(output).toEqual(expected);
  });

});

describe("chargeItmes", function () {

  it("should charge all items` subtotal", function () {
    let input = [
      {
        id: "ITEM0001",
        amount: 1,
        name: '黄焖鸡',
        price: 18.00,
        subtotal: 18.00,
        type: "指定菜品半价"
      },
      {
        id: "ITEM0013",
        amount: 2,
        name: '肉夹馍',
        price: 6.00,
        subtotal: 12.00,
        type: "无"
      },
      {
        id: "ITEM0022",
        amount: 1,
        name: '凉皮',
        price: 8.00,
        subtotal: 8.00,
        type: "指定菜品半价"
      }
    ];
    let expected = {
      items: [
        {
          id: "ITEM0001",
          amount: 1,
          name: '黄焖鸡',
          price: 18.00,
          subtotal: 18.00,
          type: "指定菜品半价"
        },
        {
          id: "ITEM0013",
          amount: 2,
          name: '肉夹馍',
          price: 6.00,
          subtotal: 12.00,
          type: "无"
        },
        {
          id: "ITEM0022",
          amount: 1,
          name: '凉皮',
          price: 8.00,
          subtotal: 8.00,
          type: "指定菜品半价"
        }
      ],
      sumtotal: 38.00
    };
    let output = chargeItmes(input);
    expect(output).toEqual(expected);
  })

});

describe("discountItems", function () {

  it("should compare all the promotions and choose the cheapest", function() {
    let input = {
      items: [
        {
          id: "ITEM0001",
          amount: 1,
          name: '黄焖鸡',
          price: 18.00,
          subtotal: 18.00,
          type: "指定菜品半价"
        },
        {
          id: "ITEM0013",
          amount: 2,
          name: '肉夹馍',
          price: 6.00,
          subtotal: 12.00,
          type: "无"
        },
        {
          id: "ITEM0022",
          amount: 1,
          name: '凉皮',
          price: 8.00,
          subtotal: 8.00,
          type: "指定菜品半价"
        }
      ],
      sumtotal: 38.00
    };
    let expected = [{
      items: [
        {
          id: "ITEM0001",
          amount: 1,
          name: '黄焖鸡',
          price: 18.00,
          subtotal: 9.00,
          type: "指定菜品半价"
        },
        {
          id: "ITEM0013",
          amount: 2,
          name: '肉夹馍',
          price: 6.00,
          subtotal: 12.00,
          type: "无"
        },
        {
          id: "ITEM0022",
          amount: 1,
          name: '凉皮',
          price: 8.00,
          subtotal: 4.00,
          type: "指定菜品半价"
        }
      ],
      sumtotal: 25.00,
      type: "指定菜品半价",
      savedPrice: 13.00
    }];
    let argument = loadPromotions();
    let output = discountItems(input, argument);
    expect(output).toEqual(expected);
  });

  it("should compare all the promotions and choose the cheapest", function() {
    let input = {
      items: [
        {
          id: "ITEM0013",
          amount: 4,
          name: '肉夹馍',
          price: 6.00,
          subtotal:24.00,
          type: "无"
        },
        {
          id: "ITEM0022",
          amount: 1,
          name: '凉皮',
          price: 8.00,
          subtotal: 8.00,
          type: "指定菜品半价"
        }
      ],
      sumtotal: 32.00
    };
    let expected = [{
      items: [
        {
          id: "ITEM0013",
          amount: 4,
          name: '肉夹馍',
          price: 6.00,
          subtotal: 24.00,
          type: "无"
        },
        {
          id: "ITEM0022",
          amount: 1,
          name: '凉皮',
          price: 8.00,
          subtotal: 8.00,
          type: "指定菜品半价"
        }
      ],
      sumtotal: 26.00,
      type: "满30减6元",
      savedPrice: 6.00
    }];
    let argument = loadPromotions();
    let output = discountItems(input, argument);
    expect(output).toEqual(expected);

  });

});
