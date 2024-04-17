#!/usr/bin/env node

import Memo from "./memo.js";
import inquirer from "inquirer";

const args = process.argv.slice(2);
const option = args[0];

if (option) {
  handleOptionInput(option);
} else {
  handleStandardInput();
}

function handleOptionInput(option) {
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

function allMemosFirstLineContentsWithId() {
  return Memo.all().map((memo) => {
    return { name: memo.firstLineContent, value: memo.id };
  });
}

async function chooseOneMemoFromOptions(displayText) {
  const memoOptions = [
    {
      type: "list",
      name: "id",
      message: displayText,
      choices: allMemosFirstLineContentsWithId(),
    },
  ];

  const selectedMemo = await inquirer.prompt(memoOptions);

  return Memo.selectById(selectedMemo.id);
}
