// ライブラリをインストールするにはまず以下のコマンドでpackage.jsonを作成する
// npm init -y

// ライブラリのインストールは以下のコマンドで行う
// npm install ライブラリ名

// 今回はlodashというライブラリをインストールして使用する
// しかし、インストールしただけでは宣言ファイルがないためエラーになる
// エラーには丁寧に「存在する場合は `npm i --save-dev @types/lodash` を試すか、」と記載があるので、このコマンドを試してインストールできれば宣言ファイルも使える
// モジュール 'lodash' の宣言ファイルが見つかりませんでした。'/Users/simac/Desktop/Programming/TypeScript/Learn1/ts-practice/node_modules/lodash/lodash.js' は暗黙的に 'any' 型になります。
//   存在する場合は `npm i --save-dev @types/lodash` を試すか、`declare module 'lodash';` を含む新しい宣言 (.d.ts) ファイルを追加しますts(7016)
import _ from "lodash";

const list = [1, 2, 3, 4, 5];

// コマンド実行することでlodashライブラリの機能が使えるようになる
const shuffled = _.shuffle(list);
console.log(shuffled);
// lodashのshuffleでランダムな数字が表示される
// [ 2, 3, 1, 5, 4 ]
