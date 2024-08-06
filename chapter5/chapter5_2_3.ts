// 型の拡大
const chapter5_2_3 = () => {
  function fn1() {
    let x; // 型指定をしないとany型に型推論される
    // any型なのでどんな値でも入ってしまう
    x = 123;
    x = "abc";
    return x;
  }

  function fn2() {
    let list = []; // 配列は型を指定しないとany[]型として型推論される
    // any型の配列なので、どんな型でも追加できる
    list.push(1);
    list.push("Jane");
    return list;
  }

  // ただし、関数の戻り値として関数のスコープを離れると戻り値の値で型推論される
  let x = fn1(); // string型
  // string型に型推論されているので、関数のスコープの外では他の型は入らない
  // 型 'number' を型 'string' に割り当てることはできません。ts(2322)
  // x = 1;

  let list = fn2(); // (string | number)[]型
  // (string | number)[]型にされているので、関数のスコープの外では他の型は追加できない
  // 型 'boolean' の引数を型 'string | number' のパラメーターに割り当てることはできません。ts(2345)
  // list.push(true);
};
