const fs = require("fs");

function letterRepeats(arr) {
  const repeats = arr.some(function (v, i, a) {
    return a.lastIndexOf(v) != i;
  });
  return repeats;
}

function getStartPacket(message, distinctChars) {
  let startPacket = -1;

  for (let i = 0; i < message.length; i++) {
    const chunk = message.substring(i, i + distinctChars);
    const isStartPacket = !letterRepeats(chunk.split(""));
    if (isStartPacket) {
      startPacket = i + distinctChars;
      break;
    }
  }
  return startPacket;
}

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const linesData = data.split("\n");
  const message = linesData[0];

  // part 1
  console.log(getStartPacket(message, 4));

  // part 2
  console.log(getStartPacket(message, 14));
});
