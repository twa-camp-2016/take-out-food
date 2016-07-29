'use strict';
/*let {
  checkPostcode,
  getReducedArray,
  getCheckCode,
  getSubCodes,
  getCodeString,
  changToCodes,
  finalChangTocodes,
  checkBarcode,
  getFormatBarCode,
  getBarCodesArray,
  getCodeToNumber,
  changeToPostcode,
  totalChangeTopostcode
}=require("../src/best-charge.js");*/
const fn = require('../src/best-charge');
fdescribe("测邮编的位数（5，9，10正确，4，6，8，11错误）", ()=> {
  it("5位邮编是正确的", ()=> {
    let postcode = '95713';
    let finalString =fn. finalChangTocodes(postcode);
    const expectText = '||:|:::|:|:|:::|:::||::||::|:|:|';
    expect(finalString).toEqual(expectText);
  });
  it("9位邮编是正确的", ()=> {
    let postcode = '450561234';
    let finalString =fn. finalChangTocodes(postcode);
    const expectText = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    expect(finalString).toEqual(expectText);
  });
  it("10位邮编是正确的", ()=> {
    let postcode = '45056-1234';
    let finalString =fn. finalChangTocodes(postcode);
    const expectText = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    expect(finalString).toEqual(expectText);
  });
  it("4位邮编是错误的", ()=> {
    let postcode = '1234';
    let finalString =fn. finalChangTocodes(postcode);
    let expectText = false;
    expect(finalString).toEqual(expectText);
  });
  it("6位邮编是错误的", ()=> {
    let postcode = '123456';
    let finalString =fn. finalChangTocodes(postcode);
    let expectText = false;
    expect(finalString).toEqual(expectText);
  });
  it("8位邮编是错误的", ()=> {
    let postcode = '12345678';
    let finalString =fn. finalChangTocodes(postcode);
    let expectText = false;
    expect(finalString).toEqual(expectText);
  });
  it("11位邮编是错误的", ()=> {
    let postcode = '1234567890';
    let finalString =fn. finalChangTocodes(postcode);
    let expectText = false;
    expect(finalString).toEqual(expectText);
  });
});


fdescribe(("测'-'的个数(1个正确，0个或2个错误)"),()=>{
  it(("1个正确"),()=>{
    let postcode = '45056-1234';
    let finalString =fn. finalChangTocodes(postcode);
    const expectText = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    expect(finalString).toEqual(expectText);
  });
  it(("0个错误"),()=>{
    let postcode = '1234567890';
    let finalString =fn. finalChangTocodes(postcode);
    const expectText = false;
    expect(finalString).toEqual(expectText);
  })
  it(("2个错误"),()=>{
    let postcode = '45-56-1234';
    let finalString =fn. finalChangTocodes(postcode);
    const expectText = false;
    expect(finalString).toEqual(expectText);
  })
});
fdescribe(("测'-'的位置(在第六位正确，在第7位，第5位错误)"),()=>{
  it(("在第六位正确"),()=>{
    let postcode = '45056-1234';
    let finalString =fn. finalChangTocodes(postcode);
    const expectText = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    expect(finalString).toEqual(expectText);
  });
  it(("在第5位错误"),()=>{
    let postcode = '1234567890';
    let finalString =fn. finalChangTocodes(postcode);
    const expectText = false;
    expect(finalString).toEqual(expectText);
  })
  it(("在第5位错误"),()=>{
    let postcode = '45-56-1234';
    let finalString =fn. finalChangTocodes(postcode);
    const expectText = false;
    expect(finalString).toEqual(expectText);
  });
});


fdescribe(("测特殊符号（除了'-'其他都错误）"),()=>{
  it(("5位邮编含（#）错误"),()=>{
    let postcode = '1234#';
    let finalString =fn. finalChangTocodes(postcode);
    const expectText = false;
    expect(finalString).toEqual(expectText);
  });
  it(("9位邮编含（#）错误"),()=>{
    let postcode = '12345678#';
    let finalString =fn. finalChangTocodes(postcode);
    const expectText = false;
    expect(finalString).toEqual(expectText);
  });
  it(("10位邮编含（#）错误"),()=>{
    let postcode = '123456789#';
    let finalString =fn. finalChangTocodes(postcode);
    const expectText = false;
    expect(finalString).toEqual(expectText);
  });
});


fdescribe(("测数字（邮编除了‘-’只能是数字）"),()=>{
  it(("5位邮编含（a）错误"),()=>{
    let postcode = '1234a';
    let finalString =fn. finalChangTocodes(postcode);
    const expectText = false;
    expect(finalString).toEqual(expectText);
  });
  it(("9位邮编含（a）错误"),()=>{
    let postcode = '12345678a';
    let finalString =fn. finalChangTocodes(postcode);
    const expectText = false;
    expect(finalString).toEqual(expectText);
  });
  it(("10位邮编含（a）错误"),()=>{
    let postcode = '123456789a';
    let finalString =fn. finalChangTocodes(postcode);
    const expectText = false;
    expect(finalString).toEqual(expectText);
  });
});

