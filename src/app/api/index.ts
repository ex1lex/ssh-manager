const SSHConfig = window.require('ssh-config');
const path = window.require('node:path');
const fs = window.require('node:fs');

const defaultPath = path.join(process.env.HOME, '.ssh');

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

const parseConfig = () => {
	const input = getFile('config');
	const config: any[] = SSHConfig.parse(input);
	return config
		.filter((item) => item?.config)
		.map((item) => {
			return {
				...item,
				value: item.value.toString(),
			};
		});
};

const getConfigFile = (): any[] => {
	try {
		return parseConfig();
	} catch (e) {
		createFile('config');
		return parseConfig();
	}
};

const getListOfConfigs = () => {
	return getConfigFile();
};

const getConfigByHost = (host: string): Record<string, any> => {
	const configs = parseConfig();

	return configs.find((item) => item.value === host);
};

export default {
	getListOfConfigs,
	getConfigByHost,
};
