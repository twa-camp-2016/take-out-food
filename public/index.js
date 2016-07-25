// 请把与index.html页面相关的javascript代码写在这里
// 同时删除该注释
function calculatePrice() {
  let tag = []
  let items = loadAllItems()
  for(let i=0;i<items.length;i++){
    let itemsDiv = document.getElementById("items")
    let input = itemsDiv.getElementsByTagName("input")
    if(input[i].value){
      tag.push(items[i].id + " x " + input[i].value)
    }
  }

  let summary = bestCharge(tag);
  let  message = document.getElementById("message")
  message.innerHTML = summary

}

function clearsss() {
  console.log(111);
  let itemsDiv = document.getElementById("items")
  let input = itemsDiv.getElementsByTagName("input")
  for(let i=0;i<input.length;i++){
    input[i].value = "";
  }
  let message = document.getElementById("message")
  message.innerHTML = "";
}

window.onload = function(){
  let dishItems = loadAllItems()
  for(let i=0;i<dishItems.length;i++){
    let dish = dishItems[i]
    let dishItem = document.getElementById("dish"+i)
    let dishAttrs = dishItem.getElementsByTagName("td")
    let attr = ""
    let j=0
    for(attr in dish){
      dishAttrs[j].innerHTML = dish[attr]
      j++;
    }

  }
  let promotions = loadPromotions()
  for(let i=0;i<promotions.length;i++){
    let promotion = promotions[i]
    let promotionItem = document.getElementById("promotion"+i)
    let promotionAttr = promotionItem.getElementsByTagName("td")
    let attr = ""
    let j=0
    for(attr in promotion){
      promotionAttr[j].innerHTML = promotion[attr]
      j++;
    }
  }
}
