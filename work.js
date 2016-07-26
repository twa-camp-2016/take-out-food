/**
 * Created by zhagnian on 25/07/16.
 */
//Array.from(arrayLike[, mapFn[, thisArg]])
(function () {
  let args = Array.from(arguments);
  console.log(args);
})(1, 2, 3);  //[ 1, 2, 3 ]




//Array.isArray(value)
let result=Array.isArray([]);
console.log(result);  //true
let results=Array.isArray({a:1});
console.log(results); //false



//Array.of(element0[, element1[, ...[, elementN]]])
console.log(Array.of(1,2,3,4));  //[1,2,3,4]
console.log(Array.of(1,2,[3,4]));  //[ 1, 2, [ 3, 4 ] ]



//array.concat(value1, value2, ..., valueN)
var num1 = [1, 2, 3];
var num2 = [4, 5, 6];
var nums = num1.concat(num2);
console.log(num1);
console.log(nums);     //[ 1, 2, 3, 4, 5, 6 ]



//arr.copyWithin(target, start[, end = this.length])  target==target.index
let arr=[1,2,3,4];
console.log(arr.copyWithin(0,2,3)); //[ 3, 2, 3, 4 ]
console.log(arr.copyWithin(0, -2, -1));  //[ 3, 2, 3, 4 ]   ===console.log(arr.copyWithin(0, (4-2),(4-1) ));


//arr.entries()
let arrs=[1,2,3,4];
console.log(arrs.entries());//{}
let myArr=arrs.entries();
//TODO
console.log('next' in myArr);   //true
console.log(myArr.next().value); //[ 0, 1 ]  ===[index,value]
console.log(myArr.next().value);  //[ 1, 2 ] ===[index,value]
console.log(myArr.next().value);   //[ 2, 3 ] ===[index,value]
console.log(myArr.next().value);  //[ 3, 4 ]  ===[index,value]


//arr.every(callback[, thisArg])
let myArrs=[3,4,5,6,7];
function everyMyArr(myArrs){
  //TODO
  return myArrs.every((element,index,arr)=>element>5);
}
console.log(everyMyArr(myArrs));   //false


//arr.fill(value[, start = 0[, end = this.length]])     [startIndex, endIndex)
let arrays=[0,3,2,1];
//@1  console.log(arrays.fill(4,1,3));   //[ 0, 4, 4, 1 ]
//@2  console.log(arrays.fill(4,2,1));   //[ 0, 3, 2, 1 ]
  console.log(arrays.fill(4,-3,-1));     //[ 0, 4, 4, 1 ]  ===arrays.fill(4,(4-3),(4-1))


//arr.filter(callback[, thisArg])
let arrName=[1,2,3,4];
function FilterElements(arrName){
  return arrName.filter((element,index,arr)=>{
    return index>2;
  });
}
console.log(FilterElements(arrName));  //[ 4 ]


//arr.find(callback[, thisArg])
let arrx=[1,2,3,4,5];
function findElements(arrx){
  return arrx.find((element,index,arr)=>{
    return element >3;
  });
}
console.log(findElements(arrx));  //4   找到了立即返回这个元素的值


//arr.findIndex(callback[, thisArg])
let arry=[1,2,3,4];
function findIndexOf(arry){
  return arry.findIndex((element,index,arr)=>{
    return element>2;
  });
}
console.log(findIndexOf(arry));    //2  返回这个元素的index


//array.forEach(callback[, thisArg])
let arrz=[1,2,3,4,5];
function forEachArr(arrz){
  return arrz.forEach((element,index,arr)=>{
    console.log(element+1);
  });
}

console.log(forEachArr(arrz));   //2 3 4 5 6 undefined


//array.includes(searchElement[, fromIndex])   /从该索引处开始查找 searchElement，fromIndex默认为0
let arra=[1,2,3,4,5];
console.log(arra.includes(2,0));  //true
console.log(arra.includes(2,2));  //false
console.log(arra.includes(2,-2));   //false  ===console.log(arra.includes(2,(5-2));
console.log(arra.includes(2,-7));  //true
console.log(arra.includes(2,7));   //false

