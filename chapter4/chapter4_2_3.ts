// 省略記法
const chapter4_2_3_4 = () => {
  class OrignalClass {
    public name: string;
    protected age: number;
    private address: string;

    constructor(name: string, age: number, address: string) {
      this.name = name;
      this.age = age;
      this.address = address;
    }
  }

  // コンストラクタの引数お中で修飾子をつけることで、プロパティへの代入を省略できる
  class AbbreviatedClass {
    constructor(
      public name: string,
      protected age: number,
      private address: string
    ) {}
  }
};
