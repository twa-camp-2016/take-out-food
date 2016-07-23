describe('Take out food', function () {

  it('#1格式化字符串', ()=> {
    let selectedItems = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];

    let formattedItems = formatItem(selectedItems);

    let expected = [
      {id: 'ITEM0001', count: 1},
      {id: 'ITEM0013', count: 2},
      {id: 'ITEM0022', count: 1}
    ];
    expect(formattedItems).toEqual(expected);
  });


  it('#2', ()=> {
    let formattedItems = [
      {id: 'ITEM0001', count: 1},
      {id: 'ITEM0013', count: 2},
      {id: 'ITEM0022', count: 1}
    ];
    let allItems  = loadAllItems();
    let cartItems = buildCartItem(formattedItems,allItems);

    let expected = [
      {id: 'ITEM0001', count: 1,name: '黄焖鸡',price:18.00},
      {id: 'ITEM0013', count: 2,name: '肉夹馍',price:6.00},
      {id: 'ITEM0022', count: 1,name: '凉皮',price:8.00}
    ];
    expect(cartItems).toEqual(expected);
  });


  it('#3', ()=> {
    let cartItems = [
      {id: 'ITEM0001', count: 1,name: '黄焖鸡',price:18.00},
      {id: 'ITEM0013', count: 2,name: '肉夹馍',price:6.00},
      {id: 'ITEM0022', count: 1,name: '凉皮',price:8.00}
    ];
    let promotions = loadPromotions();
    let promotedItems = builPromotedItem(cartItems,promotions);

    let expected = [
      {
        id: 'ITEM0001', name: '黄焖鸡', price: 18.00, count: 1,
        payPrice1: 9.00, saved: 9.00, totalPrice: 18.00
      },
      {
        id: 'ITEM0013', name: '肉夹馍', price: 6.00, count: 2,
        payPrice1: 12.00 , saved: 0.00, totalPrice: 12.00
      },
      {
        id: 'ITEM0022', name: '凉皮', price: 8.00, count: 1,
        payPrice1: 4.00, saved:  4.00, totalPrice: 8.00
      }
    ];
    expect(promotedItems).toEqual(expected);
  });

  it('#4', ()=> {
    let promotedItems = [
      {
        id: 'ITEM0001', name: '黄焖鸡', price: 18.00, count: 1,
        payPrice1: 9.00, saved: 9.00, totalPrice: 18.00
      },
      {
        id: 'ITEM0013', name: '肉夹馍', price: 6.00, count: 2,
        payPrice1: 12.00 , saved: 0.00, totalPrice: 12.00
      },
      {
        id: 'ITEM0022', name: '凉皮', price: 8.00, count: 1,
        payPrice1: 4.00, saved:  4.00, totalPrice: 8.00
      }
    ];
       let totalprice = calculatePrice(promotedItems);
       let expected =
         {
              totalPrice:38.00,
              totalSaved:13.00,
              totalPrice1: 25.00,
              totalPrice2: 32.00,
              lastprice:25.00,
              type:'指定菜品半价'
         }
       expect(totalprice).toEqual(expected);
    });

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  








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

