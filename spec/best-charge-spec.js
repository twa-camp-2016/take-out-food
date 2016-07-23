'use strict'
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

describe('unit testing', ()=> {
    const allItems = loadAllItems();
    it("should build meunItems", ()=> {
        const inputs = ["ITEM0001x1", "ITEM0013x2"];
        const expectMeunItems = [
            {
                item: {
                    id: 'ITEM0001',
                    name: '黄焖鸡',
                    price: 18.00
                },
                count: 1
            },
            {
                item: {
                    id: 'ITEM0013',
                    name: '肉夹馍',
                    price: 6.00
                },
                count: 2
            }
        ];
        const menuItem = buildMenuItems(allItems, inputs);
        expect(menuItem).toEqual(expectMeunItems);
    });

    it("should buildReceiptItems", ()=> {
        const promotions = loadPromotions();
        const menuItems = [{
            item: {
                id: 'ITEM0001',
                name: '黄焖鸡',
                price: 18.00
            },
            count: 1
        },
            {
                item: {
                    id: 'ITEM0013',
                    name: '肉夹馍',
                    price: 6.00
                },
                count: 2
            }
        ];

        const expectReceiptItems = [
            {
                receiptItem: {
                    item: {
                        id: 'ITEM0001',
                        name: '黄焖鸡',
                        price: 18.00
                    },
                    count: 1
                },
                actualTotal: 18.00,
                saved: 9.00
            }, {
                receiptItem: {
                    item: {
                        id: 'ITEM0013',
                        name: '肉夹馍',
                        price: 6.00
                    },
                    count: 2
                },
                actualTotal: 12.00,
                saved: 0.00
            }
        ];
        const receiptItems = buildReceiptItems(menuItems, promotions);
        expect(receiptItems).toEqual(expectReceiptItems);
    });

    it("should build receipt", ()=> {

        const receiptItems = [
            {
                receiptItem: {
                    item: {
                        id: 'ITEM0001',
                        name: '黄焖鸡',
                        price: 18.00
                    },
                    count: 1
                },
                actualTotal: 18.00,
                halftotal: 9.00,
                saved: 9.00
            }, {
                receiptItem: {
                    item: {
                        id: 'ITEM0013',
                        name: '肉夹馍',
                        price: 6.00
                    },
                    count: 2
                },
                actualTotal: 12.00,
                halftotal: 12.00,
                saved: 0.00
            }
        ];

        const expectReceipt = {receipt:[{
                    receiptItems: {
                        receiptItem: {
                            item: {
                                id: 'ITEM0001',
                                name: '黄焖鸡',
                                price: 18.00
                            },
                            count: 1
                        },
                        actualTotal: 18.00,
                        halftotal: 9.00,
                        saved: 9.00
                    },

                    receiptItem: {
                        item: {
                            id: 'ITEM0013',
                            name: '肉夹馍',
                            price: 6.00
                        },
                        count: 2
                    },
                    actualTotal: 12.00,
                    halftotal: 12.00,
                    saved: 0.00
                }],
                halfPrice: 21.00,
                halfSaved: 9.00,
                discountPrice: 24.00,
                discountsaved: 6.00
            };


        const receipt = buildReceipt(receiptItems);
        expect(receipt).toEqual(expectReceipt);
    });


});




