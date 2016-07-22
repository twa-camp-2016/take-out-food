describe ('formateTags test',function(){
  it('foramteTags : ',function(){
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let result = formateTags(inputs);
    expect(result).toEqual([{id:"ITEM0001",count:1},{id:"ITEM0013",count:2},{id:"ITEM0022",count:1}]);
  });
});

describe ('matchId test',function(){
  it('matchId : ',function(){
    let inputs1 = [{id:"ITEM0001",count:1},{id:"ITEM0013",count:2},{id:"ITEM0022",count:1}];
    let inputs2 = [{
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

    let result = matchId(inputs1,inputs2);
    expect(result).toEqual(    [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count:1
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      count:2
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00,
      count:1
    }]);
  });
});

describe ('noProSubTotal test',function(){
  it('noProSubTotal : ',function(){
    let inputs = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count:1
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      count:2
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00,
      count:1
    }]
    let result = noProSubTotal(inputs);
    expect(result).toEqual( [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count:1,
      subTotal:18
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      count:2,
      subTotal:12
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00,
      count:1,
      subTotal:8
    }]);
  });
});

describe ('total test',function(){
  it('total : ',function(){
    let inputs = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count:1,
      subTotal:18
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      count:2,
      subTotal:12
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00,
      count:1,
      subTotal:8
    }];
    let result = total(inputs);
    expect(result).toEqual(38);
  });
});

describe ('secondProTypeTotal test',function(){
  it('secondProTypeTotal : ',function(){
    let inputs1 =[{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count:1,
      type:'指定菜品半价'
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      count:2,
      type:'-1'
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00,
      count:1,
      type:'指定菜品半价'
    }];
      let inputs2 =  {
        type: '指定菜品半价',
        items: ['ITEM0001', 'ITEM0022']
      };
    let result = secondProTypeTotal(inputs1,inputs2);
    expect(result).toEqual({
      type: '指定菜品半价',
      total : 25
    });
  });
});


describe ('firstProTypeTotal test',function(){
  it('firstProTypeTotal : ',function(){
    let inputs1 = 38;
    let inputs2 = {
      type: '满30减6元'
    };
    let result = firstProTypeTotal(inputs1,inputs2);
    expect(result).toEqual({ type: '满30减6元',total : 32});
  });
});

describe ('matchSecondProType test',function(){
  it('matchSecondProType : ',function(){
    let inputs1 =  [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count:1
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      count:2
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00,
      count:1
    }];

    let inputs2 =  {
      type: '指定菜品半价',
      items: ['ITEM0001', 'ITEM0022']
    };
    let result = matchSecondProType(inputs1,inputs2);
    expect(result).toEqual([{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count:1,
      type:'指定菜品半价'
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      count:2,
      type:'-1'
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00,
      count:1,
      type:'指定菜品半价'
    }]);
  });
});


describe ('getBestTotalType test',function(){
  it('getBestTotalType : ',function(){

    let inputs1 = {
      type: '满30减6元',
      total : 32
    };
    let inputs2 =  {
      type: '指定菜品半价',
      total : 25
    };
    let result = getBestTotalType(inputs1,inputs2);
    expect(result).toEqual( {
      type: '指定菜品半价',
      total : 25
    });
  });
});


describe ('getProNames test',function(){
  it('getProNames : ',function(){
    let inputs =[{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count:1,
      type:'指定菜品半价'
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      count:2,
      type:'-1'
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00,
      count:1,
      type:'指定菜品半价'
    }];
    let result = getProNames(inputs);
    expect(result).toEqual(['黄焖鸡','凉皮']);
  });
});

describe ('getPromotion test',function(){
  it('getPromotion : ',function(){
    let inputs1 = {
      type: '指定菜品半价',
      total : 25
    };
    let inputs2 = {
      type : '-1',
      total:30
    }
    let result = getPromotion(inputs1,inputs2);
    expect(result).toEqual(5);
  });
});
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
