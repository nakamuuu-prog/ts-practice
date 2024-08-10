const chapter6_1_1 = () => {
  // ジェネリクス型は具体的な型ではなく、型を抽象化して再利用可能な型
  // 特定の型情報を渡すことで、初めて具体的な型に固定される
};

const chapter6_1_2_any = () => {
  // どんな型でも受け付けるものとしてanyがあるが、型の安全性が保てなくなる
  function getLastItem(array: any[]) {
    return array[array.length - 1];
  }

  const numbers = [1, 2, 3, 4, 5];
  let lastNumber = getLastItem(numbers); // any

  const strings = ["a", "b", "c"];
  let lastString = getLastItem(strings); // any
};

const chapter6_1_2_union = () => {
  // Union型にすると、戻り値もUnion型になり、型の絞り込みが必要になる
  function getLastItem(array: number[] | string[]) {
    return array[array.length - 1];
  }

  const numbers = [1, 2, 3, 4, 5];
  let lastNumber = getLastItem(numbers); // string | number

  const strings = ["a", "b", "c"];
  let lastString = getLastItem(strings); // string | number
};

const chapter6_1_2_overload = () => {
  // オーバーロードで実装すれば渡した値に対して、どの型を返すか指定できる
  // しかし、渡す値の型が増えるたびにオーバーロードを実装しなければならない
  function getLastItem(array: number[]): number;
  function getLastItem(array: string[]): string;
  function getLastItem(array: any[]) {
    return array[array.length - 1];
  }

  const numbers = [1, 2, 3, 4, 5];
  let lastNumber = getLastItem(numbers); // number

  const strings = ["a", "b", "c"];
  let lastString = getLastItem(strings); // string
};

const chapter6_1_2_generics = () => {
  // Tは抽象化された型
  // T型の配列が引数を渡す必要があり、T型の値が返る
  function getLastItem<T>(array: T[]): T {
    return array[array.length - 1];
  }

  const numbers = [1, 2, 3, 4, 5];
  let lastNumber = getLastItem(numbers); // number

  const strings = ["a", "b", "c"];
  let lastString = getLastItem(strings); // string

  // ジェネリクスを使うことで新しい型の引数が増えてもオーバーロードの追加実装が不要
  const booleans = [true, false];
  let lastBooleans = getLastItem(booleans); // boolean
};
