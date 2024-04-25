import { v4 as uuidv4 } from "uuid";
import * as jsonFileHandlers from "./json-file-handlers.js";

const storagePath = "./memos.json";

export function createStoredMemo(memo) {
  jsonFileHandlers.add(storagePath, memo);
}

export function getAllStoredMemos() {
  return jsonFileHandlers.read(storagePath);
}

export function getStoredMemoById(id) {
  const storedMemos = jsonFileHandlers.read(storagePath);
  return storedMemos.find((memo) => memo.id === id);
}

export function destroyStoredMemo(id) {
  jsonFileHandlers.destroy(storagePath, id);
}

export default class Memo {
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

    createStoredMemo(new_memo);
  }

  static all() {
    const storedMemos = getAllStoredMemos();

    return storedMemos.map(
      (memo) => new Memo(memo.id, memo.firstLineContent, memo.fullContent),
    );
  }

  static selectById(id) {
    const selectedMemo = getStoredMemoById(id);

    return new Memo(
      selectedMemo.id,
      selectedMemo.firstLineContent,
      selectedMemo.fullContent,
    );
  }

  destroy() {
    destroyStoredMemo(this.id);
  }
}
