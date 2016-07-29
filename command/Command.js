let zipcodeAndBarcode=require("../core/core");
function mainCommand() {
  return {text: `
1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`};
}
function goToZiptoBarcodePage() {
  return {text:`Please input zip code:`,
  newmapping:{
    "*":translateZipCodetoBarcodeCommand
  }};
}
function goToBarcodetoZipPage() {
  return {text:`Please input bar code:`,
  newmapping:{
    "*":translateBarcodetoZipCodeCommand
  }};
}
function exitCommand() {
  return {text:`Quit`};
}
function translateZipCodetoBarcodeCommand(codes) {
  let hasZipcode = zipcodeAndBarcode.checkeFormatZip(codes);
  if (hasZipcode === false) {
    return{
      text: "please input right input",
      next: goToZiptoBarcodePage
    };
  //  return {text:reuslt.text,next:`Please input zip code:`}
  }
  else {
    return {
      text:zipcodeAndBarcode.zipToBarcode(codes),
      reset: true
    }
  }
}
function translateBarcodetoZipCodeCommand(codes) {
  let hasBrcode = zipcodeAndBarcode.checkFormatBarcodes(codes);
  //console.log(hasBrcode);
  if (hasBrcode === false) {
    return {
      text: "please input right input",
      next: goToBarcodetoZipPage
    };
   // return {text:reuslt.text,next:`Please input bar code:`}
  }
  else {
    return {
      text:zipcodeAndBarcode.barcodeToZipCode(codes),
      reset: true
    }
  }

}
module.exports =
{
  mainCommand,
  goToZiptoBarcodePage,
  goToBarcodetoZipPage,
  exitCommand,
  translateZipCodetoBarcodeCommand,
  translateBarcodetoZipCodeCommand
};

