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

describe("despiteItemsAmount",function(){
  it("should return the itemAmounts",function(){
    let selectedItems = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let itemAmounts = [{
      id: 'ITEM0001',
      amount:1},
      {
        id: 'ITEM0013',
        amount:2
      },
      {
        id: 'ITEM0022',
        amount:1
      }];
    expect(despiteItemsAmount(selectedItems)).toEqual(itemAmounts);
  });
});

describe("matchCartItems",function(){
  it("should return the cartItems",function(){
    let itemAmounts = [{
      id: 'ITEM0001',
      amount:1},
      {
        id: 'ITEM0013',
        amount:2
      },
      {
        id: 'ITEM0022',
        amount:1
      }];
    let cartItems =  [{
      id: 'ITEM0001',
      amount:1,
      name: '黄焖鸡',
      price: 18.00
    }, {
      id: 'ITEM0013',
      amount:2,
      name: '肉夹馍',
      price: 6.00
    }, {
      id: 'ITEM0022',
      amount:1,
      name: '凉皮',
      price: 8.00
    }];
expect(matchCartItems(itemAmounts)).toEqual(cartItems);
  });
});

describe("matchCartItems",function(){
  it("should return the cartItems",function(){
    let cartItems = [{
      id: 'ITEM0001',
      amount:1,
      name: '黄焖鸡',
      price: 18.00
    }, {
      id: 'ITEM0013',
      amount:2,
      name: '肉夹馍',
      price: 6.00
    }, {
      id: 'ITEM0022',
      amount:1,
      name: '凉皮',
      price: 8.00
      }];
    let promotedTypes =  [{
      id: 'ITEM0001',
      amount:1,
      name: '黄焖鸡',
      price: 18.00,
      type: '指定菜品半价'
    }, {
      id: 'ITEM0013',
      amount:2,
      name: '肉夹馍',
      price: 6.00,
      type: '满30减6元'
    }, {
      id: 'ITEM0022',
      amount:1,
      name: '凉皮',
      price: 8.00,
      type: '指定菜品半价'
    }];
    expect(mergePromoteTypes(cartItems)).toEqual(promotedTypes);
  });
});

describe("calculateSubtotals",function(){
  it("should return the subtotals",function(){
    let promotedTypes =  [{
      id: 'ITEM0001',
      amount:1,
      name: '黄焖鸡',
      price: 18.00,
      type: '指定菜品半价'
    }, {
      id: 'ITEM0013',
      amount:2,
      name: '肉夹馍',
      price: 6.00
    }, {
      id: 'ITEM0022',
      amount:1,
      name: '凉皮',
      price: 8.00,
      type: '指定菜品半价'
    }];
    let subtotals =  [{
      id: 'ITEM0001',
      amount:1,
      name: '黄焖鸡',
      price: 18.00,
      type: '指定菜品半价',
      subtotal:18.00
    }, {
      id: 'ITEM0013',
      amount:2,
      name: '肉夹馍',
      price: 6.00,
      subtotal:12.00
    }, {
      id: 'ITEM0022',
      amount:1,
      name: '凉皮',
      price: 8.00,
      type: '指定菜品半价',
      subtotal:8.00
    }];
    expect(calculateSubtotals(promotedTypes)).toEqual(subtotals);
  });
});

describe("calculateAlltotals",function(){
  it("should return the alltotals",function(){
    let subtotals =  [{
      id: 'ITEM0001',
      amount:1,
      name: '黄焖鸡',
      price: 18.00,
      type: '指定菜品半价',
      subtotal:18.00
    }, {
      id: 'ITEM0013',
      amount:2,
      name: '肉夹馍',
      price: 6.00,
      subtotal:12.00
    }, {
      id: 'ITEM0022',
      amount:1,
      name: '凉皮',
      price: 8.00,
      type: '指定菜品半价',
      subtotal:8.00
    }];
    let alltotals =  38;
    expect(calculateAlltotals(subtotals)).toEqual(alltotals);
  });
});

describe("calculatePromotePrice_one",function(){
  it("should return the proTotal1",function(){
    let alltotals =  38;
    let proTotal1 = 32;
    expect(calculatePromotePrice_one(alltotals)).toEqual(proTotal1);
  });
});

describe("calculatePromotePrice_two",function(){
  it("should return the proTotal2",function(){
    let subtotals =  [{
      id: 'ITEM0001',
      amount:1,
      name: '黄焖鸡',
      price: 18.00,
      type: '指定菜品半价',
      subtotal:18.00
    }, {
      id: 'ITEM0013',
      amount:2,
      name: '肉夹馍',
      price: 6.00,
      subtotal:12.00
    }, {
      id: 'ITEM0022',
      amount:1,
      name: '凉皮',
      price: 8.00,
      type: '指定菜品半价',
      subtotal:8.00
    }];
    let proTotal2 = 25;
    expect(calculatPromotePrice_two(subtotals)).toEqual(proTotal2);
  });
});



