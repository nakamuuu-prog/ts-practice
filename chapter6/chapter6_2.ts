// 複数のジェネリクス
const chapter6_2_1 = () => {
  // 関数のジェネリクスは複数の型を持つこともできる
  function createPiar<T, U>(first: T, second: U): [T, U] {
    return [first, second];
  }
};

// ジェネリクスに対して明示的に型を指定する
const chapter6_2_2 = () => {
  function getLastItem<T>(array: T[]): T {
    return array[array.length - 1];
  }

  const numbers = [1, 2, 3, 4, 5]; // number[]

  // 明示的にnumber型の配列と指定していないが、型推論からTがnumber型であることをTypeScriptはわかっている
  // (local function) getLastItem<number>(array: number[]): number
  let lastNumber = getLastItem(numbers);

  // 型推論で型の特定も可能だが、関数のあとに<>で型を指定することで、明示的に型を指定することもできる
  lastNumber = getLastItem<number>(numbers);

  // ここではT型がstring型であると指定しているので、number型の配列を渡すとエラーなる
  // 型 'number[]' の引数を型 'string[]' のパラメーターに割り当てることはできません。
  // 型 'number' を型 'string' に割り当てることはできません。ts(2345)
  // let lastString = getLastItem<string>(numbers);
};
