const chapter5_4_1 = () => {
  // string | number型
  let x = Math.random() > 0.5 ? 1 : "Hello, TypeScript";

  // xがnumber型の可能性があるのでエラー
  // プロパティ 'toUpperCase' は型 'string | number' に存在しません。
  // プロパティ 'toUpperCase' は型 'number' に存在しません。ts(2339)
  // x.toUpperCase();

  // 直接string型を代入するとstring型で型推論される
  x = "narrowing"; // string型
  // string型に絞り込まれているのでstring型の関数を呼べる
  x.toUpperCase();

  // number型にしても同じことが起こる
  x = 123;
  x.toFixed();
};

// 型ガード
// 等価演算子を使って絞り込む
const chapter5_4_2_1 = () => {
  // string | number型
  let x = Math.random() > 0.5 ? 1 : "Hello";

  if (x === "Hello") {
    // if文によってxは"Hello"型として扱われる
    x.toUpperCase();
  }

  function fun(strOrNum: string | number, strOrBool: string | boolean) {
    //
    if (strOrNum === strOrBool) {
      // strOrNumとstrOrBoolが一致するのは両方がstring型のときのみなので、string型として扱われ得る
      strOrNum.toUpperCase();
      strOrBool.toUpperCase();
    } else {
      console.log(strOrNum); // string | number
      console.log(strOrBool); // string | boolean
    }
  }
};

// typeofを使って絞り込む
const chapter5_4_2_2 = () => {
  function printValue(value: string | number) {
    if (typeof value === "string") {
      // typeofを使ってstring型で絞り込まれているため、string型として扱われる
      console.log(value.toUpperCase());
    } else {
      // 最初にstring型で絞り込んでいるので、number型として扱われる
      console.log(value.toFixed(2));
    }
  }
};

// inを使って絞り込む
const chapter5_4_2_3 = () => {
  interface Rectangle {
    width: number;
    height: number;
  }

  interface Circle {
    radius: number;
  }

  function printArea(shape: Rectangle | Circle) {
    // Rectangleのインスタンスかどうかをチェックする
    if ("width" in shape) {
      // Rectangleのインスタンスなので幅 × 高さで面積を求める
      console.log(`Area: ${shape.width * shape.height}`);
    } else {
      // RectangleのインスタンスではないのでCircle型として扱われる
      // 半径 × 半径 × 円周率で面積を求める
      console.log(`Area: ${shape.radius ** 2 * 3.14}`);
    }
  }
};

const chapter5_4_2_3_Test = () => {
  interface Rectangle {
    width: number;
    height: number;
  }

  interface Circle {
    radius: number;
  }

  // 三角形を追加
  interface Triangle {
    bottom: number;
    height: number;
  }

  function printArea(shape: Rectangle | Circle | Triangle) {
    // Triangleのインスタンスかどうかをチェックする
    if ("bottom" in shape) {
      console.log(`Area: ${(shape.bottom * shape.height) / 2}`);
    } else if ("height" in shape) {
      // heightプロパティはTriangleとRectangleの両方にあるが、先にbottomプロパティで絞り込んでいるので、ちゃんとRectangleとして扱われる！
      console.log(`Area: ${shape.width * shape.height}`);
    } else {
      console.log(`Area: ${shape.radius ** 2 * 3.14}`);
    }
  }
};

// instanceofによる絞り込み
const chapter5_4_2_4 = () => {
  class Fish {
    swim() {
      console.log("The fish is swimming.");
    }
  }

  class Bird {
    fly() {
      console.log("The bird is flying.");
    }
  }

  function move(animal: Fish | Bird) {
    if (animal instanceof Fish) {
      // Fish型で絞り込んでいるのでswimを呼べる
      animal.swim();
    } else {
      // 最初のif文でFish型が絞り込まれているので、必然的にBird型になる
      animal.fly();
    }
    // 最初にif文で絞り込んでいても、if文のスコープから出るとFish | Bird型になる
    // プロパティ 'fly' は型 'Fish | Bird' に存在しません。
    // プロパティ 'fly' は型 'Fish' に存在しません。ts(2339)
    // animal.fly();
  }
};

