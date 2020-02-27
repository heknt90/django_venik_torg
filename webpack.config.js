let webpack = require('webpack');


let webpackConfig = {
    context: __dirname,
    output: {
        filename: '[name].min.js',
        // library: '[name]'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                loader: 'babel-loader'
            },
        ]
    },
    plugins: []
};


let developmentConfig = Object.assign({}, webpackConfig, {
    mode: 'development',
    watch: true,
    devtool: '#cheap-module-eval-source-map',
    plugins: webpackConfig.plugins.concat([
        new webpack.NoEmitOnErrorsPlugin()
    ])
});


let productionConfig = Object.assign({}, webpackConfig, {
    mode: 'production',
    // output: {
    //     filename: '[name].min.js',
    //     library: '[name]'
    // },
    plugins: webpackConfig.plugins.concat([
        // removes a lot of debugging code in React
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        // new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}})
    ])
});


module.exports = {
    development: developmentConfig,
    production: productionConfig
};
