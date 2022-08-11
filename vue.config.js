const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const { resolve } = require("path");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const { OneComponentsResolver } = require("one-components-resolver");

const resolvePath = (path) => resolve(__dirname, path);

module.exports = {
  devServer: { port: 9000 },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolvePath("src"),
      },
    },
    plugins: [
      Components({
        resolvers: [ElementPlusResolver(), OneComponentsResolver()],
      }),
    ],
  },
  chainWebpack: (config) => {
    // 按需加载lodash
    if (process.env.NODE_ENV === "production") {
      config.plugin("loadshReplace").use(new LodashModuleReplacementPlugin());
    }
  },
};
