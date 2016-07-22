describe("test spiltItems",function () {
  it("test one",function() {
     let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
     let result=spiltItems(inputs);
     let expected=[
      {
        id:"ITEM0001",
        amount:1
      },
      {
        id:"ITEM0013",
        amount:2
      },
      {
        id:"ITEM0022",
        amount:1
      }
    ];
    expect(result).toEqual(expected);
  })
});
describe("test loadAllItems",function () {
  it("test two",function () {
    let input=[
      {
        id:"ITEM0001",
        amount:1
      },
      {
        id:"ITEM00013",
        amount:2
      },
      {
        id:"ITEM0022",
        amount:1
      }
    ];
    let expected=[
      {
        id:"ITEM0001",
        amount:1,
        name: '黄焖鸡',
        price: 18.00
      },
      {
        id:"ITEM0013",
        amount:2,
        name: '肉夹馍',
        price: 6.00
      },
      {
        id:"ITEM0022",
        amount:1,
        name: '凉皮',
        price: 8.00
      }
    ];
    let loadItems=loadItemsInformation(spilted,allItems);
    expect(loadItems).toEqual(expected);
  })
});


/*describe('Take out food', function () {

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

})*/
