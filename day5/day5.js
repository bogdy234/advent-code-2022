const fs = require("fs");

function removeBrackets(data) {
  let newStr = "";
  newStr = data.split("[").join(" ").split("]").join(" ");
  return newStr;
}

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const linesData = data.split("\n");
  let table = linesData.splice(0, linesData.indexOf("") - 1);
  const moves = linesData.splice(linesData.indexOf("") + 1, linesData.length);

  for (let i = 0; i < table.length; i++) {
    table[i] = removeBrackets(table[i]);
  }

  const tableMatrix = [];
  for (let i = 0; i < table.length; i++) {
    const element = table[i].split("");
    tableMatrix.push(element);
  }

  output = tableMatrix[0].map((_, colIndex) =>
    tableMatrix.map((row) => row[colIndex])
  );

  const tableJoined = [];
  for (let i = 0; i < output.length; i++) {
    const element = output[i].join("");
    const trimmed = element.trim();
    if (trimmed !== "") {
      tableJoined.push(trimmed);
    }
  }

  for (let i = 0; i < moves.length; i++) {
    const newMove = moves[i]
      .split(" ")
      .filter((_, idx) => idx === 1 || idx === 3 || idx === 5);
    moves[i] = newMove;
  }

  // move ${howMany} from ${idx1 - 1} to ${idx2 - 1}
  // tableJoined -> ['ABC', 'DEF'], moves -> [1,2,5], arrangement -> 'ABCDEF'
  const tablePartOne = [...tableJoined];
  const tablePartTwo = [...tableJoined];

  for (let i = 0; i < moves.length; i++) {
    const howMany = moves[i][0];
    const fromIdx = moves[i][1] - 1;
    const toIdx = moves[i][2] - 1;

    const fromEl = tablePartOne[fromIdx];
    const toEl = tablePartOne[toIdx];

    const newFrom = fromEl.substring(howMany, fromEl.length);

    // part 1:
    // const newTo = `${fromEl
    //   .substring(0, howMany)
    //   .split("")
    //   .reverse()
    //   .join("")}${toEl}`;

    // part 2:
    const newTo = `${fromEl.substring(0, howMany)}${toEl}`;

    tablePartOne[fromIdx] = newFrom;
    tablePartOne[toIdx] = newTo;
  }

  let arrangement = "";
  for (let i = 0; i < tablePartOne.length; i++) {
    arrangement += `${tablePartOne[i][0]}`;
  }
  console.log(arrangement);
});
