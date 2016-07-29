let mainCommand=require("../command/maincommand-class");
let command1=require("../command/GoToZiptoBarcodepage-class");
let command2=require("../command/GoToBrcodeToZipcodepage-class");
let mapping={
  "1":new command1(),
  "2":new command2(),
 // "3":command3,
  "main":new mainCommand()
};
class route
{
  execute(input) {
    let response;
    let command = mapping[input];
    let result = "";
    if (command) {
      response =command.execute();
      result += response._text;
    } else if (mapping[0]["*"]) {
      response = mapping[0]["*"](input);
      result += response._text;
      var responesnext=mapping[1];
    } else {
      return "no command";

    }
    if(response.reset){
      mapping={
        "1":command1,
        "2":command2,
        //"3":command3,
        "main":mainCommand
      };
    }
    if (response._newmapping) {
      mapping = [response._newmapping,command];
    }
    if (responesnext&&(!response._restet)) {
      let newResponse;
      do {
      //  console.log(responesnext);
        newResponse = responesnext.execute();
        result += "\n";
        result += newResponse._text;
      } while (newResponse.next);
    }
    return result;
  }
}
route.reset=function () {
  mapping={
    "1":new command1(),
    "2":new command2(),
//  "3":command3,
    "main":new mainCommand()
  };
};
module.exports=route;

/*
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  introduce()
  {
    return `My name is Tom. I am 21 years old.`;
  }
}
class Student extends Person
{
 constructor(name,age)
 {
   super(name,age);
 }
 introduce()
 {
   person=new Person().introduce();
   return person+`I am a Student. I am at Class 2.`;
 }
}
class Worker extends Person
{
  constructor()
  {
    super();
  }
  introduce(name,age)
  {
    return new Person().introduce()+`I am a Worker. I have a job.`;
  }
}
let person=new Person();
let student=new Student();
let worker=new Worker();
//console.log(person.introduce());
console.log(student.introduce());
console.log(worker.introduce());

*/

