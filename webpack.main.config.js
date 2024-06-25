const {DefinePlugin} = require('webpack');

module.exports = {
    /**
     * This is the main entry point for your application, it's the first file
     * that runs in the main process.
     */
    entry: './src/main.js',
    // Put your normal webpack config below here
    module: {
        rules: require('./webpack.rules'),
    },
    plugins: [
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ]
};
