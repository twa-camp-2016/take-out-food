describe('Take out food', function () {

  let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
  it('should splitInputs', ()=> {
    let splitInputs = splitedInputs(inputs);
    let test = [['ITEM0001 ', ' 1'], ['ITEM0013 ', ' 2'], ['ITEM0022 ', ' 1']];
    expect(splitInputs).toEqual(test);
  })

  let splitInputs = [['ITEM0001 ', ' 1'], ['ITEM0013 ', ' 2'], ['ITEM0022 ', ' 1']];
  let items = loadAllItems();
  beforeEach(() => {
    items = [{
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
  })
  it('should buildCountItemes', ()=> {
    let countItems = buildCountItems(splitInputs, items);
    let test = [{
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
        }, count: 2
      }, {
        item: {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00
        }, count: 1
      }];

    expect(countItems).toEqual(test);
  })

  let countItems = [{
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
      }, count: 2
    }, {
      item: {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00
      }, count: 1
    }];

  let promotions = loadPromotions();
  beforeEach(() => {
    [{
      type: '满30减6元'
    }, {
      type: '指定菜品半价',
      items: ['ITEM0001', 'ITEM0022']
    }]
  })
  it('should buildReceiptItems', ()=> {
    let receiptItems = buildReceiptItems(countItems, promotions);
    let test = [{
      countItem: {
        item: {
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00
        },
        count: 1
      },
      actual: 18,
      halfSaved: 9,
    },
      {
        countItem: {
          item: {
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          }, count: 2
        },
        actual: 12,
        halfSaved: 0,
      }, {
        countItem: {
          item: {
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          }, count: 1
        },
        actual: 8,
        halfSaved: 4,
      }];
    expect(receiptItems).toEqual(test);
  })

  let receiptItems = [{
    countItem: {
      item: {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00
      },
      count: 1
    },
    actual: 18,
    halfSaved: 9,
  },
    {
      countItem: {
        item: {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00
        }, count: 2
      },
      actual: 12,
      halfSaved: 0,
    }, {
      countItem: {
        item: {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00
        }, count: 1
      },
      actual: 8,
      halfSaved: 4,
    }];
  it('selectPromotion', ()=> {
    let receipt = selectpromotion(receiptItems);
    let test = {
      receiptItems: [{
        countItem: {
          item: {
            id: 'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count: 1
        },
        actual: 18,
        halfSaved: 9,
      },
        {
          countItem: {
            item: {
              id: 'ITEM0013',
              name: '肉夹馍',
              price: 6.00
            }, count: 2
          },
          actual: 12,
          halfSaved: 0,
        }, {
          countItem: {
            item: {
              id: 'ITEM0022',
              name: '凉皮',
              price: 8.00
            }, count: 1
          },
          actual: 8,
          halfSaved: 4,

        }],
      promotion: '指定菜品半价',
      saved: 13,
      tatol: 25
    };
    expect(receipt).toEqual(test);
  })

  let receipt = {
    receiptItems: [{
      countItem: {
        item: {
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00
        },
        count: 1
      },
      actual: 18,
      halfSaved: 9,
      subtotal: 9
    },
      {
        countItem: {
          item: {
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          }, count: 2
        },
        actual: 12,
        halfSaved: 0,
        subtotal: 12
      }, {
        countItem: {
          item: {
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          }, count: 1
        },
        actual: 8,
        halfSaved: 4,
        subtotal: 4
      }],
    promotion: '指定菜品半价',
    saved: 13,
    tatol: 25
  };
  it('buildReceiptText', ()=> {
    let receiptText = buildReceiptText(receipt);
    let test = `============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`;
    expect(receiptText).toEqual(test);
  })


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
