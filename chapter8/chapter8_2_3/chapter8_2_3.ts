// 宣言ファイルの作成
// 引数が奇数かどうかを判断するis-oddという簡単なライブラリで進める
// npm install is-odd でインストールするだけでは型情報がないのでエラーになる
// モジュール 'is-odd' の宣言ファイルが見つかりませんでした。'/Users/simac/Desktop/Programming/TypeScript/Learn1/ts-practice/node_modules/is-odd/index.js' は暗黙的に 'any' 型になります。
//   存在する場合は `npm i --save-dev @types/is-odd` を試すか、`declare module 'is-odd';` を含む新しい宣言 (.d.ts) ファイルを追加しますts(7016)
import isOdd from "is-odd";
// 「.d.ts」という拡張子がついた宣言ファイルを使って型情報を定義することでエラーを解消できる
// 今回はmy-is-odd.d.tsに定義する

console.log(isOdd(2)); // true
console.log(isOdd("3")); // false
