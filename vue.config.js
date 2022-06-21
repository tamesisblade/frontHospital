/*=========================================================================================
  File Name: vue.config.js
  Description: configuration file of vue
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
const webpack = require('webpack');

module.exports = {
    publicPath: '/',
    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ],
    configureWebpack: {
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        },
        plugins: [
            new webpack.DefinePlugin({
                // allow access to process.env from within the vue app
                'process.env': {
                    apiProlipa: JSON.stringify(process.env[`${process.env.NODE_ENV.toUpperCase()}_API_PROLIPA`]),
                    apiProlipaData: JSON.stringify(process.env[`${process.env.NODE_ENV.toUpperCase()}_API_PROLIPA_DATA`]),
                    apiStrapi: JSON.stringify(process.env[`${process.env.NODE_ENV.toUpperCase()}_API_STRAPI`]),
                    socket: JSON.stringify(process.env[`${process.env.NODE_ENV.toUpperCase()}_SOCKET`]),
                }
            })
        ]
    },
    // devServer: {
    //   overlay: {
    //     warnings: true,
    //     errors: true
    //   }
    // }
}