type Person = {
  name: string;
  age: number;
};

const john: Person = {
  name: "John",
  age: 25,
};

// 型エイリアスで宣言されたオブジェクト型に存在しないプロパティを設定しようとするとエラーが発生
// これを過剰ブロパティチェックという
// const alice: Person = {
//   name: "Alice",
//   age: 30,
//   gender: "female", // エラー
// };

const alice: {
  name: string;
  age: number;
  gender: string;
} = {
  name: "Alice",
  age: 30,
  gender: "female", // エラー
};

// オブジェクトリテラルであらかじめ宣言されたものはエラーにならないので注意が必要
const aliceAsPerson: Person = alice;
