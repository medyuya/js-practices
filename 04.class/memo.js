import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class Memo {
  static storagePath = "./memos.json";

  constructor(id, firstLineContent, fullContent) {
    this.id = id;
    this.firstLineContent = firstLineContent;
    this.fullContent = fullContent;
  }

  static create(inputFullText) {
    const new_memo = {
      id: uuidv4(),
      firstLineContent: inputFullText.match(/^.+/m)[0],
      fullContent: inputFullText,
    };

    addDataToJsonFile(Memo.storagePath, new_memo);
  }

  static all() {
    return readJsonFile(Memo.storagePath);
  }

  static selectById(id) {
    const storedMemos = readJsonFile(Memo.storagePath);

    const selectedMemo = storedMemos.filter((memo) => {
      return memo.id === id;
    })[0];

    return new Memo(
      selectedMemo.id,
      selectedMemo.firstLineContent,
      selectedMemo.fullContent,
    );
  }

  destroy() {
    deleteDataToJsonFile(Memo.storagePath, this.id);
  }
}

function addDataToJsonFile(path, newData) {
  const jsonData = readJsonFile(path);

  jsonData.push(newData);

  fs.writeFileSync(path, JSON.stringify(jsonData), "utf8");
}

function deleteDataToJsonFile(path, id) {
  const jsonData = readJsonFile(path);

  const deletedJsonData = jsonData.filter((data) => {
    return data.id !== id;
  });

  fs.writeFileSync(path, JSON.stringify(deletedJsonData), "utf8");
}

function readJsonFile(path) {
  if (!fs.existsSync(path)) {
    return [];
  }

  const fileData = fs.readFileSync(path, "utf8");
  return JSON.parse(fileData);
}
