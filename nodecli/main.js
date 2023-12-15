// commanderモジュールからprogramオブジェクトをインポートする
import { program } from "commander";
// fs/primisesモジュールをfsオブジェクトとしてインポートする
import * as fs from "node:fs/promises";

// コマンドライン引数をcommanderでパースする
program.parse(process.argv);
// コマンドライン引数からファイルパスを取得する
const filePath = program.args[0];

// ファイルを非同期で読み込む
fs.readFile(filePath, { encoding: "utf-8" }).then(file => {
    console.log(file);
}).catch(err => {
    console.error(err.message);
    // 終了ステータス1(一般的なエラー)としてプロセスを終了する
    process.exit(1);
});