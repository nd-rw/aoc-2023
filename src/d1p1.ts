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

const findFirstAndLastNum = (inputStr: string) => {
  const inputStrAsArray = [...inputStr];

  let firstNum;
  inputStrAsArray.forEach((char: string, idx: number) => {
    if (isFinite(parseInt(char))) {
      firstNum = char;
      return;
    }
    Object.keys(strNumToInt).forEach((stringNum: string) => {
      if (stringNum === inputStr.substring(idx, idx + stringNum.length)) {
        firstNum = strNumToInt[stringNum];
        return;
      }
    });
  });

  let lastNum;
  for (let index = inputStrAsArray.length; index > 0; index--) {
    const char = inputStrAsArray[index];
    if (isFinite(parseInt(char))) {
      lastNum = char;
      return;
    }
    Object.keys(strNumToInt).forEach((stringNum: string) => {
      if (stringNum === inputStr.substring(index - stringNum.length, index)) {
        lastNum = strNumToInt[stringNum];
        return;
      }
    });
  }
  console.log("inputStr: ", inputStr);
  return [firstNum, lastNum];
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

  if (lastStrNum !== "") {
    const startIdxToReplace = processedStr.lastIndexOf(lastStrNum);

    const charsBeforeReplace = processedStr.substring(0, startIdxToReplace);

    const charsAfterReplace = processedStr.substring(
      startIdxToReplace + lastStrNum.length,
      processedStr.length
    );

    return `${charsBeforeReplace}${strNumToInt[lastStrNum]}${charsAfterReplace}`;
  }

  if (firstStrNumIdx !== 99) {
    processedStr = processedStr.replace(
      firstStrNum,
      String(strNumToInt[firstStrNum])
    );
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
    parsedArray: findFirstAndLastNum(rawInputStr),
    calValue: getcalibrationValue(getNumbersOnlyStringArr(rawInputStr)),
    newCalValue: getcalibrationValue(findFirstAndLastNum(rawInputStr)),
  };
});
console.log("🚀 ~ inputDataObjArr ~ inputDataObjArr:", inputDataObjArr);

const sum = inputDataObjArr.reduce(
  (partialSum, a) => partialSum + a.newCalValue,
  0
);

console.log("sum: ", sum);
console.log("----------f---------f-");
