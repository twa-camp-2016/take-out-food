"use strict"



function formatTag(tag){
  return tag.map((item)=>{
    let div = item.split(" x ");
    return {
      id:div[0],
      count: parseInt(div[1])
    }
  })
}

function loadAllItems() {
  return [{
    id: 'ITEM0001',
    name: '黄焖鸡',
    price: 18.00
  }, {
    id: 'ITEM0013',
    name: '肉夹馍',
    price: 6.00
  }, {
    id: 'ITEM0022',
    name: '凉皮',
    price: 8.00
  }, {
    id: 'ITEM0030',
    name: '冰锋',
    price: 2.00
  }];
}

function getCartItems(items,barcodes){
  let cartItems =[]
  for(let i=0;i<barcodes.length;i++){
    let existItem = items.find((item)=>{
      return item.id === barcodes[i].id
    })
    cartItems.push(Object.assign({},existItem,barcodes[i]))
  }
  return cartItems
}
function getSubTotalItems(cartItems){
  let subTotalItems = []
  for(let i =0;i<cartItems.length;i++){
    let subTotal = cartItems[i].price*cartItems[i].count
    subTotalItems.push(Object.assign({},cartItems[i],{subTotal:subTotal}))
  }
  return subTotalItems
}

function calculateTotal(subTotalItems){
  let total = 0
  for(let i=0;i<subTotalItems.length;i++){
    total += subTotalItems[i].subTotal
  }
  return total
}
function loadPromotions() {
  return [{
    type: '满30减6元'
  }, {
    type: '指定菜品半价',
    items: ['ITEM0001', 'ITEM0022']
  }];
}

function getPromotionsTypeItems(subTotalItems,promotions){
  let promotionsTypeItems = []
  for(let i=0;i<subTotalItems.length;i++){
    let flag = false
    let type = ""
    for(let j=0;j<promotions.length;j++){
      if(promotions[j].items){
        for(let z=0;z<promotions[j].items.length;z++){
          if(promotions[j].items[z]===subTotalItems[i].id){
            flag = true
            type = '指定菜品半价'
          }
        }
      }
    }
    if(!flag){
      type = null
    }
    promotionsTypeItems.push(Object.assign({},subTotalItems[i],{type:type}))

  }
  return promotionsTypeItems
}

function getUsedPromotionsTypeItems(promotionsTypeItems,total){
  let result = {}
  let sum1 = 0
  let sum2 = 0
  let sum3 = 0
  let sum = 0
  let usedType = ""
  if(total>=30){
    sum1 = total - 6
  }

  let flag = false
  for(let i=0;i<promotionsTypeItems.length;i++){
    if(promotionsTypeItems[i].type){
      flag = true
    }
  }

  if(!flag && total<30){
    usedType = null
    sum3 = total
    sum =sum3
  }
  if(flag){
    for(let i=0;i<promotionsTypeItems.length;i++){
      if(promotionsTypeItems[i].type){
        sum2 += parseFloat(promotionsTypeItems[i].subTotal/2)
      }
      else {
        sum2 += promotionsTypeItems[i].subTotal
      }
    }

  }
  if(sum3==0){
  if(sum1<sum2){
    usedType = '满30减6元'
    sum = sum1
  }
  if(sum1 == sum2){
    usedType = '满30减6元'
    sum = sum1
  }
  if(sum1>sum2){
    usedType = '指定菜品半价'
    sum = sum2
  }
}

  result.usedType = usedType
  result.promotionsTotal = sum

  return result
}
function calculateSaving(total,result){
  let promotionsTotal = result.promotionsTotal

  return total - promotionsTotal

}


function getSummary(promotionsTypeItems,saving,result){
  let summary = "============= 订餐明细 =============\n"
  for(let i=0;i<promotionsTypeItems.length;i++){
    summary += promotionsTypeItems[i].name + " x "+promotionsTypeItems[i].count +" = "+promotionsTypeItems[i].subTotal+"元\n"
}
summary+="-----------------------------------\n"


if(result.usedType){
  summary+="使用优惠:\n"+result.usedType
  if(result.usedType === '指定菜品半价'){
    summary +="("
    for(let i=0;i<promotionsTypeItems.length;i++){
      if(promotionsTypeItems[i].type){
        summary += promotionsTypeItems[i].name
        if(promotionsTypeItems[i].id != 'ITEM0022'){
          summary += "，"
        }
      }

    }
    summary +=")"
  }
  summary+="，"+"省"+saving+"元\n-----------------------------------\n"
}
summary+="总计："+result.promotionsTotal+"元\n==================================="
return summary


}
function bestCharge(tag){
  let barcodes = formatTag(tag)
  let items = loadAllItems()
  let cartItems = getCartItems(items,barcodes)
  let subTotalItems = getSubTotalItems(cartItems)
  let total = calculateTotal(subTotalItems)
  let promotions = loadPromotions()
  let promotionsTypeItems = getPromotionsTypeItems(subTotalItems,promotions)
  let result = getUsedPromotionsTypeItems(promotionsTypeItems,total)
  let saving = calculateSaving(total,result)
  let summary = getSummary(promotionsTypeItems,saving,result)
  return summary

}
