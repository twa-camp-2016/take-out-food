describe('Take out food', function () {

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


describe('formateIds', function () {
  it('formateIds(selectedItems)', function () {
      let selectedItems = ["ITEM0001 x 1"];

      let expected = [
        {
          id: "ITEM0001",
          count: 1
        }
      ];

      let result = formateIds(selectedItems);
      expect(result).toEqual(expected)
  });
});

describe('getHalfId', function () {
  it('getHalfId(promotions)', function () {
     let promotions = [{
       type: '满30减6元'
     }, {
       type: '指定菜品半价',
       items: ['ITEM0001', 'ITEM0022']
     }];

     let halfIds = ['ITEM0001', 'ITEM0022'];
     let result = getHalfId(promotions);

     expect(result).toEqual(halfIds);

  })
})

describe('getItemsInfo', function () {
  it('getItemsInfo(ids, allItems)', function () {
    let ids = [
      {
        id: "ITEM0001",
        count: 1
      }
    ];

    let allItems = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00
    }];

    let itemsInfo = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count: 1
    }];

    let result = getItemsInfo(ids, allItems);

    expect(result).toEqual(itemsInfo);
  });
})

describe('getSubtotal', function () {
  it('getSubtotal(itemsInfo)', function () {
    let itemsInfo = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count: 1
    }];

    let itemSubtotal = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count: 1,
      subtotal: 18
    }];

    let result = getSubtotal(itemsInfo);

    expect(result).toEqual(itemSubtotal)
  })
})

describe('getAllTotal', function () {
  it('getAllTotal(itemSbutotal)', function () {
    let itemSubtotal = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count: 1,
        subtotal: 18
      }, {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count: 1,
        subtotal: 6
      }
    ];

    let total = 24;
    let result = getAllTotal(itemSubtotal);

    expect(result).toEqual(total)
  })
})

describe('getScondSubtotal', function () {
  it('getScondSubtotal(firstSubtotal, halfIds)',function () {
      let halfIds = ['ITEM0001', 'ITEM0022'];

      let itemSubtotal = [
        {
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00,
          count: 1,
          subtotal: 18
        }, {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00,
          count: 1,
          subtotal: 6
        }
      ];
      let secondSubtotal = getScondSubtotal(itemSubtotal, halfIds)

      let result = [
        {
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00,
          count: 1,
          subtotal: 18,
          secondSubtotal: 9,
          secondSave: 9
        }, {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00,
          count: 1,
          subtotal: 6,
          secondSubtotal: 6,
          secondSave: 0
        }
      ];

      expect(result).toEqual(secondSubtotal)

    });
})

describe('getFirstAllSave', function () {
  it('getFirstAllSave(total)', function () {
    let total = 36;
    let result = getFirstAllSave(total);
    let firstAllSave = 6;
    expect(result).toEqual(firstAllSave);
  })
})

describe('getSecondAllSave', function () {
  it('getSecondAllSave(secondSubtotal)', function () {

    let secondSubtotal = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count: 1,
        subtotal: 18,
        secondSubtotal: 9,
        secondSave: 9
      }, {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count: 1,
        subtotal: 6,
        secondSubtotal: 6,
        secondSave: 0
      }
    ];

    let secondAllSave = 9;
    let result = getSecondAllSave(secondSubtotal);

    expect(result).toEqual(secondAllSave)
  });
})

describe('getSecondAllSubtotal', function () {
  it('getSecondAllSubtotal(secondSubtotal)', function () {

    let secondSubtotal = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count: 1,
        subtotal: 18,
        secondSubtotal: 9,
        secondSave: 9
      }, {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count: 1,
        subtotal: 6,
        secondSubtotal: 6,
        secondSave: 0
      }
    ];

    let secondAllSubtotal = 15;
    let result = getSecondAllSubtotal(secondSubtotal);

    expect(result).toEqual(secondAllSubtotal)
  });
})

describe('judge', function () {
  it('judge(firstAllSave, secondAllSave, secondAllSubtotal, total)', function () {
    let firstAllSave = 0;
    let secondAllSave = 0;
    let total = 24;
    let secondAllSubtotal = 0;
    let result = judge(firstAllSave, secondAllSave, secondAllSubtotal, total);

    let exp = {
      total: 24,
      type: 'null'
    };

    expect(result).toEqual(exp)
  });
})
