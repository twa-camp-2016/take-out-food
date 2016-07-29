let routing = require("../route/route");
describe("@0:mainCommandt", function () {
  beforeEach(()=> {
      routing.reset();
    }
  );
  it("putout mainCommand ", ()=> {
    let menu = routing("main");
    let expected = `
1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`;
    expect(menu).toEqual(expected);
  });
  it("@1:command1", ()=> {
    let menu = routing('1');
    let expected = `Please input zip code:`;
    expect(menu).toEqual(expected);
  });
  it("@2:command2", ()=> {
    let menu = routing('2');
    let expected = `Please input bar code:`;
    expect(menu).toEqual(expected);
  });
  it("@3:translateZiptoBarcode is right", ()=> {
    routing('1');
    let response = routing('45056-1234');
    let expected = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    expect(response).toEqual(expected);
  });
  it("@4:translateZiptoBarcode is error", ()=> {
    routing('1');
    let response = routing('45056a1234');
    let expected = `please input right input\nPlease input zip code:`;
    expect(response).toEqual(expected);
  });
  it("@5:translateBarcodetoZip is right", ()=> {
    routing('2');
    let response = routing('|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|');
    let expected = '45056-1234';
    expect(response).toEqual(expected);
  });
  it("@6:translateBarcodetoZip is error", ()=> {
    routing('2');
    let response = routing('|:|::|:|:|:||::::|:a|::||:::::||::|:|::||::|::|||:::|');
    let expected = "please input right input\nPlease input bar code:";
    expect(response).toEqual(expected);
  });
});


