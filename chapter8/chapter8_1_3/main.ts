// インポートする方法もいくつかある
// パターン① 他の要素と一緒にinportする
import { PI, square, Rectangle, Point, LengthUnit } from "./calc";

// パターン② 他の要素と型だけのimportを分ける
// 型であるということを示すためにimportのあとにtypeを明記する
// import { PI, square, Rectangle } from "./calc";
// import type { Point, LengthUnit } from "./calc";

// パターン③ 個別にtypeを明記する
// import { PI, square, Rectangle, type Point, type LengthUnit } from "./calc";

const pointA: Point = { x: 1, y: 1 };
let unit: LengthUnit = "mm";

// 型としてexportされた要素はインスタンス化できない
// 'export type' を使用してエクスポートされたため、'Rectangle' は値として使用できません。ts(1362)
// const rect = new Rectangle(5, 10);

// 型としての利用は可能
const rect: Rectangle = {
  width: 3,
  height: 4,
  getArea() {
    return this.width * this.height;
  },
};

// TRY: クラスと同じようにtypeでexportした変数や関数を使おうとするとエラーになる
// 'export type' を使用してエクスポートされたため、'PI' は値として使用できません。ts(1362)
// const pi = PI;
// 'export type' を使用してエクスポートされたため、'square' は値として使用できません。ts(1362)
// const squareArea = square(2);

// 型として使えるけど、typeofをつけないと使えない
const pi: typeof PI = 3.14;
const squareArea: typeof square = (x: number) => {
  return x ** 2;
};
// MEMO: 変数と関数はtypeでexportするメリットはなさそう
