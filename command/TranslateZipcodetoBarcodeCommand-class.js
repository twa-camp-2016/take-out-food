let checke = require("../core/zipCodeTranslate");
let respoes = require("./Command-respones");
class translateZipCodetoBarcodeCommand {
  constructor (goToZipToBarcode)
  {
    this.goToZipToBarcode=goToZipToBarcode;
  }
  execute(codes) {
    let zipChecke = new checke();
    let hasZipcode = zipChecke.checkeFormatZip(codes);
    if (hasZipcode === false) {
      let text = "please input right input";
      let next =this.goToZipToBarcode;
  //    console.log(next);
    //  console.log(new respoes(text,false,next,false));
      return new respoes(text,false,next,false);
    }
    else {

      let text = zipChecke.zipToBarcode(codes)._message;
      let reset = true;
      return new respoes(text, false, false, reset);
    }
  }
}
module.exports=translateZipCodetoBarcodeCommand;
