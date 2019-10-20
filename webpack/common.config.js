const path = require('path')
const webpack = require('webpack')

const config = {
	context: path.resolve('./src'),
	entry: { app: '.' },
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: 'ts-loader'
			}
		]
	},
	output: { filename: '[name].js' },
	plugins: [new webpack.NoEmitOnErrorsPlugin()],
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
		modules: [
			path.resolve('./src'),
			'node_modules'
		]
	},
	target: 'web'
}

module.exports = config
