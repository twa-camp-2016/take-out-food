describe('Take out food', function () {

  it('get formated barcode', function () {
    let input = ["ITEM0001x1", "ITEM0013x2", "ITEM0022x1"];
    let countBarcodes = [
      {id: "ITEM0001", count: 1},
      {id: "ITEM0013", count: 2},
      {id: "ITEM0022", count: 1}
    ];
    let result = bestCharge(input);
    expect(result).toEqual(countBarcodes);
  });

  it('get cart items', function () {
    let allItems = loadAllItems();
    let input = [
      {id: "ITEM0001", count: 1},
      {id: "ITEM0013", count: 2},
      {id: "ITEM0022", count: 1}
    ];
    let cartItems = [
      {id: "ITEM0001", name: "黄焖鸡", count: 1, price: 18.00},
      {id: "ITEM0013", name: "肉夹馍", count: 2, price: 6.00},
      {id: "ITEM0022", name: "凉皮", count: 1, price: 8.00}
    ];
    let result = getCartItems(allItems, input);
    expect(result).toEqual(cartItems);
  });

  it('get totalPrice', function () {
    let cartItems = [
      {id: "ITEM0001", name: "黄焖鸡", count: 1, price: 18.00},
      {id: "ITEM0013", name: "肉夹馍", count: 2, price: 6.00},
      {id: "ITEM0022", name: "凉皮", count: 1, price: 8.00}
    ];
    let result = getTotalPrice(cartItems);
    let totalPrice = {totalPrice: 38};
    expect(result).toEqual(totalPrice);
  });

  it('get promotion item', function () {
    let promotions = loadPromotions();
    let cartItems = [
      {id: "ITEM0001", name: "黄焖鸡", count: 1, price: 18.00},
      {id: "ITEM0013", name: "肉夹馍", count: 2, price: 6.00},
      {id: "ITEM0022", name: "凉皮", count: 1, price: 8.00}
    ];

    let result = getPromotedItems(38, promotions, cartItems);
    let promotedItems = {
      cartItems: [
        {id: "ITEM0001", name: "黄焖鸡", count: 1, price: 18.00},
        {id: "ITEM0013", name: "肉夹馍", count: 2, price: 6.00},
        {id: "ITEM0022", name: "凉皮", count: 1, price: 8.00}
      ],
      saved:13,
      totalPrice:25
  }
    expect(result).toEqual(promotedItems);
  });
  /* it('should generate best charge when best is 指定菜品半价', function () {
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
   */
});
