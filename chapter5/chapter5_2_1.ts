// 型Aと型Bがあるとき、次の両方の条件が満たされることでサブタイプとしてみなされる
// ・型Aに存在するすべてのプロパティが型Bにも存在する
// ・型Bの各プロパティの型が、対応する型Aのプロパティの型のサブタイプである

const chapter5_2_1 = () => {
  interface Person {
    name: string;
    age: number;
  }
  let person: Person;

  let john = {
    name: "John",
    age: 30,
    gender: "male",
  };

  // johnはPerson型にはないgenderプロパティを持っているが、Person型にあるnameとage両方のプロパティを持っているためサブタイプとして認識される
  person = john;

  let jane = {
    name: "John",
    age: "25",
  };

  // janeはPerson型にあるnameとage両方のプロパティを持っているが、ageがstring型のため、サブタイプとして認識されない
  // 型 '{ name: string; age: string; }' を型 'Person' に割り当てることはできません。
  // プロパティ 'age' の型に互換性がありません。
  //   型 'string' を型 'number' に割り当てることはできません。ts(2322)
  // person = jane;

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
