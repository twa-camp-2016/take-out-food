'use strict'
let allItems = loadAllItems();
let allPromotion = loadPromotions();
//formatTags
function formatTags(tagItems){
	return tagItems.map((item)=>{
		let tagPart = item.split('x');
		return  {id:tagPart[0].trim(),amount:Number(tagPart[1]) || 1}
	})
}
//mergeId
function mergeId(idAndAmountItems){
	let result = [];
	idAndAmountItems.forEach((tag) => {
		let exit = result.find((item) => {
			return tag.id === item.id;
		});
		if(exit){
			exit.amount += tag.amount;
		}else{
			result.push(tag);
		}
	});
	return result;
}
//getPromotionsInfo
function getPromotionsInfo(allPromotion,idAmountList){
	idAmountList.forEach((tag)=>{
		let exitPromotion = allPromotion[1].items.find(function(item){
			return item === tag.id;
		});
		if(exitPromotion){
			tag.type = '指定菜品半价';
		}else{
			tag.type = '';
		}
	});
	return idAmountList;
}
//getAllInfo
function getAllInfo(allItems,promotionsInfo){
	let result = [];
	promotionsInfo.forEach((tag)=>{
		let exist = allItems.find(function(item){
			return item.id === tag.id;
		});
		if(exist){
			result.push(Object.assign({},tag,{name:exist.name,price:exist.price}));
		}
	})
	return result;
}
//bestCharge
function compareDiscount(allInfo){
	let compareDiscount1 = 0;
	let compareDiscount2 = 0;
	let totalPrice = 0;
	allInfo.forEach(({price,amount}) => {
		totalPrice += price * amount; 
		if(totalPrice>=30){
			compareDiscount1 = totalPrice - 6;
		};
	});
	allInfo.forEach((item) => {
		if(item.type){
			compareDiscount2 += item.price / 2 * item.amount;
		}else{
			compareDiscount2 += item.price * item.amount;
		}
	});
	if(compareDiscount1<=compareDiscount2){
		if(totalPrice>=30){
			return {type:'满30减6元',discount:compareDiscount1,total:totalPrice}
		}else{
			return {type:'',discount:totalPrice,total:totalPrice}
		}
	}else if(compareDiscount1>compareDiscount2){
		return {type:'指定菜品半价',discount:compareDiscount2,total:totalPrice}
	}
}