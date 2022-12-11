const fs = require("fs");

function inRange(number, a, b) {
  if (number >= a && number <= b) {
    return true;
  }
  return false;
}

function isFullyContained(firstLimits, secondLimits) {
  const a = parseInt(firstLimits[0]);
  const b = parseInt(firstLimits[1]);

  const x = parseInt(secondLimits[0]);
  const y = parseInt(secondLimits[1]);

  if ((a >= x && b <= y) || (x >= a && y <= b)) {
    return true;
  }
  return false;
}

function isOverlaping(firstLimits, secondLimits) {
  const a = parseInt(firstLimits[0]);
  const b = parseInt(firstLimits[1]);

  const x = parseInt(secondLimits[0]);
  const y = parseInt(secondLimits[1]);

  if (
    inRange(a, x, y) ||
    inRange(b, x, y) ||
    inRange(x, a, b) ||
    inRange(y, a, b)
  ) {
    return true;
  }
  return false;
}

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const linesData = data.trim().split("\n");

  let count = 0;
  let countOverlapping = 0;
  for (l of linesData) {
    const pairs = `${l}`.split(",");
    const firstLimits = pairs[0].split("-");
    const secondLimits = pairs[1].split("-");

    if (isFullyContained(firstLimits, secondLimits)) {
      count++;
    }
    if (isOverlaping(firstLimits, secondLimits)) {
      countOverlapping++;
    }
  }
  console.log(count);
  console.log(countOverlapping);
});
