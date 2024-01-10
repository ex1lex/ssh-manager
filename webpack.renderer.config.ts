import path from 'path';
import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';

export const rendererConfig: Configuration = {
	module: {
		rules,
	},
	resolve: {
		alias: {
			'@app': path.resolve(__dirname, 'src/app'),
			'@app/*': path.resolve(__dirname, 'src/app/*'),
			'@widgets': path.resolve(__dirname, 'src/widgets'),
			'@widgets/*': path.resolve(__dirname, 'src/widgets/*'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@pages/*': path.resolve(__dirname, 'src/pages/*'),
			'@shared': path.resolve(__dirname, 'src/shared'),
		},
		extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
	},
};
