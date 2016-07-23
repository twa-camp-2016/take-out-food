const app = require('../src/best-charge');
describe('Take out food', function () {

  it('should cartDishes', ()=> {
    let input = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let cartDishes = app.buildCartDishes(input);
    let expectCartDishes = [
      {
        dish: {
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00
        },
        count: 1
      },
      {
        dish: {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00
        },
        count: 2
      },
      {
        dish: {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00
        }, count: 1
      }
    ];

    expect(cartDishes).toEqual(expectCartDishes);
  });

  it('should orderDishes', ()=> {
    let cartDishes = [
      {
        dish: {
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00
        },
        count: 1
      },
      {
        dish: {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00
        },
        count: 2
      },
      {
        dish: {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00
        },
        count: 1
      }
    ];
    let orderDishes = app.buildOrderDishes(cartDishes);

    const expectOrderDishes = [
      {
        cartDish: {
          dish: {
            id: 'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count: 1
        },
        saved: 9,
        subtotal: 18
      },
      {
        cartDish: {
          dish: {
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count: 2
        },
        saved: 0,
        subtotal: 12
      },
      {
        cartDish: {
          dish: {
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          },
          count: 1
        },
        saved: 4,
        subtotal: 8
      }
    ];

    expect(orderDishes).toEqual(expectOrderDishes);
  });

  it('should orderDetail', ()=> {
    let orderDishes = [
      {
        cartDish: {
          dish: {
            id: 'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count: 1
        },
        saved: 9,
        subtotal: 18
      },
      {
        cartDish: {
          dish: {
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count: 2
        },
        saved: 0,
        subtotal: 12
      },
      {
        cartDish: {
          dish: {
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          },
          count: 1
        },
        saved: 4,
        subtotal: 8
      }
    ];
    let orderDetail = app.buildOrderDetail(orderDishes);

    const expectOrderDetail = {
      orderDishes: [
        {
          cartDish: {
            dish: {
              id: 'ITEM0001',
              name: '黄焖鸡',
              price: 18.00
            },
            count: 1
          },
          saved: 9,
          subtotal: 18
        },
        {
          cartDish: {
            dish: {
              id: 'ITEM0013',
              name: '肉夹馍',
              price: 6.00
            },
            count: 2
          },
          saved: 0,
          subtotal: 12
        },
        {
          cartDish: {
            dish: {
              id: 'ITEM0022',
              name: '凉皮',
              price: 8.00
            },
            count: 1
          },
          saved: 4,
          subtotal: 8
        }
      ],
      total: 25,
      savedTotal: 13,
      promotionType: '指定菜品半价'
    };

    expect(orderDetail).toEqual(expectOrderDetail);
  });

  it('should orderText', ()=> {
    const orderDetail = {
      orderDishes: [
        {
          cartDish: {
            dish: {
              id: 'ITEM0001',
              name: '黄焖鸡',
              price: 18.00
            },
            count: 1
          },
          saved: 9,
          subtotal: 18
        },
        {
          cartDish: {
            dish: {
              id: 'ITEM0013',
              name: '肉夹馍',
              price: 6.00
            },
            count: 2
          },
          saved: 0,
          subtotal: 12
        },
        {
          cartDish: {
            dish: {
              id: 'ITEM0022',
              name: '凉皮',
              price: 8.00
            },
            count: 1
          },
          saved: 4,
          subtotal: 8
        }
      ],
      total: 25,
      savedTotal: 13,
      promotionType: '指定菜品半价'
    };

    const orderDetailText = app.buildOrderDetailText(orderDetail);

    const expextOrderDetailText = `
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

    expect(orderDetailText).toEqual(expextOrderDetailText);
  });

  it('should generate best charge when best is 指定菜品半价', function () {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = app.bestCharge(inputs).trim();
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
    let summary = app.bestCharge(inputs).trim();
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
    let summary = app.bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim();
    expect(summary).toEqual(expected)
  });

});