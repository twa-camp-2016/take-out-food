/**
 * Created by chenxiaohua on 16-7-23.
 */
function bildReceiptStrring(receiptModel) {
  let totalPprice = receiptModel.totalPayPrice;
  let saved = receiptModel.totalSaved;
  let receiptItemsString = "";
  for(receiptItem of receiptModel.receiptItems){
    receiptItemsString += `名称： ${receiptItem.name}, 数量： ${receiptItem.count}${receiptItem.unit}, 单价： ${
      receiptItem.price.toFixed(2)}(元), 小记： ${receiptItem.payPrice.toFixed(2)(元)}`;
    receiptItemsString += "\n";

  }
  const result = `***<没钱赚商店>收据***
${receiptItemsString}----------------------
总计： ${totalPprice.toFixed(2)}(元)
节省:${saved.toFixed(2)}(元)
**********************`;
  return result;
}
