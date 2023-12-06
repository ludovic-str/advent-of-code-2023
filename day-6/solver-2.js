const fs = require("fs");

let res = 0;

const buff = fs.readFileSync("./input", "utf-8");
const input = buff.split("\n");

const time = input[0].split(":")[1].trim().split(" ").filter((item) => item !== "").join("")
const distance = input[1].split(":")[1].trim().split(" ").filter((item) => item !== "").join("")
console.log(time, distance);

for (let speed = 1; speed < time - 1; speed++) {
    if (speed * (time - speed) > Number(distance)) {
        res++;
    }
}

console.log(res);