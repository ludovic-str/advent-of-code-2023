const fs = require("fs");

let res = 0;

const buff = fs.readFileSync("./input", "utf-8");
const input = buff.split("\n");

for (const line of input) {
    const cleanedLine = line.substring(line.indexOf(":") + 1);
    
    const [winList, handList] = cleanedLine.split("|");
    
    const splitedWinList = winList.split(" ").filter((item) => item !== "");
    const splitedHandList = handList.split(" ").filter((item) => item !== "");
    let currentScore = 0;

    for (const handItem of splitedHandList) {
        if (splitedWinList.includes(handItem)) {
            console.log(handItem);
            currentScore === 0 ? currentScore = 1 : currentScore *= 2;
        }
    }

    res += currentScore;
    currentScore = 0;
}

console.log(res);