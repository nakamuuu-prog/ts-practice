const chapter5_5_before = () => {
  function isString(value: unknown): boolean {
    return typeof value === "string";
  }

  function printValue(inputVal: number | string) {
    if (isString(inputVal)) {
      // 本来、typeofで型を絞り込むことで、絞り込んだ型を保証できていた
      // isStringという関数にするとスコープの外に出てしまい型情報が失われてしまう
      // この関数からわかるのは戻り値がbooleanということだけになる
      // プロパティ 'toUpperCase' は型 'string | number' に存在しません。
      // プロパティ 'toUpperCase' は型 'number' に存在しません。ts(2339)
      // console.log(inputVal.toUpperCase());
    } else {
      // プロパティ 'toFixed' は型 'string | number' に存在しません。
      // プロパティ 'toFixed' は型 'string' に存在しません。ts(2339)
      // console.log(inputVal.toFixed(2));
    }
  }
};
const chapter5_5_after = () => {
  // ユーザー定義型ガードを使うことで戻り値が真と評価されたときに、パラメーターが指定した型であることをTypescriptの型チェッカーに教える
  // ユーザー定義型ガードは「: パラメーター is 型名」という型述語を指定して定義する
  function isString(value: unknown): value is string {
    return typeof value === "string";
  }

  function printValue(inputVal: number | string) {
    if (isString(inputVal)) {
      // isStringの評価が真だった場合、string型として認識されるためstring型の関数が呼べる
      console.log(inputVal.toUpperCase());
    } else {
      console.log(inputVal.toFixed(2));
    }
  }
};
