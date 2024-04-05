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

const firstWeekBlank = "   ".repeat(getDay(targetDate));

let date_num = firstWeekBlank;
let isLastDayOfWeek;
for (let i = 1; i <= lastDayOfMonth; i++) {
  if (i.toString().length < 2) date_num += " ";
  date_num += i.toString() + " ";

  isLastDayOfWeek = isSaturday(new Date(targetYear, targetMonth - 1, i));

  if (isLastDayOfWeek || i == lastDayOfMonth) {
    console.log(date_num);
    date_num = "";
  }
}
