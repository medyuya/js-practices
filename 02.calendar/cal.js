// ESMでCommonJSモジュールをインポートするため
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const minimist = require("minimist");

const args = minimist(process.argv.slice(2));

console.log(args);
