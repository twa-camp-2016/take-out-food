let check = require("../core/barcodetranslateZipCode");
let respoes = require("./Command-respones");
//let gotobarcodeZipPage = require("./GoToBrcodeToZipcodepage-class");
class translateBarcodetoZipCodeCommand {
  constructor(gotobarcodeZipPage)
  {
    this.gotobarcodeZipPage=gotobarcodeZipPage;
  }
  execute(barcodes) {
    let checkFormat=new check();
    let hasBrcode =checkFormat.checkFormatBarcodes(barcodes);
    if (hasBrcode === false) {
      let text = "please input right input";
      let next =this.gotobarcodeZipPage;
      return new respoes(text, false, next, false);
    }
    else {
      let text = checkFormat.barcodeToZipcode(barcodes)._message;
      let reset = true;
      return new respoes(text, false, false, reset);
    }
  }
}
module.exports = translateBarcodetoZipCodeCommand;
