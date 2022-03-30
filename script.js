// Level constant
// [row number, column number, number of bombs]
const easy = [10, 10, 10];
const medium = [16, 16, 40];
const hard = [30, 16, 99];

// Function to create a array with 0s and -1s for bomb palcement
// (size of grid, number of bombs) ==> array of the grid with bombs

function randAry(grdSiz, bombNo) {
	let ary = new Array(grdSiz).fill(0);
	let counter = 0;

	while (bombNo > 0) {
		if (Math.floor(Math.random() * 1000) > 870) {
			ary[counter] = -1;
			bombNo--;
		}
		counter++;
		counter = counter >= ary.length - 1 ? 0 : counter;
	}

	return ary;
}

// console.log(randAry(10,5))

// Putting numbers on eight borders of cells that contain bomb(-1)
// (array containg grid, total row numbers, total column numbers) ==> array containing grid information containg cells with bombs and numbers around the borders of the bomb cell
function putNum(ary, rowNo, colNo) {
	for (let pos = 0; pos < ary.length; pos++) {
		if (ary[pos] < 0) {
			if (
				chkBdr(pos, rowNo, colNo)[0] &&
				ary[pos - (rowNo + 1)] >= 0
			) {
				ary[pos - (rowNo + 1)] += 1;
			}
			if (
				chkBdr(pos, rowNo, colNo)[1] &&
				ary[pos - rowNo] >= 0
			) {
				ary[pos - rowNo] += 1;
			}
			if (
				chkBdr(pos, rowNo, colNo)[2] &&
				ary[pos - (rowNo - 1)] >= 0
			) {
				ary[pos - (rowNo - 1)] += 1;
			}
			if (chkBdr(pos, rowNo, colNo)[3] && ary[pos + 1] >= 0) {
				ary[pos + 1] += 1;
			}
			if (
				chkBdr(pos, rowNo, colNo)[4] &&
				ary[pos + (rowNo + 1)] >= 0
			) {
				ary[pos + (rowNo + 1)] += 1;
			}
			if (
				chkBdr(pos, rowNo, colNo)[5] &&
				ary[pos + rowNo] >= 0
			) {
				ary[pos + rowNo] += 1;
			}
			if (
				chkBdr(pos, rowNo, colNo)[6] &&
				ary[pos + (rowNo - 1)] >= 0
			) {
				ary[pos + (rowNo - 1)] += 1;
			}
			if (chkBdr(pos, rowNo, colNo)[7] && ary[pos - 1] >= 0) {
				ary[pos - 1] += 1;
			}
		}
	}

	return ary;
}

// let ar = randAry(78,10)
// console.log(ar)
// console.log(putNum(ar,6,13))

// Checking eight boarders around the grid array for boundery conditions
// * * *
// * n *
// * * *
// (position of bomb, total rows of the grid, total columns if the grid) ==> array of boolean values for , true if no boundary false if boundary
function chkBdr(pos, rowNo, colNo) {
	let ary = new Array(8).fill(false);

	if (Math.floor(pos / rowNo) > 0 && pos % rowNo > 0) {
		ary[0] = true;
	}

	if (Math.floor(pos / rowNo) > 0) {
		ary[1] = true;
	}

	if (Math.floor(pos / rowNo) > 0 && pos % rowNo < rowNo - 1) {
		ary[2] = true;
	}

	if (pos % rowNo < rowNo - 1) {
		ary[3] = true;
	}

	if (Math.floor(pos / rowNo) < colNo - 1 && pos % rowNo < rowNo - 1) {
		ary[4] = true;
	}

	if (Math.floor(pos / rowNo) < colNo - 1) {
		ary[5] = true;
	}

	if (Math.floor(pos / rowNo) < colNo - 1 && pos % rowNo > 0) {
		ary[6] = true;
	}

	if (pos % rowNo > 0) {
		ary[7] = true;
	}

	return ary;
}

// console.log(chkBdr(+process.argv[2],8,4))

function giveGrid(lvl) {
	let rowNo, colNo, bombNo;

	switch (lvl) {
		case "Easy":
			rowNo = easy[0];
			colNo = easy[1];
			bombNo = easy[2];
			break;
		case "Medium":
			rowNo = medium[0];
			colNo = medium[1];
			bombNo = medium[2];
			break;
		case "Hard":
			rowNo = hard[0];
			colNo = hard[1];
			bombNo = hard[2];
			break;
	}

	ary = randAry(rowNo * colNo, bombNo);
	return putNum(ary, rowNo, colNo);
}

// console.log(giveGrid(0),giveGrid(1),giveGrid(2))

let Map; // Main maping of bombs and numbers in the grid
let rowValue; // Value of row for any level
let colValue;
let flagValue;
let clicked = [];
const root = document.querySelector(".root");
const plyBtn = document.querySelector(".ply-btn");
const selectBtn = document.getElementById("level-select");

function createCell(cellNo) {
	let divList = [];
	for (let i = 0; i < cellNo; i++) {
		divList[i] = document.createElement("div");
	}
	return divList;
}

function fillBg(element, fillVal) {
	let reptStr = "no-repeat center / cover";
	switch (fillVal) {
		case "grass/0":
			element.style.background = `
			url('sprits/grass/grass0.png') ${reptStr}
			`;
			break;
		case "grass/1":
			element.style.background = `
			url('sprits/grass/grass1.png') ${reptStr}
			`;
			break;
		case "nomines/0":
			element.style.background = `
			url('sprits/no-mines/nomines0.png') ${reptStr}
			`;
			break;
		case "nomines/1":
			element.style.background = `
			url('sprits/no-mines/nomines1.png') ${reptStr}
			`;
			break;
		case "flags/0":
			element.style.background = `
			url('sprits/flags/flag0.png') ${reptStr}
			`;
			break;
		case "flags/1":
			element.style.background = `
			url('sprits/flags/flag1.png') ${reptStr}
			`;
			break;
		case "mines":
			let randVal = (Math.floor(Math.random() * 10) % 6) + 1;
			element.style.background = `
			url('sprits/mines/mine${randVal}.png') ${reptStr}
			`;
			break;
	}
}

