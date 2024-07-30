// unknown型
const chapter3_6_9 = () => {
  // unknown型はどんな型が当てはまるかわからないときに使う
  // なんでも代入できるany型と違い、厳格な制約が適用される
  let value1: unknown = 1;

  // any型と違い、unknown型は型チェックが入る
  // let value2: number = value1; // 型 'unknown' を型 'number' に割り当てることはできません。ts(2322)

  // 算術演算も許可されない
  // console.log(value1 + 1); // 'value1''は 'unknown' 型です。ts(18046)

  // 比較演算子が許可されているため、型チェックを行うことで代入や算術演算を行うようにすることができる
  if (typeof value1 === "number") {
    console.log(value1 + 1);
    let value2: number = value1;
  }
};
