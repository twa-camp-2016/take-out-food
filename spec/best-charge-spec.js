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

  describe('choose Charge', ()=> {

    it('should choose charge  指定菜品半价', function () {
      let cartItems = [
        {
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
      let chargedItems = chooseCharge(cartItems);
      let expeted = {
        cartItems: cartItems,
        promotion: {
          originTotal: 38,
          promotionType: '指定菜品半价',
          saved: 13,
          names: ['黄焖鸡', '凉皮'],
        }
      }
      expect(chargedItems).toEqual(expeted);
    });

    it('should return chargeItems no promotion', ()=> {

      let cartItems = [
        {
          item: {
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count: 4,
          originCost: 24
        }
      ];
      let chargedItems = chooseCharge(cartItems);
      let expeted = {
        cartItems: cartItems,
        promotion: {
          originTotal: 24,
          promotionType: undefined,
          saved: 0,
          names: [],
        }
      }
      expect(chargedItems).toEqual(expeted);
    });

    it('should choose charge 满30减6 ', ()=> {
      let cartItems = [
        {
          item: {
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count: 4,
          originCost: 24
        },
        {
          item: {
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          },
          count: 1,
          originCost: 8
        }
      ];
      let chargedItems = chooseCharge(cartItems);
      let expeted = {
        cartItems: cartItems,
        promotion: {
          originTotal: 32,
          promotionType: '满30减6元',
          saved: 6,
          names: [],
        }
      }
      expect(chargedItems).toEqual(expeted);
    })
  });

  describe('build recript', ()=> {
    it('return receipt of promotion 指定菜品半价', ()=> {
      let chargeItems = {
        cartItems: [
          {
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
        promotion: {
          originTotal: 38,
          promotionType: '指定菜品半价',
          saved: 13,
          names: ['黄焖鸡', '凉皮'],
        }
      }
      let receipt = buildReceipt(chargeItems);
      const expeted = {
        chargeItems: chargeItems,
        total: 25
      }

      expect(receipt).toEqual(expeted);
    });
  });

  describe('receipt text', ()=> {
    it('should return text when best is 指定菜品半价', function () {
      let receipt = {
        chargeItems: {
          cartItems: [
            {
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
          promotion: {
            originTotal: 38,
            promotionType: '指定菜品半价',
            saved: 13,
            names: ['黄焖鸡', '凉皮'],
          }
        },
        total: 25
      };
      let receiptText = buildReceiptText(receipt).trim();
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
===================================`.trim();
      expect(receiptText).toEqual(expected)
    });

    it('should return text when best is 满30减6元', function () {
      let receipt = {
        chargeItems: {
          cartItems: [
            {
              item: {
                id: 'ITEM0013',
                name: '肉夹馍',
                price: 6.00
              },
              count: 4,
              originCost: 24
            },
            {
              item: {
                id: 'ITEM0022',
                name: '凉皮',
                price: 8.00
              },
              count: 1,
              originCost: 8
            }
          ],
          promotion: {
            originTotal: 32,
            promotionType: '满30减6元',
            saved: 6,
            names: [],
          }
        },
        total: 26
      };
      let receiptText = buildReceiptText(receipt).trim();
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
      expect(receiptText).toEqual(expected);
    });

    it('should return text when no promotion ', function () {
      let receipt = {
        chargeItems: {
          cartItems: [
            {
              item: {
                id: 'ITEM0013',
                name: '肉夹馍',
                price: 6.00
              },
              count: 4,
              originCost: 24
            }
          ],
          promotion: {
            originTotal: 24,
            promotionType: undefined,
            saved: 0,
            names: [],
          }
        },
        total: 24
      };
      let receiptText = buildReceiptText(receipt).trim();
      let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim()
      expect(receiptText).toEqual(expected);
    });

  });

});
