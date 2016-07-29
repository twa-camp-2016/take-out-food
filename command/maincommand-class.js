let _=require("lodash");
let respones=require("./Command-respones");
class maincommand {
  execute() {
    let text=`
1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`;
    return (new respones(text,false,false,false));
  }
}
module.exports=maincommand;
