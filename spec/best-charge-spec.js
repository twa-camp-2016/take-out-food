describe('Take out food', function () {

  xit('should generate best charge when best is 指定菜品半价', function () {
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

  xit('should generate best charge when best is 满30减6元', function () {
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

  xit('should generate best charge when no promotion can be used', function () {
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

describe("formatItems", function () {
  it("to get formated items", function () {
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

    expect(formatItems(inputs)).toEqual(expected);
  });
});

describe("getCartItems", function () {
  it("to get all atrributes of items", function () {
    let inputs = [
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

    let allItems = loadAllItems();

    let expected = [
      {
        id: "ITEM0001",
        name: '黄焖鸡',
        price: 18.00,
        amount: 1
      },
      {
        id: "ITEM0013",
        name: '肉夹馍',
        price: 6.00,
        amount: 2
      },
      {
        id: "ITEM0022",
        name: '凉皮',
        price: 8.00,
        amount: 1
      }
    ]

    expect(getCartItems(inputs, allItems)).toEqual(expected);
  });
});

describe("getSubtotal", function () {
  it("to get subtotal", function () {
    let inputs = [
      {
        id: "ITEM0001",
        name: '黄焖鸡',
        price: 18.00,
        amount: 1
      },
      {
        id: "ITEM0013",
        name: '肉夹馍',
        price: 6.00,
        amount: 2
      },
      {
        id: "ITEM0022",
        name: '凉皮',
        price: 8.00,
        amount: 1
      }
    ]

    let expected = [
      {
        id: "ITEM0001",
        name: '黄焖鸡',
        price: 18.00,
        amount: 1,
        subtotal: 18.00
      },
      {
        id: "ITEM0013",
        name: '肉夹馍',
        price: 6.00,
        amount: 2,
        subtotal: 12.00
      },
      {
        id: "ITEM0022",
        name: '凉皮',
        price: 8.00,
        amount: 1,
        subtotal: 8.00
      }
    ]

    expect(getSubtotal(inputs)).toEqual(expected);
  });
});


describe("getTotal", function () {
  it("to get total", function () {
    let inputs = [
      {
        id: "ITEM0001",
        name: '黄焖鸡',
        price: 18.00,
        amount: 1,
        subtotal: 18.00
      },
      {
        id: "ITEM0013",
        name: '肉夹馍',
        price: 6.00,
        amount: 2,
        subtotal: 12.00
      },
      {
        id: "ITEM0022",
        name: '凉皮',
        price: 8.00,
        amount: 1,
        subtotal: 8.00
      }
    ]

    let total = 38.00;

    expect(getTotal(inputs)).toBe(total);
  });
});

describe("getHalfCutId", function(){
  it("get half cut id", function(){
    let promotions = loadPromotions();
    
    let expected = ['ITEM0001', 'ITEM0022'];
    
    expect(getHalfCutId(promotions)).toEqual(expected);
  });
});
