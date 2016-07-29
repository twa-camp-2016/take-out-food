let _=require("lodash");
let respones=require("./responesTranslate");
class ziptranslate {
  execute(zipcodes)
  {
    return this.zipToBarcode(zipcodes);
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
  checkeFormatZip(zipcodes) {
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
  getFormatZip(testedZipCode) {
    let codes = _.replace(testedZipCode, '-', '');
    return _.map((codes), _.parseInt);
  }
  matchbyTable(formatZipCodes) {
    let matchBarcodes = [];
    let sum = _.sum(formatZipCodes);
    let cd = sum % 10 === 0 ? 0 : (10 - sum % 10);
    for (let i = 0; i < formatZipCodes.length; i++) {
      this.allcodes().find(({id, bar_code}) => {
        if (id === formatZipCodes[i]) matchBarcodes += bar_code;
      });
    }
    this.allcodes().find(({id, bar_code}) => {
      if (id === cd) matchBarcodes += bar_code;
    });
    // console.log(matchBarcodes);
    return matchBarcodes;
  }
  buildStringBarcode(matchBarcodes) {
    let baroceds = _.pad(matchBarcodes, matchBarcodes.length + 2, '|');
    return baroceds;
  }
  zipToBarcode(zipcodes)
  {
    let testedZipcode=this.checkeFormatZip(zipcodes);
    let formatZipcode=this.getFormatZip(testedZipcode);
    let matchBarcode=this.matchbyTable(formatZipcode);
    let barcode=this.buildStringBarcode(matchBarcode);
    return (new respones(barcode));
  }
}
module.exports =ziptranslate;
