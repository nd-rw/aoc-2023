const races = [
  { time: 40, distance: 233 },
  { time: 82, distance: 1011 },
  { time: 84, distance: 1110 },
  { time: 92, distance: 1487 },
  { time: 40828492, distance: 233101111101487 },
];

const egRaces = [
  { time: 7, distance: 9 },
  { time: 15, distance: 40 },
  { time: 30, distance: 200 },
];

const doesMethodBeatRecord = (
  maxTime: number,
  reqDistance: number,
  timeSpentAccel: number
) => {
  let returnVal;
  if (timeSpentAccel >= maxTime) {
    returnVal = false;
  }
  const speed = timeSpentAccel;
  const timeLeft = maxTime - timeSpentAccel;
  const distance = timeLeft * speed;
  const newRecordDistance = reqDistance + 1;

  if (distance >= newRecordDistance) {
    returnVal = true;
  }
  return returnVal;
};

let numPossWinsOne = 0;
let numPossWinsTwo = 0;
let numPossWinsThree = 0;
let numPossWinsFour = 0;

for (let timeSpentAccel = 0; timeSpentAccel < races[0].time; timeSpentAccel++) {
  if (doesMethodBeatRecord(races[0].time, races[0].distance, timeSpentAccel)) {
    numPossWinsOne++;
    // console.log({
    //   time: races[0].time,
    //   timeSpentAccel: timeSpentAccel,
    // });
  }
}

for (let timeSpentAccel = 0; timeSpentAccel < races[1].time; timeSpentAccel++) {
  if (doesMethodBeatRecord(races[1].time, races[1].distance, timeSpentAccel)) {
    numPossWinsTwo++;
    // console.log({
    //   time: races[1].time,
    //   timeSpentAccel: timeSpentAccel,
    // });
  }
}

for (let timeSpentAccel = 0; timeSpentAccel < races[2].time; timeSpentAccel++) {
  if (doesMethodBeatRecord(races[2].time, races[2].distance, timeSpentAccel)) {
    numPossWinsThree++;
    // console.log({
    //   time: races[1].time,
    //   timeSpentAccel: timeSpentAccel,
    // });
  }
}

for (let timeSpentAccel = 0; timeSpentAccel < races[3].time; timeSpentAccel++) {
  if (doesMethodBeatRecord(races[3].time, races[3].distance, timeSpentAccel)) {
    numPossWinsFour++;
    // console.log({
    //   time: races[1].time,
    //   timeSpentAccel: timeSpentAccel,
    // });
  }
}

let p2Wins = 0;

for (let timeSpentAccel = 0; timeSpentAccel < races[4].time; timeSpentAccel++) {
  if (doesMethodBeatRecord(races[4].time, races[4].distance, timeSpentAccel)) {
    p2Wins++;
    // console.log({
    //   time: races[1].time,
    //   timeSpentAccel: timeSpentAccel,
    // });
  }
}

console.log(
  "does method work? 10,000 accel time",
  doesMethodBeatRecord(71530, 940200, 10000)
);

// console.log("numPossWinsOne: ", numPossWinsOne);
// console.log("numPossWinsTwo: ", numPossWinsTwo);
// console.log("numPossWinsThree: ", numPossWinsThree);
// console.log("numPossWinsFour: ", numPossWinsFour);

// console.log(
//   "f: ",
//   numPossWinsOne * numPossWinsTwo * numPossWinsThree * numPossWinsFour
// );

console.log("p2Wins: ", p2Wins);
