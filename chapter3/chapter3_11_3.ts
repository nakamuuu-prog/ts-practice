// 関数型
const chapter3_11_3 = () => {
  // 引数に型注釈を与えないとエラーになるので、引数ごとに型をつける必要がある
  // const addNumbers = (a, b) => a + b; // パラメーター 'a' の型は暗黙的に 'any' になります。ts(7006), パラメーター 'b' の型は暗黙的に 'any' になります。ts(7006)
  // const addNumbers = (a: number, b: number) => a + b;

  // 関数型を与えることで回避することもできる
  // const addNumbers: (a: number, b: number) => number = (a, b) => a + b;

  // さらに型エイリアスを使って関数型を宣言することで、コードの可読性を向上させることができる
  type AddFunction = (a: number, b: number) => number;
  const addNumbers: AddFunction = (a, b) => a + b;
};
