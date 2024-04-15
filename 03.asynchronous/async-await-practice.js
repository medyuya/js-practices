#!/usr/bin/env node

import timers from "timers/promises";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

async function runQuery(db, query, params) {
  return new Promise(function (resolve, reject) {
    db.run(query, params, function (error) {
      if (error) {
        reject(error.message);
      } else {
        resolve(this.lastID);
      }
    });
  });
}

async function getRow(db, query, params) {
  return new Promise(function (resolve, reject) {
    db.get(query, params, function (error, row) {
      if (error) {
        reject(error.message);
      } else {
        resolve(row.id);
      }
    });
  });
}

// エラー無し
await runQuery(
  db,
  "CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT NOT NULL)",
);

const registeredBookId = await runQuery(
  db,
  "INSERT INTO books(title) VALUES(?)",
  ["ruby"],
);
console.log(registeredBookId);

const selectedBookId = await getRow(db, "SELECT * FROM books WHERE title = ?", [
  "ruby",
]);
console.log(selectedBookId);
db.run("DROP TABLE books");

await timers.setTimeout(300);

console.log("------------");

// エラー有り
try {
  await runQuery(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT NOT NULL)",
  );
  await runQuery(db, "INSERT INTO books(title) VALUES(?)", [
    "ruby",
    "ruby",
    "ruby",
  ]);
} catch (errorMessage) {
  console.error(errorMessage);
  try {
    await getRow(db, "SELECT * FROM posts WHERE title = ?", ["ruby"]);
  } catch (errorMessage) {
    console.error(errorMessage);
    db.run("DROP TABLE books");
  }
}
