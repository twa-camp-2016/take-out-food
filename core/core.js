 'use strict';
 let _=require("../lib/lodash");
 let allcodes=require("../src/allcodes");
 function zipToBarcode(zipcodes) {
   let testedZipcode=checkeFormatZip(zipcodes);
   let formatZipcode=getFormatZip(testedZipcode);
   let matchBarcode=matchbyTable(formatZipcode,allcodes());
   let barcode=buildStringBarcode(matchBarcode);
   return barcode;
 }
 function barcodeToZipCode(barcodes) {
   let testedBarcode=checkFormatBarcodes(barcodes);
   let formatbarcode=getFormatBarcodes(testedBarcode);
   let matchZipCode=matchbyZipCode(formatbarcode);
   let calculatedCd=calculateCd(matchZipCode);
   let zipCode=buildStringZipCode(calculatedCd);
   return zipCode;
 }
function checkeFormatZip(zipcodes) {
  let reg =new RegExp(/[A-Za-z]+/g);
  let hasLetter =reg.test(zipcodes);
  //console.log(hasLetter);
  if(hasLetter===true)
  {
    hasLetter=false;
  }
  else
  {
    hasLetter=true;
  }
  //console.log(hasLetter);
  let hascodes = hasLetter && (zipcodes.length === 10 || zipcodes.length === 5
    || (zipcodes.length === 9 && (zipcodes.indexOf("-") === zipcodes.lastIndexOf("-"))));
  return hascodes === true ? zipcodes : false;
}
function getFormatZip(testedZipCode) {
  let codes = _.replace(testedZipCode, '-', '');
  return _.map((codes), _.parseInt);
}
function matchbyTable(formatZipCodes, allcodes) {
  let matchBarcodes = [];
  let sum = _.sum(formatZipCodes);
  let cd = sum % 10 === 0 ? 0 : (10 - sum % 10);
  for (let i = 0; i < formatZipCodes.length; i++) {
    allcodes.find(({id, bar_code}) => {
      if (id === formatZipCodes[i]) matchBarcodes += bar_code;
    });
  }
  allcodes.find(({id, bar_code}) => {
    if (id === cd) matchBarcodes += bar_code;
  });
 // console.log(matchBarcodes);
  return matchBarcodes;
}
function buildStringBarcode(matchBarcodes) {
  let baroceds = _.pad(matchBarcodes, matchBarcodes.length + 2, '|');
 // console.log(baroceds);
  return baroceds;
}

function checkFormatBarcodes(barcodes) {
  for (let i = 0; i < barcodes.length; i++) {
    var hasBarcodes = _.isEqual(barcodes[i], ':') || _.isEqual(barcodes[i], '|');
  }
  //console.log(hasBarcodes);
  if(hasBarcodes)
  {
    if(barcodes.length==52||barcodes.length==32||barcodes.length==57)
    {
      hasBarcodes=true;
    }else  hasBarcodes=false;
  }
 // console.log(hasBarcodes);
  return hasBarcodes ? barcodes : false;
}
function getFormatBarcodes(testedBarcodes) {
  let newBarcodes = testedBarcodes.substring(1, testedBarcodes.length - 1);
  let formatBarcodes = [];
  for (let i = 0; i < newBarcodes.length; i = i + 5) {
    formatBarcodes.push({bar_code: newBarcodes.substring(i, i + 5)});
  }
  //console.log(formatBarcodes);
 return formatBarcodes;
}
function  matchbyZipCode(formatBarcodes) {
  let matchZipCodes=[];
  // let allcodes=loadallCodes();
  _.find(formatBarcodes,({bar_code}) =>
  {
    let {id}=_.find(allcodes(),(codes) => codes.bar_code === bar_code);
    matchZipCodes+=id;
  });
  matchZipCodes.toString();
  //console.log(matchZipCodes);
  return matchZipCodes;
}
function calculateCd(matchZipCodes) {
  let lastcode=parseInt(matchZipCodes.substring(matchZipCodes.length-1,matchZipCodes.length));
  let matchZipCode=matchZipCodes.substring(0,matchZipCodes.length-1);
  let sum=0;
  for(let i=0;i<matchZipCode.length;i++)
 {
   sum+=parseInt(matchZipCode[i]);
 }
  let code=(sum%10===0)?0:(10-sum%10);
  return code===lastcode?matchZipCode:false;
}
function buildStringZipCode(calculatedCd) {
  let zipCodes="";
  if(calculatedCd.length===9)
  {
    for(let i=0;i<calculatedCd.length;i++)
    {
      if(i===5)
      {
        zipCodes+="-";
      }
    zipCodes+=calculatedCd[i];
    }
    return zipCodes;
  }
  //console.log(calculatedCd);
  return calculatedCd;
}
 module.exports= {
   zipToBarcode,
   barcodeToZipCode,
   checkeFormatZip,
   getFormatZip,
   matchbyTable,
   buildStringBarcode,
   checkFormatBarcodes,
   getFormatBarcodes,
   matchbyZipCode,
   calculateCd,
   buildStringZipCode
 };
