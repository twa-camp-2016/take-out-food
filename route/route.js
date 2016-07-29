let zipBarcode=require("../command/Command");
let command1=zipBarcode.goToZiptoBarcodePage;
let command2=zipBarcode.goToBarcodetoZipPage;
let command3=zipBarcode.exitCommand;
let mainCommand=zipBarcode.mainCommand;
let mapping={
  "1":command1,
  "2":command2,
  "3":command3,
  "main":mainCommand
};
function route(input) {
  let response;
  let command = mapping[input];
  let result ="";
  if(command){
    response = command(input);
    result+=response.text;
  }else if(mapping["*"]){
    response = mapping["*"](input);
    result+=response.text;
  }else {
    return "no command";

  }
  if(response.reset){
    mapping={
      "1":command1,
      "2":command2,
      "3":command3,
      "main":mainCommand
    };
  }
  if(response.newmapping){
    mapping=response.newmapping;
  }

  if(response.next){
    let newResponse;
    do{
      newResponse = response.next();
      result+="\n";
      result+=newResponse.text;
    }while (newResponse.next);
  }
  return result;
}
route.reset=function () {
  mapping={
    "1":command1,
    "2":command2,
    "3":command3,
    "main":mainCommand
  }
};
module.exports=route;
