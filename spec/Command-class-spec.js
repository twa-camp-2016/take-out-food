let CommandResponse = require("../command/Command-respones");
let mainCommand = require("../command/maincommand-class");
let goToZiptoBarcode = require("../command/GoToZiptoBarcodepage-class");
let translateZipcodeTobarcode = require("../command/TranslateZipcodetoBarcodeCommand-class");
let goToBrcodetoZipcode = require("../command/GoToBrcodeToZipcodepage-class");
let translateBarocdeToZipCode = require("../command/TranslateBarcodetoZipCodeCommand-class");
describe("Command-class", ()=> {
  it("#1:mainCommand", ()=> {
    let menu = new mainCommand();
    let text = `
1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`;
    let expected = new CommandResponse(text, false, false, false);
    expect(menu.execute()).toEqual(expected);
    expect(menu.execute()._text).toEqual(text);
  });
  it("#2:goToZiptoBarcode", () => {
    let number = '1';
    let putZipCode = new goToZiptoBarcode(number);
    let text = `Please input zip code:`;
    let newmapping = {"*": new translateZipcodeTobarcode(goToZiptoBarcode).execute};
    /* console.log(newmapping);
     console.log(putZipCode.execute()._newmapping);
     console.log(text);
     console.log(putZipCode.execute()._text);*/
    expect(putZipCode.execute()._text).toEqual(text);
    expect(putZipCode.execute()._newmapping).toEqual(newmapping);
  });
  it("#3:goToBarcodetoZip", ()=> {
    let number = '2';
    let putbarcode = new goToBrcodetoZipcode(number);
    let text = `Please input bar code:`;
    let newmapping = {"*": new translateBarocdeToZipCode(goToBrcodetoZipcode).execute};
    /* console.log(newmapping);
     console.log(putZipCode.execute()._newmapping);
     console.log(text);
     console.log(putZipCode.execute()._text);*/
    expect(putbarcode.execute()._text).toEqual(text);
    expect(putbarcode.execute()._newmapping).toEqual(newmapping);
  });
  it("#4:translateZipCodetoBarcodeCommand", function () {
    let code = 'aaa';
    let transcode = new translateZipcodeTobarcode(new goToZiptoBarcode().execute());
    let text = "please input right input";
    let next = new goToZiptoBarcode().execute();
    /*console.log(next);
     console.log(transcode.execute(code)._next);*/
    expect(transcode.execute(code)._text).toEqual(text);
    expect(transcode.execute(code)._next).toEqual(next);
  });
  it("#5:translateZipCodetoBarcodeCommand", function () {
    let code = '45056-1234';
    let transcode = new translateZipcodeTobarcode(new goToZiptoBarcode().execute());
    let text = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    let reset = true;
    expect(transcode.execute(code)._text).toEqual(text);
    expect(transcode.execute(code)._restet).toEqual(reset);
  });
  it("#6:translateBarcodetoZipCodeCommand", ()=> {
    let code = ':|:|:|';
    let transcode = new translateBarocdeToZipCode(new goToBrcodetoZipcode().execute());
    let text = "please input right input";
    let next = new goToBrcodetoZipcode().execute();
    /*console.log(next);
     console.log(transcode.execute(code)._next);*/
    expect(transcode.execute(code)._text).toEqual(text);
    expect(transcode.execute(code)._next).toEqual(next);
  });
  it("#7:translateBarcodetoZipCodeCommand", ()=> {
    let code = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    let transcode = new translateBarocdeToZipCode(new goToBrcodetoZipcode().execute());
    let text = '45056-1234';
    let reset = true;
    //console.log(transcode.execute(code)._text);
    expect(transcode.execute(code)._text).toEqual(text);
    expect(transcode.execute(code)._restet).toEqual(reset);
  });
});
