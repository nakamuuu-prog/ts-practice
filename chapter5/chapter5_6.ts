// 型アサーション
const chapter5_6_1 = () => {
  let input: unknown;
  // 何らかの処理
  // ・・・

  let text: string;
  // 型アサーションは指定した変数の型をasを使って明示的(強制的)に適用することができる
  // inputの型をstring型にアサーションしている
  text = input as string;

  // 型アサーションがよく使われるのはDOM APIでHTML要素を取得するとき
  // TypeScriptはDOM APIの戻り値からある程度の型推論をしてくれるが、具体的なHTML要素までは絞り込めないのでElement | null型というように曖昧に型推論される
  const someElementA = document.querySelector(".someClass");
  // someElementAはElement | null型として型推論されているので、アクセスしたい要素を取り出すことができない
  // 'someElementA' は 'null' の可能性があります。ts(18047)
  // プロパティ 'value' は型 'Element' に存在しません。ts(2339)
  // console.log("someElementB", someElementA.value);

  // 戻り値の型が明確にわかっている場合は型アサーションを使って型を適用させることで、アクセスしたい要素を取り出すことができる
  const someElementB = document.querySelector(".someClass") as HTMLInputElement;
  console.log("someElementB", someElementB.value);
};

// 非nullアサーション
const chapter5_6_2 = () => {
  let data: string | null = "data";
  // nullやundefinedに決してならないことがわかっているときに使う
  // 変数名のあとに「!」をつけることで、nullではないと断定する
  const processedData: string = data!;
  // 非nullアサーションはnullやundefinedに対する型安全チェックをスキップするので、もしnullやundefinedだった場合はランタイムエラーが起きてしまう
  data = null;
  const processedData2: string = data!;
};
// constアサーション
const chapter5_6_3 = () => {
  // 通常の型推論
  // let obj: {
  //   x: number;
  //   y: string;
  // };
  let obj = {
    x: 10,
    y: "hello",
  };

  // as constを使うことで、値が不変であることをTypescriptに伝える
  // as constをつけるとreadonlyになる
  // let objAsConst: {
  //   readonly x: 10;
  //   readonly y: "hello";
  // };
  let objAsConst = {
    x: 10,
    y: "hello",
  } as const;

  // 配列につけると読み取り専用のタプル型として型推論される
  let arr = [1, 2, 3] as const; // let arr: readonly [1, 2, 3]
};
