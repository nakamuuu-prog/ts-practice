const chapter4_1_7 = () => {
  interface Vehicle {
    speed: number;
    model: string | null;
  }

  // インターフェイス拡張時にプロパティの型をオーバーライドすることもできる
  // C#やJavaでもできただろうか？知ってたようで知ってなかったのでメモ
  interface Car extends Vehicle {
    engineType: string;
    model: string; // プロパティをオーバーライド
  }

  const vehicle: Vehicle = {
    speed: 3000,
    model: null, // (property) model: string | null
  };

  const car: Car = {
    engineType: "V6",
    speed: 3000,
    model: "2023", // (property) model: string
  };

  // ただし、オーバーライドはベースインターフェイスのプロパティの型と互換性がないといけない。
  // インターフェイス 'Bicycle' はインターフェイス 'Vehicle' を正しく拡張していません。
  // プロパティ 'model' の型に互換性がありません。
  //   型 'number' を型 'string' に割り当てることはできません。ts(2430)
  // interface Bicycle extends Vehicle {
  //   bicycleTypes: string;
  //   model: number;
  // }
};

const chapter4_1_7_type = () => {
  type Vehicle = {
    speed: number;
    model: string | null;
  };

  // 型エイリアスは継承できないが、インターセクション型を使うと似たようなことができる
  type Car = Vehicle & {
    engineType: string;
    model: string;
  };

  const vehicle: Vehicle = {
    speed: 3000,
    model: null, // (property) model: string | null
  };

  const car: Car = {
    engineType: "V6",
    speed: 3000,
    model: "2023", // (property) model: string
  };

  // 型エイリアスは互換性がなくても特にエラーは出ないが、その場合はnever型になってしまう
  type Bicycle = Vehicle & {
    bicycleTypes: string;
    model: number;
  };

  // const bicycle: Bicycle = {
  //   bicycleTypes: "Road Bike",
  //   // 型 'number' を型 'never' に割り当てることはできません。ts(2322)
  //   model: 2024, // (property) model: never
  // };
};
