const fs = require("fs");

let res = 0;

const buff = fs.readFileSync("./input", "utf-8");
const input = buff.split("\n");

const numberAsText = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

for (const lines of input) {
    const chars = lines.split('')
    const digits = [];

    for (let i = 0; i < chars.length; i++) {
        if (!isNaN(chars[i])) {
            digits.push(Number(chars[i]));
            continue;
        }

        for (let j = 0; j < numberAsText.length; j++) {
            const sub = chars.slice(i, i + numberAsText[j].length).join('');
            
            if (sub === numberAsText[j]) {
                digits.push(j + 1);
                break;
            }
        }
    }

    res += digits[0] * 10 + digits[digits.length - 1];
}


console.log(res);
