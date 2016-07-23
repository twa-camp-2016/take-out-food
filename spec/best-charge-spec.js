describe('Take out food', function () {

    it('formatTags', function () {
        let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
        let expected = [
            {
                id: "ITEM0001",
                count: 1
            },
            {
                id: "ITEM0013",
                count: 2
            },
            {
                id: "ITEM0022",
                count: 1
            }
        ];
        let formattedTags = formatTags(inputs);
        expect(formattedTags).toEqual(expected);
    });

    it('buildCartItems', function () {
        let formattedTags = [
            {
                id: "ITEM0001",
                count: 1
            },
            {
                id: "ITEM0013",
                count: 2
            },
            {
                id: "ITEM0022",
                count: 1
            }
        ];

        let expected = [
            {
                id: 'ITEM0001',
                name: '黄焖鸡',
                price: 18.00,
                count: 1
            },
            {
                id: 'ITEM0013',
                name: '肉夹馍',
                price: 6.00,
                count: 2
            },
            {
                id: 'ITEM0022',
                name: '凉皮',
                price: 8.00,
                count: 1
            }
        ];

        let allItems = loadAllItems();
        let cartItems = buildCartItems(formattedTags, allItems);
        expect(cartItems).toEqual(expected);
    });

    it('buidPromotedItems', function () {
        let cartItems = [
            {
                id: 'ITEM0001',
                name: '黄焖鸡',
                price: 18.00,
                count: 1
            },
            {
                id: 'ITEM0013',
                name: '肉夹馍',
                price: 6.00,
                count: 2
            },
            {
                id: 'ITEM0022',
                name: '凉皮',
                price: 8.00,
                count: 1
            }
        ];
        let expected = [
            {
                id: 'ITEM0001',
                name: '黄焖鸡',
                price: 18.00,
                count: 1,
                totalPrice: 18.00,
                payPrice: 9.00,
                saved: 9.00
            },
            {
                id: 'ITEM0013',
                name: '肉夹馍',
                price: 6.00,
                count: 2,
                totalPrice: 12.00,
                payPrice: 12.00,
                saved: 0
            },
            {
                id: 'ITEM0022',
                name: '凉皮',
                price: 8.00,
                count: 1,
                totalPrice: 8.00,
                payPrice: 4.00,
                saved: 4.00
            }
        ];

        let promotions = loadPromotions();
        let promoteItems = buildPromotedItems(cartItems, promotions);
        expect(promoteItems).toEqual(expected);
    });

    it('calculateTotalPrices', function () {
        let promotedItems = [
            {
                id: 'ITEM0001',
                name: '黄焖鸡',
                price: 18.00,
                count: 1,   
                payPrice: 9.00,
                saved: 9.00
            },
            {
                id: 'ITEM0013',
                name: '肉夹馍',
                price: 6.00,
                count: 2,
                payPrice: 12.00,
                saved: 0
            },
            {
                id: 'ITEM0022',
                name: '凉皮',
                price: 8.00,
                count: 1,
                payPrice: 4.00,
                saved: 4.00
            }
        ];
        let expected =
        {
            totalPayPrice: 25.00,
            totalSaved: 13.00,
        };

        let totalPrice = calculateTotalPrice(promotedItems);
        expect(totalPrice).toEqual(expected);

    });

    // it('buidPromotedItems with 满30减6', function () {
    //     let cartItems = [
    //         {
    //             id: 'ITEM0001',
    //             name: '黄焖鸡',
    //             price: 18.00,
    //             count: 1
    //         },
    //         {
    //             id: 'ITEM0013',
    //             name: '肉夹馍',
    //             price: 6.00,
    //             count: 2
    //         },
    //         {
    //             id: 'ITEM0022',
    //             name: '凉皮',
    //             price: 8.00,
    //             count: 2
    //         }
    //     ];
    //     let expected = [
    //         {
    //             id: 'ITEM0001',
    //             name: '黄焖鸡',
    //             price: 18.00,
    //             count: 1,
    //             //    promoinType: '满30减6',
    //             //totalPrice:18.00,
    //             payPrice: 18.00,
    //             saved: 0
    //         },
    //         {
    //             id: 'ITEM0013',
    //             name: '肉夹馍',
    //             price: 6.00,
    //             count: 2,
    //             //    promoinType: '满30减6',
    //             //totalPrice: 12.00,
    //             payPrice: 12.00,
    //             saved: 0
    //         },
    //         {
    //             id: 'ITEM0022',
    //             name: '凉皮',
    //             price: 8.00,
    //             count: 1,
    //             //    promoinType: '满30减6',
    //             //       totalPrice:8.00,
    //             payPrice: 8.00,
    //             saved: 0
    //         }
    //     ];
    //
    //     let promotedItems = buildPromotedItems(cartItems, promotions);
    //     let promoteItems = calculateTotalPrice(promotedItems);
    //     expect(promoteItems).toEqual(expected);
    // });

    it('buildReceiptItems', function () {
        let promotedItems = [
            {
                id: 'ITEM0001',
                name: '黄焖鸡',
                price: 18.00,
                count: 1,
                payPrice: 9.00,
                saved: 9.00
            },
            {
                id: 'ITEM0013',
                name: '肉夹馍',
                price: 6.00,
                count: 2,
                payPrice: 12.00,
                saved: 0
            },
            {
                id: 'ITEM0022',
                name: '凉皮',
                price: 8.00,
                count: 1,
                payPrice: 4.00,
                saved: 4.00
            }
        ];

        let totalPrice = {
            totalPayPrice: 25.00,
            totalSaved: 13.00
        };

        let expected =[ [
            {
                name: '黄焖鸡',
                count: 1,
                payPrice: 9.00,
                saved: 9.00
            },
            {
                name:'肉夹馍',
                count: 2,
                payPrice:6.00,
                saved: 0
            },
            {
                name: '凉皮',
                count: 1,
                payPrice:4.00,
                saved: 4.00
            }
        ],
            {
                totalPrice: 25.00,
                totalSaved: 13.00
            } 
        ]
        
        let receiptItems = buildReceiptItems(promotedItems,totalPrice);
        expect(receiptItems).toEqual(expected);
    });

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