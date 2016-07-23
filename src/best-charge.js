function Tag(){
  let test=[

    "ITEM0001*1",
    "ITEM0013*2",
    "ITEM0022*1"
  ];
  //console.log(test);
  return test;
}
function getFoodCounts(tags) {
  let result=[];
  for(let myTag of tags)
  {
    let items=myTag.split("*");
    result.push({code:items[0],count:parseInt(items[1])});
  }
  console.log(result);
  return result;
}
function loadAllItems() {
  return [{
    code: 'ITEM0001',
    name: '黄焖鸡',
    price: 18.00
  }, {
    code: 'ITEM0013',
    name: '肉夹馍',
    price: 6.00
  }, {
    code: 'ITEM0022',
    name: '凉皮',
    price: 8.00
  }, {
    code: 'ITEM0030',
    name: '冰锋',
    price: 2.00
  }];

}

function builtItems(myGetCount,myAll){
 let result=[];
 for(let elementOne of myGetCount)
 for(let elementTwo of myAll)
 {
 if(elementOne.code===elementTwo.code)
 result.push({code:elementOne.code,
 name:elementTwo.name,
 count:elementOne.count,
 price:elementTwo.price
 });
 }
 //console.log(result);
 return result;
 }


function loadPromotions() {
  return [{
    type:'满30减6元'
  }, {
    type:'指定菜品半价',
    items: ['ITEM0001', 'ITEM0022']
  }];
}
function getBeforeAllPrice(myBuilt,promotions)
{
 let result=[];
  //let afterPer;
  for (let myCoun of myBuilt) {
    let sumP=myCoun.price * myCoun.count;

    result.push({code:myCoun.code,name:myCoun.name,count:myCoun.count,price:myCoun.price,
      perAll:sumP});
    }

  return result;
  //console.log(result);
}

function halfSave(getBef) {

  let result = [];
  let me = 0;
  //let mes;
  for (let i = 0; i < getBef.length; i++) {
    me += getBef[i].perAll;
  }
  if (me >= 30) {
    result.push((me - 6));
  }
  result.push(me);
return result;
   //console.log(result);

}
/*function specialSaves(myBuilt,promotions){
  let result=[];
  for(let myBul of myBuilt)

    for(let mypro of promotions)
    {
      for(let jokn of mypro.items)
      if(mypro.type==='指定菜品半价'&& myBul.code===jokn)
      {
        let perPrice=(myBul.price*myBul.count)/2;
      }
    }

}
*/
let tags=Tag();
//getFoodCounts(tags);
let myGetCount=getFoodCounts(tags);
let myAll=loadAllItems();
builtItems(myGetCount,myAll);
let myBuilt=builtItems(myGetCount,myAll);
let promotions=loadPromotions();
let getBef=getBeforeAllPrice(myBuilt,promotions);
let myTir=halfSave(getBef);
//halfSaves(myTir,getBef);
