//rec = {
//	top: '25px',
//	left: '96px',
//	width: '64px',
//	height: '96px'
//}

function updateStructure(rec1,rec2){
	if(contains(rec1,rec2)){
		const relativeDm = relative(rec1,rec2);
		return {...rec1,children : {relativeDm}};
	}else if(contains(rec2,rec1)){
		const relativeDm = relative(rec2,rec1);
		return {...rec2,children : {relativeDm}};
	}else {
		return { ...rec1 };
	}
}   

function relative(rec1,rec2){
	const recAn = normalize(rec1);
	const recBn = normalize(rec2);
	const res = {
		children: rec2.children
	}
	if(rec2.top){
		res.top = `${recBn.x1 - recAn.x1}px`;
	}
	if(rec2.left){
		res.left = `${recBn.y1 - recAn.y1}px`;
	}
	if(rec2.height){
		res.height =  rec2.height;
	}
	if(rec2.width){
		res.width = rec2.width;
	}
	if(rec2.bottom){
		res.bottom = `${recAn.x2 - recBn.x2}px`;
	}
	if(rec2.right){
		res.right = `${recAn.y2 - recBn.y2}px`;
	}
	return res;

}

function contains(rec1,rec2){   
	const recAn = normalize(rec1);
	const recBn = normalize(rec2);
	if(recAn.x1 <= recBn.x1 && recAn.y1 <= recBn.y1 && recAn.x2 >= recBn.x2 && recAn.y2 >= recBn.y2){
		return true;
	}
	return false;

}
const T = 0;
const W = 0;
function normalize(rec){
	return {
		x1 : rec.top ? parseInt(rec.top): (T - (parseInt(rec.bottom) + parseInt(rec.height))),
		y1 : rec.left ? parse(rec.left): (W - (parseInt(rec.right) + parseInt(rec.width))),
		x2 : rec.bottom ? (T - parseInt(rec.bottom)): (parseInt(rec.top) + parseInt(rec.height)),
		y2 : rec.right ? (W- parseInt(rec.right)) : (parseInt(rec.left) + parseInt(rec.width))
	}
}

module.exports = updateStructure;
