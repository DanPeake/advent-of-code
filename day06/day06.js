function run() {
    require('node:fs').readFile(`${__dirname.split(require('node:path').sep).pop()}/input.txt`, 'utf8', (err, data) => {
        if (err) { console.error(err.code == 'ENOENT' ? `Could not read input file "${err.path}"` : err.code); return; }
        const parsedInput = parseInput(data);
        console.log("Number of winning holds per race multiplied together: " + problem1(parsedInput));
        console.log("Ways to win one big race: " + problem2(parsedInput));
    });
}

function parseInput(input) {
    return input.split('\n')
        .filter((s) => s != '')
        .map((s) => s.split(/: */g)[1].split(/ +/g));
}

function problem1(data) {
    let results = [];
    for (let i = 0; i < 4; i++) {
        let winningHolds = 0;
        for (let holdTime = 1; holdTime < data[0][i]; holdTime++) {
            let distance = Math.abs(holdTime - data[0][i]) * holdTime;
            if (distance > data[1][i]) {
                winningHolds++;
            }
        }
        results.push(winningHolds);
    }
    return results.reduce((acc, curr) => acc * curr);
}

function problem2(data) {
    let raceTime = +data[0].join('');
    let bestDist = +data[1].join('');
    let winningHolds = 0;
    for (let holdTime = 1; holdTime < raceTime; holdTime++) {
        let distance = Math.abs(holdTime - raceTime) * holdTime;
        if (distance > bestDist) {
            winningHolds++;
        }
    }
    return winningHolds;
}

module.exports = { run };