function run() {
    require('node:fs').readFile(`${__dirname.split(require('node:path').sep).pop()}/input.txt`, 'utf8', (err, data) => {
        if (err) { console.error(err.code == 'ENOENT' ? `Could not read input file "${err.path}"` : err.code); return; }
        const parsedInput = parseInput(data);
        console.log("Sum of shortest distances between galaxies: " + problem1(parsedInput));
        console.log("Sum of shortest distances between ancient galaxies: " + problem2(parsedInput));
    });
}

function parseInput(input) {
    return input.split('\n')
        .filter((s) => s != '')
        .map((r) => r.split(''));
}

function findGalaxies(map) {
    let galaxies = [];
    map.forEach((row, rowInd) => {
        row.forEach((cell, cellInd) => {
            if (cell == '#') galaxies.push([rowInd, cellInd])
        })
    });
    return galaxies;
}

function problem1(data) {
    let expandedMap = [...data];
    for (let col = 0; col < expandedMap[0].length; col++) {
        let column = "";
        for (let row = 0; row < expandedMap.length; row++) column += expandedMap[row][col];
        if (column.match(/#/) == null) {
            for (let row = 0; row < expandedMap.length; row++) {
                expandedMap[row] = expandedMap[row].toSpliced(col, 0, '.');
            }
            col++;
        }
    }
    for (let i = 0; i < expandedMap.length; i++) {
        if (expandedMap[i].join('').match(/#/) == null) {
            expandedMap.splice(i, 0, expandedMap[i]);
            i++;
        }
    };
    let galaxies = findGalaxies(expandedMap);
    let totalDist = 0;
    for (let i = 0; i < galaxies.length; i++) {
        for (let j = i + 1; j < galaxies.length; j++) {
            let yDist = Math.abs(galaxies[i][0] - galaxies[j][0]);
            let xDist = Math.abs(galaxies[i][1] - galaxies[j][1]);
            totalDist += xDist + yDist;
        }
    }
    return totalDist;
}

function problem2(data) {
    let expandedMap = [...data];
    for (let col = 0; col < expandedMap[0].length; col++) {
        let column = "";
        for (let row = 0; row < expandedMap.length; row++) column += expandedMap[row][col];
        if (column.match(/#/) == null) {
            for (let row = 0; row < expandedMap.length; row++) {
                expandedMap[row].splice(col, 1, '*');
            }
        }
    }
    for (let i = 0; i < expandedMap.length; i++) {
        let row = expandedMap[i].join('');
        if (row.match(/#/) == null) {
            expandedMap.splice(i, 1, row.replaceAll('.', '*').split(''));
        }
    };
    let galaxies = findGalaxies(expandedMap);
    let totalDist = 0;
    for (let i = 0; i < galaxies.length; i++) {
        for (let j = i + 1; j < galaxies.length; j++) {
            let rowDist = Math.abs(galaxies[i][0] - galaxies[j][0]);
            let colDist = Math.abs(galaxies[i][1] - galaxies[j][1]);
            let colSpan = galaxies[i][1] > galaxies[j][1] ? [galaxies[j][1], galaxies[i][1]] : [galaxies[i][1], galaxies[j][1]];
            let colSpace = expandedMap[0].slice(colSpan[0], colSpan[1]).reduce((acc, curr) => { let stars = acc; if (curr == '*') { stars++; } return stars; }, 0);
            let rowSpan = galaxies[i][0] > galaxies[j][0] ? [galaxies[j][0], galaxies[i][0]] : [galaxies[i][0], galaxies[j][0]];
            let rowSpace = expandedMap.slice(rowSpan[0], rowSpan[1]).reduce((acc, curr) => { let stars = acc; if (curr[0] == '*') { stars++; } return stars; }, 0);
            totalDist += (rowDist - rowSpace) + (rowSpace * 1000000) + (colDist - colSpace) + (colSpace * 1000000);
        }
    }
    return totalDist;
}

module.exports = { run };