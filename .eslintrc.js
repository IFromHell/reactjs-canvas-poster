module.exports = {
    root: true,
    parser: '@babel/eslint-parser',
    env: {
        browser: true,
        node: true,
        commonjs: true,
        es6: true
    },
    globals: {
        '__DEV__': true,
    },
    parserOptions: {
        ecmaFeatures: {
            legacyDecorators: true,
            globalReturn: false,// 不允许 return 语句出现在 global 环境下
            impliedStrict: true,// 开启全局 script 模式
            jsx: true,
            allowImportExportEverywhere: false,// 仅允许 import export 语句出现在模块的顶层
            requireConfigFile: false,// 即使没有 babelrc 配置文件，也使用 babel-eslint 来解析
        },
        ecmaVersion: 2019,
        sourceType: 'module',
        requireConfigFile: false,
    },
    // extends: ["plugin:prettier/recommended"],
    plugins: ['react'],
    rules: {
        'accessor-pairs': ['error', { setWithoutGet: true, getWithoutSet: false }], // setter 必须有对应的 getter，getter 可以没有对应的 setter
        'array-callback-return': 'error', // 数组的方法除了 forEach 之外，回调函数必须有返回值
        'block-scoped-var': 'off', // 将 var 定义的变量视为块作用域，禁止在块外使用  @reason 已经禁止使用 var 了
        'callback-return': 'off', // callback 之后必须立即 return
        'camelcase': 'off', // 变量名必须是 camelcase 风格的
        'capitalized-comments': 'off', // 注释的首字母必须大写
        'class-methods-use-this': 'off', // 在类的非静态方法中，必须存在对 this 的引用
        'complexity': ['off', { max: 30 }], // 限制圈复杂度在20以内
        'consistent-return': 'off', // 禁止函数在不同分支返回不同类型的值  @reason 缺少 TypeScript 的支持，类型判断是不准确的
        'consistent-this': 'off', // 限制 this 的别名
        'constructor-super': 'error', // constructor 中必须有 super
        'default-case': 'off', // switch 语句必须有 default
        'default-param-last': 'off', // 有默认值的参数必须放在函数参数的末尾
        'dot-notation': 'off', // 禁止使用 foo['bar']，必须写成 foo.bar  @reason 当需要写一系列属性的时候，可以更统一
        'eqeqeq': ['error', 'always'], // 必须使用 === 或 !==，禁止使用 == 或 !=
        'for-direction': 'error', // 禁止方向错误的 for 循环
        'func-name-matching': ['error', 'always', { includeCommonJSModuleExports: false }], // 函数赋值给变量的时候，函数名必须与变量名一致
        'func-names': 'off', // 函数必须有名字
        'func-style': 'off', // 必须只使用函数声明或只使用函数表达式
        'global-require': 'warn', // require 必须在全局作用域下
        'grouped-accessor-pairs': 'error', // setter 和 getter 必须写在一起
        'guard-for-in': 'off', // for in 内部必须有 hasOwnProperty
        'handle-callback-err': 'off', // callback 中的 err 必须被处理  @reason 它是通过字符串匹配来判断函数参数 err 的，不准确
        'id-blacklist': 'off', // 禁止使用指定的标识符
        'id-length': 'off', // 限制变量名长度
        'id-match': 'off', // 限制变量名必须匹配指定的正则表达式
        'init-declarations': 'off', // 变量必须在定义的时候赋值
        'line-comment-position': 'off', //单行注释必须写在上一行
        'lines-between-class-members': 'off', // 类的成员之间是否需要空行 @reason 有时为了紧凑需要挨在一起，有时为了可读性需要空一行
        'max-classes-per-file': 'off', // 限制一个文件中类的数量
        'max-depth': ['error', 6], // 代码块嵌套的深度禁止超过 5 层
        'max-lines': 'off', // 限制一个文件最多的行数
        'max-lines-per-function': 'off', // 限制函数块中的代码行数
        'max-nested-callbacks': ['error', 3], // 回调函数嵌套禁止超过 3 层，多了请用 async await 替代
        'max-params': ['warn', 5], // 函数的参数禁止超过 3 个
        'max-statements': 'off', // 限制函数块中的语句数量
        'max-statements-per-line': 'off', // 限制一行中的语句数量
        'multiline-comment-style': 'off', // 约束多行注释的格式  @reason 能写注释已经不容易了，不需要限制太多
        'new-cap': ['off', { newIsCap: true, capIsNew: false, properties: true }], // new 后面的类名必须首字母大写
        'no-alert': 'warn', // 禁止使用 alert
        'no-array-constructor': 'error', // 禁止使用 Array 构造函数时传入的参数超过一个  @reason 参数为一个时表示创建一个指定长度的数组，比较常用
        'no-async-promise-executor': 'error', // 禁止将 async 函数做为 new Promise 的回调函数  @reason 出现这种情况时，一般不需要使用 new Promise 实现异步了
        'no-await-in-loop': 'off', // 禁止将 await 写在循环里，因为这样就无法同时发送多个异步请求了  @reason 要求太严格了，有时需要在循环中写 await
        'no-bitwise': 'off', // 禁止使用位运算
        'no-buffer-constructor': 'warn', // 禁止直接使用 Buffer  @reason Buffer 构造函数是已废弃的语法
        'no-caller': 'error', // 禁止使用 caller 或 callee  @reason 它们是已废弃的语法
        'no-case-declarations': 'error', // switch 的 case 内有变量定义的时候，必须使用大括号将 case 内变成一个代码块
        'no-class-assign': 'error', // 禁止对已定义的 class 重新赋值
        'no-compare-neg-zero': 'error', // 禁止与 -0 进行比较
        'no-cond-assign': ['error', 'except-parens'], // 禁止在条件语句中出现赋值操作符
        'no-console': ['error', { allow: ['warn', 'error', 'info', 'trace'] }], // 禁止使用 console
        'no-const-assign': 'error', //  禁止对使用 const 定义的常量重新赋值
        'no-constant-condition': ['error', { checkLoops: false }], // 禁止在条件中使用常量表达式
        'no-constructor-return': 'error', // 禁止在构造函数中返回值
        'no-continue': 'off', // 禁止使用 continue
        'no-control-regex': 'off', // 禁止在正则表达式中出现 Ctrl 键的 ASCII 表示，即禁止使用 /\x1f/  @reason 几乎不会遇到这种场景
        'no-debugger': 'warn', // 禁止使用 debugger
        'no-delete-var': 'error', // 禁止对一个变量使用 delete  @reason 编译阶段就会报错了
        'no-div-regex': 'off', // 禁止在正则表达式中出现形似除法操作符的开头，如 let a = /=foo/  @reason 有代码高亮的话，在阅读这种代码时，也完全不会产生歧义或理解上的困难
        'no-dupe-args': 'error', // 禁止在函数参数中出现重复名称的参数
        'no-dupe-class-members': 'error', // 禁止重复定义类的成员
        'no-dupe-else-if': 'error', // 禁止 if else 的条件判断中出现重复的条件
        'no-dupe-keys': 'error', // 禁止在对象字面量中出现重复的键名
        'no-duplicate-case': 'error', // 禁止在 switch 语句中出现重复测试表达式的 case
        'no-duplicate-imports': 'error', // 禁止重复导入模块
        'no-else-return': 'off', // 禁止在 else 内使用 return，必须改为提前结束  @reason else 中使用 return 可以使代码结构更清晰
        'no-empty': ['error', { allowEmptyCatch: true }], // 禁止出现空代码块，允许 catch 为空代码块
        'no-empty-character-class': 'error', // 禁止在正则表达式中使用空的字符集 []
        'no-empty-function': 'off', // 不允许有空函数  @reason 有时需要将一个空函数设置为某个项的默认值
        'no-empty-pattern': 'error', // 禁止解构赋值中出现空 {} 或 []
        'no-eq-null': 'off', // 禁止使用 foo == null，必须使用 foo === null
        'no-eval': 'error', // 禁止使用 eval
        'no-ex-assign': 'error', // 禁止将 catch 的第一个参数 error 重新赋值
        'no-extend-native': 'error', // 禁止修改原生对象  @reason 修改原生对象可能会与将来版本的 js 冲突
        'no-extra-bind': 'error', // 禁止出现没必要的 bind
        'no-extra-boolean-cast': 'error', // 禁止不必要的布尔类型转换
        'no-extra-label': 'off', // 禁止出现没必要的 label
        'no-fallthrough': 'error', // switch 的 case 内必须有 break, return 或 throw，空的 case 除外
        'no-func-assign': 'warn', // 禁止将一个函数声明重新赋值
        'no-global-assign': 'error', // 禁止对全局变量赋值
        'no-implicit-coercion': ['warn', { allow: ['!!'] }], // 禁止使用 ~+ 等难以理解的类型转换，仅允许使用 !!
        'no-implicit-globals': 'warn', // 禁止在全局作用域下定义变量或申明函数
        'no-implied-eval': 'error', // 禁止在 setTimeout 或 setInterval 中传入字符串
        'no-import-assign': 'error', // 禁止对导入的模块进行赋值
        'no-inline-comments': 'off', // 禁止在代码后添加单行注释
        'no-inner-declarations': ['error', 'both'], // 禁止在 if 代码块内出现函数声明
        'no-invalid-regexp': 'error', // 禁止在 RegExp 构造函数中出现非法的正则表达式
        'no-invalid-this': 'off', // 禁止在类之外的地方使用 this  @reason 只允许在 class 中使用 this
        'no-irregular-whitespace': ['error', { skipStrings: true, skipComments: true, skipRegExps: true, skipTemplates: true }], // 禁止不规则的空白
        'no-iterator': 'error', // 禁止使用 __iterator__  @reason __iterator__ 是一个已废弃的属性, 使用 [Symbol.iterator] 替代它
        'no-label-var': 'off', // 禁止 label 名称与已定义的变量重复  @reason 已经禁止使用 label 了
        'no-labels': 'error', // 禁止使用 label
        'no-lone-blocks': 'error', // 禁止使用没必要的 {} 作为代码块
        'no-lonely-if': 'off', // 禁止 else 中只有一个单独的 if  @reason 单独的 if 可以把逻辑表达的更清楚
        'no-loop-func': 'off', // 禁止在循环语句中出现包含不安全引用的函数声明  @reason 使用 let 就已经解决了这个问题了
        'no-magic-numbers': 'off', // 禁止使用 magic numbers
        'no-misleading-character-class': 'error', // 不允许在字符类语法中出现由多个代码点组成的字符
        'no-mixed-requires': 'warn', // 禁止混合常规变量声明和 require 调用
        'no-multi-assign': 'error', // 禁止连续赋值，比如 foo = bar = 1
        'no-multi-str': 'error', // 禁止使用 \ 来换行字符串
        'no-negated-condition': 'off', // 禁止 if 里有否定的表达式  @reason 否定的表达式可以把逻辑表达的更清楚
        'no-nested-ternary': 'off', // 禁止使用嵌套的三元表达式，比如 a ? b : c ? d : e
        'no-new': 'error', // 禁止直接 new 一个类而不赋值  @reason new 应该作为创建一个类的实例的方法，所以不能不赋值
        'no-new-func': 'error', // 禁止使用 new Function  @reason 这和 eval 是等价的
        'no-new-object': 'error', // 禁止直接 new Object
        'no-new-require': 'error', // 禁止直接 new require('foo')
        'no-new-symbol': 'error', // 禁止使用 new 来生成 Symbol
        'no-new-wrappers': 'error', // 禁止使用 new 来生成 String, Number 或 Boolean
        'no-obj-calls': 'error', // 禁止将 Math, JSON 或 Reflect 直接作为函数调用
        'no-octal': 'off', // 禁止使用 0 开头的数字表示八进制数
        'no-octal-escape': 'off', // 禁止使用八进制的转义符
        'no-param-reassign': 'off', // 禁止对函数的参数重新赋值
        'no-path-concat': 'warn', // 禁止对 __dirname 或 __filename 使用字符串连接  @reason 不同平台下的路径符号不一致，建议使用 path 处理平台差异性
        'no-plusplus': 'off', // 禁止使用 ++ 或 --
        'no-process-env': 'off', // 禁止使用 process.env.NODE_ENV
        'no-process-exit': 'off', // 禁止使用 process.exit(0)
        'no-proto': 'error', // 禁止使用 __proto__  @reason __proto__ 是已废弃的语法
        'no-prototype-builtins': 'off', // 禁止使用 hasOwnProperty, isPrototypeOf 或 propertyIsEnumerable
        'no-redeclare': 'off', // 禁止重复定义变量 已禁用 var
        'no-regex-spaces': 'error', // 禁止在正则表达式中出现连续的空格
        'no-restricted-globals': 'off', // 禁止使用指定的全局变量
        'no-restricted-imports': 'off', // 禁止导入指定的模块
        'no-restricted-modules': 'off', // 禁止使用指定的模块
        'no-restricted-properties': 'off', // 禁止使用指定的对象属性
        'no-restricted-syntax': 'off', // 禁止使用指定的语法
        'no-return-assign': ['off', 'always'], // 禁止在 return 语句里赋值
        'no-return-await': 'off', // 禁止在 return 语句里使用 await
        'no-script-url': 'off', // 禁止出现 location.href = 'javascript:void(0)';
        'no-self-assign': 'error', // 禁止将自己赋值给自己
        'no-self-compare': 'error', // 禁止将自己与自己比较
        'no-sequences': 'error', // 禁止使用逗号操作符
        'no-setter-return': 'error', // 禁止 setter 有返回值
        'no-shadow': 'off', // 禁止变量名与上层作用域内的已定义的变量重复  @reason 很多时候函数的形参和传参是同名的
        'no-shadow-restricted-names': 'error', // 禁止使用保留字作为变量名
        'no-sparse-arrays': 'error', // 禁止在数组中出现连续的逗号
        'no-sync': 'off', // 禁止使用 node 中的同步的方法，比如 fs.readFileSync
        'no-template-curly-in-string': 'error', // 禁止在普通字符串中出现模版字符串里的变量形式
        'no-ternary': 'off', // 禁止使用三元表达式
        'no-this-before-super': 'error', // 禁止在 super 被调用之前使用 this 或 super
        'no-throw-literal': 'off', // 禁止 throw 字面量，必须 throw 一个 Error 对象
        'no-undef': 'error', // 禁止使用未定义的变量
        'no-undef-init': 'off', // 禁止将 undefined 赋值给变量
        'no-undefined': 'off', // 禁止使用 undefined
        'no-underscore-dangle': 'off', // 禁止变量名出现下划线
        'no-unmodified-loop-condition': 'error', // 循环内必须对循环条件中的变量有修改
        'no-unneeded-ternary': 'warn', // 必须使用 !a 替代 a ? false : true
        'no-unreachable': 'error', // 禁止在 return, throw, break 或 continue 之后还有代码
        'no-unsafe-finally': 'error', // 禁止在 finally 语句块中出现控制流语句 [return, throw, break 或 continue]
        'no-unsafe-negation': 'error', // 禁止在 in 或 instanceof 操作符的左侧变量前使用感叹号
        'no-unused-expressions': 'off', // ['error', { allowShortCircuit: true, allowTernary: true, allowTaggedTemplates: true }], // 禁止无用的表达式
        'no-unused-labels': 'off', // 禁止出现没用到的 label  @reason 已经禁止使用 label 了
        'no-unused-vars': ['error', { vars: 'all', args: 'none', ignoreRestSiblings: false, caughtErrors: 'none' }], // 已定义的变量必须使用
        'no-use-before-define': ['off', { variables: false, functions: false, classes: false }], // 变量必须先定义后使用  许多样式出现在类定义后
        'no-useless-call': 'error', // 禁止出现没必要的 call 或 apply
        'no-useless-catch': 'error', // 禁止在 catch 中仅仅只是把错误 throw 出去  @reason 这样的 catch 是没有意义的，等价于直接执行 try 里的代码
        'no-useless-computed-key': 'error', // 禁止出现没必要的计算键名
        'no-useless-concat': 'error', // 禁止出现没必要的字符串连接
        'no-useless-constructor': 'error', // 禁止出现没必要的 constructor
        'no-useless-escape': 'off', // 禁止出现没必要的转义  @reason 转义可以使代码更易懂
        'no-useless-rename': 'error', // 禁止解构赋值时出现同样名字的的重命名，比如 let { foo: foo } = bar;
        'no-useless-return': 'off', // 禁止没必要的 return
        'no-var': 'error', // 禁止使用 var
        'no-void': 'error', // 禁止使用 void
        'no-warning-comments': 'off', // 禁止注释中出现 TODO 和 FIXME
        'no-with': 'error', // 禁止使用 with
        'object-shorthand': 'off', // 必须使用 a = {b} 而不是 a = {b: b}
        'one-var': ['warn', 'never'], // 禁止变量申明时用逗号一次申明多个
        'operator-assignment': 'off', // 必须使用 x = x + y 而不是 x += y
        'padding-line-between-statements': 'off', // 限制语句之间的空行规则，比如变量定义完之后必须要空行
        'prefer-const': 'warn', // 要求使用 const 声明那些声明后不再被修改的变量
        'prefer-destructuring': 'off', // 必须使用解构赋值
        'prefer-exponentiation-operator': 'off', // 使用 ES2016 的语法 ** 替代 Math.pow
        'prefer-named-capture-group': 'off', // 使用 ES2018 中的正则表达式命名组
        'prefer-numeric-literals': 'off', // 必须使用 0b11111011 而不是 parseInt()
        'prefer-object-spread': 'error', // 必须使用 ... 而不是 Object.assign，除非 Object.assign 的第一个参数是一个变量
        'prefer-promise-reject-errors': 'warn', // Promise 的 reject 中必须传入 Error 对象，而不是字面量
        'prefer-regex-literals': 'warn', // 优先使用正则表达式字面量，而不是 RegExp 构造函数
        'prefer-rest-params': 'off', // 必须使用 ...args 而不是 arguments
        'prefer-spread': 'off', // 必须使用 ... 而不是 apply，比如 foo(...args)
        'prefer-template': 'off', // 必须使用模版字符串而不是字符串连接
        'radix': 'off', // parseInt 必须传入第二个参数
        'no-mixed-spaces-and-tabs': 'error', // 禁止使用 空格 和 tab 混合缩进
        'no-whitespace-before-property': 'error', // 禁止属性前出现空格，如 foo. bar()
        "no-spaced-func": "error",//函数调用时 函数名与()之间不能有空格
        'space-in-parens': ['warn', 'never'],
        "comma-spacing": ['warn', { before: false, after: true }],
        'object-curly-spacing': ['warn', 'always'],
        /**
         * 禁止由于 await 或 yield的使用而可能导致出现竞态条件的赋值
         * @reason 这样会导致不符合预期的结果
         * https://github.com/eslint/eslint/issues/11899
         * 在上面 issue 修复之前，关闭此规则
         */
        'require-atomic-updates': 'off',
        'require-await': 'error', // async 函数中必须存在 await 语句
        'require-unicode-regexp': 'off', // 正则表达式中必须要加上 u 标志
        'require-yield': 'error', // generator 函数内必须有 yield
        'semi': 'warn', // 分号
        'sort-imports': 'off', // 导入必须按规则排序
        'sort-keys': 'off', // 对象字面量的键名必须排好序
        'sort-vars': 'off', // 变量申明必须排好序
        'spaced-comment': ['off', 'always', { block: { exceptions: ['*'], balanced: true } }], // 注释的斜线或 * 后必须有空格
        'strict': ['error', 'never'], // 禁止使用 'strict';
        'symbol-description': 'error', // 创建 Symbol 时必须传入参数
        'use-isnan': 'error', // 必须使用 isNaN(foo) 而不是 foo === NaN
        'valid-typeof': 'error', // typeof 表达式比较的对象必须是 'undefined', 'object', 'boolean', 'number', 'string', 'function', 'symbol', 或 'bigint'
        'vars-on-top': 'off', // var 必须在作用域的最前面
        'yoda': ['error', 'never', { onlyEquality: true }], // 必须使用 if (foo === 5) 而不是 if (5 === foo)
        'key-spacing': ['warn', { "beforeColon": false, 'afterColon': true }], // json : 之前不能有空格，之后必须有空格
        'keyword-spacing': ['warn', { "before": true }],
        'arrow-spacing': ['warn', { 'before': true, 'after': true }], // 箭头函数箭头两侧必须有空格
        'space-before-blocks': 'warn', // 代码块之前必须有空格

        // react 相关规则
        'react/jsx-tag-spacing': 'warn',
        'react/boolean-prop-naming': 'off', // 布尔值类型的 propTypes 的 name 必须为 is 或 has 开头
        'react/button-has-type': 'off', // <button> 必须有 type 属性
        'react/default-props-match-prop-types': 'off', // 一个 defaultProps 必须有对应的 propTypes
        'react/destructuring-assignment': 'off', // props, state, context 必须用解构赋值
        'react/display-name': 'off', // 组件必须有 displayName 属性
        'react/forbid-component-props': 'off', // 禁止在自定义组件中使用指定的 props
        'react/forbid-dom-props': 'off', // 禁止在 dom 组件中使用指定的 props
        'react/forbid-elements': 'off', // 禁止使用指定的组件
        'react/forbid-foreign-prop-types': 'off', // 禁止使用另一个组件的 propTypes
        'react/forbid-prop-types': 'off', // 禁止使用 PropTypes.any PropTypes.array 和 PropTypes.object
        'react/function-component-definition': 'off', // 限制函数式组件的函数形式（函数声明、函数表达式或箭头函数）
        'react/jsx-boolean-value': 'off', // 布尔值的属性必须显式的声明值为 true
        'react/jsx-curly-brace-presence': ['error', 'never'], // 禁止 jsx 中使用无用的引号
        'react/jsx-filename-extension': 'off', // 限制文件后缀
        'react/jsx-fragments': ['off', 'syntax'], // 必须使用 <></> 而不是 React.Fragment
        'react/jsx-handler-names': 'off', // handler 的名称必须是 onXXX 或 handleXXX
        'react/jsx-key': ['error', { checkFragmentShorthand: true }], // 数组中的 jsx 必须有 key
        'react/jsx-max-depth': 'off', // 限制 jsx 层级
        'react/jsx-no-bind': 'off', // jsx 中禁止使用 bind
        'react/jsx-no-comment-textnodes': 'error', // 禁止在 jsx 中使用像注释的字符串
        'react/jsx-no-duplicate-props': 'error', // 禁止出现重复的 props
        'react/jsx-no-literals': 'off', // 禁止在 jsx 中出现字符串
        'react/jsx-no-script-url': 'off', // 禁止出现 href="javascript:void(0)"  @reason React 已经有 warning 了，并且会在将来禁止此类属性值
        'react/jsx-no-target-blank': 'off', // 禁止使用 target="_blank"
        'react/jsx-no-undef': 'error', // 禁止使用未定义的组件
        'react/jsx-no-useless-fragment': 'error', // 禁止无意义的 Fragment 组件
        'react/jsx-pascal-case': 'off', // 组件的名称必须符合 PascalCase
        'react/jsx-props-no-spreading': 'off', // 禁止使用 {...props}
        'react/jsx-sort-default-props': 'off', // defaultProps 必须按字母排序
        'react/jsx-sort-props': 'off', // props 必须按字母排序
        'react/jsx-uses-react': 'error', // 修复 React 被误报为未使用的变量的问题（仅在开启 no-unused-vars 时有效）
        'react/jsx-uses-vars': 'error', // 修复 no-unused-vars 不检查 jsx 的问题
        'react/no-access-state-in-setstate': 'off', // 禁止在 setState 中使用 this.state
        'react/no-adjacent-inline-elements': 'warn', // 两个 inline 元素之间必须有空格，否则视觉上它们就贴在一起了
        'react/no-array-index-key': 'off', // 禁止使用数组的索引作为 key
        'react/no-children-prop': 'error', // 禁止将 children 作为一个 prop
        'react/no-danger': 'warn', // 禁止使用 dangerouslySetInnerHTML
        'react/no-danger-with-children': 'error', // 禁止在使用了 dangerouslySetInnerHTML 的组件内添加 children
        'react/no-deprecated': 'error', // 禁止使用已废弃的 api
        'react/no-did-mount-set-state': 'off', // 禁止在 componentDidMount 里使用 setState  @reason 同构应用需要在 didMount 里使用 setState
        'react/no-did-update-set-state': 'error', // 禁止在 componentDidUpdate 里使用 setState
        'react/no-direct-mutation-state': 'off', // 禁止直接修改 this.state
        'react/no-find-dom-node': 'warn', // 禁止使用 findDOMNode
        'react/no-is-mounted': 'error', // 禁止使用 isMounted  @reason 它是已废弃的语法
        'react/no-multi-comp': 'off', //  禁止在一个文件创建两个组件
        'react/no-redundant-should-component-update': 'error', // 禁止在 React.PureComponent 中使用 shouldComponentUpdate
        'react/no-render-return-value': 'error', // 禁止使用 ReactDOM.render 的返回值
        'react/no-set-state': 'off', // 禁止使用 setState
        'react/no-string-refs': 'off', // 禁止使用字符串 ref
        'react/no-this-in-sfc': 'error', // 禁止在函数组件中使用 this
        'react/no-typos': 'error', // 禁止组件的属性或生命周期大小写错误
        'react/no-unescaped-entities': 'off', // 禁止在组件的内部存在未转义的 >, ", ' 或 }
        'react/no-unknown-property': 'error', // 禁止出现 HTML 中的属性，如 class
        'react/no-unsafe': ['off', { checkAliases: true }], // 禁止使用不安全的生命周期方法 componentWillMount, componentWillReceiveProps, componentWillUpdate
        'react/no-unused-prop-types': 'off', // 禁止出现未使用的 propTypes
        'react/no-unused-state': 'off', // 已定义的 state 必须使用
        'react/no-will-update-set-state': 'off', // 禁止在 componentWillUpdate 中使用 setState
        'react/prefer-es6-class': ['off', 'always'], // 必须使用 Class 的形式创建组件
        'react/prefer-read-only-props': 'off', // 使用 Flow 时，props 必须设置为只读的
        'react/prefer-stateless-function': 'off', // 必须使用函数式组件
        'react/prop-types': 'off', // 组件必须写 propTypes
        'react/react-in-jsx-scope': 'off', // 出现 jsx 的地方必须导入 React
        'react/require-default-props': 'off', // 非 required 的 prop 必须有 defaultProps
        'react/require-optimization': 'off', // 组件必须有 shouldComponentUpdate
        'react/require-render-return': 'error', // render 方法中必须有返回值
        'react/self-closing-comp': 'error', // 组件内没有 children 时，必须使用自闭和写法
        'react/sort-comp': 'off', // 组件内方法必须按照一定规则排序
        'react/sort-prop-types': 'off', // propTypes 的属性必须按照字母排序
        'react/state-in-constructor': 'off', // 必须在构造函数中初始化 state
        'react/static-property-placement': 'error', // 类的静态属性必须使用 static 关键字定义
        'react/style-prop-object': 'off', // style 属性的取值必须是 object
        'react/void-dom-elements-no-children': 'error' // img, br 标签中禁止有 children
    },
};