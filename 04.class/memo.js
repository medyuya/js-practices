import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class Memo {
  static memoStoragePath = "./memos.json";

  static all() {
    return readJsonFile(Memo.memoStoragePath);
  }

  static selectByFirstLineContent(id) {
    const memos = readJsonFile(Memo.memoStoragePath);

    const selectedMemo = memos.filter((memo) => {
      return memo.id === id;
    })[0];

    return new Memo(
      selectedMemo.id,
      selectedMemo.firstLineContent,
      selectedMemo.fullContent,
    );
  }

  static create(text) {
    const new_memo = {
      id: uuidv4(),
      firstLineContent: text.match(/^.+/m)[0],
      fullContent: text,
    };

    console.log(new_memo);

    addDataToJsonFile(Memo.memoStoragePath, new_memo);
  }

  constructor(id, firstLineContent, fullContent) {
    this.id = id;
    this.firstLineContent = firstLineContent;
    this.fullContent = fullContent;
  }

  destroy() {
    console.log(this.id);
    console.log("-----");
    deleteDataToJsonFile(Memo.memoStoragePath, this.id);
  }
}

function addDataToJsonFile(path, newData) {
  const jsonData = readJsonFile(path);

  jsonData.push(newData);

  fs.writeFileSync(path, JSON.stringify(jsonData), "utf8");
}

function deleteDataToJsonFile(path, id) {
  const jsonData = readJsonFile(path);

  console.log(id);

  const deletedJsonData = jsonData.filter((memo) => {
    return memo.id !== id;
  });

  console.log(deletedJsonData);

  fs.writeFileSync(path, JSON.stringify(deletedJsonData), "utf8");
}

function readJsonFile(path) {
  if (!fs.existsSync(path)) {
    return [];
  }

  const fileData = fs.readFileSync(path, "utf8");
  return JSON.parse(fileData);
}