// タグ付きユニオン型による絞り込み
const chapter5_4_2_5 = () => {
  interface Rectangle {
    type: "rectangle";
    width: number;
    height: number;
  }

  interface Circle {
    type: "circle";
    radius: number;
  }

  // SquareはRectangleと同じプロパティを持っているので、inを使った絞り込みが行えない
  interface Square {
    type: "square";
    width: number;
  }

  function printArea(shape: Rectangle | Circle | Square) {
    // typeというタグをつけたことによって、型の絞り込みが行える
    // プロパティの存在で絞り込むinの絞り込み方に対し、タグ付きユニオン型は特定のプロパティの値を基に型を絞り込むので、より直接的で明確な型の識別を実現できる
    switch (shape.type) {
      case "rectangle":
        console.log(`Area: ${shape.width * shape.height}`);
        break;
      case "circle":
        console.log(`Area: ${shape.radius ** 2 * 3.14}`);
        break;
      case "square":
        console.log(`Area: ${shape.width ** 2}`);
    }
  }
};

const chapter5_4_3 = () => {
  const scenario1 = () => {
    // colorというオブジェクトを定義
    // colorのプロパティは数値の配列か、カラーコードで指定できるようにしたい
    const color = {
      red: [255, 0, 0],
      green: "#00ff00",
      bleu: [0, 0, 255], // blueがタイプミスしてしまっている
    };

    // colorは以下のように型推論される
    // const color: {
    //   red: number[];
    //   green: string;
    //   bleu: number[];
    // };

    // greenだけはstring型なので、string型の関数が呼べる
    const greenNormalized = color.green.toUpperCase();
  };
  const scenario2 = () => {
    // scenario1でのタイプミスを防ぐために型を定義
    type RGB = [red: number, green: number, blue: number]; //　ラベル付きTuple型

    // Colorは数値の配列かカラーコードを表すためのstring型を代入できるようにしたいので、各プロパティをRGBのTuple型とstring型にする
    interface Color {
      red: RGB | string;
      green: RGB | string;
      blue: RGB | string;
    }

    const color: Color = {
      red: [255, 0, 0],
      green: "#00ff00",
      blue: [0, 0, 255],
      // 型を宣言することででタイプミスに気づけるよになる
      // オブジェクト リテラルは既知のプロパティのみ指定できます。'bleu' は型 'Color' に存在しません。ts(2353)
      // bleu: [0, 0, 255],
    };

    // scenario1ではgreenがstring型で型推論されていたため、string型の関数が呼び出せていたが、明確に型を定義したためRGB | string型になってしまいエラーになる
    // プロパティ 'toUpperCase' は型 'string | RGB' に存在しません。
    // プロパティ 'toUpperCase' は型 'RGB' に存在しません。ts(2339)
    // const greenNormalized = color.green.toUpperCase();
  };

  const scenario3 = () => {
    type RGB = [red: number, green: number, blue: number]; //　ラベル付きTuple型

    interface Color {
      red: RGB | string;
      green: RGB | string;
      blue: RGB | string;
    }

    // scenario2のようなエラーを防ぐためにsatisfiesを使うことで、型推論の結果を維持しながら型の一致を検証できる
    const color = {
      red: [255, 0, 0],
      green: "#00ff00",
      blue: [0, 0, 255],
      // オブジェクト リテラルは既知のプロパティのみ指定できます。'bleu' は型 'Color' に存在しません。ts(2353)
      // bleu: [0, 0, 255],
    } satisfies Color;

    // colorは以下のように型推論される
    // const color: {
    //   red: [number, number, number];
    //   green: string;
    //   blue: [number, number, number];
    // };

    // 型を定義していてもstring型として型推論されているため、string型の関数が呼べる
    const greenNormalized = color.green.toUpperCase();
  };
};
