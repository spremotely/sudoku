﻿const path = require('path');
const webpack = require('webpack');
module.exports = {
	mode: 'development',
	entry: {
		'polyfills': './ClientApp/polyfills.ts',
		'app': './ClientApp/main.ts'
	},
	output: {
		path: path.resolve(__dirname, './wwwroot/dist'),
		publicPath: '/dist/',
		filename: "[name].js"
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					{
						loader: 'awesome-typescript-loader',
						options: { configFileName: path.resolve(__dirname, 'tsconfig.json') }
					},
					'angular2-template-loader'
				]
			}, {
				test: /\.html$/,
				loader: 'html-loader'
			}, {
				test: /\.css$/,
				loaders: ["to-string-loader", "css-loader"]
			}
		]
	},
	plugins: [
		new webpack.ContextReplacementPlugin(
			/angular(\\|\/)core/,
			path.resolve(__dirname, 'ClientApp'),
			{}
		)
	]
};