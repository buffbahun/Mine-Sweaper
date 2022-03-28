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
		if (Math.floor(Math.random() * 1000) > 800) {
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

	switch (+lvl) {
		case 0:
			rowNo = easy[0];
			colNo = easy[1];
			bombNo = easy[2];
			break;
		case 1:
			rowNo = medium[0];
			colNo = medium[1];
			bombNo = medium[2];
			break;
		case 2:
			rowNo = hard[0];
			colNo = hard[1];
			bombNo = hard[2];
			break;
		default:
			rowNo = easy[0];
			colNo = easy[1];
			bombNo = easy[2];
	}

	ary = randAry(rowNo * colNo, bombNo);
	return putNum(ary, rowNo, colNo);
}

// console.log(giveGrid(0),giveGrid(1),giveGrid(2))

const root = document.querySelector(".root");

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

initGame(10 * 10, 10);
