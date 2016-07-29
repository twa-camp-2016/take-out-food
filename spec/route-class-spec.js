let routing = require("../route/route-class");
describe("route", ()=> {
 beforeEach(()=> {
      routing.reset();
    }
  );
 it("@0:mainCommandt ", ()=> {
    let menu = new routing();
    let expected = `
1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`;
    expect(menu.execute("main")).toEqual(expected);
  });
 it("@1:command1", ()=> {
    let menu =new routing();
    let expected = `Please input zip code:`;
    expect(menu.execute("1")).toEqual(expected);
  });
  it("@2:command2", ()=> {
    let menu = new routing();
    let expected = `Please input bar code:`;
    expect(menu.execute("2")).toEqual(expected);
  });
  it("@3:translateZiptoBarcode is right", ()=> {
    new routing().execute("1");
    let response = new routing();
    let expected = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    expect(response.execute('45056-1234')).toEqual(expected);
  });
  it("@4:translateZiptoBarcode is error", ()=> {
    new routing().execute("1");
    let response = new routing();
    let expected = `please input right input\nPlease input zip code:`;
    expect(response.execute('45056a1234')).toEqual(expected);
  });
  it("@5:translateBarcodetoZip is right", ()=> {
    new routing().execute("2");
    let response = new routing();
    let expected = '45056-1234';
    expect(response.execute('|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|')).toEqual(expected);
  });
  it("@6:translateBarcodetoZip is error", ()=> {
    new routing().execute("2");
    let response = new routing();
    let expected = "please input right input\nPlease input bar code:";
    expect(response.execute('|:|::|:|:|:||::::|:a|::||:::::||::|:|::||::|::|||:::|')).toEqual(expected);
  });
});
