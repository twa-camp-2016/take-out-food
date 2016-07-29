let codes=require("../core/zipCodeTranslate");
let inputbarcode=require("../core/barcodetranslateZipCode");
let responestranslate=require("../core/responesTranslate");
describe("#1:zipCodeTranslate", ()=>
{
  it("#1Zipcode change Brcode",()=>
  {
    let zipcode='45056-1234';
    let barcode=new codes();
      expected=new responestranslate('|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|');
    expect(barcode.execute(zipcode)).toEqual(expected);
  });
it("#2:barcode change ZipCode",()=>
  {
    let zipcode='|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    let barcode=new inputbarcode();
    expected=new responestranslate('45056-1234');
    expect(barcode.execute(zipcode)).toEqual(expected);
  });
});
