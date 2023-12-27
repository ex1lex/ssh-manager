import type { ModuleOptions } from 'webpack';

export const rules: Required<ModuleOptions>['rules'] = [
	{
		test: /\.s[ac]ss$/i,
		use: ['style-loader', 'css-loader', 'sass-loader'],
	},
	{
		test: /\.css$/,
		use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
	},
	{
		test: /native_modules[/\\].+\.node$/,
		use: 'node-loader',
	},
	{
		test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
		parser: { amd: false },
		use: {
			loader: '@vercel/webpack-asset-relocator-loader',
			options: {
				outputAssetBase: 'native_modules',
			},
		},
	},
	{
		test: /\.tsx?$/,
		exclude: /(node_modules|\.webpack)/,
		use: {
			loader: 'ts-loader',
			options: {
				transpileOnly: true,
			},
		},
	},
];
