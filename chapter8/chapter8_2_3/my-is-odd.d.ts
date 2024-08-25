// TSにモジュールパッケージの存在を認識させるめにdeclare module "モジュール名"と指定する
// TSではインポート時にデフォルトエクスポートされたもののように扱いたいので、declare moduleの中でexport defaultを使用して関数を宣言する必要がある
declare module "is-odd" {
  export default function isOdd(value: number | string): boolean;
}

// 宣言ファイルを作ることで、宣言ファイルが提供されていないライブラリをTSで使用することができる
// declareを使って特定のライブラリの型情報や、変数の存在を通知を宣言することアンビエント宣言(ambient declaration)という
// ただし、できるかぎり既存の宣言ファイルが提供されているライブラリを使用すること

// .d.tsファイルはtypesディレクトリに集中して配置するのが一般的
