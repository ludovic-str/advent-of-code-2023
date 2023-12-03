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

const getNumberRange = (charArr, i, j) => {
    let numberBegin = j;
    let numberEnd = j;

    for (; numberBegin > 0 && !isNaN(charArr[i][numberBegin]); numberBegin--);
    for (; numberEnd < charArr[i].length && !isNaN(charArr[i][numberEnd]); numberEnd++);

    if (isNaN(charArr[i][numberBegin])) {
        numberBegin++;
    }

    return [numberBegin, numberEnd, i];
}

const removeRangeDuplicates = (rangeArray) => {
    const newRangeArray = [];

    for (const range of rangeArray) {
        let isDuplicate = false;

        for (const newRange of newRangeArray) {
            if (range[0] === newRange[0] && range[1] === newRange[1] && range[2] === newRange[2]) {
                isDuplicate = true;
                break;
            }
        }

        if (!isDuplicate) {
            newRangeArray.push(range);
        }
    }

    return newRangeArray;
}

const checkStar = (charArr, i, j,) => {
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

    const rangeArray = [];

    for (const direction of directions) {
        try {
            const toCheck = charArr[direction[0]][direction[1]];

            if (!isNaN(toCheck)) {
                rangeArray.push(getNumberRange(charArr, direction[0], direction[1]));
            }
        } catch (e) {
            continue;
        }
    }

    return removeRangeDuplicates(rangeArray);
}

const computeRange = (charArr, rangeArray) => {
    let sum = 1;

    for (const range of rangeArray) {
        console.log(charArr[range[2]].slice(range[0], range[1]).join(""))
        sum *= charArr[range[2]].slice(range[0], range[1]).join("");
    }
    return sum;
}


const charArr = transformToCharArr();

for (let i = 0; i < charArr.length; i++) {
    for (let j = 0; j < charArr[i].length; j++) {
        if (charArr[i][j] !== "*") {
            continue;
        }

        const numberRange = checkStar(charArr, i, j);

        if (numberRange.length !== 2) {
            continue;
        }

        res += computeRange(charArr, numberRange, i);
    }
}

console.log(String(res));
