const path = require('path')

const config = require('./common.config')

const prodConfig = Object.assign({}, config, {
	mode: 'production',
	output: Object.assign({}, config.output, {
		path: path.resolve('./prod')
	})
})

module.exports = prodConfig
