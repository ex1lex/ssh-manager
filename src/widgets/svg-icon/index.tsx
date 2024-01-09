import React from 'react';

export enum Icons {
	delete = 'delete',
	edit = 'edit',
	refresh = 'refresh',
}

interface Props {
	icon: Icons;
}

const SvgIcon = ({ icon }: Props) => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const Svg = require(`./icons/${icon}`);
	return <Svg.default />;
};

export default SvgIcon;
