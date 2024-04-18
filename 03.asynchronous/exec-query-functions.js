export const runQuery = (db, query, params) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(this);
      }
    });
  });
};

export const getRow = (db, query, params) => {
  return new Promise((resolve, reject) => {
    db.get(query, params, function (error, row) {
      if (error) {
        reject(error);
      } else {
        resolve(row);
      }
    });
  });
};
