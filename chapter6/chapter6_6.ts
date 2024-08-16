// ジェネリック型の制約
const chapter6_6_1 = () => {
  // <型パラメータ名 extends 制約したい型> で型パラメータが受け付ける型を制限することができる
  // クラスでもインターフェイスでもOK
  // 以下はstring型かnumber型のみを受け付けるようにしている
  class DataStotage<T extends string | number> {
    private items: T[] = [];

    add(item: T): void {
      this.items.push(item);
    }

    getItem(index: number): T {
      return this.items[index];
    }

    getAllItems(): T[] {
      return [...this.items];
    }
  }

  // stringまたはnumberのみを受け付けるためエラー
  // 型 'boolean' は制約 'string | number' を満たしていません。ts(2344)
  // let booleanStorage = new DataStotage<boolean>();
};

// extendsとkeyofを組み合わせる
const chapter6_6_2 = () => {
  interface Person {
    name: string;
    age: number;
    hobbies: string[];
  }

  const person = {
    name: "john",
    age: 18,
    hobbies: ["cooking", "tennis"],
  };

  // keyofを使った通常の絞り込み
  // keyofを使っているのでパラメータのkeyは "name" | "age" | "hobbies" 型
  function getProperty(obj: Person, key: keyof Person) {
    return obj[key];
  }

  // keyofを使うことで、関数に渡すパラメータの制約はできているが
  // 戻り値は string | number | string[] 型なので、特定のキーに対して1つの型を返すような絞り込みができていない
  // いずれも戻り値は string | number | string[] 型
  const nmaeProperty = getProperty(person, "name"); // "John"
  const ageProperty = getProperty(person, "age"); // 18

  // keyofとextendsを組み合わせた制約
  function getSpecificProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
  }

  // keyofとextendsを組み合わせることで、より厳密な型の絞り込みが行える
  // string型
  const nmaeSpecificProperty = getSpecificProperty(person, "name"); // "John"
  // number型
  const ageSpecificProperty = getSpecificProperty(person, "age"); // 18
};
