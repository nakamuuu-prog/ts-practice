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
