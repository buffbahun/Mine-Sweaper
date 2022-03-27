// Level constant
// [row number, column number, number of bombs]
const easy = [6,13,10];
const medium = [9,20,35];
const hard = [13,27,75];


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

	switch(+lvl) {

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

	ary = randAry(rowNo * colNo,bombNo);
	return putNum(ary, rowNo, colNo);
}

// console.log(giveGrid(0),giveGrid(1),giveGrid(2))

const root = document.querySelector(".root");

