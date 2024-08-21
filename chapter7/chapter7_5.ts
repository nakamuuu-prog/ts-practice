// クラスデコレータ
const chapter7_5 = () => {
  // targetはクラスとして受け取るので、Thisをクラスとして制約する必要がある
  // クラスは「コンストラクタ関数を有するオブジェクト」
  // 「new」キーワードをつけることでオブジェクトを返すコンストラクタ関数であることを明示する
  // 引数は関数のデコレータと同様に、どんな型でも受け取れるようにする
  // 戻り値は「どんなオブジェクトでも良い」とするため {}型 にする
  function loggedClass<This extends { new (...args: any[]): {} }>(
    target: This,
    context: ClassDecoratorContext<This>
  ) {
    // クラスデコレータはデコレータを適用したクラスを継承した無名のサブクラスを返す
    // 元クラスを継承するのは必須ではない
    return class extends target {
      constructor(...args: any[]) {
        super(...args);
        console.log(
          `${context.name} クラスに ${args.join(", ")} を渡してインスタンス化`
        );
      }
    };
  }

  @loggedClass
  class Person {
    private _name: string;
    private _age: number;

    constructor(name: string, age: number) {
      this._name = name;
      this._age = age;
    }
  }

  // Person クラスに John, 26 を渡してインスタンス化
  const person = new Person("John", 26);
};

// 継承が必須ではないということは、別のクラスとして置き換えることができるということ？
const chapter7_5_test = () => {
  function loggedClass<This extends { new (...args: any[]): {} }>(
    target: This,
    context: ClassDecoratorContext<This>
  ) {
    return class {
      constructor(...args: any[]) {
        console.log(
          `${context.name} クラスに ${args.join(", ")} を渡してインスタンス化`
        );
      }
    };
  }

  // 継承を外すとエラー
  // コレーター関数の戻り値の型 'typeof (Anonymous class)' は、型 'void | typeof Person' に割り当てられません。
  //   コンストラクト シグネチャの型に互換性がありません。
  //     型 'new (...args: any[]) => loggedClass<typeof Person>.(Anonymous class)' を型 'new (name: string, age: number) => Person' に割り当てることはできません。
  //       型 'loggedClass<typeof Person>.(Anonymous class)' には 型 'Person' からの次のプロパティがありません: _name, _agets(1270)

  // NOTE: 以下の記載があるが意図が不明なので、一旦継承する必要があるものとして深掘りしないでおく
  // 「返却するクラスが元のクラスを継承することは必須ではありませんが、ここでは元のクラスの機能はそのままにして、ログ出カの機能だけを追加するのでそうしています。」
  // @loggedClass
  class Person {
    private _name: string;
    private _age: number;

    constructor(name: string, age: number) {
      this._name = name;
      this._age = age;
    }
  }
};
