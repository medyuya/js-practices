// ESMでCommonJSモジュールをインポートするため
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(":memory:");

function runQuery(db, query, params) {
  return new Promise(function (resolve, reject) {
    db.run(query, params, (error) => {
      if (error) {
        reject(error.message);
      } else {
        resolve("success");
      }
    });
  });
}

function getRow(db, query, params) {
  return new Promise(function (resolve, reject) {
    db.get(query, params, (error, row) => {
      if (error) {
        reject(error.message);
      } else {
        resolve(row.id);
      }
    });
  });
}

function getAllRows(db, query, params) {
  return new Promise(function (resolve, reject) {
    const allRows = [];
    db.each(
      query,
      params,
      (error, row) => {
        if (error) {
          reject(error.message);
          return;
        }
        allRows.push(`${row.id} ${row.title}`);
      },
      (error, rows) => {
        if (error) {
          reject(error.message);
        } else {
          resolve(allRows);
        }
      },
    );
  });
}

runQuery(db, "create table books(id INTEGER PRIMARY KEY, title TEXT NOT NULL)")
  .then((result) => {
    console.log(result);
    return runQuery(db, "insert into books(title) values(?)", ["ruby"]);
  })
  .then((result) => {
    console.log(result);
    return getRow(db, "SELECT * FROM books WHERE title = ?", ["ruby"]);
  })
  .then((result) => {
    console.log(result);
    return runQuery(db, "insert into books(title) values(?)", ["java"]);
  })
  .then((result) => {
    console.log(result);
    return getRow(db, "SELECT * FROM books WHERE title = ?", ["java"]);
  })
  .then((result) => {
    console.log(result);
    return getAllRows(db, "select * from books");
  })
  .then((result) => {
    console.log(result);
  });

// .catch((error) => {
//   console.error("An error occurred:", error);
// });
