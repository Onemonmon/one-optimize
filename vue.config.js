const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const ElementPlus = require("unplugin-element-plus/webpack");
const { resolve } = require("path");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

const resolvePath = (path) => resolve(__dirname, path);

module.exports = {
  devServer: { port: 9000, open: true },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolvePath("src"),
      },
    },
    plugins: [
      // ElementPlus(),
      Components({ resolvers: [ElementPlusResolver()] }),
    ],
  },
  chainWebpack: (config) => {
    // 按需加载lodash
    if (process.env.NODE_ENV === "production") {
      config.plugin("loadshReplace").use(new LodashModuleReplacementPlugin());
    }
  },
};
