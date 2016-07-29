fdescribe("checkPostcode",()=>{
  it("checkPostcode",()=>{
    let  postcode = '45056';
    let resutCheckPostcode=checkPostcode(postcode);
   let  expectText=true;
    expect(resutCheckPostcode).toEqual(expectText);
  });
  it("checkPostcode",()=>{
    let  postcode = '450561234';
    let resutCheckPostcode=checkPostcode(postcode);
   let  expectText=true;
    expect(resutCheckPostcode).toEqual(expectText);
  });
  it("checkPostcode",()=>{
    let  postcode ='45056-1234';
    let resutCheckPostcode=checkPostcode(postcode);
  let   expectText=true;
    expect(resutCheckPostcode).toEqual(expectText);
  });
});
fdescribe(("test postcodeChangToBarcode"),function(){
  it(("2-1 getReducedArray"),function(){
    let postcode='45056-1234';
    let checkResult='true';
    let arr=getReducedArray(postcode,checkResult);
    const expectText=[ '4', '5', '0', '5', '6', '1', '2', '3', '4' ];
    expect(arr).toEqual(expectText);
  });
  it(("2-2  getCheckCode"),function(){
    let arr=[ '4', '5', '0', '5', '6', '1', '2', '3', '4' ];
    let allCodes=['||:::',':::||','::|:|','::||:',':|::|',':|:|:',':||::','|:::|','|::|:','|:|::'];
    let checkCode = getCheckCode(arr, allCodes);
    const expectText=0;
    expect(checkCode).toEqual(expectText);
  });
  it(("2-3 getSubCodes"),function(){
    let arr=[ '4', '5', '0', '5', '6', '1', '2', '3', '4' ];
    let allCodes=['||:::',':::||','::|:|','::||:',':|::|',':|:|:',':||::','|:::|','|::|:','|:|::'];
    let checkCode =0;
    let subCodes = getSubCodes(arr, allCodes,checkCode);
    const expectText=[ ':|::|',
      ':|:|:',
      '||:::',
      ':|:|:',
      ':||::',
      ':::||',
      '::|:|',
      '::||:',
      ':|::|',
      '||:::' ]
    expect(subCodes).toEqual(expectText);
  });

  it(("2-4 getCodeString"),function(){
    let subCodes=[ ':|::|',
      ':|:|:',
      '||:::',
      ':|:|:',
      ':||::',
      ':::||',
      '::|:|',
      '::||:',
      ':|::|',
      '||:::' ];
    let codeString=getCodeString(subCodes);
    const expectText='|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    expect(codeString).toEqual(expectText);
  });
});
fdescribe(("totalChangTocodes"),()=>{
  it(("test1"),()=>{
    let postcode = '95713';
    let checkResult=true;
    let finalString=changToCodes(postcode,checkResult);
   const expectText='||:|:::|:|:|:::|:::||::||::|:|:|';
    expect(finalString).toEqual(expectText);
  });
  it(("test1"),()=>{
    let postcode = '450561234';
    let checkResult=true;
    let finalString=changToCodes(postcode,checkResult);
    const expectText='|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    expect(finalString).toEqual(expectText);
  });
  it(("test1"),()=>{
    let postcode = '45056-1234';
    let checkResult=true;
    let finalString=changToCodes(postcode, checkResult);
    const expectText='|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    expect(finalString).toEqual(expectText);
  });
});
fdescribe(("finalTestChangTocodes"),()=>{
  it(("finalTest1"),()=>{
    let postcode = '95713';
    let finalString=finalChangTocodes(postcode);
    const expectText='||:|:::|:|:|:::|:::||::||::|:|:|';
    expect(finalString).toEqual(expectText);
  });
  it(("finalTest1"),()=>{
    let postcode = '450561234';
    let finalString=finalChangTocodes(postcode);
    const expectText='|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    expect(finalString).toEqual(expectText);
  });
  it(("finalTest1"),()=>{
    let postcode = '45056-1234';
    let finalString=finalChangTocodes(postcode);
    const expectText='|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    expect(finalString).toEqual(expectText);
  });
});
fdescribe("checkBarcode",()=>{
  it("checkBarcode",()=>{
    let  barcode = '||:|:::|:|:|:::|:::||::||::|:|:|';
    let allCodes=['||:::',':::||','::|:|','::||:',':|::|',':|:|:',':||::','|:::|','|::|:','|:|::'];
    let resutCheckBarcode=checkBarcode(barcode, allCodes);
    let expectText=true;
    expect(resutCheckBarcode).toEqual(expectText);
  });
  it("checkBarcode",()=>{
    let  barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    let allCodes=['||:::',':::||','::|:|','::||:',':|::|',':|:|:',':||::','|:::|','|::|:','|:|::'];
    let resutCheckBarcode=checkBarcode(barcode, allCodes);
    let expectText=true;
    expect(resutCheckBarcode).toEqual(expectText);
  });
  it("checkBarcode",()=>{
    let  barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    let allCodes=['||:::',':::||','::|:|','::||:',':|::|',':|:|:',':||::','|:::|','|::|:','|:|::'];
    let resutCheckBarcode=checkBarcode(barcode, allCodes);
    let expectText=true;
    expect(resutCheckBarcode).toEqual(expectText);
  });
});

describe(("barcodeToPostcode"),function(){
  fit(("4-1 getBarCode"),function(){
    let barcode='|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    let checkNode='true';
    let barCode=getFormatBarCode(barcode, checkNode)
    const expectText=':|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|';
    expect(barCode).toEqual(expectText);
  });
  fit(("4-2 getBarCodesArray"),function(){
    let formatBarcode=':|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|';
    let allCodes=['||:::',':::||','::|:|','::||:',':|::|',':|:|:',':||::','|:::|','|::|:','|:|::'];
    let numberCodes=getBarCodesArray(formatBarcode, allCodes);
    const expectText=[ 4, 5, 0, 5, 6, 1, 2, 3, 4 ]
    expect(numberCodes).toEqual(expectText);
  });
  fit(("4-3 getCodeString"),function(){
    let numberCodes=[ 4, 5, 0, 5, 6, 1, 2, 3, 4 ];
    let codeString=getCodeToNumber(numberCodes);
    const expectText='45056-1234';
    expect(codeString).toEqual(expectText);
  });
});
fdescribe(("barcodeToPostcode"),()=>{
  "use strict";
  it(("test2"),()=>{
    let barcode='|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    // let checkResult=true;
    let finalString=totalChangeTopostcode(barcode);
    const expectText='45056-1234';
    expect(finalString).toEqual(expectText);
  });
  it(("test2"),()=>{
    let barcode = '||:|:::|:|:|:::|:::||::||::|:|:|';
    let checkResult=true;
    let finalString=totalChangeTopostcode(barcode);
    const expectText='95713';
    expect(finalString).toEqual(expectText);
  });
  it(("test2"),()=>{
    let barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    let checkResult=true;
    let finalString=totalChangeTopostcode(barcode);
    const expectText='450561234';
    expect(finalString).toEqual(expectText);
  });
});