fdescribe(("测条码的位数（32位和52位（不含空格）正确，31位，33位，51位，53位都是错误的）"), ()=> {
  it(("长度为32的条码是正确的"), ()=> {
    let barcode = '||:|:::|:|:|:::|:::||::||::|:|:|';
    let checkResult = true;
    let finalString =fn. totalChangeTopostcode(barcode);
    const expectText = '95713';
    expect(finalString).toEqual(expectText);
  });
  it(("长度为52的条码是正确的"), ()=> {
    let barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    // let checkResult=true;
    let finalString = fn.totalChangeTopostcode(barcode);
    const expectText = '45056-1234';
    expect(finalString).toEqual(expectText);
  });
  it(("长度为31的条码是错误的"), ()=> {
    let barcode = '||:|:::|:|:|:::|:::||::||::|:|:';
    let checkResult = true;
    let finalString =fn. totalChangeTopostcode(barcode);
    const expectText = false;
    expect(finalString).toEqual(expectText);
  });
  it(("长度为33的条码是错误的"), ()=> {
    let barcode = '||:|:::|:|:|:::|:::||::||::|:|:||';
    let checkResult = true;
    let finalString =fn. totalChangeTopostcode(barcode);
    const expectText = false;
    expect(finalString).toEqual(expectText);
  });
  it(("长度为51的条码是错误的"), ()=> {
    let barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::';
    let checkResult = true;
    let finalString =fn. totalChangeTopostcode(barcode);
    const expectText = false;
    expect(finalString).toEqual(expectText);
  });
  it(("长度为53的条码是错误的"), ()=> {
    let barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|||';
    let checkResult = true;
    let finalString =fn. totalChangeTopostcode(barcode);
    const expectText = false;
    expect(finalString).toEqual(expectText);
  });

});
fdescribe(("测条码的两边是否是|"), ()=> {
  it(("长度位32最后是：的条码是错误的"), ()=> {
    let barcode = '||:|:::|:|:|:::|:::||::||::|:|:：';
    let checkResult = true;
    let finalString =fn. totalChangeTopostcode(barcode);
    const expectText = false;
    expect(finalString).toEqual(expectText);
  });
  it(("长度为52开始是：的条码是错误的"), ()=> {
    let barcode = '：:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    let checkResult = true;
    let finalString =fn. totalChangeTopostcode(barcode);
    const expectText = false;
    expect(finalString).toEqual(expectText);
  });
});
fdescribe(("测条码各位是否都是|或：（不含其他）"), ()=> {
  it(("长度位32最后是(字符a)的条码是错误的"), ()=> {
    let barcode = '||:|:::|:|:|:::|:::||::||::|:|:a';
    let checkResult = true;
    let finalString =fn. totalChangeTopostcode(barcode);
    const expectText = false;
    expect(finalString).toEqual(expectText);
  });
  it(("长度为52开始是符号（@）的条码是错误的"), ()=> {
    let barcode = '@:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    let checkResult = true;
    let finalString =fn. totalChangeTopostcode(barcode);
    const expectText = false;
    expect(finalString).toEqual(expectText);
  });
});
fdescribe(("测条码的校验位是否正确"), ()=> {
  it(("长度位32（此例）校验位本来是5，但写成6是错误的"), ()=> {
    let barcode = '||:|:::|:|:|:::|:::||::||::||：:|';
    let checkResult = true;
    let finalString =fn. totalChangeTopostcode(barcode);
    const expectText = false;
    expect(finalString).toEqual(expectText);
  });
  it(("长度为52校验位（此例）本来是0写成3的条码是错误的"), ()=> {
    let barcode = '@:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|::||:|';
    let checkResult = true;
    let finalString =fn. totalChangeTopostcode(barcode);
    const expectText = false;
    expect(finalString).toEqual(expectText);
  });
});
fdescribe(("测条码去掉开始和结尾的|每五位是否合法（含2个|和3个：）"), ()=> {
  it(("长度位32位（去掉开始和结尾的|，第一个5位含4个|，1个：）错误"), ()=> {
    let barcode = '||:|||:|:|:|:::|:::||::||::|:|:|';
    let checkResult = true;
    let finalString =fn. totalChangeTopostcode(barcode);
    const expectText = false;
    expect(finalString).toEqual(expectText);
  });
  it(("长度位32位（去掉开始和结尾的|，第一个5位含5个|）错误"), ()=> {
    let barcode = '||||||:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    let checkResult = true;
    let finalString =fn. totalChangeTopostcode(barcode);
    const expectText = false;
    expect(finalString).toEqual(expectText);
  });
});
fdescribe(("test postcodeChangToBarcode"), function () {
  it(("2-1 getReducedArray"), function () {
    let postcode = '45056-1234';
    let checkResult = 'true';
    let arr = fn.getReducedArray(postcode, checkResult);
    const expectText = ['4', '5', '0', '5', '6', '1', '2', '3', '4'];
    expect(arr).toEqual(expectText);
  });
  it(("2-2  getCheckCode"), function () {
    let arr = ['4', '5', '0', '5', '6', '1', '2', '3', '4'];
    let allCodes = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let checkCode = fn.getCheckCode(arr, allCodes);
    const expectText = 0;
    expect(checkCode).toEqual(expectText);
  });
  it(("2-3 getSubCodes"), function () {
    let arr = ['4', '5', '0', '5', '6', '1', '2', '3', '4'];
    let allCodes = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let checkCode = 0;
    let subCodes = fn.getSubCodes(arr, allCodes, checkCode);
    const expectText = [':|::|',
      ':|:|:',
      '||:::',
      ':|:|:',
      ':||::',
      ':::||',
      '::|:|',
      '::||:',
      ':|::|',
      '||:::']
    expect(subCodes).toEqual(expectText);
  });

  it(("2-4 getCodeString"), function () {
    let subCodes = [':|::|',
      ':|:|:',
      '||:::',
      ':|:|:',
      ':||::',
      ':::||',
      '::|:|',
      '::||:',
      ':|::|',
      '||:::'];
    let codeString =fn. getCodeString(subCodes);
    const expectText = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    expect(codeString).toEqual(expectText);
  });
});
fdescribe(("totalChangTocodes"), ()=> {
  it(("test1"), ()=> {
    let postcode = '95713';
    let checkResult = true;
    let finalString = fn.changToCodes(postcode, checkResult);
    const expectText = '||:|:::|:|:|:::|:::||::||::|:|:|';
    expect(finalString).toEqual(expectText);
  });
  it(("test1"), ()=> {
    let postcode = '450561234';
    let checkResult = true;
    let finalString = fn.changToCodes(postcode, checkResult);
    const expectText = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    expect(finalString).toEqual(expectText);
  });
  it(("test1"), ()=> {
    let postcode = '45056-1234';
    let checkResult = true;
    let finalString =fn. changToCodes(postcode, checkResult);
    const expectText = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    expect(finalString).toEqual(expectText);
  });
});

