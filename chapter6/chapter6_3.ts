const chapter6_3 = () => {
  // interface インターフェイス名<型パラメーター>でジェネリックインターフェイスが作れる
  interface Pair<T> {
    first: T;
    second: T;
  }

  // 型パラメーターにstring型を指定しているので、プロパティがstring型になる
  let stringPair: Pair<string> = {
    first: "Ryu",
    second: "Ken",
  };

  // 型パラメーターにnumber型を指定しているので、プロパティがnumber型になる
  let numberPair: Pair<number> = {
    first: 1,
    second: 2,
  };

  // ちゃんと型パラメーターを指定しないとエラー
  // ジェネリック型 'Pair<T>' には 1 個の型引数が必要です。ts(2314)
  // let dataPiar: Pair;

  // 「,」で区切ると複数の型パラメーターを指定できる
  interface MultiTypePair<T, U> {
    first: T;
    second: U;
  }

  let stringNumberPair: MultiTypePair<string, number> = {
    first: "1",
    second: 2,
  };

  // 型パラメーターにデフォルトの型を指定しておくと、型パラメーターの指定がない場合はデフォルトの型になる
  interface DefaultTypePair<T = string, U = number> {
    first: T;
    second: U;
  }

  // 型指定をした時
  // let booleanStringPair: DefaultTypePair<boolean, string>
  let booleanStringPair: DefaultTypePair<boolean, string> = {
    first: false,
    second: "true",
  };

  // 型指定をしなかった時
  // let defaultTypePair: DefaultTypePair<string, number>
  let defaultTypePair: DefaultTypePair = {
    first: "1",
    second: 2,
  };
};
