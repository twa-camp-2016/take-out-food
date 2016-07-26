/**
 * Created by zhagnian on 16-7-26.
 */
//str.charAt(index)   返回字符串中指定位置的字符
let srt1="abc";
console.log(srt1.charAt(2));   //c

//str.concat(string2, string3[, ..., stringN])  将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回
let str2="avdj";
let str3="hdgw";
console.log(str2.concat(str3));   //avdjhdgw

//str.endsWith(searchString [, position]);   用来判断当前字符串是否是以另外一个给定的子字符串“结尾”的
let str4="zghsytr kijh";
console.log(str4.endsWith("tr",7));   //true

//todo
//str.includes(searchString[, position])  默认为0  判断一个字符串是否被包含在另一个字符串中，如果是返回true，否则返回false
let str5="ahhdgewh";
console.log(str5.includes("ah"));   //true


//str.indexOf(searchValue[, fromIndex])  返回指定值在字符串对象中首次出现的位置
let str6="zbhsjdb";
console.log(str6.indexOf("z"));     //0


//str.lastIndexOf(searchValue[, fromIndex])
let str7="sbhcbdshc";
console.log(str7.lastIndexOf("s"));   //6


//str.match(regexp);
let stro="ABCDEFD";
let reg=/[a-d]/ig;
console.log(stro.match(reg));   //["A", "B", "C", "D", "D"]



//var newString = string.repeat(count);   构造并返回一个重复当前字符串若干次数的新字符串
let str8="nhh";
console.log(str8.repeat(4));   //nhhnhhnhhnhh


//str.search(regexp)  return index
let stre="bxsgk";
let reg=/[a-d]/ig;
console.log(stre.search(reg));   //0


//str.startsWith(searchString [, position]);判断当前字符串是否是以另外一个给定的子字符串“开头”的
let str9="bchscjs";
console.log(str9.startsWith("sc",3));   //true


//str.strike()
let worldString = 'Hello, world';
console.log(worldString.strike());   //<strike>Hello, world</strike>

//todo
//str.sub()
let worldStrings = 'Hello, world';
console.log(worldStrings.sub());    //<sub>Hello, world</sub>


//str.substr(start[, length])   返回字符串中从指定位置开始到指定长度的子字符串
let str10="shgdsd";
console.log(str10.substr(2,3));   //gds


//str.substring(indexStart[, indexEnd])   [)
let str11="hsvcsan";
console.log(str11.substring(2,3));   //v 如果任一参数小于 0 或为 NaN，则被当作 0.
                                     // 任一参数大于 stringName.length，则被当作 stringName.length


//str.toLowerCase()   将调用该方法的字符串值转为小写形式，并返回
let str12="asbDIshdh";
console.log(str12.toLowerCase());   //asbdishdh


//str.trim()
let str13=" hgdg ";
console.log(str13.trim());   //hgdg

//string.trimLeft()
let str14=" hgdg ";
console.log(str14.trimLeft());  //hgdg

//string.trimRight()
let str15=" hgdg ";
console.log(str14.trimRight());// hgdg

//str.valueOf()   返回一个String对象的原始值
let str16="bxshvsa";
console.log(str16.valueOf());  //bxshvsa



