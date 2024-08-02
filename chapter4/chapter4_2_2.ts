// コンストラクタのオーバーライド
const chapter4_2_2_3 = () => {
  class Parent {
    constructor(name: string) {
      console.log(`Parent: ${name}`);
    }
  }

  class Child extends Parent {
    constructor(name: string, age: number) {
      // コンストラクタをオーバーライドする場合はsuperでスーパークラスを呼び出す必要がある
      super(name);
      console.log(`Child: name => ${name}, age => ${age}`);
    }
  }

  // Parent: 親
  const parent = new Parent("親");

  // Parent: 子
  // Child: (name) => 子, (age) => 10
  const child = new Child("子", 10);
};
