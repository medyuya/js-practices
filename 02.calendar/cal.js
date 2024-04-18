#!/usr/bin/env node

import * as dfns from "date-fns";
import minimist from "minimist";

function centralizeText(rowLength, text) {
  const startPosition = Math.floor((rowLength - text.length) / 2);
  return `${" ".repeat(startPosition)}${text}`;
}

function createDateText(date) {
  return date.getDate().toString().padStart(2, " ");
}

function insertSpaceExceptForLineEnd(date, endDate) {
  if (!dfns.isSaturday(date) || date !== endDate) {
    return " ";
  }

  return "";
}

const args = minimist(process.argv.slice(2));

const today = new Date();
const targetYear = args.y ?? today.getFullYear();
const targetMonth = args.m ?? today.getMonth() + 1;

const startDate = new Date(targetYear, targetMonth - 1, 1);
const endDate = new Date(targetYear, targetMonth, 0);

const targetMonthName = dfns.format(startDate, "MMMM");

const TOTAL_ROW_LENGTH = 20;
const monthYearTitle = `${targetMonthName} ${targetYear}`;
const centeredMonthYearTitle = centralizeText(TOTAL_ROW_LENGTH, monthYearTitle);

let resultCalendarText = `${centeredMonthYearTitle}\n`;
resultCalendarText += "Su Mo Tu We Th Fr Sa\n";
resultCalendarText += " ".repeat(dfns.getDay(startDate) * 3);

for (
  const date = new Date(targetYear, targetMonth - 1, 1);
  date <= endDate;
  date.setDate(date.getDate() + 1)
) {
  resultCalendarText += `${createDateText(date)}${insertSpaceExceptForLineEnd(
    date,
    endDate,
  )}`;

  if (dfns.isSaturday(date) || date === endDate) {
    resultCalendarText += "\n";
  }
}

console.log(resultCalendarText);
