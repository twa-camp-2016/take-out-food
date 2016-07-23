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

describe("parseSelectedItems",function(){
  it("parseSelectedItems", function(){
    let selectedItems = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let result = parseSelectedItems(selectedItems);
    let parsedItems = [
      {
        id: "ITEM0001",
        count:1
      },
      {
        id: "ITEM0013",
        count: 2
      },
      {
        id: "ITEM0022",
        count: 1
      }
    ];
    expect(result).toEqual(parsedItems)
  })

});

describe("getCartItemsCount",function(){
   it("getCartItemsCount", function(){
   let parsedItems = [
   {
   id: "ITEM0001",
   count:1
   },
   {
   id: "ITEM0013",
   count: 2
   },
   {
   id: "ITEM0022",
   count: 1
   }
   ];
   let Items = loadAllItems();
   let result = getCartItemsCount(Items,parsedItems);
   let cartItemsCount = [
   {
   id: 'ITEM0001',
   name: '黄焖鸡',
   price: 18.00,
   count:1

   },
   {
   id: 'ITEM0013',
   name: '肉夹馍',
   price: 6.00,
   count:2
   },
   {
   id: 'ITEM0022',
   name: '凉皮',
   price: 8.00,
   count:1
   }];
   expect(result).toEqual(cartItemsCount);
   })
});

describe("getCartItemsCountType", function(){
  it("getCartItemsCountType", function(){
    let promotionItems = loadPromotions();
    let cartItemsCount = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count:1

      },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count:2
      },
      {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        count:1
      }];
    let result = getCartItemsCountType(cartItemsCount,promotionItems);
    let cartItemsCountType = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count:1,
        type:'指定菜品半价'
      },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count:2,
        type:'满30减6元'
      },
      {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        count:1,
        type:'指定菜品半价'
      }
    ];
    expect(result).toEqual(cartItemsCountType);
  })
});

describe("getPromotionItems",function(){
  it("getPromotionItems", function(){
    let cartItemsCountType = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count:1,
        type:'指定菜品半价'
      },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count:2,
        type:'满30减6元'
      },
      {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        count:1,
        type:'指定菜品半价'
      }
    ];
    let result  = getPromotionItems(cartItemsCountType);
    let promotionItems = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count:1,
        type:'指定菜品半价',
        promotionPrice:9.00,
        promotionedPrice:9.00
      },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count:2,
        type:'满30减6元',
        promotionPrice:0.00,
        promotionedPrice:12.00
      },
      {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        count:1,
        type:'指定菜品半价',
        promotionPrice:4,
        promotionedPrice:4
      }];
    expect(result).toEqual(promotionItems)
  })

});

describe("getSubTotal", function {
  it("getSubTotal",function(){
    let promotionItems = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count:1,
        type:'指定菜品半价',
        promotionPrice:9.00,
        promotionedPrice:9.00
      },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count:2,
        type:'满30减6元',
        promotionPrice:0.00,
        promotionedPrice:12.00
      },
      {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        count:1,
        type:'指定菜品半价',
        promotionPrice:4,
        promotionedPrice:4
      }];
    let result= getSubTotal(promotionItems);
    let subTotalItems = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count:1,
        type:'指定菜品半价',
        promotionPrice:9.00,
        promotionedPrice:9.00,
        subTotal:18.00
      },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count:2,
        type:'满30减6元',
        promotionPrice:0.00,
        promotionedPrice:12.00,
        subTotal:12.00
      },
      {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        count:1,
        type:'指定菜品半价',
        promotionPrice:4,
        promotionedPrice:4,
        subTotal:8.00
      };
    expect(result).toEqual(subTotalItems);
  })

});

describe("getSaveMoney",function(){
  it("getSaveMoney", function(){
    let promotionItems = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count:1,
        type:'指定菜品半价',
        promotionPrice:9.00,
        promotionedPrice:9.00
      },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count:2,
        type:'满30减6元',
        promotionPrice:0.00,
        promotionedPrice:12.00
      },
      {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        count:1,
        type:'指定菜品半价',
        promotionPrice:4,
        promotionedPrice:4
      }];
    let result = getSaveMoney(promotionItems);
    let saveMoney = 13.00;
    expect(result).toEqual(saveMoney);
  })
});
describe("getTotal", function(){
  it("getTotal",function(){
    let promotionItems = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count:1,
        type:'指定菜品半价',
        promotionPrice:9.00,
        promotionedPrice:9.00
      },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count:2,
        type:'满30减6元',
        promotionPrice:0.00,
        promotionedPrice:12.00
      },
      {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        count:1,
        type:'指定菜品半价',
        promotionPrice:4,
        promotionedPrice:4
      }];
    let result = getTotal(promotionItems);
    let total = 25.00;
    expect(result).toEqual(total);
  })

});


