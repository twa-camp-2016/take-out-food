describe('Take out food', function () {

  it('should print correct orderItems', ()=> {
    const selectedItems = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    const allItems = loadAllItems();
    const expectCartItems = [
      {
        item: {
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18
        },
        count: 1
      },
      {
        item: {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6
        },
        count: 2
      },
      {
        item: {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8
        },
        count: 1
      }
    ];
    const orderItems = buildOrderItems(selectedItems, allItems);
    expect(orderItems).toEqual(expectCartItems);
  });

  it('should print correct receiptItems', ()=> {
    const inputOrderItems = [
      {
        item: {
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18
        },
        count: 1
      },
      {
        item: {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6
        },
        count: 2
      },
      {
        item: {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8
        },
        count: 1
      }
    ];
    const receiptItems = buildReceiptItems(inputOrderItems);
    const expectReceiptItems = [
      {
        orderItem: {
          item: {
            id: 'ITEM0001',
            name: '黄焖鸡',
            price: 18
          },
          count: 1
        },
        subtotal: 18
      },
      {
        orderItem: {
          item: {
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6
          },
          count: 2
        },
        subtotal: 12
      },
      {
        orderItem: {
          item: {
            id: 'ITEM0022',
            name: '凉皮',
            price: 8
          },
          count: 1
        },
        subtotal: 8
      }
    ];

    expect(receiptItems).toEqual(expectReceiptItems);
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

});
