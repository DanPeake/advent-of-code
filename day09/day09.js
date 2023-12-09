const fs = require('node:fs');

function run() {
    fs.readFile('day09/input.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const parsedInput = parseInput(data);
        console.log("Sum of predictions: " + problem1(parsedInput));
        console.log("Sum of historical extrapolations: " + problem2(parsedInput));
    });
}

function parseInput(input) {
    return input.split('\n')
        .filter((s) => s != '')
        .map((s) => [s.split(' ').map((n) => +n)])
        .map((s) => { // expan the difference calculations while parsing input why not
            let last = 0;
            do {
                let currData = s.slice(-1)[0];
                last = s.push([]) - 1;
                for (let i = 0; i < currData.length - 1; i++) {
                    s[last].push(currData[i + 1] - currData[i]);
                }
            } while (s[last].every((n) => n == 0) == false)
            return s;
        });
}

function problem1(data) {
    let diffSum = 0;
    data.map((sensor) => {
        sensor[sensor.length - 1].push(0);
        for (let j = sensor.length - 2; j >= 0; j--) {
            let lastReading = sensor[j].length - 1;
            let inc = sensor[j + 1][lastReading];
            sensor[j].push(sensor[j][lastReading] + inc);
        }
        diffSum += sensor[0][sensor[0].length - 1];
        return sensor;
    });
    return diffSum;
}

function problem2(data) {
    let diffSum = 0;
    data.map((sensor) => {
        sensor[sensor.length - 1].unshift(0);
        for (let j = sensor.length - 2; j >= 0; j--) {
            let inc = sensor[j + 1][0];
            sensor[j].unshift(sensor[j][0] - inc);
        }
        diffSum += sensor[0][0];
        return sensor;
    });
    return diffSum;
}

module.exports = { run };