import fs from "fs";

export function add(path, newData) {
  const jsonData = read(path);

  jsonData.push(newData);

  fs.writeFileSync(path, JSON.stringify(jsonData), "utf8");
}

export function destroy(path, id) {
  const jsonData = read(path);

  const deletedJsonData = jsonData.filter((data) => {
    return data.id !== id;
  });

  fs.writeFileSync(path, JSON.stringify(deletedJsonData), "utf8");
}

export function read(path) {
  if (!fs.existsSync(path)) {
    return [];
  }

  const fileData = fs.readFileSync(path, "utf8");
  return JSON.parse(fileData);
}
