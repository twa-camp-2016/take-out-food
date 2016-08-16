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
  htmlAllItems += "<th>输入数量</th>";
  htmlAllItems += "</tr>";

  for(let item of allItems) {
    htmlAllItems += "<tr>";
    htmlAllItems += "<td>";
    htmlAllItems += item.id;
    htmlAllItems += "</td>";
    htmlAllItems += "<td>";
    htmlAllItems += item.name;
    htmlAllItems += "</td>";
    htmlAllItems += "<td>";
    htmlAllItems += item.price;
    htmlAllItems += "</td>";
    htmlAllItems += "<td>";
    htmlAllItems += "<input type=\"text\"></input>";
    htmlAllItems += "</td>";
    htmlAllItems += "</tr>";
  }
  htmlAllItems += "</table>";

  htmlPromotions += "<table>";
  htmlPromotions += "<tr>";
  htmlPromotions += "<th>促销方式</th>";
  htmlPromotions += "<th>促销商品</th>";
  htmlPromotions += "</tr>";

  for(let pro of allPromotions) {
    htmlPromotions += "<tr>";
    htmlPromotions += "<td>";
    htmlPromotions += pro.type;
    htmlPromotions += "</td>";
    htmlPromotions += "<td>";
    if(pro.items) {
      htmlPromotions += pro.items;
    } else {
      htmlPromotions += "无";
    }
    htmlPromotions += "</td>";
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
