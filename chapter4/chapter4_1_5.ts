// インデックスシグニチャは動的にプロパティ名が変わる可能性がある場合や、外部のデータソース(APIなど)など、事前にプロパティ名が定義されていないオブジェクトを型付けするときに最も適している
// インデックスシグニチャは動的にプロパティ名を定義できる便利な機能だが、プロパティを明確に定義できる場合は具体的なプロパティを定義すること
const chapter4_1_5_1 = () => {
  // インデクッスシグニチャは [キーの名前(任意): キーの型]: 値の型; という構文で使用できる
  interface FruitStock {
    [i: string]: number;
  }

  const fruit: FruitStock = {};
  // インデックスシグニチャは任意のプロパティを追加できる
  fruit.apple = 3;
  fruit.orange = 5;
  // fruit.banana = "many"; // 型 'string' を型 'number' に割り当てることはできません。ts(2322)

  // 値を設定していないプロパティにアクセスすることができる
  // この場合undefinedとなる
  console.log(fruit.pine);
};

const chapter4_1_5_2 = () => {
  // 明示的なプロパティと組み合わせることもできる
  interface FruitStock {
    peach: number;
    [i: string]: number;
  }

  // 明示的なプロパティは必須なので最初に値を設定する
  const fruit: FruitStock = { peach: 1 };
  fruit.apple = 3;
  fruit.orange = 5;
};

const chapter4_1_5_3 = () => {
  interface Product {
    // キー名をテンプレート文字列にすることもできる
    // この場合はproduct_のあとに数値が続くキーになる
    [key: `product_${number}`]: string;
  }

  const productA: Product = {
    product_1: "foo",
    product_2: "bar",
    product_10: "baz",
  };

  const productB: Product = {
    product_1: "foo",
    product_2: "bar",
    // product_のあとが数値ではないのでエラー
    // product_dx: "baz", //オブジェクト リテラルは既知のプロパティのみ指定できます。'product_dx' は型 'Product' に存在しません。ts(2353)
  };
};

// 書いてないけど型エイリアスでも同じことができる
const chapter4_1_5_2_type = () => {
  type FruitStock = {
    peach: number;
    [i: string]: number;
  };

  const fruit: FruitStock = { peach: 1 };
  fruit.apple = 3;
  fruit.orange = 5;
};

const chapter4_1_5_3_type = () => {
  type Product = {
    [key: `product_${number}`]: string;
  };

  const productA: Product = {
    product_1: "foo",
    product_2: "bar",
    product_10: "baz",
  };

  const productB: Product = {
    product_1: "foo",
    product_2: "bar",
  };
};
