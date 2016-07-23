describe('Take out food', function () {
  let allItems = loadAllItems();
  let promotions = loadPromotions();
  let tags = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];

  it('should generate best charge when best is 指定菜品半价', function() {
    let tags = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = bestCharge(tags);
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
===================================`;
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when best is 满30减6元', function() {
    let tags = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let summary = bestCharge(tags);
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：26元
===================================`;
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when no promotion can be used', function() {
    let tags = ["ITEM0013 x 4"];
    let summary = bestCharge(tags);
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`;
    expect(summary).toEqual(expected)
  });

  it('buildCartItems', () => {
    const expectCartItems = [
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
      },
      {
        item: {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00
        },
        count: 1
      }];
    expect(buildCartItems(tags, allItems)).toEqual(expectCartItems);
  });

  it('buildReceiptItems', () => {
    const cartItems = [
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
      },
      {
        item: {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00
        },
        count: 1
      }];

    const expectReceiptItems = [
      {
        carItem: {
        item: {
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00
        },
        count: 1
      },
        subOrigin: 18.00,
        saved: 9.00
      },
      {
        carItem: {
          item: {
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count: 2
        },
        subOrigin: 12.00,
        saved: 0.00
      },
      {
        cartItem: {
          item: {
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          },
          count: 1
        },
        subOrigin: 8.00,
        saved: 4.00
      }];
    expect(buildReceiptItems(cartItems,promotions)).toEqual(expectReceiptItems);
  });

  it('buildReceipt', () => {
    const receiptItems = [
      {
        carItem: {
          item: {
            id: 'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count: 1
        },
        subOrigin: 18.00,
        saved: 9.00
      },
      {
        carItem: {
          item: {
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count: 2
        },
        subOrigin: 12.00,
        saved: 0.00
      },
      {
        cartItem: {
          item: {
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          },
          count: 1
        },
        subOrigin: 8.00,
        saved: 4.00
      }];

    const expectReceipt = {
      receiptItems: [
        {
          carItem: {
            item: {
              id: 'ITEM0001',
              name: '黄焖鸡',
              price: 18.00
            },
            count: 1
          },
          subOrigin: 18.00,
          saved: 9.00
        },
        {
          carItem: {
            item: {
              id: 'ITEM0013',
              name: '肉夹馍',
              price: 6.00
            },
            count: 2
          },
          subOrigin: 12.00,
          saved: 0.00
        },
        {
          cartItem: {
            item: {
              id: 'ITEM0022',
              name: '凉皮',
              price: 8.00
            },
            count: 1
          },
          subOrigin: 8.00,
          saved: 4.00
        }],
      total: 25.00,
      savedTotal: 13.00,
      type:'指定菜品半价'
    };
    expect(buildReceipt(receiptItems)).toEqual(expectReceipt);
  });

});
