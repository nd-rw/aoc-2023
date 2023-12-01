// reading input and splitting on newline to save as an array
const data = await Bun.file("inputs/d1.txt")
  .text()
  .then((x) => x.split("\n"));

const smallData = await Bun.file("inputs/d1-eg.txt")
  .text()
  .then((x) => x.split("\n"));

const strNumToInt: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

// filtering out the non-number characters from each input string
const getNumbersOnlyStringArr = (inputValue: string) => {
  const strNumsReplacedWithNum = replaceStrNumbersWithNumber(inputValue);
  return [...strNumsReplacedWithNum].filter((inputCharacter) =>
    isFinite(parseInt(inputCharacter))
  );
};

const replaceStrNumbersWithNumber = (inputStr: string) => {
  // console.log("🚀 ~ replaceStrNumbersWithNumber ~ inputStr:", inputStr);
  let processedStr = inputStr;

  let firstStrNumIdx = 99;
  let firstStrNum = "";

  Object.keys(strNumToInt).forEach((strNum: string) => {
    if (
      inputStr.search(strNum) >= 0 &&
      inputStr.search(strNum) < firstStrNumIdx
    ) {
      firstStrNumIdx = inputStr.search(strNum);
      firstStrNum = strNum;
    }
  });

  let lastStrNum = "";
  let lastStrNumIdx = 0;

  Object.keys(strNumToInt).forEach((strNum: string) => {
    const lastIndex = inputStr.lastIndexOf(strNum);
    if (lastIndex > lastStrNumIdx) {
      lastStrNumIdx = lastIndex;
      lastStrNum = strNum;
    }
  });

  if (firstStrNumIdx !== 99) {
    processedStr = processedStr.replace(
      firstStrNum,
      String(strNumToInt[firstStrNum])
    );
  }

  if (lastStrNum !== "") {
    console.log("lastStrNum: ", lastStrNum);
    console.log("processedStr: ", processedStr);
    const startIdxToReplace = processedStr.lastIndexOf(lastStrNum);
    console.log(
      "🚀 ~ replaceStrNumbersWithNumber ~ startIdxToReplace:",
      startIdxToReplace
    );

    const charsBeforeReplace = processedStr.substring(0, startIdxToReplace);
    console.log(
      "🚀 ~ replaceStrNumbersWithNumber ~ charsBeforeReplace:",
      charsBeforeReplace
    );

    const charsAfterReplace = processedStr.substring(
      startIdxToReplace + lastStrNum.length,
      processedStr.length
    );
    console.log(
      "🚀 ~ replaceStrNumbersWithNumber ~ charsAfterReplace:",
      charsAfterReplace
    );

    return `${charsBeforeReplace}${strNumToInt[lastStrNum]}${charsAfterReplace}`;
  }
  return processedStr;
};

const getcalibrationValue = (numberArrayStringArr: string[]) => {
  if (numberArrayStringArr.length === 1) {
    return parseInt(`${numberArrayStringArr[0]}${numberArrayStringArr[0]}`);
  }
  return parseInt(
    `${numberArrayStringArr[0]}${
      numberArrayStringArr[numberArrayStringArr.length - 1]
    }`
  );
};

const inputDataObjArr = data.map((rawInputStr: string) => {
  return {
    rawVal: rawInputStr,
    strNumsToInt: replaceStrNumbersWithNumber(rawInputStr),
    numOnlyStr: getNumbersOnlyStringArr(rawInputStr),
    calValue: getcalibrationValue(getNumbersOnlyStringArr(rawInputStr)),
  };
});

console.log("inputDataObjArr: ", inputDataObjArr);

const sum = inputDataObjArr.reduce(
  (partialSum, a) => partialSum + a.calValue,
  0
);

console.log("sum: ", sum);
console.log("----------f---------f-");
