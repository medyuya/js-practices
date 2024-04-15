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
runQuery(db, "create table books(id INTEGER PRIMARY KEY, title TEXT NOT NULL)")
  .then(() => {
    return runQuery(db, "insert into books(title) values(?)", ["ruby"]);
  })
  .then((result) => {
    console.log(result);
    return getRow(db, "SELECT * FROM books WHERE title = ?", ["ruby"]);
  })
  .then((result) => {
    console.log(result);
    db.run("drop table books");
  });

await timers.setTimeout(300);

console.error("------------");

// エラー有り
runQuery(db, "create table books(id INTEGER PRIMARY KEY, title TEXT NOT NULL)")
  .then(() => {
    return runQuery(db, "insert into books(title) values(?)", [
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
    db.run("drop table books");
  });
