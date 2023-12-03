const fs = require('node:fs');

function run() {
    fs.readFile('day03/input.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const parsedInput = parseInput(data);
        console.log("Sum of all part nums: " + problem1(parsedInput));
        console.log("Sum of all gear ratios: " + problem2(parsedInput));
    });
}

function parseInput(input) {
    return input.split('\n')
    .filter((s)=>s!='');
}

function problem1(data) {
    let sum = 0;
    data.forEach((s,row) => {
        let mark = 0;
        s.match(/[0-9]+/g).forEach((num) => {
            let ind = s.indexOf(num, mark);
            mark = ind+num.length;
            let rangeMin = Math.max(0, ind-1);
            let rangeMax = Math.min(s.length, ind+num.length+1);
            for (let i=-1;i<2;i++) {
                let checkRow = row+i;
                if (checkRow < 0 || checkRow > data.length-1) continue;
                if (data[checkRow].substring(rangeMin,rangeMax).match(/[^0-9.]/) != null) {
                    sum += +num;
                    return;
                };
            };
        });
    });
    return sum;
}

function problem2(data) {
    let adjacents = []
    data.forEach((s,row) => {
        let mark = 0;
        s.match(/[0-9]+/g).forEach((num) => {
            let ind = s.indexOf(num, mark);
            mark = ind+num.length;
            let rangeMin = Math.max(0, ind-1);
            let rangeMax = Math.min(s.length, ind+num.length+1);
            for (let i=-1;i<2;i++) {
                let checkRow = row+i;
                if (checkRow < 0 || checkRow > data.length-1) continue;
                let gear = data[checkRow].substring(rangeMin,rangeMax).match(/[*]/);
                if (gear != null) {
                    let ind=data[checkRow].indexOf('*', rangeMin)
                    adjacents.push({ 'num':num, 'pos':checkRow+','+ind, used:false })
                    return;
                };
            };
        });
    });
    let sumOfRatios = 0;
    adjacents.forEach((gear, ind) => {
        adjacents.forEach((comp, i) => {
           if (ind == i) return;
           if (gear.used || comp.used) return;
           if (gear.pos == comp.pos) {
               sumOfRatios += (+gear.num * +comp.num);
               gear.used=true;
               comp.used=true;
           }
        })
    });
    return sumOfRatios;
}

module.exports = { run };