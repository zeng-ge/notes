/***
 * prettier是一个代码格式化工具
 * 它可以将代码格式化成统一的模式
 * 如const a=1, b=2;格式化成了
 * const a = 1,
 *  b = 2;
 *
 * const name="tod"
 * 格式化成
 * const name = 'tod'
 *
 * prettier --single-quote --trailing-comma none --write
 * --single-quote是指用单引号
 * --trailing-comma none去掉拖尾的逗号
 * --no-semi 去掉分号
 * --arrow-parens avoid 当箭头函数只有一个参数时，去掉括号
 * --no-bracket-spacing {a: 'a'}不带空格，默认是带的
 * --end-of-line crlf设置换行符为\r\n（windows) linux和unix默认为lf即\n
 *
 * lint-staged和husky
 * husky是加git hooks
 * prettier在工作时一般只需要对修改过的文件进行处理，lint-staged可以获取到修改的文件
 */
const a = 1,
  b = 2

const name = ''

const obj = { a: 'a' }

const fn = x => {}
