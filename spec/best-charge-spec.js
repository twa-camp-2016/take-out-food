describe('Take out food', function () {

  it('should build orderedItems', function () {
    const selectedItems = ["ITEM0001 x 1", "ITEM0013 x 2"];
    const allItems = loadAllItems();
    const orderedItems = buildOrderedItems(selectedItems, allItems);

    expect(orderedItems).toEqual([
      {
        item: {
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00
        },
        count: 1
      },
      {
        item: {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00
        },
        count: 2
      }
    ]);
  });

  it('should build chargeItems', function () {
    const selectedItems = ["ITEM0001 x 1", "ITEM0013 x 2"];
    const oderedItems = buildOrderedItems(selectedItems, loadAllItems());
    const chargeItems = buildChargeItems(oderedItems, loadPromotions());

    expect(chargeItems).toEqual([
      {
        orderedItem: {
          item: {
            id: 'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count: 1
        },
        subtotal: 18.00
      },
      {
        orderedItem: {
          item: {
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count: 2
        },
        subtotal: 12.00
      }
    ]);
  });

  // it('should build charge', function () {
  //
  //   const selectedItems = ["ITEM0001 x 1", "ITEM0013 x 2"];
  //   const oderedItems = buildOrderedItems(selectedItems, loadAllItems());
  //   const chargeItems = buildChargedItems(oderedItems, loadPromotions());
  //
  //   const charge = buildCharge(chargeItems, loadPromotions());
  //
  //   expect(charge).toEqual(
  //     {
  //       chargeItems: [{
  //         orderedItem: {
  //           item: {
  //             id: 'ITEM0001',
  //             name: '黄焖鸡',
  //             price: 18.00
  //           },
  //           count: 1
  //         },
  //         subtotal: 18.00
  //       },
  //         {
  //           orderedItem: {
  //             item: {
  //               id: 'ITEM0013',
  //               name: '肉夹馍',
  //               price: 6.00
  //             },
  //             count: 2
  //           },
  //           subtotal: 12.00
  //         }],
  //       promotion: {
  //         type: '指定菜品半价',
  //         items: ['ITEM0001']
  //       },
  //       total: 21.00,
  //       savedTotal: 9.00
  //     });
  // });


  it('should build charge', function () {
    const selectedItems = ["ITEM0001 x 1", "ITEM0013 x 2"];
    const oderedItems = buildOrderedItems(selectedItems, loadAllItems());
    const chargeItems = buildChargeItems(oderedItems, loadPromotions());

    const charge = buildCharge(chargeItems, loadPromotions());

    expect(charge).toEqual(
      {
        chargeItems: [{
          orderedItem: {
            item: {
              id: 'ITEM0001',
              name: '黄焖鸡',
              price: 18.00
            },
            count: 1
          },
          subtotal: 18.00
        },
          {
            orderedItem: {
              item: {
                id: 'ITEM0013',
                name: '肉夹馍',
                price: 6.00
              },
              count: 2
            },
            subtotal: 12.00
          }],
        promotion: {
          promotionType: '指定菜品半价',
          promotedItems: ['黄焖鸡']
        },
        total: 21.00,
        savedTotal: 9.00
      });
  });


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

})
;
