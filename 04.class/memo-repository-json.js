import {
  addDataToJsonFile,
  deleteDataToJsonFile,
  readJsonFile,
} from "./json-file-handlers.js";

export class MemoRepositoryJson {
  constructor() {
    this.storagePath = "./memos.json";
  }

  create(memo) {
    return addDataToJsonFile(this.storagePath, memo);
  }

  all() {
    return readJsonFile(this.storagePath);
  }

  destroy(id) {
    return deleteDataToJsonFile(this.storagePath, id);
  }
}
