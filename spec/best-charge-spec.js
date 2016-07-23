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

  describe('unit test',() => {

    it('should build cartItems',() => {
      const cartItems = buildCartItems(["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"]);
      const expectArray = [
        {id:'ITEM0001',count:1},
        {id:'ITEM0013',count:2},
        {id:'ITEM0022',count:1}
      ];

      expect(cartItems).toEqual(expectArray);
    });

    it('should build receiptItems',() => {
      const receiptItems = buildReceiptItems([
        {id:'ITEM0001',count:1},
        {id:'ITEM0013',count:2},
        {id:'ITEM0022',count:1}
      ],loadAllItems());
      const expectArray = [
        {
          item:{
            id: 'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count:1,
          subtotal:18.00
        },
        {
          item:{
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count:2,
          subtotal:12.00
        },
        {
          item:{
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          },
          count:1,
          subtotal:8.00
        }
      ];

      expect(receiptItems).toEqual(expectArray);
    });

    it('should build discountItems',() => {
      const discountItems = buildDiscountItems([
        {
          item:{
            id: 'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count:1,
          subtotal:18
        },
        {
          item:{
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count:2,
          subtotal:12
        },
        {
          item:{
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          },
          count:1,
          subtotal:8
        }
      ]);

      const expectArray = [
        {
          receiptItem:{
            item:{
              id: 'ITEM0001',
              name: '黄焖鸡',
              price: 18.00
            },
            count:1,
            subtotal:18.00
          },
          IsDiscount:1
        },
        {
          receiptItem:{
            item:{
              id: 'ITEM0013',
              name: '肉夹馍',
              price: 6.00
            },
            count:2,
            subtotal:12.00
          },
          IsDiscount:0
        },
        {
          receiptItem:{
            item:{
              id: 'ITEM0022',
              name: '凉皮',
              price: 8.00
            },
            count:1,
            subtotal:8.00
          },
          IsDiscount:1
        }
      ];

      expect(discountItems).toEqual(expectArray);
    });

    it('should get promotion',() => {
      const promotion = getPromotion([
        {
          receiptItem:{
            item:{
              id: 'ITEM0001',
              name: '黄焖鸡',
              price: 18.00
            },
            count:1,
            subtotal:18.00
          },
          IsDiscount:1
        },
        {
          receiptItem:{
            item:{
              id: 'ITEM0013',
              name: '肉夹馍',
              price: 6.00
            },
            count:2,
            subtotal:12.00
          },
          IsDiscount:0
        },
        {
          receiptItem:{
            item:{
              id: 'ITEM0022',
              name: '凉皮',
              price: 8.00
            },
            count:1,
            subtotal:8.00
          },
          IsDiscount:1
        }
      ]);
      const expectObject = {
        promotionType:'指定菜品半价',
        saved:13,
        charge:25,
        discountedItems:[{
          item:{
            id: 'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count:1,
          subtotal:18.00
        },{
          item:{
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          },
          count:1,
          subtotal:8.00
        }]
      };
      expect(promotion).toEqual(expectObject);
    });

    it('should build receipt',() => {
      const receipt = buildRecipt([
        {
          receiptItem:{
            item:{
              id: 'ITEM0001',
              name: '黄焖鸡',
              price: 18.00
            },
            count:1,
            subtotal:18
          },
          IsDiscount:1
        },
        {
          receiptItem:{
            item:{
              id: 'ITEM0013',
              name: '肉夹馍',
              price: 6.00
            },
            count:2,
            subtotal:12
          },
          IsDiscount:0
        },
        {
          receiptItem:{
            item:{
              id: 'ITEM0022',
              name: '凉皮',
              price: 8.00
            },
            count:1,
            subtotal:8
          },
          IsDiscount:1
        }
      ]);
      const expectObject = {
        discountItems:[
          {
            receiptItem:{
              item:{
                id: 'ITEM0001',
                name: '黄焖鸡',
                price: 18.00
              },
              count:1,
              subtotal:18
            },
            IsDiscount:1
          },
          {
            receiptItem:{
              item:{
                id: 'ITEM0013',
                name: '肉夹馍',
                price: 6.00
              },
              count:2,
              subtotal:12
            },
            IsDiscount:0
          },
          {
            receiptItem:{
              item:{
                id: 'ITEM0022',
                name: '凉皮',
                price: 8.00
              },
              count:1,
              subtotal:8
            },
            IsDiscount:1
          }
        ],
        promotion:{
          promotionType:'指定菜品半价',
          saved:13,
          charge:25,
          discountedItems:[{
            item:{
              id: 'ITEM0001',
              name: '黄焖鸡',
              price: 18.00
            },
            count:1,
            subtotal:18
          },{
            item:{
              id: 'ITEM0022',
              name: '凉皮',
              price: 8.00
            },
            count:1,
            subtotal:8
          }]
        }

      };

      expect(receipt).toEqual(expectObject);
    });

    it('should build receiptText',() => {
      const receiptText = buildReceiptText({
        discountItems:[
          {
            receiptItem:{
              item:{
                id: 'ITEM0001',
                name: '黄焖鸡',
                price: 18.00
              },
              count:1,
              subtotal:18
            },
            IsDiscount:1
          },
          {
            receiptItem:{
              item:{
                id: 'ITEM0013',
                name: '肉夹馍',
                price: 6.00
              },
              count:2,
              subtotal:12
            },
            IsDiscount:0
          },
          {
            receiptItem:{
              item:{
                id: 'ITEM0022',
                name: '凉皮',
                price: 8.00
              },
              count:1,
              subtotal:8
            },
            IsDiscount:1
          }
        ],
        promotion:{
          promotionType:'指定菜品半价',
          saved:13,
          charge:25,
          discountedItems:[{
            item:{
              id: 'ITEM0001',
              name: '黄焖鸡',
              price: 18.00
            },
            count:1,
            subtotal:18
          },{
            item:{
              id: 'ITEM0022',
              name: '凉皮',
              price: 8.00
            },
            count:1,
            subtotal:8
          }]
        }

      });

      const expectText = `
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
      expect(receiptText).toEqual(expectText);
    });
  });

});
