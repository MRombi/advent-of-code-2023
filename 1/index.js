const fs = require("fs");

fs.readFile(`${__dirname}/data.txt`, "utf-8", (err, data) => {
  let splittedData = data.split("\n");
  const nums = [];

  const wordAndNums = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const numberLookup = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };
  for (let i = 0; i < splittedData.length; i++) {
    const lineNums = [];
    for (let j = 0; j < wordAndNums.length; j++) {
      if (splittedData[i].includes(wordAndNums[j])) {
        let matchedArr = [...splittedData[i].matchAll(wordAndNums[j])];
        for (let matchedNum of matchedArr) {
          lineNums.push([matchedNum[0], matchedNum.index]);
        }
      }
    }
    const ordered = lineNums.sort((a, b) => {
      return a[1] - b[1];
    });

    if (ordered[0][0].length > 1) {
      nums.push([numberLookup[ordered[0][0]]]);
    } else if (ordered[0][0].length === 1) {
      nums.push([ordered[0][0]]);
    }

    if (ordered[ordered.length - 1][0].length > 1) {
      nums[i].push(numberLookup[ordered[ordered.length - 1][0]]);
    } else if (ordered[ordered.length - 1][0].length === 1) {
      nums[i].push(ordered[ordered.length - 1][0]);
    }
    nums[i] = nums[i][0] + nums[i][1];
    // for (let char of splittedData[i]) {
    //   if (char.match(/\d/)) {
    //     lineNums.push(char);
    //   }
    // }
    // if (lineNums.length === 1) {
    //   nums.push([lineNums[0]]);
    //   nums[i].push(lineNums[0]);
    //   nums[i] = nums[i][0] + nums[i][1];
    // } else {
    //   nums.push([lineNums[0]]);
    //   nums[i].push(lineNums[lineNums.length - 1]);
    //   nums[i] = nums[i][0] + nums[i][1];
    // }
  }
  const result = nums.reduce((sum, num) => +sum + +num);
  console.log(result);
});
