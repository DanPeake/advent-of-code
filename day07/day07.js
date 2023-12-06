const fs = require('node:fs');

function run() {
    fs.readFile('day07/input.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const parsedInput = parseInput(data);
        console.log("Problem 1: " + problem1(parsedInput));
        console.log("Problem 2: " + problem2(parsedInput));
    });
}

function parseInput(input) {
    return input.split('\n')
        .filter((s) => s != '');
}

function problem1(data) {
    return "None";
}

function problem2(data) {
    return "None";
}

module.exports = { run };