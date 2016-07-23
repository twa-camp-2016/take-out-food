describe('Take out food', function () {

  xit('should generate best charge when best is 指定菜品半价', function () {
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

  xit('should generate best charge when best is 满30减6元', function () {
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

  xit('should generate best charge when no promotion can be used', function () {
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

  it('should add count and return Array nameed cartItems ', ()=> {
    const tags = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    const cartItems = buildCartItems(tags);
    let expected = [
      {
        item: {
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00
        },
        count: 1,
        originCost: 18,
      }, {
        item: {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00
        },
        count: 2,
        originCost: 12
      }, {
        item: {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00
        },
        count: 1,
        originCost: 8
      }];

    expect(cartItems).toEqual(expected);
  });

  it('should build origin receipitItems', ()=> {
    let cartItems = [{
      item: {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00
      },
      count: 1,
      originCost: 18
    }, {
      item: {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00
      },
      count: 2,
      originCost: 12
    }, {
      item: {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00
      },
      count: 1,
      originCost: 8
    }];
    let originReceiptItems = buildOriginReceiptItems(cartItems);
    let expeted = {cartItems: cartItems, originTotal: 38}
    expect(originReceiptItems).toEqual(expeted);
  });

  describe('choose Charge', ()=> {

    it('should choose charge  指定菜品半价', function () {
      let originReceiptItems = {
        cartItems: [{
          item: {
            id: 'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count: 1,
          originCost: 18
        }, {
          item: {
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count: 2,
          originCost: 12
        }, {
          item: {
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          },
          count: 1,
          originCost: 8
        }],
        originTotal: 38
      }
      let chargedItems = chooseCharge(originReceiptItems);
      let expeted = {
        originReceiptItems: originReceiptItems,
        promotionMessage: {
          promotionType: '指定菜品半价',
          names: ['黄焖鸡', '凉皮'],
        },
        save: 13,
        total: 25,
      }
      expect(chargedItems).toEqual(expeted);
    });

    it('should return originTotal', ()=> {
      let originReceiptItems = {
        cartItems: [{
          item: {
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          },
          count: 4,
          originCost: 32
        }],
        originTotal: 32
      }
      let expeted = {
        originReceiptItems: originReceiptItems,
        promotionMessage: {
          promotionType: undefined,
          names: undefined,
        },
        save: 13,
        total: 25,
      }
    })
  });

  it('compare two promotion way',()=> {
    let halfReceiptItems = {
      originReceiptItems: {
        cartItems: [{
          item: {
            id: 'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count: 1,
          originCost: 18
        }, {
          item: {
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count: 2,
          originCost: 12
        }, {
          item: {
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          },
          count: 1,
          originCost: 8
        }],
        originTotal: 38
      },
      promotionMessage: {
        promotionType: '指定菜品半价',
        names: ['黄焖鸡', '凉皮'],
      },
      save: 13,
      total: 25,
    };
    let receiptItems = comparePromotions(halfReceiptItems);
    let expected = {
      halfPriceItems:halfReceiptItems,
      lastSave:13,
      lastTotal:25
    }

    expect(receiptItems).toEqual(expected);
  });

});
