let _=require("lodash");
let respones=require("./responesTranslate");
class barcodetranslate {
  execute(input)
  {
    return this.barcodeToZipcode(input);
  }
  allcodes() {
    return [
      {
        id:1,
        bar_code: ':::||',
        dight_code:'00011'
      },
      {
        id:2,
        bar_code: '::|:|',
        dight_code:'00011'
      },
      {
        id:3,
        bar_code: '::||:',
        dight_code:'00110'
      },
      {
        id:4,
        bar_code: ':|::|',
        dight_code:'01001'
      },
      {
        id:5,
        bar_code: ':|:|:',
        dight_code:'01010'
      },
      {
        id:6,
        bar_code: ':||::',
        dight_code:'01100'
      },    {
        id:7,
        bar_code: '|:::|',
        dight_code:'10001'
      },    {
        id:8,
        bar_code: '|::|:',
        dight_code:'10010'
      },    {
        id:9,
        bar_code: '|:|::',
        dight_code:'10100'
      },
      {
        id:0,
        bar_code: '||:::',
        dight_code:'11000'
      }
    ];
  }
  checkFormatBarcodes(barcodes) {
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
  getFormatBarcodes(testedBarcodes) {
    let newBarcodes = testedBarcodes.substring(1, testedBarcodes.length - 1);
    let formatBarcodes = [];
    for (let i = 0; i < newBarcodes.length; i = i + 5) {
      formatBarcodes.push({bar_code: newBarcodes.substring(i, i + 5)});
    }
    //console.log(formatBarcodes);
    return formatBarcodes;
  }
  matchbyZipCode(formatBarcodes) {
    let matchZipCodes=[];
    // let allcodes=loadallCodes();
    _.find(formatBarcodes,({bar_code}) =>
    {
      let {id}=_.find(this.allcodes(),(codes) => codes.bar_code === bar_code);
      matchZipCodes+=id;
    });
    matchZipCodes.toString();
    //console.log(matchZipCodes);
    return matchZipCodes;
  }
  calculateCd(matchZipCodes) {
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
  buildStringZipCode(calculatedCd) {
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
  barcodeToZipcode(barcodes)
  {
    let testedBarcode= this.checkFormatBarcodes(barcodes);
    let formatbarcode=this.getFormatBarcodes(testedBarcode);
    let matchZipCode=this.matchbyZipCode(formatbarcode);
    let calculatedCd=this.calculateCd(matchZipCode);
    let zipCode=this.buildStringZipCode(calculatedCd);
    return (new respones(zipCode));
  }
}
module.exports =barcodetranslate;
