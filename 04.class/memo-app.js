#!/usr/bin/env node

import Memo from "./memo.js";
import inquirer from "inquirer";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

const hasGivenOptions = (argv) => {
  return argv.l || argv.r || argv.d;
};

if (hasGivenOptions(argv)) {
  handleOptionInput(argv);
} else {
  handleStandardInput();
}

function handleOptionInput(argv) {
  if (argv.l) {
    Memo.all().forEach((memo) => {
      console.log(memo.firstLineContent);
    });
  }

  if (argv.r) {
    (async () => {
      const selectedMemo = await chooseOneMemoFromOptions(
        "Choose a note you want to see:",
      );
      console.log(selectedMemo.fullContent);
    })();
  }

  if (argv.d) {
    (async () => {
      const selectedMemo = await chooseOneMemoFromOptions(
        "Choose a note you want to delete:",
      );
      selectedMemo.destroy();
      console.log("削除しました");
    })();
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
