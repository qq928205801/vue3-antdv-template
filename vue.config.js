const Timestamp = new Date().getTime()
process.env.VUE_APP_VERSION = require('./package.json').version
const webpack = require('webpack')
const { defineConfig } = require('@vue/cli-service')
const { name } = require('./package.json')
// cdn链接
const cdn = {
  // cdn：模块名称和模块作用域命名
  externals: {
    // 'ant-design-vue': 'antd',
    'moment': 'moment',
    'nprogress': 'NProgress',
    'mockjs': 'Mock'
  },
  // cdn的css链接
  css: [
    'https://cdn.bootcdn.net/ajax/libs/ant-design-vue/3.2.17/antd.min.css',
    'https://cdn.bootcdn.net/ajax/libs/nprogress/0.2.0/nprogress.min.css'
  ],
  // cdn的js链接
  js: [
    // 'https://cdn.bootcdn.net/ajax/libs/ant-design-vue/3.2.17/antd.min.js',
    'https://cdn.bootcdn.net/ajax/libs/moment.js/2.29.4/moment.min.js',
    'https://cdn.bootcdn.net/ajax/libs/nprogress/0.2.0/nprogress.min.js',
    'https://cdn.bootcdn.net/ajax/libs/Mock.js/1.0.0/mock.js'
  ]
}
const envPath = ['production', 'dev', 'pro', 'report']

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,//关闭eslint校验
  outputDir: 'dist2',//打包文件名
  publicPath: ['development', 'report'].includes(process.env.NODE_ENV) ? '/' : './',
  devServer: {
    port: 8080,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {//代理
      // '^/api': {
      //   target: 'https://nest-api.buqiyuan.site/api/',
      //   changeOrigin: true,
      //   logLevel: 'debug',
      //   pathRewrite: {
      //     '^/api': '',
      //   },
      // },
    },
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'report') {//report环境加载webpack-bundle-analyzer
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
    }
    if (['development', 'dev', 'pro'].includes(process.env.NODE_ENV)) {//去除console和debugger
      config.optimization.minimizer("terser").tap(args => {
        const compress = args[0].terserOptions.compress;
        compress.drop_console = true;
        compress.drop_debugger = true;
        return args;
      });
    }
    if (envPath.includes(process.env.NODE_ENV)) {
      // const CompressionWebpackPlugin = require('compression-webpack-plugin')//前端开启gzip压缩，还需后端更改相应配置
      // config.plugin('CompressionPlugin').use(
      //   new CompressionWebpackPlugin({
      //     test: /\.(js|css)$/,
      //     threshold: 10240, // 超过10kb的文件就压缩
      //     deleteOriginalAssets: false, // 不删除源文件
      //     minRatio: 0.8
      //   })
      // )
    }
    // config.plugin('html').tap(args => {
    //   // 生产环境或本地需要cdn时，才注入cdn
    //   args[0].cdn = cdn
    //   return args
    // })
    // 移除 preload 插件
    config.plugins.delete('preload');
    // 移除 prefetch 插件
    config.plugins.delete('prefetch');
  },
  configureWebpack: (config) => {// webpack 配置
    config.output = {//打包后的文件名
      ...config.output,
      // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      // filename: `[name].${process.env.VUE_APP_VERSION}.${Timestamp}.js`,
      // chunkFilename: `[name].${process.env.VUE_APP_VERSION}.${Timestamp}.js`,
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      chunkLoadingGlobal: `webpackJsonp_${name}`,//webpack 5中已将jsonpFunction 更名为 chunkLoadingGlobal
    }
    config.plugins = [
      ...config.plugins,
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),//压缩moment
    ]
    // config.externals = envPath.includes(process.env.NODE_ENV) ? cdn.externals : {}
    // config.externals = cdn.externals //不打包模块
  },
  css: {
    // 配置css模块
    loaderOptions: {
      // 向预处理器 Loader 传递配置选项
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {},
        },
        // additionalData: `@import "~@/styles/variables.less";`,
      },
    }
  },
  productionSourceMap: false
})
