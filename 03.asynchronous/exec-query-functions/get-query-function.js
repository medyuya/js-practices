export default function getRow(db, query, params) {
  return new Promise(function (resolve, reject) {
    db.get(query, params, function (error, row) {
      if (error) {
        reject(error);
      } else {
        resolve(row);
      }
    });
  });
}
