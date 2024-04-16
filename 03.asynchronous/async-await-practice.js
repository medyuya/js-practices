#!/usr/bin/env node

import timers from "timers/promises";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function runQuery(db, query, params) {
  return new Promise(function (resolve, reject) {
    db.run(query, params, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

function getRow(db, query, params) {
  return new Promise(function (resolve, reject) {
    db.get(query, params, function (error, row) {
      if (error) {
        reject(error);
      } else {
        resolve(row);
      }
    });
  });
}

// エラー無し
await runQuery(
  db,
  "CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT NOT NULL)",
);

await runQuery(db, "INSERT INTO books(title) VALUES(?)", ["ruby"]);

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
