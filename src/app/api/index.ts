const SSHConfig = window.require('ssh-config');

const path = window.require('node:path');
const fs = window.require('node:fs');

const defaultPath = path.join(process.env.HOME, '.ssh');

const getFile = async (fileName: string): Promise<string> => {
	return await new Promise((res, rej) => {
		fs.readFile(`${defaultPath}/${fileName}`, 'utf8', (err: any, data: any) => {
			if (err) rej(err);
			res(data);
		});
	});
};

const createFile = async (fileName: string, type = '', data = '') => {
	const result = await new Promise((res) => {
		fs.writeFile(
			`${defaultPath}/${fileName}${type ? `.${type}` : ''}`,
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
		fs.writeFile(`${defaultPath}/${fileName}`, fileText, 'utf8', () => {
			res(true);
		});
	});
};

const parseConfig = async () => {
	const input = await getFile('config');
	return SSHConfig.parse(input);
};

const getConfigFile = async (): Promise<any[]> => {
	try {
		await getFile('config');
	} catch (e) {
		await createFile('config');
	}
	try {
		const config = await parseConfig();
		return config
			.filter((item: any) => item?.config)
			.map((item: any) => {
				return {
					...item,
					value: item.value.toString(),
				};
			});
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
	return configs.find((item: any) => item?.value?.toString() === host);
};

const deleteConfig = async (host: string) => {
	const config = await parseConfig();
	const modConfig = config.filter(
		(item: any) => item?.value?.toString() !== host
	);
	await writeFile('config', SSHConfig.stringify(modConfig));
	return await getListOfConfigs();
};

export default {
	getListOfConfigs,
	getConfigByHost,
	deleteConfig,
};
