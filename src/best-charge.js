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
  return barcodes.map((item)=>{
      let existItem = items.find(({id})=>{
          return id === item.id
        })
        return Object.assign({},item,existItem)
      })
}


function getSubTotalItems(cartItems){
  return cartItems.map((item)=>{
    let subTotal = item.price * item.count
  return Object.assign({},item,{subTotal:subTotal})
  })
}

function calculateTotal(subTotalItems){
  return  subTotalItems.reduce((a,b)=>{
    return a += b.subTotal
  },0)
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
  return subTotalItems.map((item)=>{
    let flag = false
    let type = ""
    promotions.forEach(({items})=>{
      if(items){
        let existItem = items.find((it)=>{
          return it === item.id
        })
        if(existItem){
          flag = true
          type = '指定菜品半价'
        }
      }

    })
    if(!flag){
      type = null
    }
    return Object.assign({},item,{type:type})
  })
}

function getUsedPromotionsTypeItems(promotionsTypeItems,total){
  let [result,sum1,sum2,sum3,sum,usedType]=[{},0,0,0,0,""]
  if(total>=30){
    sum1 = total - 6
  }
  let flag = false
  let existItem=promotionsTypeItems.find((item)=>{
    return item.type
  })
  if(existItem){
    flag = true
  }
  if(!flag && total<30){
    usedType = null
    sum3 = total
    sum =sum3
  }
  if(flag){
    let existItem = promotionsTypeItems.find(({type,subTotal})=>{
      if(type){
         sum2 += parseFloat(subTotal/2)
       }
       else {
         sum2 += subTotal
       }
     })
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
