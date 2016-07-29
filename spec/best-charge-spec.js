
describe("isLegalBarcode", function(){
  it("judge input barcode if is correct", function() {
    let barcode = '|: ';
     let result = isLegalBarcode(barcode);

    expect(result).toEqual(true);
  })
});

describe("isValidFrame",function(){
  it("IsHaveValidFrame" ,function(){
    let barcode ='| ';
    let result = isValidFrame(barcode);
    expect(result).toEqual(false);
  })
});

describe("MatchBarcodeLength",function(){
  it("MatchBarcodeLength",function(){
    let barcode = '| ||:: ::|:| |';
    let result = matchBarcodeLength(barcode);

    expect(result).toEqual(false);
  })
});

describe('judgeBarcode(barcode)',function(){
  it('judge the whole barcode  is correct',function(){
    let barcode = '| ||::: :|:|: |:::| |';
    let result = judgeBarcode(barcode);
    expect(result).toEqual(true);
  })

});

describe('formatBarcode(barcode)',function(){
  it('get inner barcode',function(){
    let barcode = '| ::||| |::|: :::|| |::|: :::|| ::|:| ::||: :|::| |';
    let result = formatBarcode(barcode);
    expect(result).toEqual(['::|||','|::|:',':::||','|::|:',':::||','::|:|','::||:',':|::|']);
  })
});

describe('testCheckDigit',function(){
  it('testCheckDigit',function(){
    let formattedBarcode = ['::||:','|::|:',':::||','|::|:',':::||','::|:|','::||:',':|::|','||:::'];
    let table = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:','|:|::'];
    let result = testCheckDigit(formattedBarcode,table);
    expect(result).toEqual(true);
  })
});

describe('getZIPcode',function(){
  it('getZIPcode',function(){
      let formattedBarcode = ['::||:','|::|:',':::||','|::|:',':::||','::|:|','::||:',':|::|','||:::','||:::'];
   // let formattedBarcode = ['::||:','|::|:',':::||','|::|:',':::||','::|:|'];
    let table = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:','|:|::'];
    let result = getZIPcode(formattedBarcode,table);
  //  expect(result).toEqual('38181');
    expect(result).toEqual('38181-2340');

  })
});

describe('barcodeChangeZIPcode',function(){
  it('barcodeChangeZIPcode',function(){
    let barcode = '| ::|:| |::|: :::|| |::|: :::|| ||::: |';
    let table = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:','|:|::'];
    let result = barcodeChangeZIPcode(barcode,table);
    expect(result).toEqual('28181');

  })
});

describe('formatZIPcode',function(){
  it('ZIPcode change all num',function(){
    let ZIPcode = '45056-1234';
    let result = formatZIPcode( ZIPcode);
    expect(result).toEqual('450561234');
  })
});

describe('getCD',function(){
  it('getCD',function(){
  let formatedZIPcode = '450561234';
    let result = getCD(formatedZIPcode);
    expect(result).toEqual([ 4, 5, 0, 5, 6, 1, 2, 3, 4, 0 ]);
  })
});

describe('getBarcode',function(){
  it('getBarcode',function () {
    let input =  [ 4, 5, 0, 5, 6, 1, 2, 3, 4, 0 ];
    let table = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:','|:|::'];
    let result = getBarcode(input,table);
    expect(result).toEqual(':|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::');
  })
});
describe('getWholeBarcode',function(){
  it('getAllBarcode',function () {
    let input = ':|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::';
    let result = getWholeBarcode(input);
    expect(result).toEqual('|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|');
  })
});

describe('ZIPChangeCode',function(){
  it('ZIPChangeCode',function(){
    let input = '45056-1234';
    let table = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:','|:|::'];
    let result = ZIPcodeChangeBarcode(input,table);
    expect(result).toEqual('|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|');
  })
});
