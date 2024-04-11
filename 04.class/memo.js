export default class Memo {
  constructor(text) {
    this.firstLineContent = text.match(/^.+/m)[0];
    this.fullContent = text;
  }

  firstLineContent() {
    console.log(this.firstLineContent);
  }

  fullContent() {
    console.log(this.fullContent);
  }
}
