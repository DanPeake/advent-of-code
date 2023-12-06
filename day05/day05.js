const fs = require('node:fs');

function run() {
    fs.readFile('day05/input.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const parsedInput = parseInput(data);
        console.log("Lowest location number: " + problem1(parsedInput));
        console.log("Lowest location number in expanded ranges: " + problem2(parsedInput));
    });
}

function parseInput(input) {
    let seeds = input.slice(0, input.indexOf('\n')).split(': ')[1].split(' ').map((s) => +s);
    let maps = { 'seeds': seeds, mappings: [] };
    input.match(/([a-z+\-]+ map:[0-9 \n]+)/gi).forEach((s) => {
        let arr = s.split(' map:\n');
        let data = arr[1].split('\n').filter((s) => s != '');
        maps.mappings.push(arr[0]);
        maps[arr[0]] = data.map((s) => s.split(' ').map((n) => +n));
    });
    return maps;
}

const processMap = function (data, searchNum) {
    let mappedResult = searchNum;
    data.find((m) => {
        if (searchNum >= m[1] && searchNum < (m[1] + m[2])) {
            mappedResult = m[0] + (searchNum - m[1]);
            return true;
        }
        return false;
    })
    return mappedResult;
};

function problem1(data) {
    let lowestLocation = Number.MAX_SAFE_INTEGER;
    data.seeds.forEach((seed) => {
        let mapResult = seed;
        data.mappings.forEach((mapId) => {
            mapResult = processMap(data[mapId], mapResult);
        })
        if (mapResult < lowestLocation) {
            lowestLocation = mapResult;
        }
    });
    return lowestLocation;
}

function problem2(data) {
    let lowestLocation = Number.MAX_SAFE_INTEGER;
    let pair = 0;
    for (let i = 0; i < data.seeds.length; i += 2) {
        console.log(`Searching seed range ${++pair}...`);
        for (let seed = data.seeds[i]; seed < data.seeds[i] + data.seeds[i + 1]; seed++) {
            let mapResult = seed;
            data.mappings.forEach((mapId) => {
                mapResult = processMap(data[mapId], mapResult);
            })
            if (mapResult < lowestLocation) {
                lowestLocation = mapResult;
            }
        }
    }
    return lowestLocation;
}

module.exports = { run };
