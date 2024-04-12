import fs from "fs";

export function addDataToJsonFile(path, newData) {
  const jsonData = readJsonFile(path);

  jsonData.push(newData);

  fs.writeFileSync(path, JSON.stringify(jsonData), "utf8");
}

export function deleteDataToJsonFile(path, id) {
  const jsonData = readJsonFile(path);

  const deletedJsonData = jsonData.filter((data) => {
    return data.id !== id;
  });

  fs.writeFileSync(path, JSON.stringify(deletedJsonData), "utf8");
}

export function readJsonFile(path) {
  if (!fs.existsSync(path)) {
    return [];
  }

  const fileData = fs.readFileSync(path, "utf8");
  return JSON.parse(fileData);
}
