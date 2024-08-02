const chapter4_1_6 = () => {
  // 関数型
  type CalcFunction = (n1: number, n2: number) => number;
  // インターフェイスの呼び出しシグネチャ(call signature)
  // 関数型と違い (引数): 返り値 で記述する
  interface CalcInterface {
    (n1: number, n2: number): number;
  }

  const add: CalcFunction = (n1, n2) => n1 + n2;
  const subtract: CalcInterface = (n1, n2) => n1 - n2;

  // 関数型でもcall signatureは使える
  type CalcFunc = {
    (n1: number, n2: number): number;
  };

  const add2: CalcFunc = (n1, n2) => n1 + n2;
};
