describe('Take out food', function () {

//# 1

  /*
   it('should generate best charge when best is 指定菜品半价', function() {
   let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
   let summary = bestCharge(inputs).trim();
   let expected = `
   ============= 订餐明细 =============
   黄焖鸡 x 1 = 18元
   肉夹馍 x 2 = 12元
   凉皮 x 1 = 8元
   -----------------------------------
   使用优惠:;
   指定菜品半价(黄焖鸡，凉皮)，省13元
   -----------------------------------
   总计：25元
   ===================================`.trim()
   expect(summary).toEqual(expected)
   });
   */


//# 1

  it('#1 格式化条码', function () {
    let tags = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let formattedTag = formattedTags(tags);
    let expected = [
      {
        id: 'ITEM0013',
        count: 4
      },
      {
        id: 'ITEM0022',
        count: 1
      }
    ];

    expect(formattedTag).toEqual(expected)
  });

  //#2
  it('#2 所有商品明细', function () {
    let formattedTags = [
      {
        id: 'ITEM0013',
        count: 4
      },
      {
        id: 'ITEM0022',
        count: 1
      }
    ];

    let allItems = loadAllItems();
    let cartItem = cartItems(formattedTags, allItems);
    let expectCartItems =
      [

        {
          id: 'ITEM0013',
          name: '肉夹馍',
          count: 4,
          price: 6.00,
          payPrice: 24.00
        },
        {
          id: 'ITEM0022',
          name: '凉皮',
          count: 1,
          price: 8.00,
          payPrice: 8.00
        }];

    //totalPrice:32.00


    expect(cartItem).toEqual(expectCartItems);

  });

  it('#3 优惠后商品明细', function () {
    let promotions = loadPromotions();
    let carItems = [
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        count: 4,
        price: 6.00,
        payPrice: 24.00,
      },
      {
        id: 'ITEM0022',
        name: '凉皮',
        count: 1,
        price: 8.00,
        payPrice: 8.00,

      }
    ];

    let expectPromotion = {
    pro:[{
      id: 'ITEM0013',
      name: '肉夹馍',
      count: 4,
      price: 6.00,
      payPrice: 24.00
    },
    {
      id: 'ITEM0022',
      name: '凉皮',
      count: 1,
      price: 8.00,
      payPrice: 4.00
    }],
      totalPrice:26.00,

    };

    let promotionItem = promotionItems(carItems, promotions);
    expect(promotionItem).toEqual(expectPromotion);
  });
  it('#4 综合票据',() => {
    let Promotion =  {
      pro:[{
      id: 'ITEM0013',
      name: '肉夹馍',
      count: 4,
      price: 6.00,
      payPrice: 24.00
    },
      {
        id: 'ITEM0022',
        name: '凉皮',
        count: 1,
        price: 8.00,
        payPrice: 4.00
      }],
      totalPrice:26.00,

  };
  let expectPromotion = {
    pro: [{
      name: '肉夹馍',
      count: 4,
      price: 6.00,
      payPrice: 24.00
    },
      {
        name: '凉皮',
        count: 1,
        price: 8.00,
        payPrice: 4.00
      }],
    totalPrice: 26.00
  }

  });
});
/*
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

 /* it('should generate best charge when no promotion can be used', function() {
    let inputs = ["ITEM0013 x 4"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim()
    expect(summary).toEqual(expected)
  });*/



