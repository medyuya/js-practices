import timers from "timers/promises";
// ESMでCommonJSモジュールをインポートするため
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(":memory:");

async function runQuery(db, query, params) {
  return await new Promise(function (resolve, reject) {
    db.run(query, params, (error) => {
      if (error) {
        reject(error.message);
      } else {
        resolve("success");
      }
    });
  });
}

async function getRow(db, query, params) {
  return await new Promise(function (resolve, reject) {
    db.get(query, params, (error, row) => {
      if (error) {
        reject(error.message);
      } else {
        resolve(row.id);
      }
    });
  });
}

// エラー無し
let createResult = await runQuery(
  db,
  "create table books(id INTEGER PRIMARY KEY, title TEXT NOT NULL)",
);
console.log(createResult);

let insertResult = await runQuery(db, "insert into books(title) values(?)", [
  "ruby",
]);
console.log(insertResult);

let getResult = await getRow(db, "SELECT * FROM books WHERE title = ?", [
  "ruby",
]);
console.log(getResult);

await timers.setTimeout(300);

console.error("------------");

// エラー有り
try {
  const createResult = await runQuery(
    db,
    "create table books(id INTEGER PRIMARY KEY, title TEXT NOT NULL)",
  );
  console.log(createResult);
  const insertResult = await runQuery(
    db,
    "insert into posts(title) values(?)",
    ["ruby"],
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
    db.run("drop table books");
  }
}
