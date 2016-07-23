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

});
describe('formatCart',function(){

  it('formatedCart should toequal ',function(){
    let cartItem = ["ITEM0001 x 1"];
    let formatedCart = [{id:'ITEM0001',count:1}];
    expect(formatedCart).toEqual(formatCart(cartItem));
  });
});
describe('selectItems',function(){

  it('selectedItems should toequal ',function(){
    let allItems = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00
    }];
    let formatedItem = [{id:'ITEM0001',count:1}];
    let expectedV = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count:1
    }];
    expect(expectedV).toEqual(selectItems(allItems,formatedItem));
  });
});
describe('subTotal',function(){

  it('Items should toequal ',function(){
    let selectedItem = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count:1
    }];
    let expectVal = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count:1,
      subTotals:18.00
    }];

    expect(expectVal).toEqual(subTotal(selectedItem));
  });
});


describe('prePromotionTotal',function(){

  it('Items should toequal ',function(){
    let itemTotals = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count:1,
      subTotals:18.00
    }];
    let expectVal = 18.00;

    expect(expectVal).toEqual(prePromotionTotal(itemTotals));
  });
});
describe('firstPromotion',function(){

  it('Items should toequal ',function(){
    let theTotal = 18.00;
    let allPromotions = loadPromotions();
    let expectVal = 0;

    expect(expectVal).toEqual(firstPromotion(allPromotions,theTotal));
  });
});

describe('matchPromotion',function(){

  it('Items should toequal ',function(){
    let itemTotals = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count:1,
      subTotals:18.00
    }];
    let allPromotions = loadPromotions();
    let expectVal = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count:1,
      subTotals:18.00,
      type:'指定菜品半价'
    }];

    expect(expectVal).toEqual(matchPromotion(allPromotions,itemTotals));
  });
});


describe('secondPromotion',function(){

  it('Items should toequal ',function(){

    let theTotal = 18.00;
    let matchedPromo = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count:1,
      subTotals:18.00,
      type:'指定菜品半价'
    }];
    let expectVal = 9.00;

    expect(expectVal).toEqual(secondPromotion(matchedPromo,theTotal));
  });
});

describe('selectPromotion',function(){

  it('Items should toequal ',function(){
    let firstPro = 0;
    let secondPro = 9;
    let allPromotions = loadPromotions();

    let expectVal = {type:'指定菜品半价',promo:9.00};

    expect(expectVal).toEqual(selectPromotion(firstPro,secondPro,allPromotions));
  });
});


describe('total',function(){

  it('Items should toequal ',function(){
    let selectedPromo = {type:'指定菜品半价',promo:9.00};
    let theTotal = 18.00;
    let expectVal = 9.00;

    expect(expectVal).toEqual(total(selectedPromo,theTotal));
  });
});
