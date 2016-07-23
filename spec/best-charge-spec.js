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

  it(('cartItems'),()=>{
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];

    const cartItems=[{item:{
                    id: 'ITEM0001',
                    name: '黄焖鸡',
                    price: 18.00
                      },count:1},

                    { item:{
                      id: 'ITEM0013',
                      name: '肉夹馍',
                      price: 6.00
                    },count:2},
                     {item:{
                        id: 'ITEM0022',
                        name: '凉皮',
                        price: 8.00
                        },count:1}

    ];
    expect(buildCartItems(inputs)).toEqual(cartItems);
  })

  const cartItems=[{item:{
    id: 'ITEM0001',
    name: '黄焖鸡',
    price: 18.00
  },count:1},

    { item:{
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00
    },count:2},
    {item:{
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00
    },count:1}];

  it(('receiptItem'),()=>{

    const receipItems=[{cartItem:{item:{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00
    },count:1},
    save:{discountname:'指定菜品半价',save:9},
      subtotal:9},

      {cartItem:{  item:{
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00
        },count:2},
        save:{discountname:'null',save:0},
        subtotal:2},

      {cartItem:{item:{
      id: 'ITEM0022',
        name: '凉皮',
        price: 8.00
    },count:1},
        save:{discountname:'指定菜品半价',save:4},
        subtotal:4
      }

    ];
    expect(buildReceiptItems(cartItems)).toEqual(receipItems);
  });
  const receipItems=[{cartItem:{item:{
    id: 'ITEM0001',
    name: '黄焖鸡',
    price: 18.00
  },count:1},
    save:{discountname:'指定菜品半价',save:9},
    subtotal:9},

    {cartItem:{item:{
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00
    },count:2},
      save:{discountname:'null',save:0},
      subtotal:2},

    {cartItem:{item:{
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00
    },count:1},
      save:{discountname:'指定菜品半价',save:4},
      subtotal:4
    }
  ];

  it((''),() =>{
    const receipt=[{cartItem:{item:{
                    id: 'ITEM0001',
                    name: '黄焖鸡',
                    price: 18.00
                   },count:1},
                    save:{discountname:'指定菜品半价',save:9},
                     subtotal:9},

      {cartItem:{item:{
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00
      },count:2},
        save:{discountname:'null',save:0},
        subtotal:12},

      {cartItem:{item:{
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00
      },count:1},
        save:{discountname:'指定菜品半价',save:4},
        subtotal:4
      }];
      total:25,
      save=[{saveWay:`指定菜品半价`,item},{save:13}];
    expece(buildReceipt(receipItems)).toEqual(receipt);

  });

  it(('correct print'),()=>{

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
===================================`
    expect(buildReceiptText(receipt)).toEqual(text);
  })

});
