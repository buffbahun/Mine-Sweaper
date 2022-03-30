let rowValue = 10;
let colValue = 10;
let Map;


function vertScan(position) {
	let xPos = position % rowValue;
	let yPos = Math.floor(position / rowValue);

	let neg;
	let pos;

	for(let i = 0; i < colValue; i++) {
		let twoDToOne = rowValue * i + xPos;

		if (i === yPos) continue;

		if ((i < yPos) && (Map[twoDToOne] > 0)) {
			neg = twoDToOne;
		}
		if ((i > yPos) && (Map[twoDToOne] > 0)) {
			pos = twoDToOne;
			break;
		}
	}
	
	neg = neg ?? xPos;
	pos = pos ?? rowValue * (colValue - 1) + xPos;

	let finAry = [];
	let init = neg;
	while (init <= pos) {
		finAry.push(init);
		init += rowValue;
	}

	return finAry;
}

console.log(vertScan(process.argv[2]));
