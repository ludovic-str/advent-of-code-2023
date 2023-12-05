const fs = require("fs");

let res = 0;

const buff = fs.readFileSync("./input", "utf-8");
const input = buff.split("\n");


const getSeeds = () => {
    const seedsStrings = input[0].substring(input[0].indexOf(":") + 1).split(" ").filter((item) => item !== "");
    let seeds = [];

    for (let i = 0; i < seedsStrings.length; i += 2) {
        seeds.push([Number(seedsStrings[i]), Number(seedsStrings[i + 1])]);
    }

    return seeds;
}

const splitMaps = () => {
    const maps = [];
    let tmp = [];

    for (let i = 2; i < input.length; i++) {
        if (input[i] === "") {
            maps.push(tmp);
            tmp = [];
            continue;
        }
        tmp.push(input[i]);
    }
    
    if (tmp.length > 0) maps.push(tmp);

    return maps;
}

const createMapArray = (maps) => {
    const mapArray = [];

    for (const map of maps) {
        const tmp = [];

        for (let i = 1; i < map.length; i++) {
            const [destinationStart, sourceStart, range] = map[i].split(" ");

            tmp.push([Number(destinationStart), Number(sourceStart), Number(range)])
        }

        mapArray.push(tmp);
    }

    return mapArray;
}

const getLocations = (maps, seedRanges) => {
    let index = seedRanges

    for (const map of maps) {
        for (const [destinationStart, sourceStart, range] of map) {
            if (index >= sourceStart && index < sourceStart + range) {
                index = destinationStart + (index - sourceStart);
                break;
            }
        }
    }

    return index;
}

        
const seedRanges = getSeeds();
const maps = createMapArray(splitMaps());
const locations = [];

for (const seed of seedRanges) {
    locations.push(getLocations(maps, seed));
}

console.log(Math.min(...locations));