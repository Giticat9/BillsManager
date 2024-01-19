import path from 'path';
import webpack from 'webpack';
import ForkTsCheckerPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { createTransformer } from 'typescript-plugin-styled-components';

const styledComponentsTransformer = createTransformer();

const baseConfig: webpack.Configuration = {
	entry: path.resolve(__dirname, '..', 'src', 'index.tsx'),
	output: {
		path: path.resolve(__dirname, '..', 'build'),
		filename: '[name].[contenthash:8].js',
		publicPath: '/',
		clean: true
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', 'jsx']
	},
	module: {
		defaultRules: [
			{
				test: /\ts|tsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'ts-loader',
					options: {
						transpileOnly: true,
						getCustomTransformers: () => ({
							before: [styledComponentsTransformer]
						})
					}
				}
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'images/[name].[ext]'
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'images/[name].[ext]'
				}
			},
			{
				test: /\.(svg)$/,
				type: 'asset/resource',
				generator: {
					filename: 'images/[name].[ext]'
				}
			}
		]
	},
	plugins: [
		new ForkTsCheckerPlugin({
			async: true,
			typescript: {
				diagnosticOptions: {
					semantic: true,
					syntactic: true
				}
			}
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, '..', 'public', 'template', 'default.html'),
			inject: 'body',
			hash: true
		})
	]
};

export default baseConfig;
