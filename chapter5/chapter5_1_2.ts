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