//arr.indexOf(searchElement[, fromIndex = 0])
let arrb=[1,2,3,4,5];
console.log(arrb.indexOf(2,3));  //-1
console.log(arrb.indexOf(2,0));  //1    return index
console.log(arrb.indexOf(2,5));  //-1
console.log(arrb.indexOf(2,-1));  //-1   ===arrb.indexOf(2,(length-1)) conghouwangqianzhao
console.log(arrb.indexOf(2,-9));   //1  ===arrb.indexOf(2,0)


//str = arr.join([separator = ','])
let arrc=[1,2,3,4,5];
//
console.log(arrc.join());
console.log(arrc.join(','));   //1,2,3,4,5
console.log(arrc.join('#'));   //1#2#3#4#5



//arr.keys()
let arrd=[1,2,3,4,5];
//console.log(arrd.keys());  //{}
let elementArr=arrd.keys();
console.log("next" in elementArr);    //true
console.log(elementArr.next().value);  //0
console.log(elementArr.next());  //{ value: 1, done: false }
console.log(elementArr.next());   //{ value: 2, done: false }
console.log(elementArr.next());   //{ value: 3, done: false }
console.log(elementArr.next());   //{ value: 4, done: false }
console.log(elementArr.next());   //{ value: undefined, done: true }


//arr.lastIndexOf(searchElement[, fromIndex = arr.length - 1])   //逆向查找
let arre=[1,2,3,4,5];
//
console.log(arre.lastIndexOf(2,5));   //1  return index
console.log(arre.lastIndexOf(2,-9));   //-1   数组不会被查找


//array.map(callback[, thisArg])
let arrf=[1,2,3,4,5];
function mapElements(arrf){
  return arrf.map((element,index,arr)=>{
    return element+1;
  });
}
console.log(mapElements(arrf));  //[ 2, 3, 4, 5, 6 ]

//array.pop()
let arrg=[1,2,3,4,5];
console.log(arrg.pop());  //5  chuzhan


//arr.push(element1, ..., elementN)
let arrh=[1,2,3,4,5];
arrh.push([7,9]);
console.log(arrh.length);   //6
console.log(arrh);  //[ 1, 2, 3, 4, 5, [ 7, 9 ] ]

//arr.reduce(callback,[initialValue]
let arri=[1,2,3,4,5];
function reduceElement(arri){
  return arri.reduce((previousValue, currentValue, index, array)=>{
    return previousValue+currentValue;
  });
}
console.log(reduceElement(arri));   //15


//arr.reduceRight(callback[, initialValue])
let arro=[1,2,3,4,5];
function reduceRightElement(arro){
  return arro.reduce((previousValue, currentValue, index, array)=>{
    return previousValue + currentValue;
  });
}
console.log(reduceRightElement(arro));   //15


// arr.reverse()
let arrp=[1,2,3,4,5];
console.log(arrp.reverse());   //[ 5, 4, 3, 2, 1 ]

//arr.shift()
let arrq=[1,2,3,4,5];
console.log(arrq.shift());  //1   移除索引为0的元素(即第一个元素),并返回被移除的元素,其他元素的索引值随之减1


//arr.slice([begin[,end]])  [begin,end)
let arrl=[1,2,3,4,5];
console.log(arrl.slice(3,5));  //[ 4, 5 ]
console.log(arrl.slice(-2,-1));  //[ 4 ]  arrl.slice(5-2,5-1)

//arr.some(callback[, thisArg])
let arrm=[1,2,3,4,5];
function someElement(arrm){
  return arri.some((element, index, array)=>{
    return element>3;
  });
}
console.log(someElement(arrm));   //true

//arr.sort([compareFunction])
let arrn=[1,3,7,4,5];
//TODO
console.log(arrn.sort((a,b)=>{return a-b;}));   //[ 1, 3, 4, 5, 7 ]

//array.splice(start, deleteCount[, item1[, item2[, ...]]])
let arru=[1,2,3,4,5];
//TODO
console.log(arru.splice(2,2,8));  //[ 3, 4 ]  return 被删除的元素组成的一个数组
console.log(arru);  //[ 1, 2, 8, 5 ]


//arr.toString()
let arrv=[1,2,3,4,5];
console.log(arrv.toString());  //1,2,3,4,5

//
//arr.unshift(element1, ..., elementN)
let arrw=[1,2,3,4,5];
console.log(arrw.unshift(9));  //6  return length
console.log(arrw);  //[ 9, 1, 2, 3, 4, 5 ]




