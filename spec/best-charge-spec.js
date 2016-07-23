describe('Take out food', function () {

  it('should formatItems', () => {
    const items = [
      'ITEM0001 X 2',
      'ITEM0030 X 4'
    ];
    const expected = [
      {
        id: 'ITEM0001',
        count: 2
      },
      {
        id: 'ITEM0030',
        count: 4
      }
    ];

    let fotmattedItmes = formatItems(items);

    expect(fotmattedItmes).toEqual(expected);
  });

  it('should buildDetailedItems', () => {
    const formatedItems = [
      {
        id: 'ITEM0001',
        count: 4
      },
      {
        id: 'ITEM0030',
        count: 8
      }
    ];
    let allItems = loadAllItems();
    const expected = [
      {
        id: 'ITEM0001',
        count: 4,
        name: '黄焖鸡',
        price: 18.00
      },
      {
        id: 'ITEM0030',
        count: 8,
        name: '冰锋',
        price: 2.00
      }
    ];

    let detailedItems = buildDetailedIems(formatedItems, allItems);

    expect(detailedItems).toEqual(expected);
  });

  it('should buildPromotedItems', () => {
    const detailedItems = [
      {
        id: 'ITEM0001',
        count: 4,
        name: '黄焖鸡',
        price: 18.00
      },
      {
        id: 'ITEM0030',
        count: 8,
        name: '冰锋',
        price: 2.00
      }
    ];
    let promotions = loadPromotions();
    const expected = [
      {
        id: 'ITEM0001',
        count: 4,
        name: '黄焖鸡',
        price: 18.00,
        isHalfPrice: true,
        totalPrice: 72.00
      },
      {
        id: 'ITEM0030',
        count: 8,
        name: '冰锋',
        price: 2.00,
        isHalfPrice: false,
        totalPrice: 16.00
      }
    ];

    let promotedItems = buildPromotedItems(detailedItems, promotions);

    expect(promotedItems).toEqual(expected);
  });

  it('should calculateTotalPrices', () => {
    const promotedItems = [
      {
        id: 'ITEM0001',
        count: 4,
        name: '黄焖鸡',
        price: 18.00,
        isHalfPrice: true,
        totalPrice: 72.00
      },
      {
        id: 'ITEM0030',
        count: 8,
        name: '冰锋',
        price: 2.00,
        isHalfPrice: false,
        totalPrice: 16.00
      }
    ];
    const expected = {
      totalPayPrices: 52,
      totalSaved: 36,
      type: '指定菜品半价'
    };

    let total = calculateTotalPrice(promotedItems);
    expect(total).toEqual(expected);
  });

  it('should buildReceipt', () => {
    const promotedItems = [
      {
        id: 'ITEM0001',
        count: 4,
        name: '黄焖鸡',
        price: 18.00,
        isHalfPrice: true,
        totalPrice: 72.00
      },
      {
        id: 'ITEM0030',
        count: 8,
        name: '冰锋',
        price: 2.00,
        isHalfPrice: false,
        totalPrice: 16.00
      }
    ];
    const total = {
      totalPayPrices: 52,
      totalSaved: 36,
      type: '指定菜品半价'
    };
    const expected = {
      items: [
        {
          name: '黄焖鸡',
          count: 4,
          isHalfPrice: true,
          price: 72
        },
        {
          name: '冰锋',
          count: 8,
          isHalfPrice: false,
          price: 16
        }
      ],
      totalSaved: 36,
      totalPrice: 52,
      promotedType: '指定菜品半价'
    };

    let receipt = buildReceipt(promotedItems, total);
    expect(receipt).toEqual(expected);
  });

  it('should generate best charge when best is 指定菜品半价', function () {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    // let summary = bestCharge([]).trim();
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
