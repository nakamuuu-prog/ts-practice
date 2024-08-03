const chapter4_2_4 = () => {
  class Circle {
    private _radius: number;

    constructor(radius: number) {
      this._radius = radius;
    }

    // TypeScriptはメソッドのようにゲッターセッターを書く
    get radius(): number {
      console.log("半径を取得");
      return this._radius;
    }

    set radius(value: number) {
      if (value <= 0) {
        throw new Error("不正な値です。0より大きい値を入力してください。");
      }
      console.log("半径を設定");
      this._radius = value;
    }
  }

  const circle = new Circle(3);

  // ゲッターの実行
  console.log(circle.radius);

  // セッターの実行
  circle.radius = 5;
  console.log(circle.radius);

  // Error
  circle.radius = -1;
};

// 半径を取得
// 3
// 半径を設定
// 半径を取得
// 5
// /Users/simac/Desktop/Programming/TypeScript/Learn1/ts-practice/chapter4/chapter4_2_4.ts:17
//         throw new Error("不正な値です。0より大きい値を入力してください。");
//               ^
// Error: 不正な値です。0より大きい値を入力してください。
