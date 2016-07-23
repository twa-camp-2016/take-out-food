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

});

describe('formatTags', function () {
  it('should format tags with id and count', function () {
    let tags = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let expected = [{id: 'ITEM0001', count: 1}, {id: 'ITEM0013', count: 2}, {id: 'ITEM0022', count: 1}];
    let formatedTags = formatTags(tags);

    expect(formatedTags).toEqual(expected);
  })
});

describe('getMenuItems', function () {
  it('should return menuItems with count and allItems', function () {
    let formatedTags = [{id: 'ITEM0001 ', count: 1}, {id: 'ITEM0013 ', count: 2}];
    let allItems = [{id: 'ITEM0001 ', name: '黄焖鸡', price: 18.00}, {id: 'ITEM0013 ', name: '肉夹馍', price: 6.0}];
    let expected = [{id: 'ITEM0001 ', name: '黄焖鸡', price: 18.00, count: 1}, {
      id: 'ITEM0013 ',
      name: '肉夹馍',
      price: 6.00,
      count: 2
    }];
    let menuItems = getMenuItems(formatedTags, allItems);
    expect(menuItems).toEqual(expected);
  });
});

describe('getSubTotal', function () {
  it('should return menuItems with subTotal', function () {
    let menuItems = [{id: 'ITEM0001 ', name: '黄焖鸡', price: 18.00, count: 1}];
    let expected = [{id: 'ITEM0001 ', name: '黄焖鸡', price: 18.00, count: 1, subTotal: 18.00}];
    let result = getSubTotal(menuItems);
    expect(result).toEqual(expected);
  });
});

describe('getPromotedMenuItems', function () {
  it('should return promotedMenuItems with type', function () {
    let test = [{id: 'ITEM0001', name: '黄焖鸡', price: 18.00, count: 1, subTotal: 18.00}];
    let promotedItems = [{
      type: '满30减6元'
    }, {
      type: '指定菜品半价',
      items: ['ITEM0001', 'ITEM0022']
    }];
    let expected = [{id: 'ITEM0001', name: '黄焖鸡', price: 18.00, count: 1, subTotal: 18.00, type: '指定菜品半价'}];
    let result = getPromotedMenuItems(test, promotedItems);
    expect(result).toEqual(expected);
  });
});

describe('getSubSaveMoney', function () {
  it('should return menuItems with saveMoney', function () {
    let test = [{id: 'ITEM0001', name: '黄焖鸡', price: 18.00, count: 1, subTotal: 18.00, type: '指定菜品半价'}];
    let expected = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count: 1,
      subTotal: 18.00,
      type: '指定菜品半价',
      subSaveMoney: 9.00
    }];

    let result = getSubSaveMoney(test);
    expect(result).toEqual(expected);
  });

});

describe('getTotalAndSaveMoney', function () {
  it('should return object with saveMoney and total', function () {
    let test = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count: 1,
      subTotal: 18.00,
      type: '指定菜品半价',
      subSaveMoney: 9.00
    }];
    let expected = {total: 18.00, saveMoney: 9.00};
    let result = getTotalAndSaveMoney(test);
    expect(result).toEqual(expected);
  });

});

describe('choosePromotion', function () {
  it('should return object with saveMoney and total', function () {
    let totalAndSaveMoney = {total: 18.00, saveMoney: 9.00};
    let expected = {promotedType: '指定菜品半价', total: 18.00, saveMoney: 9.00};
    let result = choosePromotion(totalAndSaveMoney);
    expect(result).toEqual(expected);
  });

});

describe('print', function () {
  it('should return receiptString', function () {
    let promotedChoice = {total: 18.00, saveMoney: 9.00, promotedType: '指定菜品半价'};
    let test = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count: 1,
      subTotal: 18.00,
      type: '指定菜品半价',
      subSaveMoney: 9.00
    }];
    let expected = '============= 订餐明细 =============' + '\n' + '黄焖鸡 x 1 = 18元' + '\n' + '-----------------------------------' + '\n' + '使用优惠:' + '\n' + '指定菜品半价(黄焖鸡)，省9元' + '\n' +
      '-----------------------------------' + '\n' + '总计：18元' + '\n' + '==================================='
    let result = print(test, promotedChoice);
    expect(result).toEqual(expected);
  });

});

