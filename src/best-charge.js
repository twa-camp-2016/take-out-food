/**
 * Created by xjy on 7/27/16.
 */
"use strict";
//let _ = require('lodash');
let postcode = '45056-1234';
//let postcode = '95713';
function checkPostcode(postcode) {
  let isTruePostcode = false;
  if (postcode.length === 5 || postcode.length === 9 || postcode.length === 10 && postcode[5] === '-') {
    postcode = postcode.length === 10 ? postcode.substr(0, 5) + postcode.substr(6) : postcode;
    postcode = postcode.split('');
    console.log(postcode);
    let pattern = /\d/g;
    postcode.map((num)=> {
      if (pattern.test(parseInt(num))) {
        isTruePostcode = true;
      }
    });
  }
  return isTruePostcode;
}
function getReducedArray(postcode, checkResult) {
  let result = [];
  result = postcode.split("");
  if (result.includes('-')) {
    result.splice(5, 1);
  }
  return result;
}
function getCheckCode(postcode) {
  let sum = 0;
  sum = postcode.reduce(((barcode, num)=> {
    barcode += parseInt(num);
    return barcode;
  }), 0);
  let code;
  if (sum % 10 === 0) {
    code = 0;
  }
  else {
    code = 10 - sum % 10;
  }
  return code;
}
function getSubCodes(postcode, allCodes, checkCode) {
  let result = [];
  postcode.push(checkCode);
  result = postcode.map((num)=> {
    return allCodes[num];
  });
  return result;
}
function getCodeString(subCodes) {
  let result = subCodes.join('');
  return '|' + result + "|";
}
function changToCodes(postcode, checkResult) {
  let allCodes = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
  let codeArray = getReducedArray(postcode, checkResult);
  let checkCode = getCheckCode(codeArray);
  let subCodes = getSubCodes(codeArray, allCodes, checkCode);
  let codeString = getCodeString(subCodes, checkCode);
  return codeString;
}
function finalChangTocodes(postcode) {
  let checkResult = checkPostcode(postcode);
  let finalString = changToCodes(postcode, checkResult);
  return finalString;
}

/****
 *       no.2
 ****/
function splitStringBy5(barcode) {
  return _.chunk(barcode, 5).map((array)=> {
    return array.join("")
  })
}
function checkBarcode(barcode, allCodes) {
  let isTrueBartcode = false;
  let length = barcode.length;
  if (length === 32 || length === 52 && barcode[0] === "|" && barcode[length - 1] === "|") {
    let temps = barcode.substr(1, length - 1);
    temps = splitStringBy5(barcode);
    let result = temp.map((code)=>allCodes.indexOf(code));
    if (result != -1) {
      isTrueBartcode = true;
    }
  }
}
function getFormatBarCode(barcode, checkNode) {
  let result = '';
  if (checkNode) {
    result = barcode.slice(1, barcode.length - 6);
  }
  return result;
}
function getBarCodesArray(formatBarcode, allCodes) {
  let result = [];
  let barcodes = formatBarcode.split("");
  let codebarcodes = _.chunk(barcodes, 5);
  codebarcodes = codebarcodes.map((element)=> {
    return _.sum(element);
  });
  codebarcodes.map((code)=> {
    for (let i = 0; i < allCodes.length; i++) {
      if (code === allCodes[i]) {
        result.push(i);
      }
    }
  });
  return result;
}
function getCodeToNumber(numberCodes) {
  let result = '';
  if (numberCodes.length === 9) {
    numberCodes.splice(5, 0, '-');
  }
  result = numberCodes.join("");
  return result;
}
function changeToPostcode(barcode, checkResult, allCodes) {
  let postCodes = getFormatBarCode(barcode, checkNode);
  let numberCodes = getBarCodesArray(formatBarcode, allCodes);
  let codeString = getCodeToNumber(numberCodes);
  return codeString;

}
 function totalChangeTopostcode(barcode) {
   let allCodes = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
  let checkNode = checkBarcode(barcode, allCodes);
  let postcode = changeToNumber(barcode, checkNode, allCodes);
   return postcode;
}
//let postcodeay = barcode.split("");
// if (postcodeay.length === 52 || postcodeay.length === 32) {
//   let result = barcode.slice(1, barcode.length - 6);
//   let codebarcodes = _.chunk(result, 5);
//   codebarcodes = codebarcodes.map((element)=> {
//     return _.sum(element);
//   })
//   codebarcodes.map((code)=> {
//     for (let i = 0; i < allCodes.length; i++) {
//       if (code === allCodes[i]) {
//         isTruePostcode = true;
//       }
//     }
//   });
// }
//return isTruePostcode;
//}
// let barcode = '||:|:::|:|:|:::|:::||::||::|:|:|';
// function totalChangeToNumber(barcode) {
//   let checkNode = checkpostcodes(barcode);
//   let changeNUmber = changeToNumber(barcode, checkNode, allCodes);
// }
// //totalChangeToNumber(barcode);
// function changeToNumber(barcode, checkResult, allCodes) {
//   let postCodes = getPostCode(barcode, checkResult);
//   let numberCodes = getNumberCode(postCodes, allCodes);
//   let codeString = getCodeToNumber(numberCodes);
//   return codeString;
//
// }
// //changeToNumber(barcode);
// function finalChangToNumber(barcode) {
//   let allCodes = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
//   let checkResult = checkpostcodes(barcode, allCodes);
//   let finalString = changeToNumber(barcode, checkResult, allCodes);
//   return finalString;
// }
// //finalChangToNumber(barcode);
// let allCodes = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
// let barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
//
//
//
// function getCodeToNumber(numberCodes) {
//   let result = '';
//   if (numberCodes.length === 9) {
//     numberCodes.splice(5, 0, '-');
//   }
//   result = numberCodes.join("");
//   return result;
// }
//
