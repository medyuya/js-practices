const args = process.argv.slice(2);
const option = args[0];

function handleOption(option) {
  switch (option) {
    case "-l":
      console.log("メモの最初の行のみを表示");

      break;
    case "-r":
      console.log("選んだメモの全文を表示");

      break;
    case "-d":
      console.log("選んだメモが削除");

      break;
  }
}

if (option) {
  handleOption(option);
}
