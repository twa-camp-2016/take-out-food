let _=require("lodash");
let translateZipCodetoBarcodeCommand=require("./TranslateZipcodetoBarcodeCommand-class");
let respones=require("./Command-respones");
class  goToZiptoBarcodePage
{
  execute() {
    let text=`Please input zip code:`;
    let newmapping={"*":new translateZipCodetoBarcodeCommand(new goToZiptoBarcodePage()).execute};
    return new respones(text,newmapping,false,false);
  }

}
module.exports=goToZiptoBarcodePage;
