const chapter5_4_1 = () => {
  // string | number型
  let x = Math.random() > 0.5 ? 1 : "Hello, TypeScript";

  // xがnumber型の可能性があるのでエラー
  // プロパティ 'toUpperCase' は型 'string | number' に存在しません。
  // プロパティ 'toUpperCase' は型 'number' に存在しません。ts(2339)
  // x.toUpperCase();

  // 直接string型を代入するとstring型で型推論される
  x = "narrowing"; // string型
  // string型に絞り込まれているのでstring型の関数を呼べる
  x.toUpperCase();

  // number型にしても同じことが起こる
  x = 123;
  x.toFixed();
};
