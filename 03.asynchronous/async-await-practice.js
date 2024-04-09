import timers from "timers/promises";
// ESMでCommonJSモジュールをインポートするため
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const sqlite3 = require("sqlite3");
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
  "create table books(id INTEGER PRIMARY KEY, title TEXT NOT NULL)",
);

let insertResult = await runQuery(db, "insert into books(title) values(?)", [
  "ruby",
]);
console.log(insertResult);

let getResult = await getRow(db, "SELECT * FROM books WHERE title = ?", [
  "ruby",
]);
console.log(getResult);
db.run("drop table books");

await timers.setTimeout(300);

console.error("------------");

// エラー有り
try {
  await runQuery(
    db,
    "create table books(id INTEGER PRIMARY KEY, title TEXT NOT NULL)",
  );
  const insertResult = await runQuery(
    db,
    "insert into books(title) values(?)",
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
    db.run("drop table books");
  }
}
