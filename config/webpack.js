// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var merge = require('webpack-merge')

module.exports = {
  build: {
    env: {NODE_ENV: '"production"'},
    index: path.resolve(__dirname, '../app/public/index.html'),//生产index.html的路径
    assetsRoot: path.resolve(__dirname, '../app/public'),//生产资源文件的根目录
    assetsSubDirectory: 'dist',//在dist里面生成资源文件的目录
    assetsPublicPath: '/public',//在index.html里面引用资源时的前缀
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: merge({NODE_ENV: '"production"'}, {NODE_ENV: '"development"'}),
    port: 9000,
    autoOpenBrowser: true,
    assetsSubDirectory: 'dist',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
