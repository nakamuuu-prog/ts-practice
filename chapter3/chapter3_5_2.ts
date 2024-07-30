// オブジェクト型
const chapter3_5_2 = () => {
  // 型の名前ではなくオブジェクトの構造に基づいて型付けを行うシステムを構造的型付け(structural typing)という
  // objectという非プリミティブな値を表す型もあるが、ほとんど使わない
  type Book = {
    title: string;
    author: string;
    publishedIn: number;
  };

  const book: Book = {
    title: "こころ",
    author: "夏目漱石",
    publishedIn: 19140420,
  };
};
