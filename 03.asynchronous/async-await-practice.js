#!/usr/bin/env node

import timers from "timers/promises";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

async function runQuery(db, query, params) {
  return await new Promise(function (resolve, reject) {
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
  return await new Promise(function (resolve, reject) {
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

const insertResult = await runQuery(db, "INSERT INTO books(title) VALUES(?)", [
  "ruby",
]);
console.log(insertResult);

const getResult = await getRow(db, "SELECT * FROM books WHERE title = ?", [
  "ruby",
]);
console.log(getResult);
db.run("DROP TABLE books");

await timers.setTimeout(300);

console.log("------------");

// エラー有り
try {
  await runQuery(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT NOT NULL)",
  );
  const insertResult = await runQuery(
    db,
    "INSERT INTO books(title) VALUES(?)",
    ["ruby", "ruby", "ruby"],
  );
  console.log(insertResult);
} catch (error) {
  console.error(error);
  try {
    const row = await getRow(db, "SELECT * FROM posts WHERE title = ?", [
      "ruby",
    ]);
    console.log(row.id);
  } catch (error) {
    console.error(error);
    db.run("DROP TABLE books");
  }
}
