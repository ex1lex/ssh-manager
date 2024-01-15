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

const createFile = async (fileName: string, type = '', data = '') => {
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
	return config;
};

const deleteConfig = async (host: string) => {
	const config = await parseConfig();
	const modConfig = config.filter(
		(item: any) => item?.value?.toString() !== host
	);
	await writeFile(defaultConfigName, SSHConfig.stringify(modConfig));
	return await getListOfConfigs();
};

const createConfig = async (newConfigs: Record<string, any>[]) => {
	const config = await parseConfig();
	config.unshift(...newConfigs);
	await writeFile(defaultConfigName, SSHConfig.stringify(config));
};

const createConfigFromString = async (newConfig: string) => {
	const parsedConfig = SSHConfig.parse(newConfig.trim() + '\n\n');
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

const editTxtConfig = async (fileContent: string) => {
	await checkAndCreateConfig(defaultConfigName);
	await writeFile(defaultConfigName, fileContent);
	return {
		list: await getListOfConfigs(),
		txt: fileContent,
	};
};

export default {
	getListOfConfigs,
	getConfigByHost,
	deleteConfig,
	createConfig,
	createConfigFromString,
	getTxtConfig,
	editTxtConfig,
};
