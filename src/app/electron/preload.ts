import { contextBridge } from 'electron';
const path = window.require('path');
const fs = window.require('fs');

const defaultPath = path.join(process.env.HOME, '.ssh');

declare global {
	interface Window {
		electron: {
			getFileNames: () => string[];
			getConfigFile: () => string[];
		};
	}
}

const getFileNames = (): string[] => {
	return fs.readdirSync(defaultPath);
};

const getFile = (fileName: string): string => {
	return fs.readFileSync(`${defaultPath}/${fileName}`, 'utf8');
};

const createFile = (fileName: string, type = '', data = '') => {
	const result = fs.writeFileSync(
		`${defaultPath}/${fileName}${type ? `.${type}` : ''}`,
		data,
		'utf8'
	);

	return result;
};

contextBridge.exposeInMainWorld('electron', {
	getFileNames: () => {
		return getFileNames();
	},
	getConfigFile: () => {
		try {
			return getFile('config').split(/^\s*$/m);
		} catch (e) {
			createFile('config');
			return getFile('config');
		}
	},
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
