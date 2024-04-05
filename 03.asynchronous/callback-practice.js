import timers from "timers/promises";
// ESMでCommonJSモジュールをインポートするため
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(":memory:");

// エラー無し
db.run(
  "create table books(id INTEGER PRIMARY KEY, title TEXT NOT NULL)",
  (error) => {
    if (error) {
      console.error(error.message);
    }

    db.run("insert into books(title) values(?)", "ruby", (error) => {
      if (error) {
        console.error(error.message);
      }

      db.get("SELECT * FROM books WHERE title = ?", "ruby", (error, row) => {
        if (error) {
          console.error(error.message);
        } else {
          console.log(row.id);
        }

        db.run("insert into books(title) values(?)", "java", (error) => {
          if (error) {
            console.error(error.message);
          }

          db.get(
            "SELECT * FROM books WHERE title = ?",
            "java",
            (error, row) => {
              if (error) {
                console.error(error.message);
              } else {
                console.log(row.id);
              }

              db.each(
                "select * from books",
                (error, row) => {
                  if (error) {
                    console.error(error.message);
                  } else {
                    console.log(`${row.id} ${row.title}`);
                  }
                },
                (error) => {
                  if (error) {
                    console.error(error.message);
                  }

                  db.run("drop table books", (error) => {
                    if (error) {
                      console.error(error.message);
                      return;
                    }
                  });
                },
              );
            },
          );
        });
      });
    });
  },
);

await timers.setTimeout(300);

console.error("------------");

// エラー有り
db.run(
  "create table books(id INTEGER PRIMARY KEY, title TEXT NOT NULL)",
  (error) => {
    if (error) {
      console.error(error.message);
    }

    db.run("insert into books(title) values(?)", "ruby", "swift", (error) => {
      if (error) {
        console.error(error.message);
      }

      db.get(
        "SELECT * FROM books WHERE title = ?",
        "python",
        "C言語",
        (error, row) => {
          if (error) {
            console.error(error.message);
          } else {
            console.log(row.id);
          }

          db.run(
            "insert into books(title) values(?)",
            "java",
            "swift",
            (error) => {
              if (error) {
                console.error(error.message);
              }

              db.get(
                "SELECT * FROM books WHERE title = ?",
                "javascript",
                "typescript",
                (error, row) => {
                  if (error) {
                    console.error(error.message);
                  } else {
                    console.log(row.id);
                  }

                  db.each(
                    "select * from posts",
                    (error, row) => {
                      if (error) {
                        console.error(error.message);
                      } else {
                        console.log(`${row.id} ${row.title}`);
                      }
                    },
                    (error) => {
                      if (error) {
                        console.error(error.message);
                      }

                      db.run("drop table books", (error) => {
                        if (error) {
                          console.error(error.message);
                          return;
                        }
                      });
                    },
                  );
                },
              );
            },
          );
        },
      );
    });
  },
);
