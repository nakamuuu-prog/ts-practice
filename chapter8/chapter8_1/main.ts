// import文はモジュールシステムによって拡張子の扱いが異なる
// CommonJSの場合は拡張子を自動で解決してくれるので省略可
// ES Modulesにしたがってモジュールを扱う場合は、ファイル名のあとに「.js」拡張子を入れる必要がある
// 「.ts」ではなく「.js」にするのは、実行後のファイルはコンパイル後のJSファイルであるため
// (node:26476) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
// (Use `node --trace-warnings ...` to show where the warning was created)
// ⚪︎⚪︎/chapter8/chapter8_1/main.ts:1
// import { PI, square, Rectangle } from "./calc";
// ^^^^^^
import { PI, square, Rectangle } from "./calc";

console.log(PI);

const result = square(3);
console.log(result);

const rect = new Rectangle(5, 10);
console.log(rect.getArea());
