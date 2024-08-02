const chapter4_1_8 = () => {
  interface Born {
    birthYear: number;
    place: string;
  }

  interface Hobby {
    hobbies: string[];
  }

  // 複数のインターフェイスを組み合わせることもできる
  // より複雑な型を構築することもできるし、コードの再利用性も向上する
  interface Person extends Born, Hobby {
    name: string;
  }

  const mike: Person = {
    name: "Mike",
    birthYear: 1995,
    place: "New York",
    hobbies: ["tennis", "cooking", "chess"],
  };
};

const chapter4_1_8_type = () => {
  type Born = {
    birthYear: number;
    place: string;
  };

  type Hobby = {
    hobbies: string[];
  };

  // 型エイリアスは&で繋げると可能
  type Person = Born &
    Hobby & {
      name: string;
    };

  const mike: Person = {
    name: "Mike",
    birthYear: 1995,
    place: "New York",
    hobbies: ["tennis", "cooking", "chess"],
  };
};
