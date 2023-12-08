const fs = require("fs");

let res = 0;

const buff = fs.readFileSync("./input", "utf-8");
const input = buff.split("\n");

const getDirections = () => {
    return input[0].split("");
}

const getNextDirectionFromCurrentMap = () => {
    const map = new Map();

    for (let i = 2; i < input.length; i++) {
        const splitedLine = input[i].split(" ");
        map.set(splitedLine[0], [splitedLine[2].slice(1, -1), splitedLine[3].slice(0, -1)]);
    }

    return map;
}

const directions = getDirections();
const nextDirectionFromCurrentMap = getNextDirectionFromCurrentMap();
let currentNode = "AAA";

while (currentNode !== "ZZZ") {
    for (const direction of directions) {
        currentNode = nextDirectionFromCurrentMap.get(currentNode)[direction === "R" ? 1 : 0];
        res++;
        if (currentNode === "ZZZ") {
            break;
        }
    }
}

console.log(res);