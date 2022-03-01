const path = require("path");
const CracoLessPlugin = require("craco-less");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const resolve = dir => path.resolve(__dirname, dir);
const srcDir=resolve("public");
module.exports = {
  webpack: {
    alias: {
      "@": resolve("src"),
      "components": resolve("src/components")
    },
    plugins:{
      add:[
        new HtmlWebpackPlugin({
          template: `${srcDir}/index.html`,
          filename: 'index.html',
          publicPath: '/', // 确保引用js资源的路径是以’/‘ 开头的,解决对于react嵌套路由，点击刷新后，报错404的问题
        }),
      ]
    }
  },
  plugins:[
    {
      plugin:CracoLessPlugin,//配置less文件解析
      options: {
        lessLoaderOptions: {
            lessOptions: { javascriptEnabled: true }
        },

      }
    },
    
  ]

}