"use strict";
// src配下とこのchapter9配下のファイルがコンパイルされ、それぞれのTSファイルのソースマップ、宣言ファイル、宣言ファイルのソースマップが生成されている
const john = "john";
const age = 26;
class Person {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
const person = new Person(john, age);
//# sourceMappingURL=chapter9.js.map