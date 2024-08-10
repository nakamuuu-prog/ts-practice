// オブジェクト型
// 型Aと型Bがあるとき、次の両方の条件が満たされることで型Bが型Aのサブタイプとしてみなされる(B <: A)
// ・型Aに存在するすべてのプロパティが型Bにも存在する
// ・型Bの各プロパティの型が、対応する型Aのプロパティの型のサブタイプである

const chapter5_2_1 = () => {
  interface Person {
    name: string;
    age: number;
  }
  // 型A
  let person: Person;

  let john = {
    name: "John",
    age: 30,
    gender: "male",
  };

  // 型B
  // johnはPerson型にはないgenderプロパティを持っているが、Person型にあるnameとage両方のプロパティを持っているためサブタイプとして認識される
  person = john;

  // 型B
  let jane = {
    name: "John",
    age: "25",
  };

  // janeはPerson型にあるnameとage両方のプロパティを持っているが、ageがstring型のため、サブタイプとして認識されない
  // 型 '{ name: string; age: string; }' を型 'Person' に割り当てることはできません。
  // プロパティ 'age' の型に互換性がありません。
  //   型 'string' を型 'number' に割り当てることはできません。ts(2322)
  // person = jane;

  // 型B
  let alice = {
    name: "Alice",
  };

  // aliceはageプロパティが存在しないのでサブタイプとして認識されない
  // Person型のageがないのでエラー
  // プロパティ 'age' は型 '{ name: string; }' にありませんが、型 'Person' では必須です。ts(2741)
  // person = alice;
};

// たぶんjaneはageがnumberとstring型のUnion型だったらサブタイプとして認識されるはず
const chapter5_2_1_test = () => {
  interface Person {
    name: string;
    age: number | string;
  }
  let person: Person;

  let john = {
    name: "John",
    age: 30,
    gender: "male",
  };

  person = john;

  let jane = {
    name: "John",
    age: "25",
  };

  person = jane;
};

// 関数型
// 戻り値の型
// 関数Aと関数Bがあるとき、「Bの戻り値の型 <: Aの戻り値の型」の条件が満たされることで関数Bが関数Aのサブタイプとしてみなされる
const chapter5_2_2_1 = () => {
  // 関数型: () => { name: string; }
  let fn1 = () => ({ name: "John" });
  // 関数型: () => { name: string; age: number; }
  let fn2 = () => ({ name: "John", age: 30 });

  // fn2にはfn1のnameプロパティが含まれているため、サブタイプとして認識される
  fn1 = fn2;

  // fn1にはfn2のageプロパティが含まれていばいため、サブタイプとして認識されない
  // 型 '() => { name: string; }' を型 '() => { name: string; age: number; }' に割り当てることはできません。
  //   プロパティ 'age' は型 '{ name: string; }' にありませんが、型 '{ name: string; age: number; }' では必須です。ts(2322)
  // fn2 = fn1;
};

// パラメーターの型
// 関数Aと関数Bがあるとき、次の両方の条件が満たされることで関数Bが関数Aのサブタイプとしてみなされる(B <: A)
// ・対応する各パラメーターにおいて、「Aのパラメーターの型 <: Bのパラメーターの型」である
// ・Bのパラメーターの数 <= Aのパラメーターの数
const chapter5_2_2_2 = () => {
  interface Person {
    name: string;
    age: number;
  }

  interface Student extends Person {
    club: string;
  }

  // 関数B
  // 関数型: (person: Person) => void
  let fn3 = (person: Person) => {
    console.log(`That person's name is ${person.name} (${person.age}).`);
  };

  // 関数A
  // 関数型: (student: Student) => void
  let fn4 = (student: Student) => {
    console.log(
      `That student's name is ${student.name} (${student.age}) and enjoys ${student.club}.`
    );
  };

  // fn4のパラメーターの型 <: fn3のパラメーターの型
  // fn4はfn3のサブタイプにはみなされないのでエラー
  // 型 '(student: Student) => void' を型 '(person: Person) => void' に割り当てることはできません。
  // パラメーター 'student' および 'person' は型に互換性がありません。
  //   プロパティ 'club' は型 'Person' にありませんが、型 'Student' では必須です。ts(2322)
  // fn3 = fn4;

  // That person's name is John (30) and enjoys tennis.
  fn4({ name: "John", age: 30, club: "tennis" });

  fn4 = fn3;

  // fn3が代入されているので結果はfn3のログが出力されるが、引数はStudent型として渡す必要がある
  // That person's name is John (30).
  fn4({ name: "John", age: 30, club: "tennis" });

  // 関数A
  // 関数型: (person: Person, gender: string) => void
  let fn5 = (person: Person, gender: string) => {
    console.log(
      `That person's name is ${person.name} (${person.age}), ${gender}.`
    );
  };

  // fn5のパラメーターの型 <: fn3のパラメーターの型
  // かつfn3よりfn5のほうがパラメータの数が多い
  // 型 '(person: Person, gender: string) => void' を型 '(person: Person) => void' に割り当てることはできません。
  // Target signature provides too few arguments. Expected 2 or more, but got 1.ts(2322)
  // fn3 = fn5;

  fn5 = fn3;

  // fn4のときと同様、fn3が代入されているので結果はfn3のログが出力されるが、引数はpersonとgenderの二つを渡す必要がある
  // That person's name is Jane (25).
  fn5({ name: "Jane", age: 25 }, "female");

  // 関数A
  // 関数型: (student: Student, gender: string) => void
  let fn6 = (student: Student, gender: string) => {
    console.log(
      `That student's name is ${student.name} (${student.age},${gender}) and enjoys ${student.club}.`
    );
  };

  // fn6のパラメーターの型 <: fn3のパラメーターの型(Person型はStudent型のスーパータイプ)
  // かつfn3よりfn6のほうがパラメータの数が多い
  // 型 '(student: Student, gender: string) => void' を型 '(person: Person) => void' に割り当てることはできません。
  // Target signature provides too few arguments. Expected 2 or more, but got 1.ts(2322)
  // fn3 = fn6;

  fn6 = fn3;

  // That person's name is Alice (18).
  fn6({ name: "Alice", age: 18, club: "chess" }, "female");

  // エラーになっているものは、どれも必要な引数が渡ってくることが保証されなくなっているため安全でなくなっている
};

// 以上のことから、次の条件がすべて満たされる場合、関数Bは関数Aのサブタイプとなる
// ・各パラメーターにおいて、「Aのパラメーターの型 <: Bのパラメーターの型」
// ・Bのパラメーターの数 <= Aのパラメーターの数
// ・Bの戻り値の型 <: Aの戻り値の型
