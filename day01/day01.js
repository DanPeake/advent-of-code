function run() {
  require('node:fs').readFile(`${__dirname.split(require('node:path').sep).pop()}/input.txt`, 'utf8', (err, data) => {
    if (err) { console.error(err.code == 'ENOENT' ? `Could not read input file "${err.path}"` : err.code); return; }
    let parsedInput = parseInput(data);
    console.log("Sum of first and last numbers in each row: " + problem1(parsedInput));
    console.log("Sum of converted number names first and last numbers in each row: " + problem2(parsedInput));
  });
}

function parseInput(data) {
  return data.split('\n').filter((s) => s != '');
}

function problem1(data) {
  return data.map((s) => {
    let nums = s.match(/[0-9]/g);
    return String(nums[0]) + String(nums[nums.length - 1]);
  })
    .reduce((acc, curr) => Number(acc) + Number(curr));
}

function problem2(data) {
  let reg = /(?=(one|two|three|four|five|six|seven|eight|nine|[1-9]))/gi;
  return data
    .map((s) => [...s.matchAll(reg)].map((arr) => arr[1]))
    .map((d) => {
      return d.map((x) => {
        let i = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"].findIndex((z) => x == z);
        return i == -1 ? x : i + 1;
      });
    })
    .map((g) => (String(g[0]) + String(g[Math.max(0, g.length - 1)])))
    .reduce((acc, curr) => Number(acc) + Number(curr));
}

module.exports = { run };
