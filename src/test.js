const finalList = [
  { id: "one" },
  { id: "two" },
  { id: "three" },
  { id: "one" },
];
let count1 = 0;
let count2 = 0;
let count3 = 0;
finalList.forEach(function (x) {
  if (x.id === "one") {
    count1 = count1 + 1;
  }
  if (x.id === "two") {
    count2 = count2 + 1;
  }
  if (x.id === "three") {
    count3 = count3 + 1;
  }
  if (count1 === 2) {
    finalList.forEach(function (y) {
      if (y.id === "one") {
        finalList.splice(finalList.indexOf(y), 1);
        break;
      }
    });
  }
});
console.log(finalList);
