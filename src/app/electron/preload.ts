import { contextBridge } from 'electron';

import api from '../api';

declare global {
	interface Window {
		electron: {
			getListOfConfigs: () => Record<string, any>[];
			getConfigByHost: (host: string) => Record<string, any>;
		};
	}
}

// const getFileNames = (): string[] => {
// 	return fs.readdirSync(defaultPath);
// };

contextBridge.exposeInMainWorld('electron', {
	...api,
	// readFile: (fileName: any) => {
	// 	const fileText = fs.readFileSync(getFilePath(fileName), 'utf8');
	// 	return fileText;
	// },
	// createFile: (fileName: any) => {
	// 	const fileTitle = getFilePath(fileName);
	// 	fs.writeFileSync(`${fileTitle}.txt`, '');
	// },
	// writeFile: (fileName: any, fileText: any) =>
	// 	fs.writeFileSync(getFilePath(fileName), fileText),
	// deleteFile: (fileName: any) => fs.unlinkSync(getFilePath(fileName)),
});
