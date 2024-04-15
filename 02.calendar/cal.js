import { endOfMonth, format, getDay, isSaturday } from "date-fns";
import minimist from "minimist";

const args = minimist(process.argv.slice(2));

const today = new Date();
const targetYear = args.y ?? today.getFullYear();
const targetMonth = args.m ?? today.getMonth() + 1;
const targetDate = new Date(targetYear, targetMonth - 1);

const targetMonthName = format(targetDate, "MMMM");

console.log(`     ${targetMonthName} ${targetYear}`);
console.log("Su Mo Tu We Th Fr Sa");

const lastDayOfMonth = endOfMonth(targetDate).getDate();

let weekColumnText = "   ".repeat(getDay(targetDate));

let isFoldedDayOfWeek;
for (let i = 1; i <= lastDayOfMonth; i++) {
  if (i.toString().length < 2) {
    weekColumnText += " ";
  }
  weekColumnText += i.toString() + " ";

  isFoldedDayOfWeek = isSaturday(new Date(targetYear, targetMonth - 1, i));

  if (isFoldedDayOfWeek || i === lastDayOfMonth) {
    console.log(weekColumnText);
    weekColumnText = "";
  }
}
