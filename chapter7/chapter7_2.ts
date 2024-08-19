// メソッドデコレータ
const chapter7_2_1_1 = () => {
  class Person {
    name: string;
    constructor(name: string) {
      this.name = name;
    }

    // デコレータを関数に適用すると関数が呼ばれた時に実行される
    @logged
    greet() {
      console.log(`Hello, my name is ${this.name}`);
    }
  }

  // contextにはデコレータが適用された対象の情報が含まれている
  function logged(originalMethod: any, context: any) {
    // 第二引数のargsは任意の型と数の引数を受け取ることができる
    function loggedMethod(this: any, ...args: any[]) {
      // contextのnameには対象のメソッド名が保持されている
      console.log(`${context.name} メソッド呼び出し！`);
      // 引数でthisに明示的にanyを指定しないとここでエラーが発生
      // 'this' は型として注釈を持たないため、暗黙的に型 'any' になります。ts(2683)
      const result = originalMethod.call(this, ...args); // callで元のメソッドの呼び出す
      console.log(`${context.name} メソッド終了！`);
      return result; // 元のメソッドの結果を返す
    }
    // 最後に変更を加えた関数を返す必要がある
    return loggedMethod;
  }

  const person = new Person("John");
  // greet メソッド呼び出し！
  // Hello, my name is John
  // greet メソッド終了！
  person.greet();
};

// addInitilizer
const chapter7_2_1_2 = () => {
  const chapter7_2_1_2_before = () => {
    class Person {
      name: string;
      constructor(name: string) {
        this.name = name;
      }

      greet() {
        console.log(`Hello, my name is ${this.name}`);
      }
    }

    const person = new Person("John");
    // Hello, my name is John
    person.greet();

    // コールバック関数に渡すと、thisがインスタンスから切り離されてしまうため、nameがundefinedになってしまう
    // Hello, my name is undefined
    setTimeout(person.greet, 1000);
  };

  const chapter7_2_1_2_after = () => {
    function bound(_originalMethod: any, context: any) {
      // addInitializerに渡された関数はインスタンス生成時に呼び出される
      context.addInitializer(function (this: any) {
        // this(生成されたインスタンス)のnameをbind(束縛)で紐づけておく
        this[context.name] = this[context.name].bind(this);
      });
    }

    class Person {
      name: string;
      constructor(name: string) {
        this.name = name;
      }

      @bound
      greet() {
        console.log(`Hello, my name is ${this.name}`);
      }

      // メソッドが増えてもデコレータを適用するだけでいいので、メソッドごとにthisとインスタンスを紐づける処理を書かなくて済むようになる
      @bound
      handsUp() {
        console.log(`${this.name} is hands up!`);
      }
    }

    const person = new Person("John");

    // addInitializerによってthisと生成されたインスタンスが紐づけられているため、コールバック関数に渡してもnameを見失わない
    // Hello, my name is John
    setTimeout(person.greet, 1000);
    setTimeout(person.handsUp, 1000);
  };
};

// デコレータファクトリ
const chapter7_2_2 = () => {
  // デコレータを適用するクラス、または関数ごとにヘッダー情報を引数で書き換えられるようにするためにデコレータをラッピング
  function logged(headMessage = "[LOG]:") {
    // 名前を変更しているが、これが元のデコレータ
    // ラップした関数の返り値として実装する
    return function actualDecorator(originalMethod: any, context: any) {
      function loggedMethod(this: any, ...args: any[]) {
        console.log(`${headMessage} ${context.name} メソッド呼び出し！`);
        const result = originalMethod.call(this, ...args); // callで元のメソッドの呼び出す
        console.log(`${headMessage} ${context.name} メソッド終了！`);
        return result;
      }

      return loggedMethod;
    };
  }

  class PersonLog {
    name: string;
    constructor(name: string) {
      this.name = name;
    }

    @logged()
    greet() {
      console.log(`Hello, my name is ${this.name}`);
    }
  }

  const personLog = new PersonLog("John");
  // [LOG]: greet メソッド呼び出し！
  // Hello, my name is John
  // [LOG]: greet メソッド終了！
  personLog.greet();

  class PersonInfo {
    name: string;
    constructor(name: string) {
      this.name = name;
    }

    @logged("[INFO]:")
    greet() {
      console.log(`Hello, my name is ${this.name}`);
    }
  }

  // クラスごとに引数を変更することでメッセージを変えることができる
  const personInfo = new PersonInfo("Alice");
  // [INFO]: greet メソッド呼び出し！
  // Hello, my name is Alice
  // [INFO]: greet メソッド終了！
  personInfo.greet();
};

// デコレータの実行タイミング
const chapter7_2_3 = () => {
  function A() {
    console.log("A ファクトリ 評価");
    return function (originalMethod: any, context: any) {
      console.log("A デコレータ 呼び出し");
    };
  }

  function B() {
    console.log("B ファクトリ 評価");
    return function (originalMethod: any, context: any) {
      console.log("B デコレータ 呼び出し");
    };
  }

  function C(originalMethod: any, context: any) {
    console.log("C デコレータ 呼び出し");
  }

  // A ファクトリ 評価
  // B ファクトリ 評価
  // B ファクトリ 評価
  // A ファクトリ 評価
  // C デコレータ 呼び出し
  // B デコレータ 呼び出し
  // A デコレータ 呼び出し
  // A デコレータ 呼び出し
  // B デコレータ 呼び出し
  // C デコレータ 呼び出し
  // 上から順番に式だけが評価され、下から順番に実行される
  // 評価や実行はクラスのインスタンス化やメソッドの呼び出し時ではなく、クラスやメソッドが宣言されたとき
  class ExampleClass {
    @A()
    @B()
    @C
    method() {}

    @C
    @B()
    @A()
    method2() {}
  }
};
