const fs = require("fs");

let res = 0;

const buff = fs.readFileSync("./input", "utf-8");
const input = buff.split("\n");

const transformToCharArr = () => {
    const charArr = [];

    for (const lines of input) {
        charArr.push(lines.split(''));
    }

    return charArr;
}

const checkPartNumber = (charArr, i, j,) => {
    const directions = [
        [i - 1, j - 1],
        [i - 1, j],
        [i - 1, j + 1],
        [i, j - 1],
        [i, j + 1],
        [i + 1, j - 1],
        [i + 1, j],
        [i + 1, j + 1],
    ];

    //console.log("char", charArr[i][j], i, j);

    for (const direction of directions) {
        try {
            const toCheck = charArr[direction[0]][direction[1]];
            //console.log(toCheck, direction);

            if (isNaN(toCheck) && toCheck !== "." && toCheck !== undefined) {
                return true;
            }
        } catch (e) {
            continue;
        }
    }

    return false;
}

const findNextDot = (charArr, i, j) => {
    for (let k = j; k < charArr[i].length; k++) {
        if (isNaN(charArr[i][k])) {
            return k;
        }
    }

    return charArr[j].length;
}

const charArr = transformToCharArr();
let numberBegin = null;

for (let i = 0; i < charArr.length; i++) {
    for (let j = 0; j < charArr[i].length; j++) {
        if (isNaN(charArr[i][j]) || charArr[i][j] === ".") {
            numberBegin = null;
            continue;
        }

        if (!isNaN(charArr[i][j]) && numberBegin === null) {
            numberBegin = j;
        }

        if (checkPartNumber(charArr, i, j)) {
            const nextDot = findNextDot(charArr, i, j);
            res += Number(charArr[i].slice(numberBegin, nextDot).join(''));
            j = nextDot;
            numberBegin = null;
        }
    }
}

console.log(res);
