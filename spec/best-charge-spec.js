describe('Take out food', function () {

  describe('getSelectedItems', function () {
    describe('input1',function(){
      let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
      let allItems = [{
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
      it('selectItems', function () {
        let selectItems = getSelectedItems(inputs, allItems);
        let expected = [
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
          }
        ]
        expect(selectItems).toEqual(expected);
      });
    })

  });
  describe('getReceiptItems', function () {
    const selectItems = [
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
      }
    ]
    const allPromotions = [{
      type: '满30减6元'
    }, {
      type: '指定菜品半价',
      items: ['ITEM0001', 'ITEM0022']
    }];
    it('receiptItems', function () {

      const receiptItems = getReceiptItems(selectItems, allPromotions);
      const expected = [{
        selectItem: {
          item: {
            id: 'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count: 1
        },
        promotionsType:'指定菜品半价',
        saved: 9,
        subtotal: 18
      },
        {
          selectItem: {
            item: {
              id: 'ITEM0013',
              name: '肉夹馍',
              price: 6.00
            },
            count: 2
          },
          promotionsType:undefined,
          saved: 0,
          subtotal: 12
        },
        {
          selectItem: {
            item: {
              id: 'ITEM0022',
              name: '凉皮',
              price: 8.00
            },
            count: 1
          },
          promotionsType:'指定菜品半价',
          saved: 4,
          subtotal: 8
        }
      ]
      expect(receiptItems).toEqual(expected);
    });
  });

  describe('findPromotionType', function () {
    const selectItems = 'ITEM0001';
    const allPromotions = [{
      type: '满30减6元'
    }, {
      type: '指定菜品半价',
      items: ['ITEM0001', 'ITEM0022']
    }];
    it('PromotionType', function () {
      const promotions = findPromotionType(selectItems, allPromotions);
      const expected = '指定菜品半价';
      expect(promotions).toEqual(expected);
    });
  });

  describe('calculateSaveAndTotal', function () {
    const receiptItems = [{
      selectItem: {
        item: {
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00
        },
        count: 1
      },
      promotionsType:'指定菜品半价',
      saved: 9,
      subtotal: 18
    },
      {
        selectItem: {
          item: {
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count: 2
        },
        promotionsType:undefined,
        saved: 0,
        subtotal: 12
      },
      {
        selectItem: {
          item: {
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          },
          count: 1
        },
        promotionsType:'指定菜品半价',
        saved: 4,
        subtotal: 8
      }
    ];
    it('SaveAndTotal', function () {

      const totalArr = calculateSaveAndTotal(receiptItems);
      const expected = [13,38];
      expect(totalArr).toEqual(expected);
    });
  });
  describe('getBestCharge', function () {
    const totalArr = [13,38];

    it('PromotionType', function () {
      const promotions = getBestCharge(totalArr);
      const expected = [25,'指定菜品半价'];
      expect(promotions).toEqual(expected);
    });
  });

  it('should generate best charge when best is 指定菜品半价', function() {
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

  it('should generate best charge when best is 满30减6元', function() {
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

  it('should generate best charge when no promotion can be used', function() {
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
