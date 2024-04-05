import { endOfMonth, format, getDay, isSaturday } from "date-fns";
// ESMでCommonJSモジュールをインポートするため
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const minimist = require("minimist");

const args = minimist(process.argv.slice(2));

const today = new Date();
const targetYear = args.y ?? today.getFullYear();
const targetMonth = args.m ?? today.getMonth() + 1;
const targetDate = new Date(targetYear, targetMonth - 1);

const targetMonthName = format(targetDate, "MMMM");

console.log(`     ${targetMonthName} ${targetYear}`);
console.log("Su Mo Tu We Th Fr Sa");

const lastDayOfMonth = endOfMonth(targetDate).getDate();

const firstWeekBlankText = "   ".repeat(getDay(targetDate));

let weekColumnText = firstWeekBlankText;
let isFoldedDayOfWeek;
for (let i = 1; i <= lastDayOfMonth; i++) {
  if (i.toString().length < 2) weekColumnText += " ";
  weekColumnText += i.toString() + " ";

  isFoldedDayOfWeek = isSaturday(new Date(targetYear, targetMonth - 1, i));

  if (isFoldedDayOfWeek || i == lastDayOfMonth) {
    console.log(weekColumnText);
    weekColumnText = "";
  }
}
