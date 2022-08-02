### 项目优化

#### 优化打包体积

首先是需要优化项目使用的业务组件库的打包体积，通过配置 external 属性，剔除 vue、element-plus 这些包

项目中分析打包体积，可以做如下优化：

1. 通过 unplugin-vue-components 和 unplugin-element-plus 对 element-plus 做按需引入

   问题 1：业务组件库里使用到了 v-loading 这个指令，但是按需引入并没有将 ElLoading 这个组件引入，所以需要在 main.ts 里手动 use(ElLoading)

   问题 2：unplugin-element-plus 按需引入样式只会对项目中的组件生效，而业务组件库中的组件样式并没有按需引入

2. 项目中的 lodash 也需要按需引入
   2.1 可以通过单文件 lodash/cloneDeep 引入
   2.2 如果是 es6 项目也可以通过 lodash-es 引入
   2.3 可以配合插件 lodash-webpack-plugin babel-plugin-lodash

   问题：element-plus 中的代码全量引入了 lodash，所以会导致项目的 lodash 按需失败

3. 项目中使用到了 moment
   3.1 通过 new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/) 去除额外的语言包
   3.2 使用 dayjs 替换 moment

#### 项目开发编译速度优化

1. 使用 esbuild 代替 webpack 作为开发编译工具
