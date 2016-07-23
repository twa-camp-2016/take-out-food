describe('getSelectedItems',function () {
  it ('转为一个对象叔祖',function () {
    let input=['ITEM0001 x 1'];
    let result=getSelectedItems(input);
    expect(result).toEqual([{id:'ITEM0001',count:1}]);
  })
})

describe('matchItems',function () {
  it ('匹配所有菜品的信息',function () {
    let input=[{id:'ITEM0001',count:1}];
    let allItems=[{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00
    }];
    let result=matchItems(allItems,input);

    expect(result).toEqual([{id:'ITEM0001',count:1,name:'黄焖鸡',price:18.00}])
  })
})


describe('calSubtotal',function () {
  it ('计算小计',function () {
    let input=[{id:'ITEM0001',count:1,name:'黄焖鸡',price:18.00}];
    let result=calSubtotal(input);
    expect(result).toEqual([{id:'ITEM0001',count:1,name:'黄焖鸡',price:18.00,subtotal:18}]);
  })
})

describe('calFirstTotal',function () {
  it ('计算还未打折时的总计',function () {
    let input=[
      {id:'ITEM0001',
      count:1,
      name:'黄焖鸡',
      price:18.00,
      subtotal:18
    },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count:2,
        subtotal:12.00
      }];
    let result=calFirstTotal(input);
    expect(result).toEqual(30);
  })
})

describe('matchPromotionsType',function () {
  it ('匹配已选定的菜品的优惠类型',function () {
    let input1=[
      {id:'ITEM0001',
        count:1,
        name:'黄焖鸡',
        price:18.00,
        subtotal:18
      },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count:2,
        subtotal:12.00
      }];
    let input2=[{
      type: '满30减6元'
    }, {
      type: '指定菜品半价',
      items: ['ITEM0001', 'ITEM0022']
    }];
    let result=matchPromotionsType(input1,input2);
    expect(result).toEqual([   {id:'ITEM0001',
      count:1,
      name:'黄焖鸡',
      price:18.00,
      subtotal:18,
      type:'指定菜品半价'
    },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count:2,
        subtotal:12.00,
        type:''
      }
    ]);
  })
})


describe('calSaving',function () {
  it('计算最优节省金额',function () {
    let input1=[   {id:'ITEM0001',
      count:1,
      name:'黄焖鸡',
      price:18.00,
      subtotal:18,
      type:'指定菜品半价'
    },
    {
      id: 'ITEM0013',
        name: '肉夹馍',
      price: 6.00,
      count:2,
      subtotal:12.00,
      type:''
    }
    ];

    let input2=30;
    let result=calSaving(input1,input2);
    expect(result).toEqual([

      {id:'ITEM0001',
      count:1,
      name:'黄焖鸡',
      price:18.00,
      subtotal:18,
      type:'指定菜品半价'
    },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count:2,
        subtotal:12.00,
        type:''
      },
      {
        saving:9,
        type1:'指定菜品半价'
      }
    ]);
  })
})

describe('calTotal',function () {
  it('计算总金额',function () {
    let input1=[
      {id:'ITEM0001',
        count:1,
        name:'黄焖鸡',
        price:18.00,
        subtotal:18,
        type:'指定菜品半价'
      },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count:2,
        subtotal:12.00,
        type:''
      },
      {
        saving:9,
        type1:'指定菜品半价'
      }
    ];
    let input2=30;
    let result=calTotal(input1,input2);
    expect(result).toEqual(21);
  })
})




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
