const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true,
  pluginOptions: {
    i18n: {
      locale: 'ru',
      fallbackLocale: ['en', 'uk'],
      localeDir: 'locales',
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true,
    },
  },
});
