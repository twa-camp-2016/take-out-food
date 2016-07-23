describe('Take out food', function () {

  describe('buildCartItems', function () {
    const inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    // const allItems = loadAllItems();
    const allItems = [{
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

    it('get cartItems', function () {
      const cartItems = buildCartItems(inputs, allItems);
      const expected = [{
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
        }
      ]
      expect(cartItems).toEqual(expected);
    });
  });

  describe('buildReceiptItems', function () {
    const cartItems = [{
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
      }
    ]

    let allPromotions = [{
      type: '满30减6元'
    }, {
      type: '指定菜品半价',
      items: ['ITEM0001', 'ITEM0022']
    }];

    it('get promotionType',function () {
      const type = findPromotionType( 'ITEM0001',allPromotions);
      const expected = '指定菜品半价';
      expect(type).toEqual(expected);
    });

    it('get recriptItems', function () {
      const receiptItems = buildReceiptItems(cartItems,allPromotions);
      const expected = [
        {
          cartItem: {
            item: {
              id: 'ITEM0001',
              name: '黄焖鸡',
              price: 18.00
            },
            count: 1
          },
          halfSave: 9.00,
          subtotal: 18.00,
          promotionType:'指定菜品半价'
        },
        {
          cartItem: {
            item: {
              id: 'ITEM0013',
              name: '肉夹馍',
              price: 6.00
            },
            count: 2
          },
          halfSave: 0,
          subtotal: 12.00,
          promotionType:undefined
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
          halfSave: 4.00,
          subtotal: 8.00,
          promotionType:'指定菜品半价'
        }
      ]
      expect(receiptItems).toEqual(expected);
    });
  });

  describe('buildReceipt',function () {
    const receiptItems = [

      {
        cartItem: {
          item: {
            id: 'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count: 1
        },
        halfSave: 9.00,
        subtotal: 18.00,
        promotionType:'指定菜品半价'
      },
      {
        cartItem: {
          item: {
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count: 2
        },
        halfSave: 0,
        subtotal: 12.00,
        promotionType:undefined
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
        halfSave: 4.00,
        subtotal: 8.00,
        promotionType:'指定菜品半价'
      }
    ]

    it('get receipt',function () {
      const receipt = buildReceipt(receiptItems);
      const expected = {
        receiptItems:[
          {
            cartItem: {
              item: {
                id: 'ITEM0001',
                name: '黄焖鸡',
                price: 18.00
              },
              count: 1
            },
            halfSave: 9.00,
            subtotal: 18.00,
            promotionType:'指定菜品半价'
          },
          {
            cartItem: {
              item: {
                id: 'ITEM0013',
                name: '肉夹馍',
                price: 6.00
              },
              count: 2
            },
            halfSave: 0,
            subtotal: 12.00,
            promotionType:undefined
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
            halfSave: 4.00,
            subtotal: 8.00,
            promotionType:'指定菜品半价'
          }
        ],
        promotionType:'指定菜品半价',
        total:25.00,
        saveTotal:13.00,
        cart:'(黄焖鸡，凉皮)'
      }
      expect(receipt).toEqual(expected);
    });
  });

  describe('buildReceiptText',function () {
    const receipt = {
      receiptItems:[
        {
          cartItem: {
            item: {
              id: 'ITEM0001',
              name: '黄焖鸡',
              price: 18.00
            },
            count: 1
          },
          halfSave: 9.00,
          subtotal: 18.00,
          promotionType:'指定菜品半价'
        },
        {
          cartItem: {
            item: {
              id: 'ITEM0013',
              name: '肉夹馍',
              price: 6.00
            },
            count: 2
          },
          halfSave: 0,
          subtotal: 12.00,
          promotionType:undefined
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
          halfSave: 4.00,
          subtotal: 8.00,
          promotionType:'指定菜品半价'
        }
      ],
      promotionType:'指定菜品半价',
      total:25.00,
      saveTotal:13.00,
      cart:'(黄焖鸡，凉皮)'
    }
    it('get receiptText',function () {
      const receiptText = buildReceiptText(receipt);
      const expected = `
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
      expect(receiptText).toEqual(expected);
    });
  });

  it('should generate best charge when best is 指定菜品半价', function () {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim()
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
    let summary = bestCharge(inputs).trim()
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
    let summary = bestCharge(inputs).trim()
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim()
    expect(summary).toEqual(expected)
  });
});
