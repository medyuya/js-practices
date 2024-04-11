import Memo from "./memo.js";
import inquirer from "inquirer";

const args = process.argv.slice(2);
const option = args[0];

if (option) {
  handleOption(option);
} else {
  handleStandardInput();
}

function handleOption(option) {
  switch (option) {
    case "-l":
      Memo.all().forEach((memo) => {
        console.log(memo.firstLineContent);
      });

      break;
    case "-r":
      displayOneMemoFromOptions();

      break;
    case "-d":
      console.log("選んだメモが削除");

      break;
  }
}

function handleStandardInput() {
  process.stdin.setEncoding("utf8");

  process.stdin.on("readable", () => {
    let inputFullText = process.stdin.read();

    if (inputFullText !== null) {
      Memo.create(inputFullText);
    }
  });
}

async function displayOneMemoFromOptions() {
  let allMemosFirstLineContents = Memo.all().map((memo) => {
    return memo.firstLineContent;
  });

  const memoOptions = [
    {
      type: "list",
      name: "text",
      message: "Choose a note you want to see:",
      choices: allMemosFirstLineContents,
    },
  ];

  const selectedContent = await inquirer.prompt(memoOptions);

  const selectedMemo = Memo.selectByFirstLineContent(selectedContent.text);

  console.log(selectedMemo);
}
