#!/usr/bin/env node

import timers from "timers/promises";
import sqlite3 from "sqlite3";
import runQuery from "./exec-query-functions/run-query-function.js";
import getRow from "./exec-query-functions/get-query-function.js";

const db = new sqlite3.Database(":memory:");

// エラー無し
await runQuery(
  db,
  "CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT NOT NULL)",
);

const statement = await runQuery(db, "INSERT INTO books(title) VALUES(?)", [
  "ruby",
]);
console.log(statement.lastID);

const row = await getRow(db, "SELECT * FROM books WHERE title = ?", ["ruby"]);
console.log(row.id);

await runQuery(db, "DROP TABLE books");

await timers.setTimeout(300);

console.log("------------");

// エラー有り
await runQuery(
  db,
  "CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT NOT NULL)",
);

try {
  await runQuery(db, "INSERT INTO books(title) VALUES(?)", [
    "ruby",
    "ruby",
    "ruby",
  ]);
} catch (error) {
  if (error && error.message && error.message.includes("SQLITE_RANGE")) {
    console.error(error.message);
  } else {
    throw error;
  }
}

try {
  await getRow(db, "SELECT * FROM posts WHERE title = ?", ["ruby"]);
} catch (error) {
  if (error && error.message && error.message.includes("SQLITE_ERROR")) {
    console.error(error.message);
  } else {
    throw error;
  }
}

await runQuery(db, "DROP TABLE books");
