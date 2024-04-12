import {
  addDataToJsonFile,
  deleteDataToJsonFile,
  readJsonFile,
} from "./jsonFileHandleFunctions.js";

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
    const storedMemos = readJsonFile(Memo.storagePath);

    return storedMemos.map(function (memo) {
      return new Memo(memo.id, memo.firstLineContent, memo.fullContent);
    });
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
