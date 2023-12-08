const fs = require("fs");

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

const getStartingNodes = () => {
    const startingNodes = [];

    for (let i = 2; i < input.length; i++) {
        const splitedLine = input[i].split(" ")[0].split("");
        if (splitedLine[splitedLine.length - 1] === "A") {
            startingNodes.push(splitedLine.join(""));
        }
    }

    return startingNodes;
}

const directions = getDirections();
const nextDirectionFromCurrentMap = getNextDirectionFromCurrentMap();
const currentNodes = getStartingNodes();
let count = 0;

const firstEndOfNode = new Map();

while (firstEndOfNode.size !== currentNodes.length) {
    for (const direction of directions) {
        for (let i = 0; i < currentNodes.length; i++) {
            const currentNode = currentNodes[i];
            const nextNode = nextDirectionFromCurrentMap.get(currentNode)[direction === "R" ? 1 : 0];
            if (nextNode.split("")[nextNode.length - 1] === "Z" && !firstEndOfNode.has(i)) {
                firstEndOfNode.set(i, count + 1);
            }
            currentNodes[i] = nextNode;
        }
        count++;
        if (firstEndOfNode.size === currentNodes.length) {
            break;
        }
    }
}

console.log("The answer is the lcm of the following numbers:");
console.log([...firstEndOfNode.values()]);
