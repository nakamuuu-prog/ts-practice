// keyof
const chapter5_7_1 = () => {
  interface Person {
    name: string;
    age: number;
    hobbies: string[];
  }

  // keyofを使うと、オブジェクトのプロパティからプロパティ名のリテラル型を持つUinion型を作ることができる
  type PersonKeys = keyof Person;
  let personKeys: PersonKeys = "age";
  personKeys = "name";
  personKeys = "hobbies";
  // 型 '"gender"' を型 'keyof Person' に割り当てることはできません。ts(2322)
  // personKeys = "gender";

  // getProperty関数は第二引数のkeyにkeyofでPerson型を指定することで、Personインターフェースのプロパティ名のみを受け付けられるようにしている
  function getProperty(obj: Person, key: keyof Person) {
    return obj[key];
  }

  const person: Person = {
    name: "John",
    age: 30,
    hobbies: ["tennis", "cooking"],
  };

  // getPropertyの第二引数は "name" | "age" | "hobbies" 型として認識されるため、"name"、"age"、"hobbies"以外の値は渡せない
  // ちなみにgetPropertyを呼ぶ時、keyofでPerson型のプロパティ名のインテリセンスが出てきて便利だった
  console.log(getProperty(person, "name")); // John
  // 型 '"gender"' の引数を型 'keyof Person' のパラメーターに割り当てることはできません。ts(2345)
  // console.log(getProperty(person, "gender")); // John

  // keyofはあくまで型レベルで適用されるので、直接的に変数に使うことはできないため注意
};

// typeof
const chapter5_7_2 = () => {
  // typeofは変数の型を抽出して、新しい変数や引数に型付けすることができる
  const person = {
    name: "John",
    age: 30,
    hobbies: ["tennis", "cooking"],
  };

  // パラメーターpはpersonオブジェクトの型推論と同じ型になる
  // (parameter) p: {
  //     name: string;
  //     age: number;
  //     hobbies: string[];
  // }
  function greet(p: typeof person) {
    console.log(`My name is ${p.name}!`);
  }

  // 渡す値にhobbiesがないためエラー
  // 型 '{ name: string; age: number; }' の引数を型 '{ name: string; age: number; hobbies: string[]; }' のパラメーターに割り当てることはできません。
  //   プロパティ 'hobbies' は型 '{ name: string; age: number; }' にありませんが、型 '{ name: string; age: number; hobbies: string[]; }' では必須です。ts(2345)
  // greet({ name: "Alice", age: 22 });

  // JavaScriptのtypeofは対象の値のデータ型を「文字列」で返す演算子に対し、TypeScriptのtypeofは対象の変数や式の「型情報」を返すので混同しないよう注意
  const jsTypeOf = "JSのtypeof";
  console.log(jsTypeOf); // JSのtypeof
  console.log(typeof jsTypeOf); // string

  // 変数にpersonをtypeofで指定することで、porson2の型をpersonと同じ型にできる
  // const porson2: {
  //   name: string;
  //   age: number;
  //   hobbies: string[];
  // };
  const porson2: typeof person = {
    name: "Bob",
    age: 23,
    hobbies: ["basketball", "weight training"],
  };
};

// keyofとtypeofを組み合わせる
const chapter5_7_3 = () => {
  const employee = {
    id: "e001",
    name: "Alice",
    depatment: "Engineering",
  };

  // typeofで変数から型を作り、keyofでプロパティのUnion型にする
  // employeeは変数なので通常はkeyofをつけられないが、typeofと組み合わせることでつけることができる
  function getEmployeeDetail(key: keyof typeof employee) {
    return employee[key];
  }

  console.log(getEmployeeDetail("name")); // Alice
  // 型 '"age"' の引数を型 '"name" | "id" | "depatment"' のパラメーターに割り当てることはできません。ts(2345)
  // console.log(getEmployeeDetail("age"));
};
