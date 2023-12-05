const fs = require('node:fs');

function run() {
    fs.readFile('day05/input.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const parsedInput = parseInput(data);
        console.log("Lowest location number: " + problem1(parsedInput));
        console.log("Problem 2: " + problem2(parsedInput));
    });
}

function parseInput(input) {
    let seeds = input.slice(0, input.indexOf('\n')).split(': ')[1].split(' ').map((s) => +s);

    let maps = { 'seeds': seeds };
    input.match(/([a-z+\-]+ map:[0-9 \n]+)/gi).forEach((s) => {
        let arr = s.split(' map:\n');
        let data = arr[1].split('\n').filter((s) => s != '');
        maps[arr[0]] = data.map((s) => s.split(' ').map((n) => +n));
    });
    return maps;
}

function problem1(data) {
    const processMap = function (mapId, seedNum, searchNum, dataId) {
        seedDest[seedNum][dataId] = dataId;
        data[mapId].find((m) => {
            let dest = findDest(searchNum, m[1], m[2], m[0]);
            if (dest != undefined) {
                seedDest[seedNum][dataId] = dest;
                return true;
            }
            return false;
        })
    };
    const findDest = function (source, start, range, destination) {
        let dest = undefined;
        if (source >= start && source < (start + range)) {
            let index = source - start;
            dest = destination + index;
        }
        return dest;
    };
    let seedDest = {};
    let lowestLocation = Number.MAX_SAFE_INTEGER;
    data.seeds.forEach((seed) => {
        seedDest[seed] = {
            'soil': undefined,
            'fertilizer': undefined,
            'water': undefined,
            'light': undefined,
            'temperature': undefined,
            'humidity': undefined,
            'location': undefined
        };
        processMap('seed-to-soil', seed, seed, 'soil');
        processMap('soil-to-fertilizer', seed, seedDest[seed].soil, 'fertilizer');
        processMap('fertilizer-to-water', seed, seedDest[seed].fertilizer, 'water');
        processMap('water-to-light', seed, seedDest[seed].water, 'light');
        processMap('light-to-temperature', seed, seedDest[seed].light, 'temperature');
        processMap('temperature-to-humidity', seed, seedDest[seed].temperature, 'humidity');
        processMap('humidity-to-location', seed, seedDest[seed].humidity, 'location');
        if (seedDest[seed].location < lowestLocation) {
            lowestLocation = seedDest[seed].location;
        }

    });
    console.log(`High enough? ${lowestLocation > 22956580}`)
    return lowestLocation;
}

function problem2(data) {
    return "None";
}

module.exports = { run };