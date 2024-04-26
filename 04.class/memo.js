import { v4 as uuidv4 } from "uuid";
import { MemoRepositoryJson } from "./memo-repository-json.js";

const repository = new MemoRepositoryJson();

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

    repository.create(new_memo);
  }

  static all() {
    const storedMemos = repository.all();

    return storedMemos.map(
      (memo) => new Memo(memo.id, memo.firstLineContent, memo.fullContent),
    );
  }

  static selectById(id) {
    const storedMemos = repository.all();
    const selectedMemo = storedMemos.find((memo) => memo.id === id);

    return new Memo(
      selectedMemo.id,
      selectedMemo.firstLineContent,
      selectedMemo.fullContent,
    );
  }

  destroy() {
    repository.destroy(this.id);
  }
}
