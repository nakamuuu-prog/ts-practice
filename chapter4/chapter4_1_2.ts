const chapter4_1_2 = () => {
  interface Person {
    name: string;
    age: number;
    speak(word: string): void;
  }

  const speak = (word: string) => {
    console.log(`私は${word}です`);
  };

  const person: Person = {
    name: "Jone",
    age: 20,
    speak: speak,
  };

  person.speak(person.name);
};

const chapter4_1_2_type = () => {
  // 「インターフェイスを便用すると、オブジェクトが実装すべきメソッドも定義できます。」と記載してあるけど、型エイリアスでも定義できる
  type Person = {
    name: string;
    age: number;
    speak(word: string): void;
  };

  const speak = (word: string) => {
    console.log(`私は${word}です`);
  };

  const person: Person = {
    name: "Jone",
    age: 20,
    speak: speak,
  };

  person.speak(person.name);
};
