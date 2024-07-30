// Taple型
const chapter3_6_2 = () => {
  // 基本的にTaple型は型注釈をつける必要がある
  // [string, number]型
  const taplePerson: [string, number] = ["Alice", 30];
  // 型注釈を省略するとArray型になる
  // (string | number)[]型
  const arrayPerson = ["Alice", 30];

  // JSでは存在しないインデックスにアクセスすることができundefineが返される
  // TSでTaple型にしておくと、存在しないインデックスにアクセスすくることができないので不意にundefineが返されるのを防ぐことができる
  // const value = taplePerson[2]; // 長さ '2' のタプル型 '[string, number]' にインデックス '2' の要素がありません。ts(2493)

  // Taple型はラベルをつけることができ、コードの可読性を上げることができる
  type RGB = [red: number, green: number, blue: number];

  // ラベルは末尾に?をつけることでオプショナルにすることもできる
  // スプレッド構文を使って複数の要素を含む範囲を指定することも可能
  // これにより動的な要素数の変動にも柔軟に対応することができる
  type Foo = [first: number, second?: string, ...rest: any[]];
  let patternA: Foo = [1]; // firstのみ
  let patternB: Foo = [1, "hello"]; // firstとsecondのみ
  let patternC: Foo = [1, "hello", true, 10, "world"]; // firstとsecondの他にrestに複数の要素を割り当てる
};
