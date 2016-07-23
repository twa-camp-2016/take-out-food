describe("formatInputs", function () {

  it("formated inputs by 'x' ", function () {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let result = formatInputs(inputs);
    let expected = [{id: "ITEM0001", count: 1}, {id: "ITEM0013", count: 2}, {id: "ITEM0022", count: 1}];
    expect(result).toEqual(expected);
  });
});

describe("getCartItems", function () {

  it("compare formatInputs with allItems ", function () {
    let formatedInputs = [{id: "ITEM0001", count: 1}, {id: "ITEM0013", count: 2}, {id: "ITEM0022", count: 1}];
    let result = getCartItems(formatedInputs);
    let expected = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count: 1
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      count: 2
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00,
      count: 1
    }];
    expect(result).toEqual(expected);
  })
});

describe("getTotal", function () {

  it("calculate price times count ", function () {
    let cartItems = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count: 1
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      count: 2
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00,
      count: 1
    }];
    let result = getTotal(cartItems);
    let expected = 38;
    expect(result).toEqual(expected);
  })
});

describe("calculateHalfDiscount", function () {

  it("calculate another discount total ", function () {
    let cartItems = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count: 1
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      count: 2
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00,
      count: 1
    }];
    let result = calculateHalfDiscount(cartItems);
    let expected = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count: 1,
      halfDiscount: 9.00
    },
      {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        count: 1,
        halfDiscount: 4.00
      }];
    expect(result).toEqual(expected);
  })
});

describe("chooseDiscount", function () {

  it("compare to choose discount", function () {
    let cartItems = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count: 1
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      count: 2
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00,
      count: 1
    }];
    let result = chooseDiscount(cartItems);
    let expected = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count: 1
      }, {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count: 2
      }, {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        count: 1
      }, {
        type: '指定菜品半价'
      }
    ];
    expect(result).toEqual(expected);
  });
});

describe("print information", function () {

  it("print choosed cartItems", function () {
    let cartItems = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count: 1
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      count: 2
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00,
      count: 1
    }];
    // spyOn(console,"log");
    let result = print(cartItems);
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
===================================`;

    expect(result).toEqual(expected);
  })
});

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
