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

describe("formatTags", function(){
  it("should get barcodes with count", function(){
    let tags = [
      "ITEM0001*1",
      "ITEM0013*2",
      "ITEM0022*1"
    ];
    let barcodes = [
      {id: "ITEM0001", count: 1},
      {id: "ITEM0013", count: 2},
      {id: "ITEM0022", count: 1}
      ];
    let result = formatTags(tags);
    expect(result).toEqual(barcodes);
  });
});

describe("getCartItems", function(){
  it("should get cartitems", function(){
    let barcodes =  [
      {id: "ITEM0001", count: 1},
      {id: "ITEM0013", count: 2},
      {id: "ITEM0022", count: 1}
    ];
    let items = [{
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
    let result = getCartItems(barcodes, items);
    let cartItems = [
      {id: "ITEM0001", name: '黄焖鸡', price: 18.00, count: 1},
      {id: "ITEM0013", name: '肉夹馍', price: 6.00, count: 2},
      {id: "ITEM0022", name: '凉皮', price: 8.00, count: 1}
    ];
    expect(result).toEqual(cartItems);
  });
});

describe("getSubTotalItems", function(){
  it("should get cartIitems with subtotal", function(){
    let cartItems = [
      {id: "ITEM0001", name: '黄焖鸡', price: 18.00, count: 1},
      {id: "ITEM0013", name: '肉夹馍', price: 6.00, count: 2},
      {id: "ITEM0022", name: '凉皮', price: 8.00, count: 1}
    ];
    let subTotalItems = [
      {id: "ITEM0001", name: '黄焖鸡', price: 18.00, count: 1, subTotal: 18.00},
      {id: "ITEM0013", name: '肉夹馍', price: 6.00, count: 2, subTotal: 12.00},
      {id: "ITEM0022", name: '凉皮', price: 8.00, count: 1, subTotal: 8.00}
    ];
    let result = getSubTotalItems(cartItems);
    expect(result).toEqual(subTotalItems);
  });
});

describe("getTotal", function(){
  it("should return items total", function(){
    let subTotalItems = [
      {id: "ITEM0001", name: '黄焖鸡', price: 18.00, count: 1, subTotal: 18.00},
      {id: "ITEM0013", name: '肉夹馍', price: 6.00, count: 2, subTotal: 12.00},
      {id: "ITEM0022", name: '凉皮', price: 8.00, count: 1, subTotal: 8.00}
    ];
    let total = 38;
    let result  = getTotal(subTotalItems);
    expect(result).toEqual(total);
  });
});

describe("getDiscountTotal", function(){
  it("should return discounted items total", function(){
    let total = 38;
    let subTotalItems = [
      {id: "ITEM0001", name: '黄焖鸡', price: 18.00, count: 1, subTotal: 18.00},
      {id: "ITEM0013", name: '肉夹馍', price: 6.00, count: 2, subTotal: 12.00},
      {id: "ITEM0022", name: '凉皮', price: 8.00, count: 1, subTotal: 8.00}
    ];
    let promotions = [{
      type: '满30减6元'
    }, {
      type: '指定菜品半价',
      items: ['ITEM0001', 'ITEM0022']
    }];
    let result = getDiscountTotal(total, subTotalItems, promotions);
    let itemsDiscountTotal = [
      {type: '指定菜品半价', discountTotal: 25, name: ["黄闷鸡", "凉皮"]},
      {type: '满30减6元', discountTotal: 32},
      {type: '', discountTotal: 38}
    ];
    expect(result).toEqual(itemsDiscountTotal);
  });
});

describe("getSaveMoney", function(){
  it("should return savemoney", function(){
    let total = 38;
    let itemsDiscountTotal =  [
      {type: '指定菜品半价', discountTotal: 25, name: ["黄闷鸡", "凉皮"]},
      {type: '满30减6元', discountTotal: 32},
      {type: '', discountTotal: 38}
    ];
    let saveType = [
      {type: '指定菜品半价', discountTotal: 25, name: ["黄闷鸡", "凉皮"], save: 13},
      {type: '满30减6元', discountTotal: 32, save: 6},
      {type: '', discountTotal: 38, save: 0}
    ];
    let result = getSaveMoney(total, itemsDiscountTotal);
    expect(result).toEqual(saveType);
  });
});

describe("print", function(){
  it("should print receipt", function(){
    let subTotalItems = [
      {id: "ITEM0001", name: '黄焖鸡', price: 18.00, count: 1, subTotal: 18.00},
      {id: "ITEM0013", name: '肉夹馍', price: 6.00, count: 2, subTotal: 12.00},
      {id: "ITEM0022", name: '凉皮', price: 8.00, count: 1, subTotal: 8.00}
    ];
    let saveType = [
      {type: '指定菜品半价', discountTotal: 25, save: 13},
    ];
    let result = print(subTotalItems, saveType);
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
  });

  it("should generate best charge when best is 指定菜品半价", function(){
    let subTotalItems = [
      {id: "ITEM0013", name: '肉夹馍', price: 6.00, count: 4, subTotal: 24.00},
      {id: "ITEM0022", name: '凉皮', price: 8.00, count: 1, subTotal: 8.00}
    ];
    let saveType = [
      {type: '满30减6元', save: 6, discountTotal: 26}
    ];
    let result = print(subTotalItems, saveType);
    let receipt =  `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：26元
===================================`.trim()
    expect(reult).toEqual(receipt);
  });
  it('should generate best charge when no promotion can be used', function(){
    let subTotalItems = [
      {id: "ITEM0013", name: '肉夹馍', price: 6.00, count: 4, subTotal: 24.00},
    ];
    let saveType = null;
    let result  = print(subTotalItems, saveType);
    let receipt = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim()
    expect(result).toEqual(receipt);

  })




});







































