#!/usr/bin/env node

import timers from "timers/promises";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function runQuery(db, query, params) {
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

function getRow(db, query, params) {
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
runQuery(db, "CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT NOT NULL)")
  .then(() => {
    return runQuery(db, "INSERT INTO books(title) VALUES(?)", ["ruby"]);
  })
  .then((result) => {
    console.log(result);
    return getRow(db, "SELECT * FROM books WHERE title = ?", ["ruby"]);
  })
  .then((result) => {
    console.log(result);
    db.run("DROP TABLE books");
  });

await timers.setTimeout(300);

console.log("------------");

// エラー有り
runQuery(db, "CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT NOT NULL)")
  .then(() => {
    return runQuery(db, "INSERT INTO books(title) VALUES(?)", [
      "ruby",
      "ruby",
      "ruby",
    ]);
  })
  .catch((result) => {
    console.error(result);
    return getRow(db, "SELECT * FROM posts WHERE title = ?", ["ruby"]);
  })
  .catch((result) => {
    console.error(result);
    db.run("DROP TABLE books");
  });
