describe("loadAllItems",function () {
  it("loadAllItems",function () {
    let input= [{
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


    let result= [{
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

    let text=loadAllItems(input);

    expect(input).toEqual(result);
  });

});

describe("loadPromotions",function () {
  it("loadPromotions",function () {
    let input= [{
      type: '满30减6元'
    }, {
      type: '指定菜品半价',
      items: ['ITEM0001', 'ITEM0022']
    }];


    let result= [{
      type: '满30减6元'
    }, {
      type: '指定菜品半价',
      items: ['ITEM0001', 'ITEM0022']
    }];

    let text=loadPromotions(input);

    expect(input).toEqual(result);
  });

});

describe("formatTags",function () {
  it("formatTags",function () {
    let input= ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"]


    let result= [{
                 id:"ITEM0001",
                 amount:1
    },
      {
        id:"ITEM0013",
        amount:2
      },
      {
        id:"ITEM0022",
        amount:1
      },
    ]

    let text=formatTags(input);

    expect(text).toEqual(result);
  });

});

describe("mergeIds",function () {
  it("mergeIds",function () {
    let input= [{
      id:"ITEM0001",
      amount:1
    },
      {
        id:"ITEM0013",
        amount:2
      },
      {
        id:"ITEM0022",
        amount:1
      },
    ]


    let result= [{
      id:"ITEM0001",
      amount:1
    },
      {
        id:"ITEM0013",
        amount:2
      },
      {
        id:"ITEM0022",
        amount:1
      },
    ]

    let text=mergeIds(input);

    expect(text).toEqual(result);
  });

});

describe("changeTypes",function () {
  it("changeTypes",function () {
    let input=[ {

      type: '指定菜品半价',
      items: ['ITEM0001', 'ITEM0022']
    }];


    let result=[

      {
        id:'ITEM0001',
        type:'指定菜品半价'
      },
      {
        id:'ITEM0022',
        type:'指定菜品半价'
      }
    ];

    let text=changeTypes(input);

    expect(text).toEqual(result);
  });

});

describe("getTypeItems",function () {
  it("getTypeItems",function () {
    let withType=[

      {
        id:'ITEM0001',
        type:'指定菜品半价'
      },
      {
        id:'ITEM0022',
        type:'指定菜品半价'
      }
    ];
    let allItems= [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00
    } ,
      {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00
    }]

      let result=  [{
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        type:'指定菜品半价'
      } ,
        {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00,
          type:'指定菜品半价'
        }]

    let text=getTypeItems(withType,allItems);

    expect(text).toEqual(result);
  })
});

describe("getCartItem",function () {
  it("getCartItems",function () {
    let typeItems= [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      type:'指定菜品半价'
    }];
    let amount= [{
      id:"ITEM0001",
      amount:1
    }
    ];
    let result=[{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      type:'指定菜品半价',
      amount:1
    }];
    let text=getCartItems(typeItems,amount);
    expect(text).toEqual(result);
  })
});

describe("getTwoWayCost",function () {
  it("getTwoWayCost",function () {
   let input=[{
     id:"001",
     price:1,
     amount:2,
     type:'指定菜品半价'
   }];
    let result=[{
      id:"001",
      price:1,
      amount:2,
      type:'指定菜品半价',
      cost_1:1,
      cost_2:2
    }];
    let text=getTwoWayCost(input);
    expect(text).toEqual(result);

  })
});

describe("selectCost",function () {
  it("selectCost",function(){
    let input = [{
      id:"001",
      cost_1:1,
      cost_2:2
    }];
    let result=[{
      id:"001",
      cost_1:1,
      cost_2:2,
      promotionCost:1
    }];

    let text=selectCost(input);
    expect(text).toEqual(result);

  })
})

describe("getTotal",function () {
  it("getTotal",function () {
    let input = [{
      id:"001",
      cost_1:1,
      cost_2:2,
      cost:1
    }];

    let result=1;
    let text=getTotal(input);
    expect(text).toEqual(result);
  })
})

describe("getSaveMoney",function () {
  it("getSaveMoney",function () {
    let input =[
      { price:1,
    amount:2,
        cost:1

      }
    ]
      let result=1
      let text=getSaveMoney(input);
      expect(text).toEqual(result);
  })
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
