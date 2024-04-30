import { v4 as uuidv4 } from "uuid";
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
    memo.id = uuidv4();
    return addDataToJsonFile(this.storagePath, memo);
  }

  all() {
    return readJsonFile(this.storagePath);
  }

  destroy(id) {
    return deleteDataToJsonFile(this.storagePath, id);
  }
}
