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
