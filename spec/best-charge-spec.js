describe('Take out food', function () {

  it('should generate best charge when best is 指定菜品半价', function() {
    let tag = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = bestCharge(tag).trim();
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
    let tag = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let summary = bestCharge(tag).trim();
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
    let tag = ["ITEM0013 x 4"];
    let summary = bestCharge(tag).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

});
describe("formatTag",function(){
  it("should return a barcodes",function(){
    let tag= ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let expectResult  = [
      {
        id: "ITEM0001",
        count: 1
      },
      {
        id: "ITEM0013",
        count: 2
      },
      {
        id: "ITEM0022",
        count:1
      }
    ]
    let result = formatTag(tag)
    expect(result).toEqual(expectResult)
  })
})
describe("getCartItems",function(){
  it("should return cartItems",function(){
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
    let barcodes = [
      {
        id: "ITEM0001",
        count: 1
      },
      {
        id: "ITEM0013",
        count: 2
      },
      {
        id: "ITEM0022",
        count:1
      }
    ]
    let result = getCartItems(items,barcodes)
    let expectResult = [
      {
        id: "ITEM0001",
        name: '黄焖鸡',
        price: 18.00,
        count: 1
      },
      {
        id: "ITEM0013",
        name: '肉夹馍',
        price: 6.00,
        count: 2
      },
      {
        id: "ITEM0022",
        name: '凉皮',
        price: 8.00,
        count:1
      }
    ]
    expect(result).toEqual(expectResult)

  })
})
describe("getSubTotalItems",function(){
  it("should return subTotalItems",function(){
    let cartItems = [
      {
        id: "ITEM0001",
        name: '黄焖鸡',
        price: 18.00,
        count: 1
      },
      {
        id: "ITEM0013",
        name: '肉夹馍',
        price: 6.00,
        count: 2
      },
      {
        id: "ITEM0022",
        name: '凉皮',
        price: 8.00,
        count:1
      }
    ]
    let result = getSubTotalItems(cartItems)
    let expectResult = [
      {
        id: "ITEM0001",
        name: '黄焖鸡',
        price: 18.00,
        count: 1,
        subTotal: 18
      },
      {
        id: "ITEM0013",
        name: '肉夹馍',
        price: 6.00,
        count: 2,
        subTotal:12
      },
      {
        id: "ITEM0022",
        name: '凉皮',
        price: 8.00,
        count:1,
        subTotal:8
      }
    ]
    expect(result).toEqual(expectResult)
  })
})
describe("calculateTotal",function(){
  it("should return a total",function(){
    let subTotalItems = [
      {
        id: "ITEM0001",
        name: '黄焖鸡',
        price: 18.00,
        count: 1,
        subTotal: 18
      },
      {
        id: "ITEM0013",
        name: '肉夹馍',
        price: 6.00,
        count: 2,
        subTotal:12
      },
      {
        id: "ITEM0022",
        name: '凉皮',
        price: 8.00,
        count:1,
        subTotal:8
      }
    ]
    let result = calculateTotal(subTotalItems)
    let expectResult = 38
    expect(result).toEqual(expectResult)
  })
})
describe("getPromotionsTypeItems",function(){
  it("should return promotionsTypeItems",function(){
    let subTotalItems = [
      {
        id: "ITEM0001",
        name: '黄焖鸡',
        price: 18.00,
        count: 1,
        subTotal: 18
      },
      {
        id: "ITEM0013",
        name: '肉夹馍',
        price: 6.00,
        count: 2,
        subTotal:12
      },
      {
        id: "ITEM0022",
        name: '凉皮',
        price: 8.00,
        count:1,
        subTotal:8
      }
    ]
    let promotions = [{
      type: '满30减6元'
    }, {
      type: '指定菜品半价',
      items: ['ITEM0001', 'ITEM0022']
    }];
    let result = getPromotionsTypeItems(subTotalItems,promotions)
    let expectResult = [
      {
        id: "ITEM0001",
        name: '黄焖鸡',
        price: 18.00,
        count: 1,
        subTotal: 18,
        type:'指定菜品半价'
      },
      {
        id: "ITEM0013",
        name: '肉夹馍',
        price: 6.00,
        count: 2,
        subTotal:12,
        type:null
      },
      {
        id: "ITEM0022",
        name: '凉皮',
        price: 8.00,
        count:1,
        subTotal:8,
        type:'指定菜品半价'
      }
    ]

    expect(result).toEqual(expectResult)
  })
})
describe("getUsedPromotionsTypeItems",function(){
  it("should return result of type and promotionsTotal",function(){
    let promotionsTypeItems = [
      {
        id: "ITEM0001",
        name: '黄焖鸡',
        price: 18.00,
        count: 1,
        subTotal: 18,
        type:'指定菜品半价'
      },
      {
        id: "ITEM0013",
        name: '肉夹馍',
        price: 6.00,
        count: 2,
        subTotal:12,
        type:null
      },
      {
        id: "ITEM0022",
        name: '凉皮',
        price: 8.00,
        count:1,
        subTotal:8,
        type:'指定菜品半价'
      }
    ]
    let total = 38
    let result = getUsedPromotionsTypeItems(promotionsTypeItems,total)
    let expectResult = {usedType:'指定菜品半价',promotionsTotal:25}
    expect(result).toEqual(expectResult)
  })
})
describe("calculateSaving",function(){
  it("should return a saving",function(){
    let total = 38
    let result1 = {usedType:'指定菜品半价',promotionsTotal:25}
    let result = calculateSaving(total,result1)
    let expectResult = 13
    expect(result).toEqual(expectResult)
  })
})
describe("getSummary",function(){
  it("return a string",function(){
    let promotionsTypeItems=[
      {
        id: "ITEM0001",
        name: '黄焖鸡',
        price: 18.00,
        count: 1,
        subTotal: 18,
        type:'指定菜品半价'
      },
      {
        id: "ITEM0013",
        name: '肉夹馍',
        price: 6.00,
        count: 2,
        subTotal:12,
        type:null
      },
      {
        id: "ITEM0022",
        name: '凉皮',
        price: 8.00,
        count:1,
        subTotal:8,
        type:'指定菜品半价'
      }
    ]
    let result1 = {usedType:'指定菜品半价',promotionsTotal:25}
    let saving = 13
    let result = getSummary(promotionsTypeItems,saving,result1)
    let expectResult =  `
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
expect(result).toEqual(expectResult)
  })
})
