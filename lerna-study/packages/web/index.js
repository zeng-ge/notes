/**
 *
 * lerna-study-ui是普通的npm包由npm init得到
 * @lerna-study/utils是带scope的包
 * mkdir utils & cd utils
 * npm init --scope=lerna-study
 * utils/package.json里面name是@lerna-study/utils
 *
 * 为web添加utils与ui两个依赖
 * lerna add @lerna-study/utils --scope=web
 * lerna add lerna-study-ui --scope=web
 * 这样在web/package.json里面的dependencies就会多出
 * @lerna-study/utils与lerna-study-ui两个依赖
 *
 * lerna bootstrap可以为各个工程建立本地的依赖
 * 如在web工程里面，配上utils与ui的依赖，执行bootstrap后，
 * web/node_modules里面就会出现utils与ui的文件
 *
 * lerna publish可以将相应的packages push到npm镜象里面去
 * 在package.json里面配上private: true的工程不会被push
 *
 *
 * lerna相关
 * --scope的作用就是过来过滤出目录包
 * lerna init初始化一个lerna工程，由package.json, lerna.json, packages组成
 * lerna clean 移除各个包的node_modules
 * lerna create 创建一个lerna管理的package, 如lerna create abc后packages/abc就出现了
 * lerna diff 显示相对于上一次publish后，修改的内容，类似于git diff，但是它比较的对象是publish时的内容
 * lerna add dependentModule --scope=targetModule将依赖包添加到目标模块如将ui加到web
 *  --exact 添加依赖时用一个具体的版本号，如1.0.1而不是用~或^1.0.1
 * lerna list列出所有的lerna包，不包含private: true的包
 * lerna exec在每个包下面执行一个命令,--后面跟命令，如lerna exec -- ls列出每个包下的文件
 * lerna link 为彼此依赖的lerna包建立符号链接， bootstrap时会用到
 * lerna run 在每个包下面运行一个命令，如lerna run build,相当于在每个包下面运行npm run build
 * lerna version为修改的包升级版本,它会自动添加一个关于版本修改的git提交
 * lerna changed会列出修改包的下一个版本号，还会更出那个包会publish
 * lerna publish发布包，它会用lerna version升级版本，还会将对应git版本存进package.json的gitHead
 *  version, publish都是在git commit之后才会工作，否则它认为没有修改进而执行
 * lerna bootstrap
 *  相当于
 *    1. npm install
 *    2. 为彼此依赖的lerna包建立符号链接, link感觉就像硬连接，如web依赖ui, 修改ui中的文件,
 *        web/node_modules/ui里的文件也跟着变
 *    3. npm run prepublish 和 npm run prepare
 *
 * npm相关
 * 带scope的包（即私有包）只有付费用户才能publish，普通用户只能publish公开包
 * npm addUser可以注册一个npm user
 * npm login可以登录到npm，publish之前需要login
 * npm init用来初始化一个包, npm init --scope=abc初始化一个scope包,如@abc/utils
 * npm publish用来发布包
 * npm lint 的作用：
 *  有一个本在moduleA，
 *  有一个工程projectA
 *  moduleA与projectA的修改都很频繁, projectA希望一直能访问最新的moduleA
 *  正常情况下的流程是moduleA修改=>publish=>ProjectA install最新的moduleA，这样太慢
 *
 *  cd moduleA & npm lint将moduleA加到了/global/node_modules
 *  cd productA & npm lint moduleA将projectA/node_modules/moduleA指向/global/node_modules
 *  这样productA就会直接访问本地的moduleA了
 *
*/
const Form = require('lerna-study-ui/components/Form')
const utils = require('@lerna-study/utils/string')
new Form()
console.log(utils.trim(' a  b   '))
