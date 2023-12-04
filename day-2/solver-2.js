const fs = require("fs");

const buff = fs.readFileSync("./input", "utf-8");

let res = 0;

const input = buff.split("\n");

const minimumByColor = new Map([
    ["red", 0],
    ["green", 0],
    ["blue", 0]
]);

const resetMinimumByColor = () => {
    minimumByColor.set("red", 0);
    minimumByColor.set("green", 0);
    minimumByColor.set("blue", 0);
}

const setMinimuColorOfSet = (set) => {
    const cubes = set.split(",");

    for (const cube of cubes) {
        const trimedCube = cube.trim();
        const [number, color] = trimedCube.split(" ");
        
        if (minimumByColor.get(color) < Number(number)) {
            minimumByColor.set(color, Number(number));
        }
    }
}

for (let i = 0; i < input.length; i++) {
    let isValid = true;
    const cleanedGame = input[i].substring(input[i].indexOf(":") + 1);
    const sets = cleanedGame.split(";");

    for (const set of sets) {
        setMinimuColorOfSet(set);
    }
    res += [...minimumByColor.values()].reduce((a, b) => a * b, 1);
    resetMinimumByColor();
}

console.log(res);