
describe('Take out food', function () {

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



describe("formatTags", function () {
  it("should return barcodes with id and count", function () {
    let input = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let result = formatTags(input);
    let barcodes = [
      {id: "ITEM0001", count: 1},
      {id: "ITEM0013", count: 2},
      {id: "ITEM0022", count: 1}
      ];
    expect(result).toEqual(barcodes);
  })
})

describe("getCartItems", function () {
  it("should return cartItems with information", function () {
    let input = [
      {id: "ITEM0001", count: 1},
      {id: "ITEM0013", count: 2},
      {id: "ITEM0022", count: 1}
    ];
    let result = getCartItems(input, loadAllItems());
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
    expect(result).toEqual(cartItems);
  })
})

describe("getSubTotalItems", function () {
  it("should return items subTotal", function () {
    let input = [{
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
    let result = getSubTotalItems(input);
    let subTotalItems = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count: 1,
      subTotal: 18
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      count: 2,
      subTotal: 12
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00,
      count: 1,
      subTotal: 8
    }];
    expect(result).toEqual(subTotalItems);
  })
})

describe("getTotal", function () {
  it("should return items total", function () {
    let input = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count: 1,
      subTotal: 18
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      count: 2,
      subTotal: 12
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00,
      count: 1,
      subTotal: 8
    }];
    let result = getTotal(input);
    let output = 38;
    expect(result).toEqual(output)
  })
})

describe("getCartItemsPromotions", function () {
  it("should return cartItems with promotion type", function () {
    let subTotalItems = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count: 1,
      subTotal: 18
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      count: 2,
      subTotal: 12
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00,
      count: 1,
      subTotal: 8
    }];
    let result = getCartItemsPromotions(subTotalItems, loadPromotions());
    let output = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count: 1,
      subTotal: 18,
      type: '指定菜品半价'
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      count: 2,
      subTotal: 12,
      type: "满30减6元"
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00,
      count: 1,
      subTotal: 8,
      type: '指定菜品半价'
    }];
    expect(result).toEqual(output);
  })
})

describe("getDiscountTotal", function () {
  it("should return discountTotal", function () {
    let input = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count: 1,
      subTotal: 18,
      type: '指定菜品半价'
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      count: 2,
      subTotal: 12,
      type: "满30减6元"
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00,
      count: 1,
      subTotal: 8,
      type: '指定菜品半价'
    }];
    let total = 38;
    let result = getDiscountTotal(input, total)
    let discountTotalType = {type: '指定菜品半价', discountTotal: 25}
    expect(result).toEqual(discountTotalType);
  })
})

describe("getSaveMoney", function () {
  it("shoould return saveMoney", function () {
    let input = {type: '指定菜品半价', discountTotal: 25};
    let total = 38;
    let result = getSaveMoney(input, total);
    let saveType = {type: '指定菜品半价', discountTotal: 25, save: 13};
    expect(result).toEqual(saveType)
  })
})

describe("print", function () {
  it("should return receipt", function () {
    let input = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count: 1,
      subTotal: 18,
      type: '指定菜品半价'
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      count: 2,
      subTotal: 12,
      type: "满30减6元"
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00,
      count: 1,
      subTotal: 8,
      type: '指定菜品半价'
    }];
    let saveType = {type: '指定菜品半价', discountTotal: 25, save: 13};
    let result = print(input, saveType).trim();
    let receipt = `
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
    expect(result).toEqual(receipt);
  })
  it("should return receipt", function () {
    let input = [{
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      count: 4,
      subTotal: 24,
      type: "满30减6元"
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00,
      count: 1,
      subTotal: 8,
      type: '指定菜品半价'
    }];
    let saveType = {type: "满30减6元" , discountTotal: 26, save: 6};
    let result = print(input, saveType).trim();
    let receipt = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：26元
===================================`.trim()
    expect(result).toEqual(receipt);
  })
  it("should return receipt", function () {
    let input = [{
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      count: 4,
      subTotal: 24,
      type: "满30减6元"
    }];
    let saveType = {type: "" , discountTotal: 24, save: 0};
    let result = print(input, saveType).trim();
    let receipt = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim()
    expect(result).toEqual(receipt);
  })
})



























