module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule("vue")
      .test(/\.vue$/)
      .use("style-vw-loader")
      .loader("style-vw-loader");
    config.plugin("define").tap(args => {
      args[0]["process.env"].BUILD_ENV = JSON.stringify(process.env.BUILD_ENV);
      return args;
    });
  }
};
