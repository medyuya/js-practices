import fs from "fs";

export default class Memo {
  static memoStoragePath = "./memos.json";

  static all() {
    return readJsonFile(Memo.memoStoragePath);
  }

  static selectByFirstLineContent(firstLineContent) {
    const memos = readJsonFile(Memo.memoStoragePath);

    const selectedMemo = memos.filter((memo) => {
      return memo.firstLineContent === firstLineContent;
    })[0];

    return selectedMemo.fullContent;
  }

  static create(text) {
    const new_memo = {
      firstLineContent: text.match(/^.+/m)[0],
      fullContent: text,
    };

    addDataToJsonFile(Memo.memoStoragePath, new_memo);
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
