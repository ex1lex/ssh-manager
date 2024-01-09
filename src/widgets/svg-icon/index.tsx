import { Icons } from '@shared';
import React from 'react';

interface Props {
	icon: Icons;
}

const SvgIcon = ({ icon }: Props) => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const Svg = require(`./icons/${icon}`);
	return <Svg.default />;
};

export default SvgIcon;
