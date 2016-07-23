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
===================================`.trim();
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
===================================`.trim();
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
===================================`.trim();
    expect(summary).toEqual(expected)
  });

  it('buildSelectedItems', ()=> {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    const allItems = loadAllItems();
    let selectedItems = buildSelectedItems(inputs, allItems);
    let expectSelectedItems = [{
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
      }, {
        item: {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00
        },
        count: 1
      }];
    expect(selectedItems).toEqual(expectSelectedItems);
  });

  it('buildReceipt', ()=> {

    let selectedItemsArray = [
      {
        item: {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00
        },
        count: 4
      }, {
        item: {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00
        },
        count: 1
      }
    ];
    const receipt = buildReceipt(selectedItemsArray, loadPromotions());
    const expectReceipt = {
      receiptItems: [{
        selectedItem: {
          item: {
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count: 4
        }, subtotal: 24
      },
        {
          selectedItem: {
            item: {
              id: 'ITEM0022',
              name: '凉皮',
              price: 8.00
            },
            count: 1
          }, subtotal: 8
        }], total: 26, type: '满30减6元'
    };

    expect(receipt).toEqual(expectReceipt);
  });

  it('buildReceipt', ()=> {

    let selectedItemsArray = [
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
      }, {
        item: {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00
        },
        count: 1
      }
    ];
    const receipt = buildReceipt(selectedItemsArray, loadPromotions());
    const expectReceipt = {
      receiptItems: [{
        selectedItem: {
          item: {
            id: 'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count: 1
        }, subtotal: 9,
        saved: 9
      },
        {
          selectedItem: {
            item: {
              id: 'ITEM0013',
              name: '肉夹馍',
              price: 6.00
            },
            count: 2
          }, subtotal: 12,
          saved: 0
        },
        {
          selectedItem: {
            item: {
              id: 'ITEM0022',
              name: '凉皮',
              price: 8.00
            },
            count: 1
          }, subtotal: 4,
          saved: 4
        }], total: 25, savedTotal: 13, type: '指定菜品半价'
    };

    expect(receipt).toEqual(expectReceipt);
  });


  it('buildHalfPriceReceipt', ()=> {

    let selectedItems = [{
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
      }, {
        item: {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00
        },
        count: 1
      }];
    ;

    let harfPriceReceipt = buildHalfPriceItems(selectedItems, loadPromotions());
    let expectHarfPriceReceipt = [{
      selectedItem: {
        item: {
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00
        },
        count: 1
      }, subtotal: 9, saved: 9
    },
      {
        selectedItem: {
          item: {
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count: 2
        }, subtotal: 12, saved: 0
      },
      {
        selectedItem: {
          item: {
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          },
          count: 1
        }, subtotal: 4, saved: 4
      }];

    expect(harfPriceReceipt).toEqual(expectHarfPriceReceipt);
  });


  it('buildSpecifiesItems', ()=> {
    let selectedItems = [
      {
        item: {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00
        },
        count: 4
      }, {
        item: {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00
        },
        count: 1
      }];
    const items = buildTotalDiscountItems(selectedItems, loadPromotions());
    let expectItems = [{
      selectedItem: {
        item: {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00
        },
        count: 4
      }, subtotal: 24
    },
      {
        selectedItem: {
          item: {
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          },
          count: 1
        },
        subtotal: 8
      }];
    expect(items).toEqual(expectItems);
  })

  it('receiptText', ()=> {
    const receipt = {
      receiptItems: [{
        selectedItem: {
          item: {
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count: 4
        }, subtotal: 24
      },
        {
          selectedItem: {
            item: {
              id: 'ITEM0022',
              name: '凉皮',
              price: 8.00
            },
            count: 1
          }, subtotal: 8
        }], total: 26
    };
    const text = buildReceiptText(receipt);

    const expectText = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：26元
===================================`.trim();

    expect(text).toEqual(expectText);

  })
});
