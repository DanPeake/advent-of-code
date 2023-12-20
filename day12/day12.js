function run() {
    require('node:fs').readFile(`${__dirname.split(require('node:path').sep).pop()}/input.txt`, 'utf8', (err, data) => {
        if (err) { console.error(err.code == 'ENOENT' ? `Could not read input file "${err.path}"` : err.code); return; }
        let testInput = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`
        const parsedInput = parseInput(testInput);
        console.log("Problem 1: " + problem1(parsedInput));
        console.log("Problem 2: " + problem2(parsedInput));
    });
}

function parseInput(input) {
    return input.split('\n')
        .filter((s) => s != '')
        .map((s) => {
            let row = s.split(' ');
            let record = { 'springs': row[0].split(/[.]+/g).filter((s) => s != ''), 'runs': row[1].split(',') };
            record.springs.filter((run) => {
                if (run.match(/?/g) == null) return true;

            })
        });
}

function problem1(data) {
    console.table(data);
    return "None";
}

function problem2(data) {
    return "None";
}

module.exports = { run };