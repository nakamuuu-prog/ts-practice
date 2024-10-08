// any型
const chapter3_6_8 = () => {
  // any型はどんなものでも代入できるため、型安全ではない
  // できるだけ使用は避けるべき
  // any型が用意されている主な理由は以下2つ
  // ①JSからTS移行時、すべてのコードに型注釈が困難なため一時的に使用する
  // ②サードパーティや外部APIから返されるデータ型が不明なとき
  // 型を明示的に指定できない場合や、TSが型推論できない場合はanyになるが、できるだけanyより安全なunknown型を検討するべき
  let value: any = 1;
  value = "noTypeCheck";
  value.nocheck();
};