fdescribe("checkBarcode", ()=> {
  it("checkBarcode", ()=> {
    let barcode = '||:|:::|:|:|:::|:::||::||::|:|:|';
    let allCodes = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let resutCheckBarcode =fn. checkBarcode(barcode, allCodes);
    let expectText = true;
    expect(resutCheckBarcode).toEqual(expectText);
  });
  it("checkBarcode", ()=> {
    let barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    let allCodes = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let resutCheckBarcode =fn. checkBarcode(barcode, allCodes);
    let expectText = true;
    expect(resutCheckBarcode).toEqual(expectText);
  });
  it("checkBarcode", ()=> {
    let barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    let allCodes = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let resutCheckBarcode = fn.checkBarcode(barcode, allCodes);
    let expectText = true;
    expect(resutCheckBarcode).toEqual(expectText);
  });
});

fdescribe(("barcodeToPostcode"), function () {
  fit(("4-1 getBarCode"), function () {
    let barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    let checkNode = 'true';
    let barCode = fn.getFormatBarCode(barcode, checkNode)
    const expectText = ':|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|';
    expect(barCode).toEqual(expectText);
  });
  fit(("4-2 getBarCodesArray"), function () {
    let formatBarcode = ':|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|';
    let allCodes = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let numberCodes = fn.getBarCodesArray(formatBarcode, allCodes);
    const expectText = [4, 5, 0, 5, 6, 1, 2, 3, 4]
    expect(numberCodes).toEqual(expectText);
  });
  fit(("4-3 getCodeString"), function () {
    let numberCodes = [4, 5, 0, 5, 6, 1, 2, 3, 4];
    let codeString =fn. getCodeToNumber(numberCodes);
    const expectText = '45056-1234';
    expect(codeString).toEqual(expectText);
  });
});
fdescribe(("checkPostcode"), ()=> {
  it(("finalTest1"), ()=> {
    let postcode = '95713';
    let result = fn.checkPostcode(postcode);
    let expectText = true;
    expect(result).toEqual(expectText);
  });
  it(("finalTest1"), ()=> {
    let postcode = '450561234';
    let result = fn.checkPostcode(postcode);
    let expectText = true;

    expect(result).toEqual(expectText);
  });
  it(("finalTest1"), ()=> {
    let postcode = '45056-1234';
    let result = fn.checkPostcode(postcode);
    let expectText = true;
    expect(result).toEqual(expectText);
  });
});
