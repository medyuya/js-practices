#!/usr/bin/env node

import * as dateFns from "date-fns";
import minimist from "minimist";

const centralizeText = (rowLength, text) => {
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
const centeredMonthYearTitle = centralizeText(TOTAL_ROW_LENGTH, monthYearTitle);

let calendarText = `${centeredMonthYearTitle}\n`;
calendarText += "Su Mo Tu We Th Fr Sa\n";
calendarText += "   ".repeat(dateFns.getDay(startDate));

for (
  const date = new Date(targetYear, targetMonth - 1, 1);
  date <= endDate;
  date.setDate(date.getDate() + 1)
) {
  let dateText = date.getDate().toString().padStart(2, " ");

  if (!dateFns.isSaturday(date) || date.toString() !== endDate.toString()) {
    calendarText += dateText.padEnd(3, " ");
  }

  if (dateFns.isSaturday(date) || date.toString() === endDate.toString()) {
    calendarText += "\n";
  }
}

console.log(calendarText);
