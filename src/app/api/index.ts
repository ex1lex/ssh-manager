import { TConfig, TFile } from '@shared/types';

const SSHConfig = window.require('ssh-config');

const path = window.require('node:path');
const fs = window.require('node:fs');

const defaultPath = path.join(process.env.HOME, '.ssh');

const defaultConfigName = 'config';

const preparePath = (fileName: string) => `${defaultPath}/${fileName}`;

const checkIsFileExist = (fileName: string): boolean => {
	return fs.existsSync(preparePath(fileName));
};

const getFile = async (fileName: string): Promise<string> => {
	return await new Promise((res, rej) => {
		fs.readFile(preparePath(fileName), 'utf8', (err: any, data: any) => {
			if (err) rej(err);
			res(data);
		});
	});
};

const createFile = async (
	fileName: string,
	type = '',
	data: string | ArrayBuffer = ''
) => {
	const result = await new Promise((res) => {
		fs.writeFile(
			preparePath(`${fileName}${type ? `.${type}` : ''}`),
			data,
			'utf8',
			() => {
				res(true);
			}
		);
	});

	return result;
};

const writeFile = async (fileName: string, fileText: any) => {
	await new Promise((res) => {
		fs.writeFile(preparePath(fileName), fileText, 'utf8', () => {
			res(true);
		});
	});
};

const parseConfig = async () => {
	const input = await getFile(defaultConfigName);
	return SSHConfig.parse(input);
};

const getConfigFile = async (): Promise<any[]> => {
	try {
		await getFile(defaultConfigName);
	} catch (e) {
		await createFile(defaultConfigName);
	}
	try {
		const config = await parseConfig();
		return config.reduce((acc: any[], item: any) => {
			try {
				acc.push(config.compute(item.value));
			} catch (e) {
				return acc;
			}
			return acc;
		}, []);
	} catch (e) {
		console.error(e);
		return [];
	}
};

const getListOfConfigs = async () => {
	return await getConfigFile();
};

const getConfigByHost = async (host: string): Promise<Record<string, any>> => {
	const configs = await parseConfig();
	const config = configs.compute(host);
	if (!config) {
		throw new Error();
	}
	const txt = SSHConfig.stringify([configs.find({ Host: host })]);

	return new Promise((res) =>
		res({
			config,
			txt,
		})
	);
};

const deleteConfig = async (host: string) => {
	const config = await parseConfig();
	const modConfig = config.filter(
		(item: any) => item?.value?.toString() !== host
	);
	await writeFile(defaultConfigName, SSHConfig.stringify(modConfig));
	return {
		list: await getListOfConfigs(),
		txt: await getTxtConfig(),
	};
};

const createConfig = async (newConfigs: Record<string, any>[]) => {
	const config = await parseConfig();
	config.unshift(...newConfigs);
	await writeFile(defaultConfigName, SSHConfig.stringify(config));
};

const createConfigFromString = async (newConfig: string, file?: TFile) => {
	let trimConfig: string = newConfig.trim();
	if (file) {
		const buffer = new Uint8Array(file.binary as ArrayBuffer);
		await createFile(file.name, '', buffer);
		trimConfig += '\n' + 'IdentityFile ' + preparePath(file.name);
	}
	const parsedConfig = SSHConfig.parse(trimConfig + '\n\n');
	await createConfig(parsedConfig);
};

const checkAndCreateConfig = async (fileName: string) => {
	if (!checkIsFileExist(fileName)) {
		await createFile(fileName);
	}
};

const getTxtConfig = async () => {
	await checkAndCreateConfig(defaultConfigName);

	return await getFile(defaultConfigName);
};

const editTxtConfigs = async (fileContent: string) => {
	await checkAndCreateConfig(defaultConfigName);
	await writeFile(defaultConfigName, fileContent);
	return {
		list: await getListOfConfigs(),
		txt: fileContent,
	};
};

const editTxtConfig = async (oldTxtConfig: string, newTxtConfig: string) => {
	const parsedNewConfig = SSHConfig.parse(newTxtConfig.trim() + '\n\n');
	if (!parsedNewConfig) {
		throw new Error();
	}
	const parsedOldConfig = SSHConfig.parse(oldTxtConfig);
	const oldListOfConfigs = await parseConfig();
	const newListOfConfigs = oldListOfConfigs.map((item: any) => {
		if (parsedOldConfig.find({ Host: item.value })) {
			return parsedNewConfig[0];
		}
		return item;
	});
	await writeFile(defaultConfigName, SSHConfig.stringify(newListOfConfigs));

	const list = await getListOfConfigs();
	const txt = await getTxtConfig();

	return {
		list,
		txt,
	};
};

export default {
	getListOfConfigs,
	getConfigByHost,
	deleteConfig,
	createConfig,
	createConfigFromString,
	getTxtConfig,
	editTxtConfigs,
	editTxtConfig,
};

declare global {
	interface Window {
		electron: {
			getListOfConfigs: () => Promise<TConfig[]>;
			getConfigByHost: (host: string) => Promise<{
				config: TConfig;
				txt: string;
			}>;
			deleteConfig: (host: string) => Promise<{
				list: TConfig[];
				txt: string;
			}>;
			createConfig: (newConfig: TConfig) => Promise<void>;
			createConfigFromString: (
				newConfig: string,
				file?: TFile
			) => Promise<void>;
			getTxtConfig: () => Promise<string>;
			editTxtConfigs: (fileContent: string) => Promise<{
				list: TConfig[];
				txt: string;
			}>;
			editTxtConfig: (
				oldTxtConfig: string,
				newTxtConfig: string
			) => Promise<{
				list: TConfig[];
				txt: string;
			}>;
		};
	}
}
