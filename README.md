### 项目优化

#### 优化打包体积

首先是需要优化项目使用的业务组件库的打包体积，通过配置 external 属性，剔除 vue、element-plus 这些包

项目中分析打包体积，可以做如下优化：

##### 按需引入

1. 通过 unplugin-vue-components 对 element-plus 做按需引入

   问题 1：业务组件库里使用到了 v-loading 这个指令，但是按需引入并没有将 ElLoading 这个组件引入

   解决方案：需要在 main.ts 里手动 use(ElLoading)

   问题 2：ElementPlusResolver 按需引入样式只会对项目中的组件生效，而业务组件库中用到的 ElementPlus 组件样式并没有按需引入

   解决方案：写一个业务组件库的 resolver，然后在 unplugin-vue-components 中使用

2. 项目中的 lodash 也需要按需引入
   2.1 可以通过单文件 lodash/cloneDeep 引入
   2.2 如果是 es6 项目也可以通过 lodash-es 引入
   2.3 可以配合插件 lodash-webpack-plugin babel-plugin-lodash

   问题：element-plus 中的代码全量引入了 lodash，所以会导致项目的 lodash 按需失败

3. 项目中使用到了 moment
   3.1 通过 new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/) 去除额外的语言包
   3.2 使用 dayjs 替换 moment

4. echarts 按需引入
   不同类型的图表，分别拆分成组件，可以防止 echart 打包后体积过大

#### 项目开发编译速度优化

1. 使用 esbuild 代替 webpack 作为开发编译工具
