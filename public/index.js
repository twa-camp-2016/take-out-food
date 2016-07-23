// 请把与index.html页面相关的javascript代码写在这里
// 同时删除该注释
let promotion = require('../spec/best-charge-spec.js');
const allItems = require('../src/items');
function calculatePrice() {
  $(".items").val(promotion());
  let counts = [$("#count-one"), $("#count-two"), $("#count-three"), $("#count-four")];
  let subtotal = counts.map(count => count ? allItems()[counts.indexOf(count)].price * count : 0);
  let total = subtotal.reduce((a, b) => a + b);
  total = total > 30 ? total - 6 : total;
  
  // 想办法调用`bestCharge`并且把返回的字符串
  // 显示在html页面的`message`中
}

function clear() {
  // 清除用户的选择，以及页面显示的信息
  // 清除之后，用户可以继续正常使用各项功能
}

