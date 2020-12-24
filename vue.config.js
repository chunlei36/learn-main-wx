module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    plugins: [],
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader'
        }
      ]
    },
  },
}