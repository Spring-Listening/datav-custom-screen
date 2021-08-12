/*
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-07-20 15:44:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-20 17:58:21
 */
module.exports = {
  publicPath: './',
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json', '.ts', '.tsx']
    },
    devServer: {
      disableHostCheck: true,
      overlay: {
        warnings: false,
        errors: false
      },
      proxy: {
        '/api': {
          target: '/',
          changeOrigin: true,
          pathRewrite: { '^/api': '' }
        }
      }
    }
  },
  chainWebpack: () => {}
}
