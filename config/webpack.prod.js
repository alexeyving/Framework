const baseConfig = require('./webpack.base');
const webpack = require('webpack');
const merge = require('webpack-merge');
const {CONFIG} = require('./config');

const ExtractPlugin = require('extract-text-webpack-plugin');
const NoErrorsPlugin = webpack.NoEmitOnErrorsPlugin;

const {JS_TEMPLATE, CSS_TEMPLATE} = CONFIG;

const cfg = {
	watch: false,
	cache: false,
	devtool: 'source-map',
	output: {
		filename: JS_TEMPLATE
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader!postcss-loader'})
			},
			{
			test: /\.scss$/,
			use: ExtractPlugin.extract({
				fallback: 'style-loader',
				use: 'css-loader!postcss-loader!sass-loader'})
		}]
	},
	plugins: [
		new ExtractPlugin('styles.css'),
		new NoErrorsPlugin()
	]
};

module.exports = merge(baseConfig, cfg);