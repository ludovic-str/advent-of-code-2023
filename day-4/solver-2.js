const fs = require("fs");

let res = 0;

const buff = fs.readFileSync("./input", "utf-8");
const input = buff.split("\n");

const getCardInstanceBtIndex = () => {
    const map = new Map();

    for (let i = 0; i < input.length; i++) {
        map.set(i, 1);
    }

    return map;
}

const cardInstanceBtIndex = getCardInstanceBtIndex();

for (let i = 0; i < input.length; i++) {
    const cleanedLine = input[i].substring(input[i].indexOf(":") + 1);
    
    const [winList, handList] = cleanedLine.split("|");
    
    const splitedWinList = winList.split(" ").filter((item) => item !== "");
    const splitedHandList = handList.split(" ").filter((item) => item !== "");
    let winCount = 0;

    //console.log(cardInstanceBtIndex);

    for (const handItem of splitedHandList) {
        if (splitedWinList.includes(handItem)) {
            winCount ++;
        }
    }

    for (let winningRow = 1; winningRow <= winCount; winningRow++) {
        const rowIndex = i + winningRow;
        cardInstanceBtIndex.set(rowIndex, cardInstanceBtIndex.get(i) + cardInstanceBtIndex.get(rowIndex));
    }
    currentScore = 0;
    winCount = 0;
}

console.log([...cardInstanceBtIndex.values()].reduce((acc, curr) => acc + curr, 0));