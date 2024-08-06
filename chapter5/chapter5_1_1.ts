const chapter5_1_1 = () => {
  type JpnCoin = 1 | 5 | 10 | 50 | 100 | 500;
  type UsCoin = 1 | 5 | 10 | 25;

  // UnionCoinはJpnCoinとUsCoinの和集合
  //  type UnionCoin = 1 | 5 | 10 | 50 | 100 | 500 | 25
  type UnionCoin = JpnCoin | UsCoin;

  // IntersectionCoinはJpnCoinとUsCoinの部分集合
  //  type IntersectionCoin = 1 | 5 | 10
  type IntersectionCoin = JpnCoin & UsCoin;
  // これらからnumber型は全ての数値リテラルを含む集合であることがわかる
  // これはstring型やboolean型にも当てはまる

  // number型とstring型をUnion型にするとnumber型とstring型の両方を要素として含む型になる
  // type NumberOrString = string | number
  type NumberOrString = number | string;
  // number型とstring型をIntersection型にするとnumber型とstring型の両方の属性を同時に持つ要素になるが、実際はそのような要素は存在しないので空の集合となる
  // これを空集合といい、空集合はnever型になる
  // type NumberAndtring = never
  type NumberAndtring = number & string;
};

const chapter5_1_1_Obj = () => {
  // 以下のオブジェクトは「キー名がnameで、値がstring型のプロパティを保持する」という条件を満たすすべてのオブジェクトの集合となる
  type Name = {
    name: string;
  };

  let john: Name;

  const objA = { name: "John" };
  john = objA; // OK

  const objB = {
    name: "John",
    gender: "male",
  };
  // name以外のプロパティが含まれていても代入可能
  // つまりobjBはName型の要素である
  john = objB; // OK

  const objC = {
    fullName: "John Doe",
    age: 25,
  };
  // objCにはnameプロパティが含まれていないためエラー
  // john = objC; // プロパティ 'name' は型 '{ fullName: string; age: number; }' にありませんが、型 'Name' では必須です。ts(2741)

  type Age = {
    age: number;
  };

  // { name: string } | { age: number }
  type NameOrAge = Name | Age;

  let mike: NameOrAge;
  // mikeはNameとAge、どちらかのオブジェクトのプロパティを持つので、どちらのプロパティでも代入可能
  mike = { name: "Mike" };
  mike = { age: 25 };
  // 両方でもいける
  mike = { name: "Mike", age: 25 };

  type NameAndAge = Name & Age;

  let alice: NameAndAge;
  alice = { name: "Alice", age: 25 };
  // aliceはNameとAge両方のオブジェクトのプロパティを持つ必要があるので、どちらか片方だけではエラー
  // 型 '{ name: string; }' を型 'NameAndAge' に割り当てることはできません。
  // プロパティ 'age' は型 '{ name: string; }' にありませんが、型 'Age' では必須です。ts(2322)
  // alice = { name: "Alice" };
};
