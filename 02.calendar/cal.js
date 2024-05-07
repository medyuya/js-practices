#!/usr/bin/env node

import * as dateFns from "date-fns";
import minimist from "minimist";

const centerText = (rowLength, text) => {
  const startPosition = Math.floor((rowLength - text.length) / 2);
  return `${" ".repeat(startPosition)}${text}`;
};

const args = minimist(process.argv.slice(2));

const today = new Date();
const targetYear = args.y ?? today.getFullYear();
const targetMonth = args.m ?? today.getMonth() + 1;

const startDate = new Date(targetYear, targetMonth - 1, 1);
const endDate = new Date(targetYear, targetMonth, 0);

const targetMonthName = dateFns.format(startDate, "MMMM");

const TOTAL_ROW_LENGTH = 20;
const monthYearTitle = `${targetMonthName} ${targetYear}`;
const centeredMonthYearTitle = centerText(TOTAL_ROW_LENGTH, monthYearTitle);

let calendarText = `${centeredMonthYearTitle}\n`;
calendarText += "Su Mo Tu We Th Fr Sa\n";
calendarText += "   ".repeat(dateFns.getDay(startDate));

for (
  let date = new Date(targetYear, targetMonth - 1, 1);
  date <= endDate;
  date = dateFns.addDays(date, 1)
) {
  let dateText = date.getDate().toString().padStart(2, " ");

  calendarText +=
    dateFns.isSaturday(date) || date.getTime() === endDate.getTime()
      ? `${dateText} \n`
      : dateText.padEnd(3, " ");
}

console.log(calendarText);
