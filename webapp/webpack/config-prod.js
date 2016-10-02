import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const configProd = {
    entry: [
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
        })
    ],

}

export default configProd;
