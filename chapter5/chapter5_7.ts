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
