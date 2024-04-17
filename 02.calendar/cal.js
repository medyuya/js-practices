#!/usr/bin/env node

import format from "date-fns/format";
import getDay from "date-fns/getDay";
import isSaturday from "date-fns/isSaturday";
import minimist from "minimist";

const args = minimist(process.argv.slice(2));

const today = new Date();
const targetYear = args.y ?? today.getFullYear();
const targetMonth = args.m ?? today.getMonth() + 1;
const startDate = new Date(targetYear, targetMonth - 1, 1);

const targetMonthName = format(startDate, "MMMM");

const TOTAL_ROW_LENGTH = 20;
const monthYearTitle = `${targetMonthName} ${targetYear}`;
const centeredMonthYearTitle = centralizeText(TOTAL_ROW_LENGTH, monthYearTitle);

console.log(centeredMonthYearTitle);
console.log("Su Mo Tu We Th Fr Sa");

let weekRowText = " ".repeat(getDay(startDate) * 3);

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

  weekRowText += `${day}${insertSpaceExceptForLineEnd(date)}`;

  if (isSaturday(date) || date.getDate() === endDate.getDate()) {
    console.log(weekRowText);
    weekRowText = "";
  }
}

function centralizeText(rowLength, text) {
  const startPosition = Math.floor((rowLength - text.length) / 2);
  return `${" ".repeat(startPosition)}${text}`;
}

function insertSpaceExceptForLineEnd(date) {
  if (!isSaturday(date) || date.getDate() !== endDate.getDate()) {
    return " ";
  }
}
