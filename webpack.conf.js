const path = require('path');

const webpackConfig = {
    entry:'./index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'etherium-blockies-png',
        umdNamedDefine: true,
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname),
                ],
                options: {
                    presets: ['env']
                }
            }
        ]
    }
}

module.exports = webpackConfig;