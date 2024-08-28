export const allowJs = () => {};

// NOTE:checkJsとallowJsをtrueにしても、とくにエラーは発生しない
export const checkJs = () => {
  // JSDocコメントを以下のように書くことで型を明示的に注記できる
  // NOTE:JSDocを書くとJSDoc以下がすべてコメントアウトされる
  // /**
  //  * @param {string} name
  //  * /
  function greet(name) {
    console.log(`Hello, ${name}`);
  }
};
