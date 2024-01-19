import webpack from 'webpack';
import { merge } from 'webpack-merge';

import 'webpack-dev-server';
import baseConfig from './webpack.base';

const devConfig: webpack.Configuration = {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		historyApiFallback: true,
		host: 'localhost',
		port: 3000,
		hot: true,
		open: true,
		compress: true
	}
};

export default merge(baseConfig, devConfig);
