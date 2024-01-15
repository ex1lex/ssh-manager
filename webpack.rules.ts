import type { ModuleOptions } from 'webpack';

export const rules: Required<ModuleOptions>['rules'] = [
	{
		test: /\.scss$/i,
		exclude: /\.module\.scss$/i,
		use: [
			{
				loader: 'style-loader',
			},
			{
				loader: 'css-loader',
				options: {
					importLoaders: 1,
					modules: {
						mode: 'icss',
					},
				},
			},
			{
				loader: 'sass-loader',
			},
		],
	},
	{
		test: /\.module\.scss$/i,
		use: [
			{
				loader: 'style-loader',
			},
			{
				loader: 'css-loader',
				options: {
					importLoaders: 1,
					modules: {
						mode: 'local',
						localIdentName: '[hash:base64:5]--[local]',
					},
				},
			},
			{
				loader: 'sass-loader',
			},
		],
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
	{
		test: /\.(png|jpg|jpeg|gif)$/,
		type: 'asset/resource',
		generator: {
			filename: 'assets/images/[name][ext]',
		},
	},
];
