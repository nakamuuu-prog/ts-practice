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

// メソッドデコレータと型
const chapter7_2_4 = () => {
  // デコレータの型に含まれる主な型情報
  type Decorator = (
    // targetは対象のクラス、または関数
    target: Input,
    // contextは対象のクラス、または関数に関する情報
    context: {
      kind: string;
      name: string | symbol;
      access: {
        has?(target: unknown): boolean;
        get?(target: unknown): unknown;
        set?(target: unknown, value: unknown): void;
      };
      private?: boolean;
      static?: boolean;
      addInitializer?(initializer: () => void): void;
    }
  ) => Output | void;
  type Input = {}; // 仮(エラー回避のため)
  type Output = {}; // 仮(エラー回避のため)

  // any型にしていたデコレータの引数に型をつける
  // This, Args, Returnの型パラメータを実装
  // This：デコレータを実装したクラス、関数の型
  // Args：引数はanyの配列の拡張として指定することで、任意の型の引数の配列を受け取れるようにする
  // Return：メソッドの戻り値の型
  function logged<This, Args extends any[], Return>(
    // 第一引数はthisとargs(引数)を受け取り、戻り値を返す関数型にすることで、クラスのメンバーに適用したときにエラーが発生するようにしておく
    originalMethod: (this: This, ...args: Args) => Return,
    // contextはTypeScriptに組み込まれたClassMethodDecoratorContextを使う
    context: ClassMethodDecoratorContext<
      This,
      (this: This, ...args: Args) => Return
    >
  ) {
    function loggedMethod(this: This, ...args: Args) {
      // nameはsymbolである可能性があるため、toStringでエラーを回避
      console.log(`${context.name.toString()} メソッド呼び出し！`);
      const result = originalMethod.call(this, ...args);
      console.log(`${context.name.toString()} メソッド終了！`);
      return result;
    }
    return loggedMethod;
  }

  // ClassMethodDecoratorContextの中身
  // interface ClassMethodDecoratorContext<
  //   This = unknown, // メソッドが定義されるクラスの型
  //   // デコレート対象メソッドの型
  //   Value extends (this: This, ...args: any) => any = (
  //     this: This,
  //     ...args: any
  //   ) => any
  // > {
  //   readonly kind: "method"; // デコレータされたクラスメンバーの種類
  //   readonly name: string | symbol; // デコレートされたメンバーの名前
  //   readonly static: boolean; // 静的なメンバーかどうか
  //   readonly private: boolean; // プライベートなメンバーかどうか
  //   readonly access: {
  //     has(object: This): boolean; // オブジェクトのプロパティに、デコレート対象と同じ名前のものが存在するか
  //     get(object: This): Value; // デコレータが適用されたメンバーの現在の値を取得するために使用
  //   };
  //   addInitializer(initializer: (this: This) => void): void;
  //   readonly metadata: DecoratorMetadata; // なんか増えてる。本書では触れられてないので一旦スルー
  // }

  // 型を指定したため、関数以外に適用するとエラーが発生
  // これによって型の安全が保証される
  // 式として呼び出される場合、クラス デコレーターのシグネチャを解決できません。
  //   型 'typeof Test' の引数を型 '(this: typeof Test, ...args: any[]) => unknown' のパラメーターに割り当てることはできません。
  //     型 'typeof Test' にはシグネチャ '(this: typeof Test, ...args: any[]): unknown' に一致するものがありません。ts(1238)
  // デコレーター関数の戻り値の型 '(this: typeof Test, ...args: any[]) => unknown' は、型 'void | typeof Test' に割り当てられません。ts(1270)
  // @logged
  class Test {
    // @logged
    member: string = "member";

    @logged
    method() {}
  }

  // デコレータの型は非常に複雑なので、型安全性をどこまで担保する必要があるか適宜検討する必要がある
};

// 引数を複数追加してみる
const chapter7_2_4_test = () => {
  function logged<This, Args extends any[], Return>(
    originalMethod: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<
      This,
      (this: This, ...args: Args) => Return
    >
  ) {
    function loggedMethod(this: This, ...args: Args) {
      console.log(`${context.name.toString()} メソッド呼び出し！`);
      console.log(args);
      const result = originalMethod.call(this, ...args);
      console.log(`${context.name.toString()} メソッド終了！`);
      return result;
    }
    return loggedMethod;
  }

  class Test {
    member: string = "member";

    @logged
    method(str: string, num: number, bool: boolean) {}
  }

  const test = new Test();
  // method メソッド呼び出し！
  // [ '文字列', 2, false ]
  // method メソッド終了！
  test.method("文字列", 2, false);
};

chapter7_2_4_test();
