
'use strict';

function isLegalBarcode(barcode)
{
   return !barcode.split('').find((item)=>item !== ' '&& item !== '|' && item !== ':');
}

function isValidFrame(barcode)
{
  return (barcode[0] === '|' && barcode[1] === ' ' &&
        barcode[barcode.length - 1] === '|'&& barcode[barcode.length - 2] === ' ');
}

function matchBarcodeLength(barcode)
{
  return   !barcode.slice(2,barcode.length - 2).split(' ').find(item=>item.length !== 5);
}

function judgeBarcode(barcode)
{
 return isLegalBarcode(barcode)&&isValidFrame(barcode)&&matchBarcodeLength(barcode);
}

function formatBarcode(barcode)
{
  return barcode.slice(2,barcode.length - 2).split(' ');
}

function  testCheckDigit(formattedBarcode,table)
{
return formattedBarcode.map((item)=>table.indexOf(item)).reduce((pre,cur)=>pre+cur)%10 === 0;
}

function getZIPcode(formattedBarcode,table)
{
  let num_array = formattedBarcode.map((item)=>table.indexOf(item));
        num_array.pop();
    if(num_array.length === 9)
    {
      num_array.splice(5,0,'-');
    }
    return num_array.join('');
}

function barcodeChangeZIPcode(barcode,table)
{
  if(judgeBarcode(barcode))
  {
    let formattedBarcode = formatBarcode(barcode);
    if(testCheckDigit(formattedBarcode,table))
    {
      return getZIPcode(formattedBarcode,table);

    }
    else
    {
      return false;
    }
  }
  return false;
}

function formatZIPcode( ZIPcode)
{
  let pureNum = ZIPcode;
  if(pureNum.length === 10)
  {
    return  pureNum.split('-').join('');
  }
   return  pureNum;
}

function getCD(formatedZIPcode)
{
  let formatZIPcode_array = formatedZIPcode.split('').map((item)=>parseInt(item));
  let sum = formatZIPcode_array.reduce((pre,cur)=>pre+cur);
  formatZIPcode_array.push((10 - sum % 10)%10);
  return formatZIPcode_array;
}

function getBarcode(formatZIPcode_array,table)
{
 return  formatZIPcode_array.map((item)=>table[item]).join('');
}

function getWholeBarcode(barcode)
{
  return '|'+ barcode + '|';
}

function printWholeBarcode(wholeBarcode)
{
  console.log(wholeBarcode);
}

function ZIPcodeChangeBarcode(ZIPcode,table)
{
 let pureNum = formatZIPcode( ZIPcode);
  let formatZIPcode_array = getCD(pureNum);
  let barcode = getBarcode(formatZIPcode_array,table);
  return getWholeBarcode(barcode);
}
