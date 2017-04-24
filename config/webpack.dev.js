const baseConfig = require('./webpack.base');
const merge = require('webpack-merge');

const cfg = {
	watch: true,
	cache: true,
	devtool: 'source-map',
	output: {
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [{
					loader: 'style-loader'
				},
					{
						loader: 'css-loader'
					}, {
						loader: 'postcss-loader'
					}]
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'postcss-loader',
					},
					{
						loader: 'sass-loader',
					}
				]
			}]
	}
};

module.exports = merge(baseConfig, cfg);