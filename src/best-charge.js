'use strict'
let allItems = loadAllItems();
let allPromotion = loadPromotions();
//formatTags
function formatTags(tagItems){
	return tagItems.map(function(item){
		let tagPart = item.split('x');
		return  {id:tagPart[0].trim(),amount:Number(tagPart[1]) || 1}
	})
}
//mergeId
function mergeId(idAndAmountItems){
	let result = [];
	for(let tag of idAndAmountItems){
		let exit = result.find(function(item){
			return tag.id === item.id;
		});
		if(exit){
			exit.amount += tag.amount;
		}else{
			result.push(tag);
		}
	};
	return result;
}
//getPromotionsInfo
function getPromotionsInfo(allPromotion,idAmountList){
	for(let tag of idAmountList){
		let exitPromotion = allPromotion[1].items.find(function(item){
			return item === tag.id;
		});
		if(exitPromotion){
			tag.type = '指定菜品半价';
		}
	};
	return idAmountList;
}
//getAllInfo
function getAllInfo(allItems,promotionsInfo){
	let result = [];
	for(let tag of promotionsInfo){
		let exist = allItems.find(function(item){
			return item.id === tag.id;
		});
		if(exist){
			result.push(Object.assign({},tag,{name:exist.name,price:exist.price}));
		}
	}
	return result;
}
//测试 bestCharge
function compareDiscount(allInfo){
	let compareDiscount1 = 0;
	let compareDiscount2 = 0;
	let totalPrice = 0;
	for(let item of allInfo){
		totalPrice += item.price * item.amount; 
		if(totalPrice>=30){
			compareDiscount1 = totalPrice - 6;
		};
	};
	for(let item of allInfo){
		if(item.type){
			compareDiscount2 += item.price / 2 * item.amount;
		}else{
			compareDiscount2 += item.price * item.amount;
		}
	};
	if(compareDiscount1<=compareDiscount2){
		if(totalPrice>=30){
			return {type:'满30减6元',discount:compareDiscount1,total:totalPrice}
		}else{
			return {type:'',discount:totalPrice,total:totalPrice}
		}
	}else if(compareDiscount1>compareDiscount2){
		return {type:'指定菜品半价',discount:compareDiscount2,total:totalPrice}
	}
	/*return compareDiscount1<compareDiscount2 ? 
	{type:'满30减6',discount:compareDiscount1,total:totalPrice} : 
	{type:'指定菜品半价',discount:compareDiscount2,total:totalPrice}*/
}

//finalReceipt
function bestCharge(tagItems,discountInfo){
	let idAndAmountItems = formatTags(tagItems); 
	let idAmountList = mergeId(idAndAmountItems);
	let promotionsInfo = getPromotionsInfo(allPromotion,idAmountList);
	let allInfo = getAllInfo(allItems,promotionsInfo);
	let discountP = compareDiscount(allInfo);

	let header = '============= 订餐明细 =============' + '\n' ;
	let line1 = '-----------------------------------' + '\n';
	let line2 = '-----------------------------------' + '\n';
	let line3 = '===================================';
	let foodList = '';
	let discountPrice = discountP.total - discountP.discount;
	let total = '总计：' + discountP.discount + '元' + '\n';
	let list = [];
	for(let item of allInfo){
		foodList += item.name + ' x ' + item.amount + ' = ' + item.amount * item.price + '元' + "\n";
		if(item.type){
			list.push(item.name);
		}
	};
	let showType1 = discountP.type + '('+ list.join('，') +')' || ' ';
	let showType2 = discountP.type|| ' '
	let promotion = '';
	if(discountP.type==''){
		promotion = '\n';
		return header.concat(foodList).concat(line1).concat(total).concat(line3);
	}else if(discountP.type=='指定菜品半价'){
		promotion = '使用优惠:' + "\n" + showType1  +'，' + '省' + discountPrice + '元' + '\n';
		return header.concat(foodList).concat(line1).concat(promotion).concat(line2).concat(total).concat(line3);
	}else{
		promotion = '使用优惠:' + "\n" + showType2  +'，' + '省' + discountPrice + '元' + '\n';
		return header.concat(foodList).concat(line1).concat(promotion).concat(line2).concat(total).concat(line3);
	}

}