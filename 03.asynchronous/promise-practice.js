#!/usr/bin/env node

import sqlite3 from "sqlite3";
import runQuery from "./exec-query-functions/run-query-function.js";
import getRow from "./exec-query-functions/get-query-function.js";
import timers from "timers/promises";

const db = new sqlite3.Database(":memory:");

// エラー無し
runQuery(db, "CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT NOT NULL)")
  .then(() => runQuery(db, "INSERT INTO books(title) VALUES(?)", ["ruby"]))
  .then((row) => {
    console.log(row.lastID);
    return getRow(db, "SELECT * FROM books WHERE title = ?", ["ruby"]);
  })
  .then((row) => {
    console.log(row.id);
    return runQuery(db, "DROP TABLE books");
  });

await timers.setTimeout(300);

console.log("------------");

// エラー有り
runQuery(db, "CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT NOT NULL)")
  .then(() =>
    runQuery(db, "INSERT INTO books(title) VALUES(?)", [
      "ruby",
      "ruby",
      "ruby",
    ]),
  )
  .catch((error) => {
    console.error(error.message);
    return getRow(db, "SELECT * FROM posts WHERE title = ?", ["ruby"]);
  })
  .catch((error) => {
    console.error(error.message);
    return runQuery(db, "DROP TABLE books");
  });