// let cl = createCell(78);
// for(let i = 0; i < cl.length; i++) {
// 	let tileVal = `grass/${i % 2}`;
// }

function alterTile(position, rowNo) {
	let xPos = position % rowNo;
	let yPos = Math.floor(position / rowNo);

	if (xPos % 2 ^ yPos % 2) {
		return 1;
	} else {
		return 0;
	}
}

// console.log(alterTile(14, 6))

function apndCell(elementLst, rowNo) {
	for (let i = 0; i < elementLst.length; i++) {
		let tileVal = `grass/${alterTile(i, rowNo)}`;

		fillBg(elementLst[i], tileVal);
		root.appendChild(elementLst[i]);
		elementLst[i].style.height = `${
			elementLst[i].getBoundingClientRect().width
		}px`;
	}
}

function initGame(gridNo, rowNo) {
	root.style.gridTemplateColumns = `repeat(${rowNo}, minmax(20px, 1fr))`;
	let cells = createCell(gridNo);
	apndCell(cells, rowNo);
}

// initGame(10 * 10, 10);

function levelMap(lvl) {
	let aryMap;

	switch (lvl) {
		case 'Easy':
			initGame(easy[0]*easy[1],easy[0]);
			rowValue = easy[0];
			colValue = easy[1];
			flagValue = easy[2];
			break;
		case 'Medium':
			initGame(medium[0]*medium[1],medium[0]);
			rowValue = medium[0];
			colValue = medium[1];
			flagValue = medium[2];
			break;
		case 'Hard':
			initGame(hard[0]*hard[1],hard[0]);
			rowValue = hard[0];
			colValue = hard[1];
			flagValue = hard[2];
			break;
	} 
	
	return giveGrid(lvl);
}

function mapNumToBg(num, rowNo, colNo) {
	let elms = [...root.children];

	if (Map[num] < 0) {
		fillBg(elms[num], "mines");
	}
	if (Map[num] > 0) {
		fillBg(elms[num], `nomines/${alterTile(num,rowNo)}`);
		elms[num].textContent = `${Map[num]}`;
	}
	if (Map[num] === 0) {
		fillBg(elms[num], `nomines/${alterTile(num,rowNo)}`);
	}
}

function putFlag(num, rowNo, colNo) {
	if((flagValue < 1) && (clicked.indexOf(num) < 0)) return -1;

	let elms = [...root.children];
	if(clicked.indexOf(num) >= 0) {
		flagValue++;
		clicked.splice(clicked.indexOf(num),1);
		// console.log(clicked.indexOf(num),clicked);
		fillBg(elms[num], `grass/${alterTile(num,rowNo)}`)
		return 0;
	}

	if(clicked.indexOf(num) < 0) {
		flagValue--;
		clicked.push(num);
		fillBg(elms[num], `flags/${alterTile(num,rowNo)}`)
		return 1;
	}

}

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


function hrozScan(position) {
	let xPos = position % rowValue;
	let yPos = Math.floor(position / rowValue);

	let neg;
	let pos;

	for(let i = 0; i < rowValue; i++) {
		let twoDToOne = position - xPos + i;

		if (i === xPos) continue;

		if ((i < xPos) && (Map[twoDToOne] > 0)) {
			neg = twoDToOne;
		}
		if ((i > xPos) && (Map[twoDToOne] > 0)) {
			pos = twoDToOne;
			break;
		}
	}
	
	neg = neg ?? yPos * rowValue;
	pos = pos ?? (yPos * rowValue) + (rowValue - 1);

	let finAry = [];
	let init = neg;
	while (init <= pos) {
		finAry.push(init);
		init++;
	}

	return finAry;
}

function twoDScan(position) {
	let xAxis = hrozScan(position);
	let yAxis = vertScan(position);
	let container = [];

	xAxis.forEach(pos => {
		container.push(...vertScan(pos));
	});

	yAxis.forEach(pos => {
		container.push(...hrozScan(pos));
	});

	let allUniq = new Set(container);
	[...allUniq].forEach(pos => {
		mapNumToBg(pos, rowValue, colValue);
	});

	return [...allUniq];
}

function restartGame() {
	while (root.firstChild) {
		root.removeChild(root.lastChild);
	}

	clicked = [];
	Map = levelMap(selectBtn.value);
	// console.log(Map);
}

plyBtn.addEventListener('click', (evt) => {
	restartGame();
});

root.addEventListener('click', (evt) => {
	let position = [...root.children].indexOf(evt.target);

	if (clicked.indexOf(position) >= 0 ) {
		console.log(position);
		return 0;
	}

	// if(evt.ctrlKey) {
	// 	putFlag(position, rowValue, colValue);	
	// 	return -1;
	// }

	if (Map[position] < 0) {
		alert("Opps..., clicked on a bomb!");
		restartGame();
		return -1;
	}

	if (Map[position] === 0) {
		clicked.push(...twoDScan(position));
		let tmpSet = new Set(clicked);
		clicked = [...tmpSet];
		return 1;
	}
	mapNumToBg(position, rowValue, colValue);
	clicked.push(position);
});
