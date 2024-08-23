// 型のエクスポート・インポート
// 関数やクラスと同様に個別でexport可能
export interface Point {
  x: number;
  y: number;
}

export type LengthUnit = "m" | "cm" | "mm";

const PI = 3.14;

function square(x: number) {
  return x ** 2;
}

class Rectangle {
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

// 一括でexportする方法は、いくつかパターンがある
// パターン① 他の要素と一緒にexportする
// export { PI, square, Rectangle, Point, LengthUnit };

// パターン② 他の要素と型だけのexportを分ける
// 型であるということを示すためにexportのあとにtypeを明記する
// export { PI, square, Rectangle };
// export type { Point, LengthUnit };

// パターン③ 個別にtypeを明記する
// export { PI, square, Rectangle, type Point, type LengthUnit };

// interfaceやtypeのように型として宣言していなくても、型としてexportすることができる
// TRY: 変数や関数もtypeとしてexportできる
export { type PI, type square, type Rectangle };
