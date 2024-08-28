// allowJsがfalseの状態でJSファイルをimportしようとするとエラーになる
// モジュール './chapter9_10_1' の宣言ファイルが見つかりませんでした。
// import { allowJs } from "./chapter9_10_1";

// src配下とこのchapter9配下のファイルがコンパイルされ、それぞれのTSファイルのソースマップ、宣言ファイル、宣言ファイルのソースマップが生成されている
const john: string = "john";
const age: number = 26;

class Person {
  private name;
  private age;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const person = new Person(john, age);

// noImplicitAny
const noImplicitAny = () => {
  // パラメーター 'firstName' の型は暗黙的に 'any' になります。ts(7006)
  // function greet(firstName) {
  //   console.log(`Hello, ${firstName}`);
  // }
};

// strictNullChecks
const strictNullChecks = () => {
  let age: number;
  age = 18;
  // 型 'null' を型 'number' に割り当てることはできません。ts(2322)
  // age = null;
};

// strictBindCallApply
const strictBindCallApply = () => {
  function greet(name: string) {
    console.log(`Hello, ${name}`);
  }

  // 型 'number' の引数を型 'string' のパラメーターに割り当てることはできません。ts(2345)
  // greet.call(undefined, 123);
};

// strictPropertyInitialization
const strictPropertyInitialization = () => {
  class Japanese {
    name: string;
    nationality = "JPN";
    // プロパティ 'age' に初期化子がなく、コンストラクターで明確に割り当てられていません。ts(2564)
    // age: number;

    constructor(name: string, age: number) {
      this.name = name;
    }
  }
};
