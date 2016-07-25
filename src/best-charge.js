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
    let [flag,type]=[false,""]
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
  let existItem=promotionsTypeItems.find((item)=>{
    return item.type
  })
  if(existItem){
    let promotionsTotalHalfCut = promotionsTypeItems.map((it)=>{
        if(it.type)
        return Number(it.subTotal/2)
        else
        return it.subTotal
      }).reduce((a,b)=>{
        return a+b;
      })
      if(total<30)
      return {usedType:'指定菜品半价',promotionsTotal:promotionsTotalHalfCut}
      else {
        let promotionsTotal = (total-6)<promotionsTotalHalfCut? (total - 6):promotionsTotalHalfCut
        let usedType = (promotionsTotal === promotionsTotalHalfCut)?'指定菜品半价':'满30减6元'
        return {usedType:usedType,promotionsTotal:promotionsTotal}
      }
  }
  else {
    if(total<30)
    return {usedType:null,promotionsTotal:total}
    else
    return {usedType:'满30减6元',promotionsTotal:(total-6)}
  }
}

function calculateSaving(total,result){
  let promotionsTotal = result.promotionsTotal
  return total - promotionsTotal
}

function getSummary(promotionsTypeItems,saving,result){
  let summary = "============= 订餐明细 =============\n"

  summary = promotionsTypeItems.reduce((a,b)=>{
    return a+=b.name + " x "+b.count +" = "+b.subTotal+"元\n"
  },summary)
summary+="-----------------------------------\n"
if(result.usedType){
  summary+="使用优惠:\n"+result.usedType
  if(result.usedType === '指定菜品半价'){
    summary +="("

    let halfCutItems = promotionsTypeItems.filter((item)=>{
      return item.type
    })
    let length = halfCutItems.length
    halfCutItems.forEach((it)=>{
      if(length != 1 && it.id != 'ITEM0022' )
      summary += it.name + "，"
      else
      summary += it.name
    })

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
