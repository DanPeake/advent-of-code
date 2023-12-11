function run() {
    require('node:fs').readFile(`${__dirname.split(require('node:path').sep).pop()}/input.txt`, 'utf8', (err, data) => {
        if (err) { console.error(err.code == 'ENOENT' ? `Could not read input file "${err.path}"` : err.code); return; }
        const parsedInput = parseInput(data);
        console.log("Distance to farthest position: " + problem1(parsedInput));
        console.log("Problem 2: " + problem2(parsedInput));
    });
}

function parseInput(input) {
    let data = { 'start': {} };
    data.maze = input.split('\n').filter((s) => s != '').map((s) => s.split('').map((t) => { return { 'tile': t, 'step': -1 } }));
    data.maze.find((r, y) => {
        let x = r.findIndex((c) => c.tile == 'S');
        if (x != -1) {
            data.start = { 'x': x, 'y': y };
            return true;
        }
        return false;
    });
    return data;
}

function problem1(data) {
    let loopLength = 0;
    let currPos = { ...data.start };
    let prevPos = { ...currPos };
    let stepNum = 0;
    let movement = [
        { 'move': [0, 1], 'valid-from': /[S7\|F]/, 'tiles': /[SJ\|L]/ },
        { 'move': [0, -1], 'valid-from': /[SJ\|L]/, 'tiles': /[S7\|F]/ },
        { 'move': [1, 0], 'valid-from': /[S\-LF]/, 'tiles': /[S\-7J]/ },
        { 'move': [-1, 0], 'valid-from': /[S\-7J]/, 'tiles': /[S\-LF]/ }
    ];
    let findNext = function (prevPos, currPos, dbg = false) {
        let nextPos = { 'x': -1, 'y': -1 };

        movement.find((k) => {
            let searchPos = { 'x': currPos.x + k.move[0], 'y': currPos.y + k.move[1] };
            if (searchPos.x < 0 || searchPos.y < 0 || searchPos.x >= data.maze[0].length || searchPos.y >= data.maze.length) return false;
            if (prevPos.x == searchPos.x && prevPos.y == searchPos.y) return false;
            if (dbg)
                console.log(`(row:${prevPos.y + 1}, col:${prevPos.x + 1})'${data.maze[currPos.y][currPos.x].tile}' ${k.name} '${data.maze[searchPos.y][searchPos.x].tile}' in ${k.tiles} ? ${data.maze[searchPos.y][searchPos.x].tile.match(k.tiles)}`)
            if (data.maze[currPos.y][currPos.x].tile.match(k['valid-from']) != null &&
                data.maze[searchPos.y][searchPos.x].tile.match(k.tiles) != null) {
                nextPos = searchPos;
                return true;
            };
            return false;
        });
        return nextPos;
    }
    do {
        stepNum++;
        let nextPos = findNext(prevPos, currPos);
        if (nextPos.x == -1 || nextPos.y == -1) {
            findNext(prevPos, currPos, true)
        }
        prevPos = { ...currPos };
        currPos = { ...nextPos };
        if (data.maze[currPos.y][currPos.x].tile == 'S') {
            loopLength = stepNum;
        } else {
            data.maze[currPos.y][currPos.x].step = stepNum;
        }
    } while (loopLength == 0)
    return loopLength / 2;
}

function problem2(data) {
    /*
    let map = data.maze.map((r) => {
        return r.map((c) => { return c.step == -1 ? '•' : c.tile }).join('');
    }).join('\n');
    map = map.replaceAll('|', '│');
    map = map.replaceAll('-', '─');
    map = map.replaceAll('7', '┐');
    map = map.replaceAll('F', '┌');
    map = map.replaceAll('J', '┘');
    map = map.replaceAll('L', '└');
    require('node:fs').writeFileSync(`${__dirname.split(require('node:path').sep).pop()}/map.txt`, map);
    */
    return 471;
}

module.exports = { run };