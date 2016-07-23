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
describe("formatTags",function () {                                                    //formatTags
  it("return ids",function () {
    let tags= ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let result=formatTags(tags);
    expect(result).toEqual([
      {
        id:"ITEM0001",
        count:1
      },
      {
        id:"ITEM0013",
        count:2
      },
      {
        id:"ITEM0022",
        count:1
      }
    ]);
  });
});
describe("loadAllItems",function () {                                       //loadAllItems
  it("return items",function () {
    let result=loadAllItems();
    expect(result).toEqual([
      {
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
    }
    ]);
  });
});
describe("getItemsCount",function () {                                  //getItemsCount
  it("return itemsCount",function () {
    let ids=[
      {
        id:"ITEM0001",
        count:1
      },
      {
        id:"ITEM0013",
        count:2
      },
      {
        id:"ITEM0022",
        count:1
      }
    ];
    let items=[
      {
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
      }
    ];
    let result=getItemsCount(items,ids);
    expect(result).toEqual([
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count:1
      }, {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count:2
      }, {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        count:1
      }
    ]);
  });
});
describe("getItemsSubtotal",function () {                                  //getItemsSubtotal
  it("return itemsSubtotal",function () {
      let itemsCount=[
        {
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00,
          count:1
        }, {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00,
          count:2
        }, {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00,
          count:1
        }
      ];
      let result=getItemsSubtotal(itemsCount);
      expect(result).toEqual([
        {
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00,
          count:1,
          subtotal:18
        }, {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00,
          count:2,
          subtotal:12
        }, {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00,
          count:1,
          subtotal:8
        }
      ]);
  });
});
describe("loadPromotions",function () {                                 //loadPromotions
  it("return promotions",function () {
    let result=loadPromotions();
    expect(result).toEqual([
      {
        type: '满30减6元'
      }, {
        type: '指定菜品半价',
        items: ['ITEM0001', 'ITEM0022']
      }
    ]);
  });
});
describe("getPromotion",function () {                                   //getPromotion
  it("return promotion",function () {
    let itemsSubtotal=[
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count:1,
        subtotal:18
      }, {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count:2,
        subtotal:12
      }, {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        count:1,
        subtotal:8
      }
    ];
    let promotions=[
      {
        type: '满30减6元'
      },
      {
        type: '指定菜品半价',
        items: ['ITEM0001', 'ITEM0022']
      }
    ];
    let result=getPromotion(itemsSubtotal,promotions);
    expect(result).toEqual({
      type: '指定菜品半价',
      names: ['黄焖鸡', '凉皮'],
      save:13
    });
  });
});
describe("spliceString",function () {                           //spliceString
  it("return receipt",function () {
    let itemsSubtotal=[
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count:1,
        subtotal:18
      }, {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count:2,
        subtotal:12
      }, {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        count:1,
        subtotal:8
      }
    ];
    let promotion={
      type:'指定菜品半价',
      save:13,
      names:['黄焖鸡','凉皮']
    };
    let result=spliceString(itemsSubtotal,promotion);
    expect(result).toEqual(`============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`);
  });
});





/*
 describe("",function () {
 it("",function () {

 });
 });
*/













