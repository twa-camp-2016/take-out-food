'use strict';
let zipcodeAndBarcode=require("../core/core");
let allCodes = require('../src/allcodes');

describe("#1:ZipCodes of testedZipCodes", function() {
  let zipCodes ='45056-1234';
  //let zipCodes ='aaaaa';
  let testedZipCodes=zipcodeAndBarcode.checkeFormatZip(zipCodes);
  let expected='45056-1234';
  it("ZipCodes changed testedZipCodes ", function() {
    expect(testedZipCodes).toEqual(expected);
  });
});

describe("#2:testedZipCodes of formatZipCodes",function () {
  //let testedZipCodes='45056-1234';
  let testedZipCodes='4505612340';
  let formatZipCodes=zipcodeAndBarcode.getFormatZip(testedZipCodes);
  let expected=[4,5,0,5,6,1,2,3,4,0];
  it("testedZipCodes change formatZipCodes",function ()
  {
    expect(formatZipCodes).toEqual(expected);
  });
});
describe("#3:formatZipCodes of matchBarcodes",function () {
  let testedZipCodes='450561234';
  let formatZipCodes=[4,5,0,5,6,1,2,3,4,0];
  // let allcodes=loadallCodes();
  let matchBarcodes=zipcodeAndBarcode.matchbyTable(formatZipCodes,allCodes());
  let expected=':|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::||:::';
  it("formatZipCodes changed matchBarcodes",function ()
  {
    expect(matchBarcodes).toEqual(expected);
  });
});
describe("#4:matchBarcodes of Barcode",function () {
  let testedZipCodes='450561234';
  let matchBarcodes=':|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::';
  let barcodes=zipcodeAndBarcode.buildStringBarcode(matchBarcodes);
  let expected='|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
  it("matchBarcodes changed Barocde",function ()
  {
    expect(barcodes).toEqual(expected);
  });
});


describe("#5:Barcode of testeddBarcodes",function () {
  let barcodes='|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
  let testedBarcodes=zipcodeAndBarcode.checkFormatBarcodes(barcodes);
  let expected='|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
  it("Barocde changed testedBarcodes",function ()
  {
    expect(testedBarcodes).toEqual(expected);
  });
});
describe("#6:testeddBarcodes of formatBarcodes",function () {
  let testedBarcodes='|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
  let formatBarcodes=zipcodeAndBarcode.getFormatBarcodes(testedBarcodes);
  let expected=[{bar_code:':|::|'},{bar_code:':|:|:'},{bar_code:'||:::'},
    {bar_code:':|:|:'},{bar_code:':||::'},{bar_code:':::||'},{bar_code:'::|:|'},{bar_code:'::||:'},
    {bar_code:':|::|'},{bar_code:'||:::'}];
  it("formatBarcodes",function ()
  {
    expect(formatBarcodes).toEqual(expected);
  });
});
describe("#7:formatBarcodes of matchZioCodes",function () {
  let testedBarcodes='|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
  let formatBarcodes=[{bar_code:':|::|'},{bar_code:':|:|:'},{bar_code:'||:::'},
    {bar_code:':|:|:'},{bar_code:':||::'},{bar_code:':::||'},{bar_code:'::|:|'},{bar_code:'::||:'},
    {bar_code:':|::|'},{bar_code:'||:::'}];
  let matchZipCodes=zipcodeAndBarcode.matchbyZipCode(formatBarcodes);
  let expected='4505612340';
  it("matchZioCodes",function ()
  {
    expect(matchZipCodes).toEqual(expected);
  });
});
describe("#8:matchZioCodes of calculatedCD",function () {
  let testedBarcodes='|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
  let matchZipCodes='4505612340';
  let calculatedCd=zipcodeAndBarcode.calculateCd(matchZipCodes);
  let expected='450561234';
  it("calculatedCD",function ()
  {
    expect(calculatedCd).toEqual(expected);
  });
});
describe("#9:matchZioCodes of calculatedCD",function () {
  let calculatedCd='4505612340';
  let zipCodes=zipcodeAndBarcode.buildStringZipCode(calculatedCd);
  let expected='4505612340';
  it("calculatedCD",function ()
  {
    expect(zipCodes).toEqual(expected);
  });
});
describe("#10:matchZioCodes of calculatedCD",function () {
  let calculatedCd='450561234';
  let zipCodes=zipcodeAndBarcode.buildStringZipCode(calculatedCd);
  let expected='45056-1234';
  it("calculatedCD",function ()
  {
    expect(zipCodes).toEqual(expected);
  });
});
describe("#10:matchZioCodes of calculatedCD",function () {
  let calculatedCd='|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
  let zipCodes=zipcodeAndBarcode.barcodeToZipCode(calculatedCd);
  let expected='45056-1234';
  it("calculatedCD",function ()
  {
    expect(zipCodes).toEqual(expected);
  });
});
