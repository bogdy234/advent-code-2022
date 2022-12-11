const fs = require("fs");

function getFrequency(string) {
  const freq = {};
  for (let i = 0; i < string.length; i++) {
    let character = string.charAt(i);
    if (freq[character]) {
      freq[character]++;
    } else {
      freq[character] = 1;
    }
  }

  return freq;
}

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));

  let letters = [];

  for (let letter of alphabet) {
    letters = [...letters, letter.toLowerCase()];
  }
  letters = [...letters, ...alphabet];

  const backpacks = data.split("\n");

  let sum = 0;
  for (let backpack of backpacks) {
    const firstCompartment = backpack.slice(0, backpack.length / 2);
    const secondCompartment = backpack.slice(
      backpack.length / 2,
      backpack.length
    );

    let letter;

    for (let i = 0; i < firstCompartment.length; i++) {
      for (let j = 0; j < secondCompartment.length; j++) {
        if (firstCompartment[i] === secondCompartment[j]) {
          letter = firstCompartment[i];
        }
      }
    }
    sum += letters.indexOf(letter) + 1;
  }
  console.log(sum);

  let occurences = [];

  let badges = [];
  // part 2
  for (let b of backpacks) {
    const frequency = getFrequency(b);
    occurences.push(frequency);

    if (occurences.length === 3) {
      for (const [key, value] of Object.entries(occurences[0])) {
        if (value > 0 && occurences[1][key] > 0 && occurences[2][key] > 0) {
          badges.push(key);
        }
      }
      occurences = [];
    }
  }

  let sumBadges = 0;
  for (let b of badges) {
    sumBadges += letters.indexOf(b) + 1;
  }

  console.log(sumBadges);
});
