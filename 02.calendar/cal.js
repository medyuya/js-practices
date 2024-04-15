#!/usr/bin/env node

import { format, getDay, isSaturday } from "date-fns";
import minimist from "minimist";

const args = minimist(process.argv.slice(2));

const today = new Date();
const targetYear = args.y ?? today.getFullYear();
const targetMonth = args.m ?? today.getMonth() + 1;
const startDate = new Date(targetYear, targetMonth - 1, 1);

const targetMonthName = format(startDate, "MMMM");

let monthYearTitle = `${targetMonthName} ${targetYear}`;
let totalRowLength = 20;

let startPosition =
  Math.floor((totalRowLength - monthYearTitle.length) / 2) +
  monthYearTitle.length;
let centeredMonthYearTitle = monthYearTitle
  .padStart(startPosition)
  .padEnd(totalRowLength);

console.log(centeredMonthYearTitle);
console.log("Su Mo Tu We Th Fr Sa");

let weekRowText = "   ".repeat(getDay(startDate));

const endDate = new Date(targetYear, targetMonth, 0);

for (
  let date = new Date(startDate);
  date <= endDate;
  date.setDate(date.getDate() + 1)
) {
  let day = date.getDate();

  if (day.toString().length < 2) {
    weekRowText += " ";
  }

  weekRowText += `${day}${isSaturday(date) ? "" : " "}`;

  if (isSaturday(date) || date.getDate() === endDate.getDate()) {
    console.log(weekRowText);
    weekRowText = "";
  }
}
