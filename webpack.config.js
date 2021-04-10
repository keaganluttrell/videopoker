// Generated using webpack-cli http://github.com/webpack-cli
const path = require('path');
const ENTRY = path.resolve(__dirname, 'client', 'index.js');
const OUT_DIR = path.resolve(__dirname, 'public');

module.exports = {
    mode: 'development',
    entry: ENTRY,
    output: {
        path: OUT_DIR,
        filename: 'main.js',
    },
    plugins: [],
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [path.resolve(__dirname, 'client')],
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/,
                type: 'asset',
            },
            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
    },
};
