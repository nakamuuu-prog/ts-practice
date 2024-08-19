// デコレータ
const chapter7_1_1 = () => {
  // デコレータはクラスやそのメンバーに紐付けて実行することで、その挙動に変更を加えることができる
  // targetはデコレートされたクラスやそのメンバーの情報
  function myDecorator(target: any) {
    console.log(target); // [class Person]
  }

  // デコレータは@式で記述し、式は関数である必要がある
  // デコレータはPersonの情報を引数として受け取り実行される
  @myDecorator
  class Person {}

  // classにデコレータを適用するとインスタンスを生成したときにmyDecoratorが呼ばれる
  // デコレータを使うと元の見た目を変更することなく、再利用可能な方法で挙動を変更することができる
  const person = new Person();
};
