// TypeScriptにはユーティリティ型(utility types)という多種多様な組み込みジェネリクス型がある

// Partial<T>型
const chapter6_7_1 = () => {
  interface User {
    name: string;
    email: string;
    age?: number;
  }

  let user1: User = {
    name: "John",
    email: "abc@email.com",
    age: 18,
  };

  function upateUser(user: User, fieldsToUpdate: User) {
    return { ...user, ...fieldsToUpdate };
  }

  // Userのnameはオプショナルでないため、emailのみのオブジェクトを渡そうとするとエラーになる
  // 型 '{ email: string; }' の引数を型 'User' のパラメーターに割り当てることはできません。
  //   プロパティ 'name' は型 '{ email: string; }' にありませんが、型 'User' では必須です。ts(2345)
  // user1 = upateUser(user1, { email: "xyz@email.com" });

  // type Partial<T> = { [P in keyof T]?: T[P] | undefined; }
  function upateUserPartial(user: User, fieldsToUpdate: Partial<User>) {
    return { ...user, ...fieldsToUpdate };
  }

  // Partial<T>を使うことで型パラメータに渡したオブジェクトのすべてのプロパティがオプショナルになるため、emailだけを渡してもエラーにならない
  user1 = upateUserPartial(user1, { email: "xyz@email.com" });

  console.log(user1); // { name: 'John', email: 'xyz@email.com', age: 18 }
};

// Record<K, T>型
const chapter6_7_2 = () => {
  const chapter6_7_2_before = () => {
    type RGB = [red: number, green: number, blue: number];

    interface Color {
      // Colorが持つプロパティはRGB型かstring型で値を設定できるようにしたいが、そのままUnion型で記述すると冗長になってしまう
      red: RGB | string;
      green: RGB | string;
      blue: RGB | string;
    }

    let color: Color;
  };

  const chapter6_7_2_after = () => {
    // プロパティ用の型エイリアス
    type primaryColors = "red" | "green" | "blue";
    // 値用の型エイリアス
    type RGB = [red: number, green: number, blue: number];

    // Record<K, T>型を使うことでスッキリと書ける
    // Kがキーの型、Tが値の型となる
    // プロパティに同じ型を繰り返し使用するときはRecord<K, T>型が有効
    let color: Record<primaryColors, RGB | string>;
  };
};

// Pick<T, K>型
const chapter6_7_3 = () => {
  interface User {
    id: number;
    name: string;
    email: string;
    age: number;
  }

  // Pick<T, K>を使うことで、特定のプロパティのみを抽出した型を作れる
  // type UserPreview = {
  //   name: string;
  //   id: number;
  // };
  type UserPreview = Pick<User, "id" | "name">;

  const userPreview: UserPreview = {
    id: 1,
    name: "Alice",
    // Pick<T, K>で作り直したため、emailとageがなくてもOK
  };
};
