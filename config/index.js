const path  = require("path");

const config = {
  projectName: 'taro-statter',
  date: '2019-1-22',
  // 设计稿尺寸
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  // 通用插件配置
  plugins: {
    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'transform-decorators-legacy',
        'transform-class-properties',
        'transform-object-rest-spread'
      ]
    },
    uglify: {
      enable: true,
      config: {
        // 配置项同 https://github.com/mishoo/UglifyJS2#minify-options
        warnings: false
      }
    },
    csso: {
      enable: true,
      config: {
        // 配置项同 https://github.com/css/csso#minifysource-options
      }
    }
  },
  // 全局变量设置
  defineConstants: {
  },
  // 文件 copy 配置
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  // 小程序端专用配置
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: [
              'last 3 versions',
              'Android >= 4.1',
              'ios >= 8'
            ]
          }
        },
        pxtransform: {
          enable: true,
          config: {

          }
        },
        // 小程序端样式引用本地资源内联配置
        url: {
          enable: true,
          config: {
            limit: 10240 // 设定转换尺寸上限
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    output: {
      filename: 'js/[name].[hash:8].js',
      chunkFilename: 'js/[name].[chunkhash:8].js'
    },
    cssLoaderOption: {
      localIdentName: '[hash:base64]'
    },
    enableDll:true,
    dllEntry: {
      lib: ['nervjs', '@tarojs/taro-h5', '@tarojs/router', '@tarojs/components']
    },
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: [
              'last 3 versions',
              'Android >= 4.1',
              'ios >= 8'
            ]
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    }
  },
  //配置别名 方便模块导入
  alias: {
    //'@': path.resolve(__dirname, '..', 'src'),
    '@utils': path.resolve(__dirname, '..', 'src/utils'),
    '@constants': path.resolve(__dirname, '..', 'src/constants'),
    '@': path.resolve(__dirname, '..', 'src')
  }

}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
