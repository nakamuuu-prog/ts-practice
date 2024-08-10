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

// スーパータイプとサブタイプ
// サブタイプに含まれる値はスーパータイプの値として代わりに使用できる
const chapter5_1_2 = () => {
  let val = "10";
  // ageはstring型とnumber型のUnion型なので、string型の変数が代入できる
  // このとき、string型はnumber | string型のサブタイプ、number | string型はstring型のスーパータイプという関係になる
  const age: number | string = val;
};

const chapter5_1_2_Obj = () => {
  type Name = {
    name: string;
  };

  type NameAndAge = {
    name: string;
    age: number;
  };

  function logName(person: Name) {
    console.log(person.name);
  }

  function logNameAndAge(person: NameAndAge) {
    console.log(person.name, person.age);
  }

  const personOnlyName: Name = { name: "John" };
  const personNameAndAge: NameAndAge = { name: "John", age: 20 };

  // NameAndAge型はName型のサブタイプなので、nameプロパティがあればName型の引数として渡せる
  logName(personNameAndAge);
  // Name型はNameAndAge型のスーパータイプなので、ageプロパティを持たない
  // そのためNameAndAge型の引数として渡そうとするとエラーとなる
  // 型 'Name' の引数を型 'NameAndAge' のパラメーターに割り当てることはできません。
  // プロパティ 'age' は型 'Name' にありませんが、型 'NameAndAge' では必須です。ts(2345)
  // logNameAndAge(personOnlyName);
};

// unknown型はどんな値でも代入できるので、全ての型のスーパータイプと言える
// このように全ての型を包含するunknown型をトップ型という

// 空集合であるnever型はどんな値も代入することができないので、サブタイプと言える
// このように全ての型に含まれるnever型をボトム型という
