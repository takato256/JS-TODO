// commanderモジュールからprogramオブジェクトをインポートする
import { program } from "commander";
// fs/primisesモジュールをfsオブジェクトとしてインポートする
import * as fs from "node:fs/promises";
// markedモジュールからmarkedオブジェクトをインポートする
import { marked } from "marked";

// コマンドライン引数をcommanderでパースする
program.parse(process.argv);
// コマンドライン引数からファイルパスを取得する
const filePath = program.args[0];

// ファイルを非同期で読み込む
fs.readFile(filePath, { encoding: "utf-8" }).then(file => {
    // MarkdownファイルをHTML文字列に変換する
    const html = marked.parse(file);
    console.log(html);
}).catch(err => {
    console.error(err.message);
    // 終了ステータス1(一般的なエラー)としてプロセスを終了する
    process.exit(1);
});