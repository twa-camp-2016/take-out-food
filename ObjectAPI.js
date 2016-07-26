/**
 * Created by zhagnian on 16-7-26.
 */
//Object.assign(target, ...sources)
  //
let obj1={a:1};
let obj2={b:2};
console.log(Object.assign(obj1,obj2));  //{ a: 1, b: 2 }

//
//Object.create(proto, [ propertiesObject ])
let obj3={a:1,b:2};
let obj4=Object.create(obj3);
console.log(obj4.a);  //1
console.log(obj4);  //{}

//
//Object.defineProperties(obj, props)
var obj = {};
Object.defineProperties(obj, {
  "property1": {
    value: true,
    writable: true
  },
  "property2": {
    value: "Hello",
    writable: false
  }
});
console.log(obj);  //Object {property1: true, property2: "Hello"}
console.log(obj.property2);  //Hello


//Object.defineProperty(obj, prop, descriptor)
let o = {};
Object.defineProperty(o, "a", {value : 37,
  writable : true,
  enumerable : true,
  configurable : true});
console.log(o);   //Object {a: 37}
console.log(o.a);  //37

/*
//Object.entries(obj)
let obj5={a:1,b:2};
console.log(Object.entries(obj5));
*/


//Object.freeze(obj)
let obj6 = {
  prop: function (){},
  foo: "bar"
};
obj6.foo = "baz";
obj6.lumpy = "woof";
delete obj.prop;
console.log(obj6);   //{ prop: [Function], foo: 'baz', lumpy: 'woof' }
let  obj7 = Object.freeze(obj6);

obj7.foo = "quux";

console.log(obj7);  //{ prop: [Function], foo: 'baz', lumpy: 'woof' }


//Object.getOwnPropertyNames(obj)
let  obj8 = { first: "a", second: "b", third: "c"};
//TODO
console.log(Object.getOwnPropertyNames(obj8));   //["first", "second", "third"]
Object.getOwnPropertyNames(obj8).forEach(function(val, idx, array) {
  console.log(val + " -> " + obj8[val]);
});                                                //first -> a second -> b third -> c

//TODO
//Object.getPrototypeOf(object)
let obj9={a:1,b:3};
let obj10=Object.create(obj9);
console.log(obj10);  //{}
console.log(obj10.__proto__);   //{ a: 1, b: 3 }
console.log(Object.getPrototypeOf(obj10) === obj9);   //true



//Object.is(value1, value2);    用来判断两个值是否是同一个值
console.log(Object.is('foo', 'bar'));
console.log(Object.is('foo', 'f'+'oo'));   //true
console.log(Object.is([], []));        //false
//todo
//Object.isExtensible(obj)    判断一个对象是否是可扩展的
let empty = {};
console.log(Object.isExtensible(empty));   //true

//todo
//Object.isFrozen(obj)   //判断一个对象是否被冻结
console.log(Object.isFrozen({}) === false);  //true

//todo
//Object.isSealed(obj)     判断一个对象是否是密封的
let obj11={};
Object.preventExtensions(obj11);
console.log(Object.isSealed(obj11));    //true


//Object.keys(obj)     返回一个由给定对象的所有可枚举自身属性的属性名组成的数组
let obj12 = {a:"a",b: "b", c:"c"};
console.log(Object.keys(obj12));     //[ 'a', 'b', 'c' ]

//todo

//obj.hasOwnProperty(prop)   用来判断某个对象是否含有指定的自身属性   prop要检测的属性名称
obj13 = new Object();
obj13.prop = 'exists';
function changeObj13(obj13) {
  obj13.newprop = obj13.prop;
  delete obj13.prop;
}
console.log(obj13.hasOwnProperty('prop'));  //true
changeObj13(obj13);
console.log(obj13.hasOwnProperty('prop'));     //false


//prototype.isPrototypeOf(object)   测试一个对象是否存在于另一个对象的原型链上
let objx={a:1,b:2};
let objy=Object.create(objx);
console.log(objx.prototype.isPrototypeOf(objy));


//object.toString()     返回一个代表该对象的字符串
let  obj14 = new Object();
console.log(obj14.toString());   //[object Object]
let  obj15={a:1,b:3};
console.log(obj15.toString());    //[object Object]

//
//Object.seal(obj)    可以让一个对象密封，并返回被密封后的对象
let  obj16={a:1,b:3};
console.log(Object.seal(obj16) );   //{ a: 1, b: 3 }


/*
//Object.values(obj)
let  obj17={a:1,b:3};
console.log(Object.values(obj17));
*/








