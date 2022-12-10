const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let newData = data.split("\n");
  let amounts = [];
  let j = 0;
  let sum = 0;

  for (let i = 0; i < newData.length; i++) {
    if (newData[i] !== "") {
      sum += parseInt(newData[i]);
    } else {
      amounts[j] = sum;
      j++;
      sum = 0;
    }
  }
  const sortedAmountsDesc = amounts.sort((a, b) => b - a);

  console.log(sortedAmountsDesc[0]); // part one
  console.log(
    sortedAmountsDesc[0] + sortedAmountsDesc[1] + sortedAmountsDesc[2]
  ); // part two
});
