function run() {
    require('node:fs').readFile(`${__dirname.split(require('node:path').sep).pop()}/input.txt`, 'utf8', (err, data) => {
        if (err) { console.error(err.code == 'ENOENT' ? `Could not read input file "${err.path}"` : err.code); return; }
        const parsedInput = parseInput(data);
        console.log("Total points: " + problem1(parsedInput));
        console.log("Number of cards and copies won: " + problem2(parsedInput));
    });
}

function parseInput(input) {
    return input.split('\n')
        .filter((s) => s != '')
        .map((ln) => ln.split(': ')[1].split(' | '))
        .map((ln) => {
            return {
                'numbers': ln[0].split(' ').filter((s) => s != ''),
                'winners': ln[1].split(' ').filter((s) => s != ''),
                'wins': 0
            }
        });
}

function problem1(data) {
    let points = 0;
    data.forEach((card) => {
        let cardScore = 0;
        card.numbers.forEach((num) => {
            if (card.winners.find((w) => num == w) != undefined) {
                cardScore = cardScore == 0 ? 1 : cardScore * 2;
                card.wins++;
            }
        });
        points += cardScore;
    });
    return points;
}

function problem2(data) {
    const countCopies = function (cardInd) {
        let copies = 1;
        for (let i = 1; i <= data[cardInd].wins; i++) {
            copies += countCopies(cardInd + i);
        }
        return copies;
    }
    let cardCount = 0;
    for (let i = 0; i < data.length; i++) {
        cardCount += countCopies(i);
    }
    return cardCount;
}

module.exports = { run };