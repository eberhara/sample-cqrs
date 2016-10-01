import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config = {
    entry: [
    	'webpack-dev-server/client?http://localhost:8080/#/',
        'webpack/hot/only-dev-server',
        path.join(__dirname, '../', 'src', 'app')
    ],

    output: {
        path: path.join(__dirname, '../', 'dist'),
        filename: 'js/bundle.js',
        publicPath: ''
    },

    resolve: {
        extensions: ['', '.js', '.jsx', '.json']
    },

	module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['react-hot', 'babel'],
                exclude: /node_modules/,
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],

    debug: true,
    devtool: 'cheap-module-eval-source-map',

    devServer: {
        hot: true,
        port: '8080',
        inline: true,
        progress: true,
        historyApiFallback: true,
    }
}

export default config;
