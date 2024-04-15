#!/usr/bin/env node

import timers from "timers/promises";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

// エラー無し
db.run(
  "CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT NOT NULL)",
  () => {
    db.run("INSERT INTO books(title) VALUES(?)", "ruby", function () {
      console.log(this.lastID);

      db.get("SELECT * FROM books WHERE title = ?", "ruby", function (_, row) {
        console.log(row.id);

        db.run("DROP TABLE books");
      });
    });
  },
);

await timers.setTimeout(300);

console.log("------------");

// エラー有り
db.run(
  "CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT NOT NULL)",
  () => {
    db.run(
      "INSERT INTO books(title) VALUES(?)",
      ["ruby", "ruby", "ruby"],
      function (error) {
        console.error(error.message);

        db.get(
          "SELECT * FROM posts WHERE title = ?",
          ["ruby"],
          function (error) {
            console.error(error.message);

            db.run("DROP TABLE books");
          },
        );
      },
    );
  },
);
