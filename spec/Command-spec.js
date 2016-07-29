let Command=require("../command/Command");
describe("#11:MainCommand",function () {
  let menu=Command.mainCommand();
  let expected={text: `
1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`};
  it("it is a mainCommand",function ()
  {
    expect(menu).toEqual(expected);
  });
});
describe("#12:goToZiptoBarcode",function () {
  let number='1';
  let putZipCode=Command.goToZiptoBarcodePage(number);
  let expected={text:`Please input zip code:`,
    newmapping:{
      "*":Command.translateZipCodetoBarcodeCommand
    }};
  it("it is a mainCommand",function ()
  {
    expect(putZipCode).toEqual(expected);
  });
});
describe("#13:goToBarcodetoZip",function () {
  let number='2';
  let putBarocde=Command.goToBarcodetoZipPage(number);
  let expected={text:`Please input bar code:`,
    newmapping:{
      "*":Command.translateBarcodetoZipCodeCommand
    }};
  it("it is a goToBarcodetoZip",function ()
  {
    expect(putBarocde).toEqual(expected);
  });
});
describe("#14:ExitCommand",function () {
 let number='3';
 let putBarocde=Command.exitCommand(number);
 let expected={text:`Quit`};
 it("it is a ExitCommand",function ()
 {
 expect(putBarocde).toEqual(expected);
 });
 });
describe("#15:transformCommand",function () {
  let code='aaa';
  let transcode=Command.translateZipCodetoBarcodeCommand(code);
  let expected={
    text: "please input right input",
    next:  Command.goToZiptoBarcodePage
  };
  it("it error translateZipCodetoBarcodeCommand",function ()
  {
    expect(transcode).toEqual(expected);
  });
});
describe("#16:transformCommand",function () {
  let code=':|45';
  let transcode=Command.translateBarcodetoZipCodeCommand(code);
  let expected= {
    text: "please input right input",
    next: Command.goToBarcodetoZipPage
  };
  it("it error translateBarcodetoZipCodeCommand",function ()
  {
    expect(transcode).toEqual(expected);
  });
});
describe("#17:transformCommand",function () {
  let code=':|:|:|';
  let transcode=Command.translateBarcodetoZipCodeCommand(code);
  let expected={
    text: "please input right input",
    next: Command.goToBarcodetoZipPage
  };
  it("it error translateBarcodetoZipCodeCommand",function ()
  {
    expect(transcode).toEqual(expected);
  });
});
describe("#18:transformCommand",function () {
  let code='45056-1234';
  let transcode=Command.translateZipCodetoBarcodeCommand(code);
  let expected= {
    text:'|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|',
    reset: true
  };
  it("it is right translateZipCodetoBarcodeCommand",function ()
  {
    expect(transcode).toEqual(expected);
  });
});
describe("#19:transformCommand",function () {
  let code='|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
  let transcode=Command.translateBarcodetoZipCodeCommand(code);
  let expected= {
    text:'45056-1234',
    reset: true
  };
  it("it is right translateBarcodetoZipCodeCommand",function ()
  {
    expect(transcode).toEqual(expected);
  });
});
