describe('Take out food', function () {

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

describe("generateItems", function () {
  it("to split the id and amount", function () {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
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
    ]

    expect(generateItems(inputs)).toEqual(expected);
  });
});


describe("getCartItems", function () {
  it("get all attributes for items", function () {
    let inputs = [
      {
        id: "ITEM0001",
        amount: 1
      }
    ]

    let expected = [
      {
        id: "ITEM0001",
        name: "黄焖鸡",
        price: 18.00,
        amount: 1
      }
    ]

    let allItems = loadAllItems();

    expect(getCartItems(inputs, allItems)).toEqual(expected);
  });
});


describe("getSubtotal", function () {
  it("get every kind of goods'subtotal", function () {
    let inputs = [
      {
        id: "ITEM0001",
        name: "黄焖鸡",
        price: 18.00,
        amount: 2
      }
    ]

    let expected = [
      {
        id: "ITEM0001",
        name: "黄焖鸡",
        price: 18.00,
        amount: 2,
        subtotal: 36.00
      }
    ]

    expect(getSubtotal(inputs)).toEqual(expected);
  });
});

describe("getPromotedType", function () {
  it("get the promotion type of good", function () {
    let inputs = [
      {
        id: "ITEM0001",
        name: "黄焖鸡",
        price: 18.00,
        amount: 2,
        subtotal: 36.00
      },
      {
        id: "ITEM0030",
        name: "冰峰",
        price: 2.00,
        amount: 2,
        subtotal: 4.00
      }
    ]

    let expected = [
      {
        id: "ITEM0001",
        name: "黄焖鸡",
        price: 18.00,
        amount: 2,
        subtotal: 36.00,
        type: "指定菜品半价"
      },
      {
        id: "ITEM0030",
        name: "冰峰",
        price: 2.00,
        amount: 2,
        subtotal: 4.00,
        type: "NO_PROMOTION"
      }
    ]

    let promotions = loadPromotions();

    expect(getPromotedType(inputs, promotions)).toEqual(expected);
  })
})

describe("getPromotion", function () {
  it("get the promotion of good", function () {
    let inputs = [
      {
        id: "ITEM0001",
        name: "黄焖鸡",
        price: 18.00,
        amount: 2,
        subtotal: 36.00,
        type: "指定菜品半价"
      },
      {
        id: "ITEM0030",
        name: "冰峰",
        price: 2.00,
        amount: 2,
        subtotal: 4.00,
        type: "NO_PROMOTION"
      },
      {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        amount: 4,
        subtotal: 32,
        type: "满30减6元"
      }
    ]

    let expected = [
      {
        id: "ITEM0001",
        name: "黄焖鸡",
        price: 18.00,
        amount: 2,
        subtotal: 36.00,
        type: "指定菜品半价",
        promotion: 18.00
      },
      {
        id: "ITEM0030",
        name: "冰峰",
        price: 2.00,
        amount: 2,
        subtotal: 4.00,
        type: "NO_PROMOTION",
        promotion: 0
      },
      {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        amount: 4,
        subtotal: 32,
        type: "满30减6元",
        promotion: 6
      }
    ]

    expect(getPromotion(inputs)).toEqual(expected);
  });
});

describe("getAfterPromotedSubtotal", function () {
  it("to get subtotal after promoting", function () {
    let inputs = [
      {
        subtotal: 36.00,
        promotion: 18.00

      }]

    let expected = [
      {
        subtotal: 36.00,
        promotion: 18.00,
        afterPromotedSubtotal: 18.00
      }
    ]

    expect(getAfterPromotedSubtotal(inputs)).toEqual(expected);
  });
});

describe("getTotal", function () {
  it("get totally money", function () {
    let inputs = [
      {
        afterPromotedSubtotal: 18.00
      },
      {
        afterPromotedSubtotal: 3.80
      }
    ]

    let total = 21.8;

    expect(getTotal(inputs)).toEqual(total);
  });
});

describe("getSavedTotal", function () {
  it("to get totally saved", function () {
    let inputs = [
      {
        promotion: 6
      },
      {
        promotion: 4
      }
    ]

    let expected = 10;

    expect(getSavedTotal(inputs)).toBe(expected);
  });
});

describe("connectString", function () {
  it("connect the information", function () {
    let inputs = [
      {
        id: "ITEM0001",
        name: "黄焖鸡",
        price: 18.00,
        amount: 2,
        subtotal: 36.00,
        type: "指定菜品半价",
        promotion: 18.00,
        afterPromotedSubtotal: 18.00
      }
    ]

    let total = 18;
    let savedTotal = 18;
    let expected = `
============= 订餐明细 =============
黄焖鸡 x 2 = 18元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡)，省18元
-----------------------------------
总计：18元
===================================`.trim()

    expect(connectString(total, savedTotal, inputs)).toEqual(expected);
  });
});
