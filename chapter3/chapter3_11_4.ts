// void型
const chapter3_11_4 = () => {
  // void型は何も値を返さないという型だが、値を返すこともできる
  type ReturnVoid = () => void;
  const greetWorld: ReturnVoid = () => {
    return "Hello, World!";
  };

  // ただし、void型の関数を代入するとvoid型として型推論される
  // そのため、たとえばstring型を返していたとしても、string型の関数を使うことはできない
  // これはJSの動作と一致していて、JSの柔軟さを維持しながら型安全を提供されている
  const result = greetWorld(); // const result: void
  // console.log(result.toUpperCase()); // プロパティ 'toUpperCase' は型 'void' に存在しません。ts(2339)

  // 一般的に値を返さないことが明確な場合はvoid型の型注釈をつけるが、プロジェクトのスタイルや個人の好みに依存する
};
