// 请把与index.html页面相关的javascript代码写在这里
// 同时删除该注释

window.onload = function () {
  let allItems = loadAllItems();
  let allPromotions = loadPromotions();

  let htmlAllItems = "<hr /><h2>菜品信息</h2><hr />";
  let htmlPromotions = "<hr /><h2>优惠信息</h2><hr />";

  htmlAllItems += "<table>";
  htmlAllItems += "<tr>";
  htmlAllItems += "<th>菜品 ID </th>";
  htmlAllItems += "<th>菜品名称</th>";
  htmlAllItems += "<th>菜品单价</th>";
  htmlAllItems += "</tr>";

  for(let item of allItems) {
    htmlAllItems += item.id;
    htmlAllItems += item.name;
    htmlAllItems += item.price;
  }

  for(let pro of allPromotions) {
    htmlPromotions += "<p>促销方式:";
    htmlPromotions += pro.type;
    htmlPromotions += "</p>";
    htmlPromotions += "<p>促销商品:";
    if(pro.items) {
      htmlPromotions += pro.items;
    } else {
      htmlPromotions += "无";
    }
    htmlPromotions += "</p>";
  }


  document.getElementById("items").innerHTML = htmlAllItems;
  document.getElementById("promotions").innerHTML = htmlPromotions;
};

function calculatePrice() {
  // 想办法调用`bestCharge`并且把返回的字符串
  // 显示在html页面的`message`中
}

function clear() {
  // 清除用户的选择，以及页面显示的信息
  // 清除之后，用户可以继续正常使用各项功能
}
