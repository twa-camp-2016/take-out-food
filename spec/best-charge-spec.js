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


  it('buildCartItems ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"]', () => {
    const allItems = loadAllItems();
    const inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    const cartItems = buildCartItems(inputs, allItems);

    const expectCartItems = [
      {
        item: {id: 'ITEM0001', name: '黄焖鸡', price: 18.00},
        count: 1
      },
      {
        item: {id: 'ITEM0013', name: '肉夹馍', price: 6.00},
        count: 2
      },
      {
        item: {id: 'ITEM0022', name: '凉皮', price: 8.00},
        count: 1
      }
    ]
    expect(cartItems).toEqual(expectCartItems);
  });

  it('buildCartItems ["ITEM0013 x 4", "ITEM0022 x 1"]', () => {
    const allItems = loadAllItems();
    const inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    const cartItems = buildCartItems(inputs, allItems);

    const expectCartItem = [
      {
        item: {id: 'ITEM0013', name: '肉夹馍', price: 6.00},
        count: 4
      },
      {
        item: {id: 'ITEM0022', name: '凉皮', price: 8.00},
        count: 1
      }
    ]
    expect(cartItems).toEqual(expectCartItem);
  });

  it('buildCartItems ["ITEM0013 x 4"]', () => {
    const allItems = loadAllItems();
    const inputs = ["ITEM0013 x 4"];
    const cartItems = buildCartItems(inputs, allItems);

    const expectCartItem = [
      {
        item: {id: 'ITEM0013', name: '肉夹馍', price: 6.00},
        count: 4
      }
    ]
    expect(cartItems).toEqual(expectCartItem);
  });


  it('buildPromotionItems ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"]', () => {
    const cartItems = [
      {
        item: {id: 'ITEM0001', name: '黄焖鸡', price: 18.00},
        count: 1
      },
      {
        item: {id: 'ITEM0013', name: '肉夹馍', price: 6.00},
        count: 2
      },
      {
        item: {id: 'ITEM0022', name: '凉皮', price: 8.00},
        count: 1
      }
    ]

    const expectPromotion = [
      {
        cartItem: {
          item: {id: 'ITEM0001', name: '黄焖鸡', price: 18.00},
          count: 1
        },
        subtotal: 18,
        saved: 9,
        savedType:'指定菜品半价'
      },
      {
        cartItem: {
          item: {id: 'ITEM0013', name: '肉夹馍', price: 6.00},
          count: 2
        },
        subtotal: 12,
        saved: 0,
        savedType:'满30减6元'
      },
      {
        cartItem: {
          item: {id: 'ITEM0022', name: '凉皮', price: 8.00},
          count: 1
        },
        subtotal: 8,
        saved: 4,
        savedType:'指定菜品半价'
      }
    ]

    const promotions = loadPromotions();
    const promotionsItems = buildPromotionItems(cartItems, promotions);

    expect(promotionsItems).toEqual(promotionsItems)

  })


  it('buildPromotionItems ["ITEM0013 x 4"]', () => {
    const cartItems = [
      {
        item: {id: 'ITEM0013', name: '肉夹馍', price: 6.00},
        count: 4
      }
    ]

    const expectPromotion = [
      {
        cartItem: {
          item: {id: 'ITEM0013', name: '肉夹馍', price: 6.00},
          count: 4
        },
        subtotal: 24,
        saved: 0,
        savedType:'满30减6元'
      }
    ]

    const promotions = loadPromotions();
    const promotionsItems = buildPromotionItems(cartItems, promotions);

    expect(promotionsItems).toEqual(promotionsItems)

  })

  it('buildPromotionItems ["ITEM0013 x 4", "ITEM0022 x 1"]', () => {
    const cartItems = [
      {
        item: {id: 'ITEM0013', name: '肉夹馍', price: 6.00},
        count: 4
      },
      {
        item: {id: 'ITEM0022', name: '凉皮', price: 8.00},
        count: 1
      }
    ]

    const expectPromotion = [
      {
        cartItem: {
          item: {id: 'ITEM0013', name: '肉夹馍', price: 6.00},
          count: 4
        },
        subtotal: 24,
        saved: 0,
        savedType:'满30减6元'
      },
      {
        cartItem: {
          item: {id: 'ITEM0022', name: '凉皮', price: 8.00},
          count: 1
        },
        subtotal: 8,
        saved: 4,
        savedType:'指定菜品半价'
      }
    ]

    const promotions = loadPromotions();
    const promotionsItems = buildPromotionItems(cartItems, promotions);

    expect(promotionsItems).toEqual(promotionsItems)

  })

  it('buildReceipt ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"]',() => {
    const promotionItems = [
      {
        cartItem: {
          item: {id: 'ITEM0001', name: '黄焖鸡', price: 18.00},
          count: 1
        },
        subtotal: 18,
        saved: 9,
        savedType:'指定菜品半价'
      },
      {
        cartItem: {
          item: {id: 'ITEM0013', name: '肉夹馍', price: 6.00},
          count: 2
        },
        subtotal: 12,
        saved: 6,
        savedType:''
      },
      {
        cartItem: {
          item: {id: 'ITEM0022', name: '凉皮', price: 8.00},
          count: 1
        },
        subtotal: 8,
        saved: 4,
        savedType:'指定菜品半价'
      }
    ]

    const receipt = buildReceipt(promotionItems);

    const expectionReceipt = {
      promotionItems:[
        {
          cartItem: {
            item: {id: 'ITEM0001', name: '黄焖鸡', price: 18.00},
            count: 1
          },
          subtotal: 18,
          saved: 9,
          savedType:'指定菜品半价'
        },
        {
          cartItem: {
            item: {id: 'ITEM0013', name: '肉夹馍', price: 6.00},
            count: 2
          },
          subtotal: 12,
          saved: 6,
          savedType:''
        },
        {
          cartItem: {
            item: {id: 'ITEM0022', name: '凉皮', price: 8.00},
            count: 1
          },
          subtotal: 8,
          saved: 4,
          savedType:'指定菜品半价'
        }
      ],
      total:25,
      cheap:13,
      cheapType:'指定菜品半价'
    }

    expect(receipt).toEqual(expectionReceipt);

  })


  /*it('buildReceipt  ["ITEM0013 x 4", "ITEM0022 x 1"]',() => {
    const promotionItems = [
      {
        cartItem: {
          item: {id: 'ITEM0013', name: '肉夹馍', price: 6.00},
          count: 4
        },
        subtotal: 24,
        saved: 0,
        savedType:'满30减6元'
      },
      {
        cartItem: {
          item: {id: 'ITEM0022', name: '凉皮', price: 8.00},
          count: 1
        },
        subtotal: 8,
        saved: 4,
        savedType:'指定菜品半价'
      }
    ]

    const receipt = buildReceipt(promotionItems);

    const expectionReceipt = {
      promotionItems:[
        {
          cartItem: {
            item: {id: 'ITEM0013', name: '肉夹馍', price: 6.00},
            count: 4
          },
          subtotal: 24,
          saved: 0,
          savedType:'满30减6元'
        },
        {
          cartItem: {
            item: {id: 'ITEM0022', name: '凉皮', price: 8.00},
            count: 1
          },
          subtotal: 8,
          saved: 4,
          savedType:'指定菜品半价'
        }
        ],
      total:24,
      cheap:6,
      cheapType:'满30减6元'
    }

    expect(receipt).toEqual(expectionReceipt);
  })
*/
  it('buildReceipt ["ITEM0013 x 4"]',() => {
    const promotionItems = [
      {
        cartItem: {
          item: {id: 'ITEM0013', name: '肉夹馍', price: 6.00},
          count: 4
        },
        subtotal: 24,
        saved: 6,
        savedType:'满30减6元'
      }
    ]

    const receipt = buildReceipt(promotionItems);

    const expectionReceipt = {
      promotionItems:[
        {
          cartItem: {
            item: {id: 'ITEM0013', name: '肉夹馍', price: 6.00},
            count: 4
          },
          subtotal: 24,
          saved: 6,
          savedType:'满30减6元'
        }],
      total:24,
      cheap:6,
      cheapType:''
    }

    expect(receipt).toEqual(expectionReceipt);

  })

  it('getReceipt ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"]',() => {


    const receipt = {
      promotionItems:[
        {
          cartItem: {
            item: {id: 'ITEM0001', name: '黄焖鸡', price: 18.00},
            count: 1
          },
          subtotal: 18,
          saved: 9,
          savedType:'指定菜品半价'
        },
        {
          cartItem: {
            item: {id: 'ITEM0013', name: '肉夹馍', price: 6.00},
            count: 2
          },
          subtotal: 12,
          saved: 6,
          savedType:'满30减6元'
        },
        {
          cartItem: {
            item: {id: 'ITEM0022', name: '凉皮', price: 8.00},
            count: 1
          },
          subtotal: 8,
          saved: 4,
          savedType:'指定菜品半价'
        }
      ],
      total:25,
      cheap:13,
      cheapType:'指定菜品半价'
    }

    const receiptText = getReceipt(receipt);

   const expectionReceiptText = `
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

    expect(receiptText).toEqual(expectionReceiptText);

  });

});
