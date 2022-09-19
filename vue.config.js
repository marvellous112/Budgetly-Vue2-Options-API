const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
    transpileDependencies: true,
    filenameHashing: false, /* Disable hashes in filenames */
    publicPath: process.env.NODE_ENV === 'production' ? '/Budgetly-Vue2-CLI/' : '/',
});