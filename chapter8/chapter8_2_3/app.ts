// global.d.tsを宣言する前
// HTMLのscriptタグに宣言されたグローバル変数をTSが認識することができない
// 名前 'myGlovalVal' が見つかりません。ts(2304)
console.log(myGlovalVal);

// global.d.tsを宣言した後
// 宣言ファイルを自作することでTSがHTMLのscriptタグに宣言されたグローバル変数を認識することができるようになる
// var myGlovalVal: string
console.log(myGlovalVal);
