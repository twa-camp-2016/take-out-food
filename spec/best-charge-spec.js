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

  it('#1should countId ', function () {
    const tags =
      ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"]

    let countedId = countId(tags);

    expected = [
      {id: 'ITEM0001 ', count: 1},
      {id: 'ITEM0013 ', count: 2},
      {id: 'ITEM0022 ', count: 1}

    ]


    expect(countedId).toEqual(expected)

  });
  it('#2should buildMenuItems', function () {
    const countIds = [
      {id: 'ITEM0001 ', count: 1},
      {id: 'ITEM0013 ', count: 2},
      {id: 'ITEM0022 ', count: 1}

    ]
    let allItems = loadAllItems();
    let menuItems = buildMenuItems(countIds,allItems);
    expected = [
      {id: 'ITEM0001 ', name: '黄焖鸡', price: 18, count: 1,},
      {id: 'ITEM0013 ', name: '肉夹馍', price: 6, count: 2,},
      {id: 'ITEM0022 ', name: '凉皮', price: 8, count: 1,},

    ]
  expect(menuItems).toEqual(expected);

  });

  it('#3should buildPromoted', function () {
const menuItems =[
  {id: 'ITEM0001 ', name: '黄焖鸡', price: 18, count: 1,},
  {id: 'ITEM0013 ', name: '肉夹馍', price: 6, count: 2,},
  {id: 'ITEM0022 ', name: '凉皮', price: 8, count: 1,}
  ]

  let promotions = loadPromotions();
    let promotedMenu = buildPromotedMenu(menuItems,promotions);
    expected=[
      {id: 'ITEM0001 ', name: '黄焖鸡', price: 18, count: 1,payPrice:9,saved:9},
      {id: 'ITEM0013 ', name: '肉夹馍', price: 6, count: 2,payPrice:12,saved:0},
      {id: 'ITEM0022 ', name: '凉皮', price: 8, count: 1,payPrice:4,saved:4},

    ]
    expect(promotedMenu).toEqual(expected);
  });

  it('#4should calateTotal', function () {
  const promotions =[
    {id: 'ITEM0001 ', name: '黄焖鸡', price: 18, count: 1,payPrice:9,saved:9},
    {id: 'ITEM0013 ', name: '肉夹馍', price: 6, count: 2,payPrice:12,saved:0},
    {id: 'ITEM0022 ', name: '凉皮', price: 8, count: 1,payPrice:4,saved:4},
  ]
    let totalPrices= calateTotal(promotions);
    expected={
      totalPayPrice:25,
      totalSaved:13
    }
    expect(totalPrices).toEqual(expected);
  });
  it('#5should calateTotal', function () {
    const promotions =[
      {id: 'ITEM0013 ', name: '肉夹馍', price: 6, count: 2,payPrice:12,saved:0},
      {id: 'ITEM0001 ', name: '黄焖鸡', price: 18, count: 1,payPrice:9,saved:9},
     ]

    const totalPrices={
      totalPayPrice:21,
        totalSaved:9
    }
    let receipt = buildRecipt(promotions,totalPrices);
    expected={
      promoteItems:[
        {id: 'ITEM0013 ', name: '肉夹馍', price: 6, count: 2,payPrice:12,saved:0},
      {  id: 'ITEM0001 ', name: '黄焖鸡', price: 18, count: 1,payPrice:9,saved:9},
      ],
      totalPayPrice:21,
      totalSaved:9
    }
  expect(receipt).toEqual(expected);
  });
});
