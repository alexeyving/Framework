const path = require('path');
const ROOT = process.cwd();

exports.CONFIG = {
	APP_PORT: process.env.port || process.env.PORT || 9000,
	DEV_PORT: process.env.port || process.env.PORT || 9001,
	JS_TEMPLATE: '[name]-[chunkhash].js',
	CSS_TEMPLATE: '[name]-[contenthash].css',
	ASSET_TEMPLATE: '[name]-[hash].[ext]'
};

exports.PATHS = {
	ROOT,
	SRC: path.join(ROOT, 'src'),
	ASSETS: path.join(ROOT, 'dist/assets'),
	DIST: path.join(ROOT, 'dist'),
	HTML: path.join(ROOT, 'html/pages')
};

exports.UTILS = {
	isExternal
};

function isExternal(module) {
	let userRequest = module.userRequest;
	if (typeof userRequest !== 'string') {
		return false;
	}
	return userRequest.indexOf('node_modules') >= 0 ||
		userRequest.indexOf('libraries') >= 0;
}