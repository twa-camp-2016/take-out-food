describe('format', function () {
  it('should get has formated input', function () {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let expected = [
      {
        id: 'ITEM0001',
        amount: 1
      },
      {
        id: 'ITEM0013',
        amount: 2
      },
      {
        id: 'ITEM0022',
        amount: 1
      },
    ]
    expect(formatInputs(inputs)).toEqual(expected);
  });
});
describe('findCartItems', function () {
  it('should get all informations of the cartItems', function () {
    let ids = [
      {
        id: 'ITEM0001',
        amount: 1
      },
      {
        id: 'ITEM0013',
        amount: 2
      },
      {
        id: 'ITEM0022',
        amount: 1
      },
    ]
    let expected = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        amount: 1
      },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        amount: 2
      },
      {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        amount: 1
      },
    ]
    expect(findCartItems(ids, loadAllItems())).toEqual(expected);
  });
});
describe('caculaSubTotal', function () {
  it('should get subTotal no promotion', function () {
    let cartItems = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        amount: 1
      },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        amount: 2
      },
      {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        amount: 1
      },
    ]
    let expected = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        amount: 1,
        subTotal: 18.00
      },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        amount: 2,
        subTotal: 12.00
      },
      {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        amount: 1,
        subTotal: 8
      },
    ]
    expect(calculaSubTotal(cartItems)).toEqual(expected);
  });
});

describe('calculaTotal', function () {
  it('should get total', function () {
    let subTotalItems = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        amount: 1,
        subTotal: 18.00
      },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        amount: 2,
        subTotal: 12.00
      },
      {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        amount: 1,
        subTotal: 8
      },
    ]
    let expected = 38.00;
    expect(calculaTotal(subTotalItems)).toEqual(expected);
  });
});
describe('calculaSavedMoney', function () {
  it('should get savedMoney', function () {
    let subTotalItems = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        amount: 1,
        subTotal: 18.00
      },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        amount: 2,
        subTotal: 12.00
      },
      {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        amount: 1,
        subTotal: 8
      },
    ]
    let expected = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        amount: 1,
        subTotal: 18.00,
        savedMoney: 9
      },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        amount: 2,
        subTotal: 12.00,
        savedMoney: 0
      },
      {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        amount: 1,
        subTotal: 8,
        savedMoney: 4
      },
    ];
    expect(calculaSavedMoney(subTotalItems, loadPromotions())).toEqual(expected);
  });
});
describe('calculaNewSubTotal', function () {
  it('should get newSubTotal', function () {
    let savedMoneyItems = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        amount: 1,
        subTotal: 18.00,
        savedMoney: 9
      },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        amount: 2,
        subTotal: 12.00,
        savedMoney: 0
      },
      {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        amount: 1,
        subTotal: 8,
        savedMoney: 4
      },
    ];
    let expected = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        amount: 1,
        subTotal: 18.00,
        savedMoney: 9,
        newSubTotal: 9
      },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        amount: 2,
        subTotal: 12.00,
        savedMoney: 0,
        newSubTotal: 12
      },
      {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        amount: 1,
        subTotal: 8,
        savedMoney: 4,
        newSubTotal: 4
      },
    ];
    expect(calculaNewSubTotal(savedMoneyItems)).toEqual(expected);
  });
});

describe('calculaNewTotal', function () {
  it('should get the best charge', function () {
    let newSubTotalItems = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        amount: 1,
        subTotal: 18.00,
        savedMoney: 9,
        newSubTotal: 9
      },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        amount: 2,
        subTotal: 12.00,
        savedMoney: 0,
        newSubTotal: 12
      },
      {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        amount: 1,
        subTotal: 8,
        savedMoney: 4,
        newSubTotal: 4
      },
    ];

    let total = 38, expected = 25;
    expect(calculaNewTotal(newSubTotalItems, total)).toEqual(expected);
  });

});
describe('allSAvedMoney', function () {
  it('should get allSavedMoney', function () {
    let total = 38, newTotal = 25;
    expect(calculaAllSavedMoney(total, newTotal)).toBe(13);
  });
});

describe('print', function () {
  it('print', function () {
    let newSubTotalItems = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        amount: 1,
        subTotal: 18.00,
        savedMoney: 9,
        newSubTotal: 9
      },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        amount: 2,
        subTotal: 12.00,
        savedMoney: 0,
        newSubTotal: 12
      },
     {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00,
        amount: 1,
        subTotal: 8,
        savedMoney: 4,
        newSubTotal: 4
      },
    ];
    let expected = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡,凉皮)，省13元
-----------------------------------
总计：25元
===================================`.trim()
    let total = 38, newTotal = 25, savedMoney = 13;
    expect(print(newSubTotalItems, loadPromotions(), total, newTotal, savedMoney)).toEqual(expected);

  });

});
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
指定菜品半价(黄焖鸡,凉皮)，省13元
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
