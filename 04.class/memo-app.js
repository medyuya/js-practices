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
    case "-r": {
      (async () => {
        const selectedMemo = await chooseOneMemoFromOptions(
          "Choose a note you want to see:",
        );
        console.log(selectedMemo.fullContent);
      })();

      break;
    }
    case "-d": {
      (async () => {
        const selectedMemo = await chooseOneMemoFromOptions(
          "Choose a note you want to delete:",
        );
        selectedMemo.destroy();
        console.log("削除しました");
      })();

      break;
    }
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

function allMemosFirstLineContents() {
  return Memo.all().map((memo) => {
    return memo.firstLineContent;
  });
}

async function chooseOneMemoFromOptions(displayText) {
  const memoOptions = [
    {
      type: "list",
      name: "text",
      message: displayText,
      choices: allMemosFirstLineContents(),
    },
  ];

  const selectedContent = await inquirer.prompt(memoOptions);

  return Memo.selectByFirstLineContent(selectedContent.text);
}
