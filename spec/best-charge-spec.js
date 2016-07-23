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

describe('buildCartItem', () => {
  let allItems = loadAllItems();
  it('buildCartItem', ()=> {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let cartItems = buildCartItem(inputs);
    const expectCheckCode = [{
      cartItems: {
        name: '黄焖鸡',
        count: 1
      }
    },
      {
        cartItems: {
          name: '肉夹馍',
          count: 2
        }
      },
      {
        cartItems: {
          name: '凉皮',
          count: 1
        }
      }];

    expect(cartItems).toEqual(expectCheckCode);
  })

  it('getSubtotal', ()=> {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let cartItems = buildCartItem(inputs);
    let subtotal = getSubtotal(cartItems, allItems);
    const expectCheckCode = [
      {
        item: {
          cartItems: {
            name: '黄焖鸡',
            count: 1
          },
          subtotal: 18.00
        }
      },
      {
        item: {
          cartItems: {
            name: '肉夹馍',
            count: 2
          },
          subtotal: 12.00
        }
      },
      {
        item: {
          cartItems: {
            name: '凉皮',
            count: 1
          },
          subtotal: 8.00
        }
      }];

    expect(subtotal).toEqual(expectCheckCode);
  })
  it('findBestPromotionType', ()=> {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let cartItems = buildCartItem(inputs);
    let subtotal = getSubtotal(cartItems, allItems);
    let promotionType=findBestPromotionType(subtotal, promotionType);
    const expectCheckCode = [
      {
        item: {
          cartItems: {
            name: '黄焖鸡',
            count: 1
          },
          subtotal: 18.00
        }
      },
      {
        item: {
          cartItems: {
            name: '肉夹馍',
            count: 2
          },
          subtotal: 12.00
        }
      },
      {
        item: {
          cartItems: {
            name: '凉皮',
            count: 1
          },
          subtotal: 8.00
        },
        promotionType:'指定菜品半价',
        savedTotal:13
      }];

    expect(promotionType).toEqual(expectCheckCode);
  })
  it('getTotalPrice', ()=> {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let cartItems = buildCartItem(inputs);
    let subtotal = getSubtotal(cartItems, allItems);
    let promotionType=findBestPromotionType(subtotal, promotionType);
    let totalPrice = getTotalPrice(promotionType,allItems);
    const expectCheckCode = [
      {
        item: {
          cartItems: {
            name: '黄焖鸡',
            count: 1
          },
          subtotal: 18.00
        }
      },
      {
        item: {
          cartItems: {
            name: '肉夹馍',
            count: 2
          },
          subtotal: 12.00
        }
      },
      {
        item: {
          cartItems: {
            name: '凉皮',
            count: 1
          },
          subtotal: 8.00
        },
        promotionType:'指定菜品半价',
        savedTotal:13,
        totalPrice:25
      }];

    expect(totalPrice).toEqual(expectCheckCode);
  })
  it('getTotalPrice', ()=> {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let cartItems = buildCartItem(inputs);
    let subtotal = getSubtotal(cartItems, allItems);
    let promotionType=findBestPromotionType(subtotal, promotionType);
    let totalPrice = getTotalPrice(promotionType,allItems);
    let recipt=buildReceiptText(totalPrice);
    const expectCheckCode = `
 ============= 订餐明细 =============
 黄焖鸡 x 1 = 18元
 肉夹馍 x 2 = 12元
 凉皮 x 1 = 8元
 -----------------------------------
 使用优惠:
 指定菜品半价(黄焖鸡，凉皮)，省13元
 -----------------------------------
 总计：25元
 ===================================`;

    expect(recipt).toEqual(expectCheckCode);
  })

});

