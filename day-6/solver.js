const fs = require("fs");

let res = 1;

const buff = fs.readFileSync("./input", "utf-8");
const input = buff.split("\n");

const times = input[0].substring(input[0].indexOf(":") + 1).split(" ").filter((item) => item !== "");
const distances = input[1].substring(input[1].indexOf(":") + 1).split(" ").filter((item) => item !== "");

for (let i = 0; i < times.length; i++) {
    let time = Number(times[i]);
    let winningSpeed = 0;

    for (let speed = 1; speed < time - 1; speed++) {
        if (speed * (time - speed) > Number(distances[i])) {
            winningSpeed++;
        }
    }

    res *= winningSpeed;
}

console.log(res);