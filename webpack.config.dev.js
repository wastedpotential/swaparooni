const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const { builtinModules } = require('module');

module.exports = {
	plugins: [
		new HtmlWebpackPlugin({
			hash: true,
			title: 'wasted potential',
			metaDesc: 'just a weird interactive anagram swapping thingy',
			template: './src/index.html',
			filename: 'index.html',
			inject: 'body',
		}),
		new CopyWebpackPlugin({
			patterns: [{ from: 'src/assets', to: 'assets' }],
		}),
	],
	module: {
		rules: [
			{
				test: /\.(js)$/,
				loader: 'string-replace-loader',
				options: {
					search: '__ROOT_URL__',
					replace: '',
					flags: 'g',
				},
			},
		],
	},
	mode: 'development',
	output: {
		clean: true,
	},
	devServer: {
		static: './dist',
		open: true,
		devMiddleware: {
			writeToDisk: true,
		},
	},
};
