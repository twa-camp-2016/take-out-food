describe('Take out food', function () {
  it('1111', function () {
    let allItems = loadAllItems();
    let expected = [{
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

    expect(allItems).toEqual(expected);
  })
  it('getCountIdItems', function () {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = getCountIdItems(inputs);
    let expected = [
      {
        id: 'ITEM0001',
        count: 1
      },
      {
        id: 'ITEM0013',
        count: 2
      },
      {
        id: 'ITEM0022',
        count: 1
      }]
    expect(summary).toEqual(expected)
  });
  it('buildInformationItems', function () {
    let inputs = [
      {
        id: 'ITEM0001',
        count: 1
      },
      {
        id: 'ITEM0013',
        count: 2
      },
      {
        id: 'ITEM0022',
        count: 1
      }];
    let allItems = loadAllItems();
    let summary = getInformationItems(inputs, allItems);
    let expected = [
      {
        id: 'ITEM0001',
        count: 1,
        name: '黄焖鸡',
        price: 18.00
      },
      {
        id: 'ITEM0013',
        count: 2,
        name: '肉夹馍',
        price: 6.00
      },
      {
        id: 'ITEM0022',
        count: 1,
        name: '凉皮',
        price: 8.00
      }];
    expect(summary).toEqual(expected);
  });
  it('buildPromotedItems', function () {
    let inpputs = [
      {
        id: 'ITEM0001',
        count: 1,
        name: '黄焖鸡',
        price: 18.00
      },
      {
        id: 'ITEM0013',
        count: 2,
        name: '肉夹馍',
        price: 6.00
      },
      {
        id: 'ITEM0022',
        count: 1,
        name: '凉皮',
        price: 8.00
      }];
    let promotions = loadPromotions();
    let promotedItems = buildPromotedItems(inpputs, promotions);
    let expected = {
      promotedInfos: [
        {
          id: 'ITEM0001',
          count: 1,
          name: '黄焖鸡',
          price: 18.00,
          payPrice: 9,
          saved: 9
        },
        {
          id: 'ITEM0013',
          count: 2,
          name: '肉夹馍',
          price: 6.00,
          payPrice: 12,
          saved: 0
        },
        {
          id: 'ITEM0022',
          count: 1,
          name: '凉皮',
          price: 8.00,
          payPrice: 4,
          saved: 4
        }
      ],
      promotedType: '指定菜品半价'
    };
    expect(promotedItems).toEqual(expected);
  });
  it('calculateTotalPrice', function () {
    let promotedItems = {
      promotedInfos: [
        {
          id: 'ITEM0001',
          count: 1,
          name: '黄焖鸡',
          price: 18.00,
          payPrice: 9,
          saved: 9
        },
        {
          id: 'ITEM0013',
          count: 2,
          name: '肉夹馍',
          price: 6.00,
          payPrice: 12,
          saved: 0
        },
        {
          id: 'ITEM0022',
          count: 1,
          name: '凉皮',
          price: 8.00,
          payPrice: 4,
          saved: 4
        }
      ],
      promotedType: '指定菜品半价'
    };

    let summary = calculatePrice(promotedItems);
    let expected = {
      totalPayPrice: 25,
      totalSaved: 13
    }
    expect(summary).toEqual(expected);
  });
  it('buildReceiptModel',function () {
    let promotedItems = {
      promotedInfos: [
        {
          id: 'ITEM0001',
          count: 1,
          name: '黄焖鸡',
          price: 18.00,
          payPrice: 9,
          saved: 9
        },
        {
          id: 'ITEM0013',
          count: 2,
          name: '肉夹馍',
          price: 6.00,
          payPrice: 12,
          saved: 0
        },
        {
          id: 'ITEM0022',
          count: 1,
          name: '凉皮',
          price: 8.00,
          payPrice: 4,
          saved: 4
        }
      ],
      promotedType: '指定菜品半价'
    };
    let totalPrice = {
      totalPayPrice: 25,
      totalSaved: 13
    };
    let summary = buildReceiptModel(promotedItems,totalPrice);
    let expected = {
      promotedInfos: [
        {
          id: 'ITEM0001',
          count: 1,
          name: '黄焖鸡',
          price: 18.00,
          payPrice: 9,
          saved: 9
        },
        {
          id: 'ITEM0013',
          count: 2,
          name: '肉夹馍',
          price: 6.00,
          payPrice: 12,
          saved: 0
        },
        {
          id: 'ITEM0022',
          count: 1,
          name: '凉皮',
          price: 8.00,
          payPrice: 4,
          saved: 4
        }
      ],
      promotedType: '指定菜品半价',
      totalPayPrice: 25,
      totalSaved: 13
    };
    expect(summary).toEqual(expected);
  })
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
