const fs = require('node:fs');

function run() {
    fs.readFile('day02/input.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const parsedInput = parseInput(data);
        console.log("Sum of possible game IDs: " + day02_1(parsedInput));
        console.log("Sum of the power of minimum sets: " + day02_2(parsedInput));
    });
}

function parseInput(input) {
    return input.split('\n')
    .filter((s)=>s!='')
    .map((s)=>{
        let src = s.split(': ');
        let obj = {id: src[0].replace("Game ",'')}
        obj.sets = src[1].split('; ').map((s) => {
            let r={r:0,g:0,b:0};
            s.split(', ').forEach((c) => {
                r[c.match(/(red|green|blue)/gi)[0].substring(0,1)] = Number(c.match(/[0-9]+/g)[0]);    
            })
            return r;
            });
        return obj;
        });
}

function day02_1(data) {
    let bag = {r:12, g:13, b:14};
    let idSum = 0;
    data.forEach((game) => {
        let thisId = game.id;
        game.sets.forEach((s) => {
            if (bag.r < s.r || bag.g < s.g || bag.b < s.b)
                thisId=0;
        });
        idSum += Number(thisId);
    })
    return idSum;
}

function day02_2(data) {
    let powSum = 0;
    data.forEach((game) => {
        let mins = {r:0,g:0,b:0};
        game.sets.forEach((s) => {
            mins.r = Math.max(mins.r,s.r);
            mins.g = Math.max(mins.g,s.g);
            mins.b = Math.max(mins.b,s.b);
        });
        let pow = mins.r*mins.g*mins.b;
        powSum += pow;
    });
    return powSum;
}

module.exports = { run };