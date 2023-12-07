const fs = require('node:fs');

function run() {
    fs.readFile('day07/input.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const parsedInput = parseInput(data);
        console.log("Total winnings: " + problem1(parsedInput));
        console.log("Total Joker Rules winnings: " + problem2(parsedInput));
    });
}

function parseInput(input) {
    return input.split('\n')
        .filter((s) => s != '')
        .map((s) => {
            let arr = s.split(' ');
            let hand = {
                'cards': arr[0],
                'bid': arr[1],
            };
            return hand;
        });
}

function SortData(data, cardValues) {
    data.sort((a, b) => {
        let direction = b.type - a.type;
        if (direction == 0) {   // Handle hands of the same type
            let arrA = a.cards.split('');
            let arrB = b.cards.split('');
            for (let i = 0; i < arrA.length; i++) {
                direction = cardValues[arrA[i]] - cardValues[arrB[i]];
                if (direction != 0) break;
            }
        }
        return Math.min(Math.max(direction, -1), 1);
    });
}

function problem1(data) {
    let scores = [
        { 'type': 1, match(s) { return s.match(/([2-9A-Z])\1{4}/g) != null; } }, // five-of-a-kind
        { 'type': 2, match(s) { return s.match(/([2-9A-Z])\1{3}/g) != null; } }, // four-of-a-kind
        { 'type': 3, match(s) { return s.match(/([2-9A-Z])\1([2-9A-Z])\2{2}|([2-9A-Z])\3{2}([2-9A-Z])\4/g) != null; } }, //full-house
        { 'type': 4, match(s) { return s.match(/([2-9A-Z])\1{2}/g) != null; } }, // three-of-a-kind
        { 'type': 5, match(s) { let pairs = s.match(/([2-9A-Z])\1/g); return pairs == null ? false : pairs.length > 1; } }, // two-pair
        { 'type': 6, match(s) { return s.match(/([2-9A-Z])\1/g) != null; } }, // one-pair
        { 'type': 7, match(s) { return true; } }, // high-card (always)
    ];
    let hands = data.map((hand) => {
        let copy = Object.assign({}, hand); // Make a copy of the original data so we don't dirty the original
        copy['type'] = scores.find((type) => type.match(hand.cards.split('').toSorted().join(''))).type; // Must match against a sorted hand
        return copy;
    });
    let cardValues = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14, };
    SortData(hands, cardValues);
    return hands.reduce((acc, curr, rank) => acc + (curr.bid * (rank + 1)), 0);
}

function problem2(data) {
    let scores = [
        function (s) {
            return s.match(/([2-9A-Z])\1{4}/g) != null ? 1 : undefined; // five-of-a-kind : no match
        },
        function (s) {
            if (s.match(/([2-9A-Z])\1{3}/g) != null) {
                return s.match(/J/g) == null ? 2 : 1; // four-of-a-kind : five-of-a-kind
            };
        },
        function (s) {
            if (s.match(/([2-9A-Z])\1([2-9A-Z])\2{2}|([2-9A-Z])\3{2}([2-9A-Z])\4/g) != null) {
                return s.match(/J/g) == null ? 3 : 1; // full-house : five-of-a-kind
            };
        },
        function (s) {
            let three = s.match(/([2-9A-Z])\1{2}/g);
            if (three != null) {
                if (s.match(/J/g) != null) return 2; // four-of-a-kind
                return 4;                            // three-of-a-kind
            };
        },
        function (s) {
            let pairs = s.match(/([2-9A-Z])\1/g);
            if (pairs != null) {
                let jokers = s.match(/J/g);
                jokers = jokers == null ? 0 : jokers.length;
                if (pairs.length > 1) {
                    if (jokers == 0) return 5;  // two-pair
                    if (jokers == 1) return 3;  // full-house
                    if (jokers == 2) return 2;  // four-of-a-kind
                } else {
                    if (jokers == 1 || pairs[0] == 'JJ') return 4; // three-of-a-kind
                    return 6;   // one-pair
                }
            }
        },
        function (s) {
            return s.match(/J/g) == null ? 7 : 6; // high card : one-pair
        }
    ];
    function GetHandType(hand) {
        let handType = undefined;
        let i = 0;
        do {
            handType = scores[i++](hand);
        } while (handType == undefined)
        return handType;
    }
    data.forEach((hand) => {
        hand['type'] = GetHandType(hand.cards.split('').toSorted().join(''));
    });
    let cardValues = { 'J': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'T': 10, 'Q': 12, 'K': 13, 'A': 14, };
    SortData(data, cardValues);
    return data.reduce((acc, curr, rank) => acc + (curr.bid * (rank + 1)), 0);
}

module.exports = { run };