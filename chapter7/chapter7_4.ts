// フィールドデコレータ
const chapter7_4 = () => {
  // Vはフィールドの値の型
  function loggedField<This, V>(
    _target: undefined, // 常にundefined
    context: ClassFieldDecoratorContext<This, V>
  ) {
    return function (this: This, intialValue: V) {
      console.log(
        `${context.name.toString()} フィールドを ${intialValue} で初期化`
      );

      return intialValue; // 戻り値が初期値として置き換わる
    };
  }

  class Person {
    @loggedField
    private _name = "John";
  }

  // _name フィールドを John で初期化
  const person = new Person();
};
