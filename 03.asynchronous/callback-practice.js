import timers from "timers/promises";
// ESMでCommonJSモジュールをインポートするため
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(":memory:");

// エラー無し
db.run(
  "create table books(id INTEGER PRIMARY KEY, title TEXT NOT NULL)",
  () => {
    db.run("insert into books(title) values(?)", "ruby", function () {
      console.log(this.lastID);

      db.get(
        "SELECT * FROM books WHERE title = ?",
        "ruby",
        function (error, row) {
          console.log(row.id);

          db.run("drop table books");
        },
      );
    });
  },
);

await timers.setTimeout(300);

console.error("------------");

// エラー有り
db.run(
  "create table books(id INTEGER PRIMARY KEY, title TEXT NOT NULL)",
  () => {
    db.run(
      "insert into books(title) values(?)",
      ["ruby", "ruby", "ruby"],
      function (error) {
        if (error) {
          console.error(error.message);
        }

        db.get(
          "SELECT * FROM posts WHERE title = ?",
          ["ruby"],
          function (error) {
            if (error) {
              console.error(error.message);
            }

            db.run("drop table books");
          },
        );
      },
    );
  },
);
