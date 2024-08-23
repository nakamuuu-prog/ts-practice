// モジュールの利用
// モジュール機能を利用するにはexportとimportを利用する
// exportの方法① 個別でexport
export const PI = 3.14;

export function square(x: number) {
  return x ** 2;
}

export class Rectangle {
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

// exportの方法② 一括でexport
// export { PI, square, Rectangle };
