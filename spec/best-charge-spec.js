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

describe("formatItems" ,function(){
  it("should return formatted of selectItems",function(){
    let selectedItems = ["ITEM0013 x 2"];
    let result = formatItems(selectedItems);
    expect(result).toEqual(
      [
        {
          id:"ITEM0013",
          count:2
        }
      ]
    )
  });
});

describe("getDetailItems",function(){
  it("should return detailResult of formatted and allItems",function(){
    let formatted =
      [
        {
          id:"ITEM0001",
          count:2
        }
      ];
    let allItems =
      [{
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
    let result = getDetailItems(formatted,allItems);
    expect(result).toEqual(
      [{
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count:2
      }
      ]
    )
  });
});

describe("getSubtotal",function(){
  it("should return subtotal from detailItems",function(){
    let detailItems =
      [{
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count:2
      }
      ];
    let result = getSubtotal(detailItems);
    expect(result).toEqual(
      [{
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count:2,
        subtotal:36.00
      }
      ]
    )
  });
});

describe("getOriginTotal", function(){
  it("should return originTotal of subtotal",function(){
    let subtotal =
      [{
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count:2,
        subtotal:36.00
      }
      ];
    result = getOriginTotal(subtotal);
    expect(result).toEqual(
      {
        originTotal:36.00
      }
    )
  });
});
