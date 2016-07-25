
describe("formatInput", function () {
    it("should get formatedItems", function () {
        let selectedItem = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
        let result = formatInput(selectedItem);
        let expected = [{id: "ITEM0001", count: 1}, {id: "ITEM0013", count: 2}, {id: "ITEM0022", count: 1}];

        expect(result).toEqual(expected);
    });
});

describe("getCartItems",function () {
    it("should get cart's items",function () {
        let formatedItems= [{id: "ITEM0001", count: 1},
            {id: "ITEM0013", count: 2},
            {id: "ITEM0022", count: 1}];
        let result=getCartItems(formatedItems);
        let expected=[
            {
                id:"ITEM0001",
                name:'黄焖鸡',
                price:18.00,
                count:1
            },
            {
                id:"ITEM0013",
                name:'肉夹馍',
                price:6.00,
                count:2
            },
            {
                id:"ITEM0022",
                name:'凉皮',
                price: 8.00,
                count:1
            }
        ];

        expect(result).toEqual(expected);
    });
});

describe("getTotal",function () {
    it("should calculate total",function () {
        let cartItems=[
            {
                id:"ITEM0001",
                name:'黄焖鸡',
                price:18.00,
                count:1
            },
            {
                id:"ITEM0013",
                name:'肉夹馍',
                price:6.00,
                count:2
            },
            {
                id:"ITEM0022",
                name:'凉皮',
                price: 8.00,
                count:1
            }
        ];
        let result=getTotal(cartItems);
        expect(result).toEqual(38);
    });
});

describe("judge is half discount",function () {
    it("should judge type",function () {
        let cartItems=[{
                id:"ITEM0001",
                name:'黄焖鸡',
                price:18.00,
                count:1
            },
            {
                id:"ITEM0013",
                name:'肉夹馍',
                price:6.00,
                count:2
            },
            {
                id:"ITEM0022",
                name:'凉皮',
                price: 8.00,
                count:1
            }];
        let proInfo=[{
            type: '满30减6元'
        }, {
            type: '指定菜品半价',
            items: ['ITEM0001', 'ITEM0022']
        }];
        let result=isHalfDiscount(cartItems,proInfo);

        expect(result).toEqual(['黄焖鸡','凉皮']);
    })
});

describe("chooseDiscount",function () {
    it("should choose right discount",function () {
        let cartItems=[{
            id:"ITEM0001",
            name:'黄焖鸡',
            price:18.00,
            count:1
        },
            {
                id:"ITEM0013",
                name:'肉夹馍',
                price:6.00,
                count:2
            },
            {
                id:"ITEM0022",
                name:'凉皮',
                price: 8.00,
                count:1
            }];
        let result=chooseDiscount(cartItems);
        let expected='使用优惠:\n'+
        '指定菜品半价(黄焖鸡，凉皮)，省13元';
        expect(result).toEqual(expected);
    })
})

