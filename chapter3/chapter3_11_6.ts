const chapter3_11_6_1 = () => {
  function addNumbers(a: number | string, b: number | string) {
    if (typeof a === "number" && typeof b === "number") {
      return a + b;
    }
    return a.toString() + b.toString();
  }

  let result = addNumbers("1", "2");

  // string型の関数を呼び出すとエラーになる
  // result.includes("1"); // プロパティ 'includes' は型 'string | number' に存在しません。 プロパティ 'includes' は型 'number' に存在しません。ts(2339)
};

const chapter3_11_6_2 = () => {
  // 関数オーバーロードを用いると、同じ名前のアン数に対して複数の呼び出しシグネチャを定義できる
  // これにより呼び出し方法によって型推論を正確に行うことができる
  function addNumbers(a: number, b: number): number;
  function addNumbers(a: string, b: string): string;
  function addNumbers(a: number, b: string): string;
  function addNumbers(a: string, b: number): string;

  function addNumbers(a: number | string, b: number | string) {
    if (typeof a === "number" && typeof b === "number") {
      return a + b;
    }
    return a.toString() + b.toString();
  }

  let result = addNumbers("1", "2"); // let result: string
  // string型として型推論されているためエラーにならない
  result.includes("1");
};
