// null型
const chapter3_6_10 = () => {
  const porson = {
    age: 25,
    firstName: Math.random() > 0.5 ? "Alice" : null,
  };

  // toUpperCaseはstring型に用意されている関数なので、nullの可能性がある要素で呼び出すことはできない
  // console.log(porson.firstName.toUpperCase()); // 'porson.firstName' は 'null' の可能性があります。ts(18047)

  // オプショナルチェーン演算子(?.)を使うことで、nullでないときにtoUpperCaseを実行することができる
  console.log(porson.firstName?.toUpperCase());
};
