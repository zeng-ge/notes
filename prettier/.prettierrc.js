module.exports = {
  printWidth: 120,//一行的宽度最大为120
  tabWidth: 2,//一个tab等于两个空格
  /**
   * 不要分号
   */
  semi: false,
  /**
   * none不要拖尾的逗号
   * es5 对象，数组内部可以有拖尾的分号
   * all 都可以有
   */
  trailingComma: 'none',
  /**
   * 单引号, jsx文件会无视这个选项
   */
  singleQuote: true,
  /**
   * 在jsx中使用单引号
   */
  jsxSingleQuote: true,
  /***
   * {}的开头与结尾处为空格
   * { a: 'a' }
   */
  bracketSpacing: true,
  /***
   * true:
   * 开始与结束的<是对齐的
   * <button>
   *  a
   * </button>
   *
   * false:
   * <button
   *  class="abc"
   * >
   *  a
   * <button>
   */
  jsxBracketSameLine: true,
  /**
   * 箭头函数只有一个参数时，是否需要（）
   * avoid 不要，如 x => {}
   * always 需要， (x) => {]}
   */
  arrowParens: 'avoid',
  /**
   * lf /n
   * crlf /r/n
   * auto
   * cr /r
   */
  endOfLine: 'lf'
}
