import fs from "fs";

export default class Memo {
  constructor(text) {
    const memo_storage_path = "./memos.json";
    const new_memo = {
      firstLineContent: text.match(/^.+/m)[0],
      fullContent: text,
    };

    addDataToJsonFile(memo_storage_path, new_memo);
  }
}

function addDataToJsonFile(path, newData) {
  const jsonData = readJsonFile(path);

  jsonData.push(newData);

  fs.writeFileSync(path, JSON.stringify(jsonData), "utf8");
}

function readJsonFile(path) {
  if (!fs.existsSync(path)) {
    return [];
  }

  const fileData = fs.readFileSync(path, "utf8");
  return JSON.parse(fileData);
}
