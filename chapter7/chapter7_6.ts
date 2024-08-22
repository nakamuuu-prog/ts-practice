// Auto-Accessor
const chapter7_6_1 = () => {
  // 通常はプライペートなプロパティに対してゲッターとセッターを実装する必要がある
  class NormalPerson {
    #age = 20;

    get age() {
      return this.#age;
    }

    set age(val) {
      this.#age = val;
    }
  }

  // Auto-Accessorを使うことで、1行で表現できる
  // つまり、accessorをつけることでプライベートプロパティの定義とゲッターセッターをまとめて宣言されたということ
  class AccessorPerson {
    accessor age = 20;
  }

  const person = new AccessorPerson();
  console.log(person.age); // 20
  person.age = 21;
  console.log(person.age); // 21
};

// Auto-Accessor デコレータ
const chapter7_6_2 = () => {
  class Person {
    @loggedAccessor
    accessor age = 20;
  }

  function loggedAccessor<This, V>(
    // accessorはゲッターとセッターを持つオブジェクト型として受け取る
    target: {
      get: (this: This) => V;
      set: (this: This, value: V) => void;
    },
    context: ClassAccessorDecoratorContext<This, V>
  ) {
    // 戻り値もオブジェクトにする
    // ゲッター、セッター、初期化のメソッドを定義して返すことができる
    // それぞれゲッター、セッター、初期化のメソッドはそれぞれ省略可能
    return {
      get: function (this: This) {
        console.log(`${context.name.toString()}を取得`);
        const result = target.get.call(this);
        return result;
      },
      set: function (this: This, value: V) {
        console.log(`${context.name.toString()}を${value}に設定`);
        target.set.call(this, value);
      },
      init: function (this: This, initialVal: V) {
        console.log(`${context.name.toString()}を${initialVal}に初期化`);
        return initialVal;
      },
    };
  }

  // ageを20に初期化
  // ageを取得
  // 20
  // ageを21に設定
  // ageを取得
  // 21
  const person = new Person();
  console.log(person.age); // 20
  person.age = 21;
  console.log(person.age); // 21
};
