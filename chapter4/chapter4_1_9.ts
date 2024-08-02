const chapter4_1_9 = () => {
  interface Car {
    engineType: string;
    volume: number;
  }

  // 同じインターフェイス名で宣言すると、プロパティがマージされる
  interface Car {
    color: string;
  }

  const myCar: Car = {
    engineType: "V6",
    volume: 3000,
    color: "red",
  };

  // 2回目のCar宣言でcolorがマージされたので、colorを設定しないとエラーになる
  // プロパティ 'color' は型 '{ engineType: string; volume: number; }' にありませんが、型 'Car' では必須です。ts(2741)
  // const herCar: Car = {
  //   engineType: "V6",
  //   volume: 3000,
  // };
};

const chapter4_1_9_type = () => {
  type Car = {
    engineType: string;
    volume: number;
  };

  // 型エイリアスはエラーになりマージできない
  // 識別子 'Car' が重複しています。ts(2300)
  // type Car = {
  //   color: string;
  // };
};
