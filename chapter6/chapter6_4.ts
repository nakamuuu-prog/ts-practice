// ジェネリッククラス
const chapter6_4_1 = () => {
  class DataStotage<T> {
    private items: T[] = [];

    add(item: T): void {
      this.items.push(item);
    }

    getItem(index: number): T {
      return this.items[index];
    }

    getAllItems(): T[] {
      return [...this.items];
    }
  }

  // number型の配列を作る
  let numberStorage = new DataStotage<number>();
  numberStorage.add(3);
  numberStorage.add(6);
  numberStorage.add(9);
  numberStorage.add(12);
  console.log(numberStorage.getItem(0)); // 3
  console.log(numberStorage.getAllItems()); // [ 3, 6, 9, 12 ]
};

// ジェネリッククラスの型推論
const chapter6_4_2 = () => {
  class DataStotage<T> {
    private items: T[] = [];

    constructor(initialItems?: T[]) {
      if (initialItems) {
        this.items.push(...initialItems);
      }
    }

    add(item: T): void {
      this.items.push(item);
    }

    getItem(index: number): T {
      return this.items[index];
    }

    getAllItems(): T[] {
      return [...this.items];
    }
  }

  // let stringStorage: DataStotage<string>
  let stringStorage = new DataStotage(["Ryu", "Ken"]);
};

// ジェネリッククラスの継承
const chapter6_4_3 = () => {
  class DataStotage<T> {
    private items: T[] = [];

    add(item: T): void {
      this.items.push(item);
    }

    getItem(index: number): T {
      return this.items[index];
    }

    getAllItems(): T[] {
      return [...this.items];
    }
  }

  // ジェネリックなサブクラスの型引数は、型情報をスーパークラスの型引数に渡すことができる
  class DataStotageLogger<T> extends DataStotage<T> {
    printAllItems(): void {
      const allItems = this.getAllItems();
      console.log("Stored items:", allItems);
    }

    getFirstItem(): T {
      return this.getItem(0);
    }
  }

  let numberStorage = new DataStotageLogger<number>();
  numberStorage.add(85);
  numberStorage.add(90);
  console.log(numberStorage.getFirstItem()); // 85

  // スーパークラスに型引数の情報が渡っているためエラー
  // 型 'string' の引数を型 'number' のパラメーターに割り当てることはできません。ts(2345)
  // numberStorage.add("12");
};
