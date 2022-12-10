const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const choices = {
    A: "Rock",
    B: "Paper",
    C: "Scissors",
    X: "Rock",
    Y: "Paper",
    Z: "Scissors",
  };

  const shapePoints = {
    Rock: 1,
    Paper: 2,
    Scissors: 3,
  };

  const outcome = {
    0: "Draw",
    1: "You win",
    2: "You lose",
  };

  const getOutcome = (a, b) => {
    if (a === b) {
      return outcome[0];
    } else if (
      (a === choices["A"] && b === choices["Y"]) ||
      (a === choices["B"] && b === choices["Z"]) ||
      (a === choices["C"] && b === choices["X"])
    ) {
      return outcome[1];
    } else return outcome[2];
  };

  // part two
  const getOucomePartTwo = (b) => {
    if (b === choices["X"]) {
      return outcome[2];
    } else if (b === choices["Y"]) {
      return outcome[0];
    } else return outcome[1];
  };

  const outcomePoints = {
    Draw: 3,
    "You win": 6,
    "You lose": 0,
  };

  let newData = data.split("\n");

  let sum = 0;
  let sumPartTwo = 0;
  for (let i = 0; i < newData.length; i++) {
    const hisChoice = newData[i][0]; // first should be variable newData[i][0]
    const myChoice = newData[i][2];
    const myChoiceScore = shapePoints[choices[myChoice]];
    const outcomeScore =
      outcomePoints[getOutcome(choices[hisChoice], choices[myChoice])];

    sum += myChoiceScore + outcomeScore;

    // part two
    const outcomePartTwo = getOucomePartTwo(choices[myChoice]);

    const getMyNewChoice = (a) => {
      if (outcomePartTwo === outcome[0]) {
        return choices[hisChoice];
      } else if (outcomePartTwo === outcome[1]) {
        if (a === choices["A"]) {
          return choices["Y"];
        } else if (a === choices["B"]) {
          return choices["Z"];
        } else if (a === choices["C"]) {
          return choices["X"];
        }
      } else {
        if (a === choices["B"]) {
          return choices["X"];
        } else if (a === choices["C"]) {
          return choices["Y"];
        } else if (a === choices["A"]) {
          return choices["Z"];
        }
      }
    };
    const myChoiceScorePartTwo =
      shapePoints[getMyNewChoice(choices[hisChoice])];
    sumPartTwo += myChoiceScorePartTwo + outcomePoints[outcomePartTwo];
  }
  console.log(sum);
  console.log(sumPartTwo);
});
