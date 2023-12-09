function run() {
    require('node:fs').readFile(`${__dirname.split(require('node:path').sep).pop()}/input.txt`, 'utf8', (err, data) => {
        if (err) { console.error(err.code == 'ENOENT' ? `Could not read input file "${err.path}"` : err.code); return; }
        const parsedInput = parseInput(data);
        console.log("Steps to ZZZ: " + problem1(parsedInput));
        console.log("Number of ghost steps: " + problem2(parsedInput));
    });
}

function parseInput(input) {
    let arr = input.split('\n').filter((s) => s != '');
    let data = { 'directions': arr.shift().split(''), 'nodes': {} }
    let nodeData = arr.map((s) => s.split(' = '));
    nodeData.forEach((node) => { data.nodes[node[0]] = node[1].substring(1, node[1].length - 1).split(', ') });
    return data;
}

function problem1(data) {
    let ind = 0;
    let steps = 0;
    let currNode = 'AAA';
    let direction = '';
    do {
        direction = data.directions[ind++] == 'L' ? 0 : 1;
        currNode = data.nodes[currNode][direction];
        if (ind == data.directions.length) ind = 0;
        steps++;
    } while (currNode != 'ZZZ')
    return steps;
}

function problem2(data) {
    let nodeList = [];
    let steps = [];
    for (const node in data.nodes) { if (node.slice(-1) == 'A') { nodeList.push(node); steps.push(0); } }
    let ind = 0;
    let direction = '';
    do {
        direction = data.directions[ind++] == 'L' ? 0 : 1;
        for (let i = 0; i < nodeList.length; i++) {
            if (nodeList[i].slice(-1) == 'Z') continue;
            nodeList[i] = data.nodes[nodeList[i]][direction];
            steps[i]++;
        }
        if (ind == data.directions.length) ind = 0;
    } while (nodeList.filter((s) => s.slice(-1) != 'Z').length > 0)
    let lcm = function (a, b) {
        let m = a * b;
        do {
            let prevB = b;
            b = a % b;
            a = prevB;
        } while (b != 0) // a is the greatest comon divisor when b is 0
        return m / a; // lowest common mutliple is (a*b) / gcd
    }
    return steps.reduce((acc, curr) => lcm(acc, curr)); // roll it up!
}

module.exports = { run };