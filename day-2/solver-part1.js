const fs = require("fs");

const buff = fs.readFileSync("./input", "utf-8");

let res = 0;

const input = buff.split("\n");

const maxByColor = new Map([
    ["red", 12],
    ["green", 13],
    ["blue", 14]
]);

const isSetValid = (set) => {
    const cubes = set.split(",");

    for (const cube of cubes) {
        const trimedCube = cube.trim();
        const [number, color] = trimedCube.split(" ");
        
        if (maxByColor.get(color) < Number(number)) {
            return false;
        }
    }

    return true;
}

for (let i = 0; i < input.length; i++) {
    let isValid = true;
    const cleanedGame = input[i].substring(input[i].indexOf(":") + 1);
    const sets = cleanedGame.split(";");

    for (const set of sets) {
        if (!isSetValid(set)) {
            isValid = false;
            break;
        }
    }

    if (isValid) {
        res += i + 1;
    }
}

console.log(res);