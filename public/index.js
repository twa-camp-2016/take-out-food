// 请把与index.html页面相关的javascript代码写在这里
// 同时删除该注释

function calculatePrice() {
  var oCount1=document.getElementsByClassName('count1');
  var oCount2=document.getElementsByClassName('count2');
  var oCount3=document.getElementsByClassName('count3');
  var oCount4=document.getElementsByClassName('count4');
  var oSub1=document.getElementsByClassName('sub1');
  var oSub2=document.getElementsByClassName('sub2');
  var oAdd1=document.getElementsByClassName('add1');

  oSub1.onclick=function () {
    if(oCount1.value>0)
    oCount1.value--;
  };
  oAdd1.onclick=function () {
    oCount1.value++;
  }
  oSub2.onclick=function () {
    if(oCount2.value>0)
      oCount2.value--;
  };
  oAdd2.onclick=function () {
    oCount2.value++;
  }
  oSub3.onclick=function () {
    if(oCount3.value>0)
      oCount3.value--;
  };
  oAdd3.onclick=function () {
    oCount3.value++;
  }
  oSub4.onclick=function () {
    if(oCount4.value>0)
      oCount4.value--;
  };
  oAdd4.onclick=function () {
    oCount4.value++;
  }
}

function clear() {
  // 清除用户的选择，以及页面显示的信息
  // 清除之后，用户可以继续正常使用各项功能
}
