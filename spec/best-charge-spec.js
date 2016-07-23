describe('Take out food', function () {
    let inputs;
    let allItems;
    let orderItems;
    let promotions; 
    let itemCharges;
    beforeEach(()=> {
        inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"]
        allItems = [{
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
        orderItems = [
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
            },
            {

                item: {
                    id: 'ITEM0022',
                    name: '凉皮',
                    price: 8.00
                },
                count: 1
            }
        ];

        promotions= [{
            type: '满30减6元'
        }, {
            type: '指定菜品半价',
            items: ['ITEM0001', 'ITEM0022']
        }];

        itemCharges={
            orderItem: [
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
                },
                {

                    item: {
                        id: 'ITEM0022',
                        name: '凉皮',
                        price: 8.00
                    },
                    count: 1
                }
            ],
            type:'指定菜品半价',
            charge:25,
            saved:13
        };
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
===================================`.trim();
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
===================================`.trim();
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
===================================`.trim();
        expect(summary).toEqual(expected)
    });

    it('print orderItems', ()=> {
        const orderItems = buildOrderItems(inputs, allItems);
        const expectOrderItems = [
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
            },
            {

                item: {
                    id: 'ITEM0022',
                    name: '凉皮',
                    price: 8.00
                },
                count: 1
            }
        ];

        expect(orderItems).toEqual(expectOrderItems);
    });

    it('print itemCharges', ()=> {
        const itemCharges = buildItemCharges(orderItems,promotions);
        const expectItemCharges ={
            orderItem: [
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
                },
                {

                    item: {
                        id: 'ITEM0022',
                        name: '凉皮',
                        price: 8.00
                    },
                    count: 1
                }
            ],
            type:'指定菜品半价',
            charge:25,
            saved:13
        };
        
        expect(itemCharges).toEqual(expectItemCharges);
    });
    
    it('print orders',()=>{
        const orders=buildPrintOrders(itemCharges);
        const expectOrders=`
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
        
        expect(orders).toEqual(expectOrders);
    })
});