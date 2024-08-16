// ジェネリック型エイリアス
const chapter6_5 = () => {
  // 型エイリアスもinterfaceと同じようにジェネリック型が使える
  type Pair<T, U> = {
    first: T;
    second: U;
  };

  const stringAndNumber: Pair<string, number> = {
    first: "hello",
    second: 123,
  };
};
