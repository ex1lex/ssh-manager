import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import SvgIcon, { Icons } from '../svg-icon';
import styles from './styles.module.scss';

const ConfigsList: FC = () => {
	const configs = window.electron.getListOfConfigs();

	return (
		<div className={styles['configs-list']}>
			<ul className={styles['configs-list__list']}>
				{configs.map(({ value }: any) => {
					return (
						<li
							key={`configs-list-item-${value}`}
							className={styles['configs-list__item']}
						>
							<Link to={value} className={styles['configs-list__link']}>
								{value}
							</Link>
							<div className={styles['configs-list__actions']}>
								<button type="button" className={styles['configs-list__btn']}>
									<SvgIcon icon={Icons.edit} />
								</button>
								<button type="button" className={styles['configs-list__btn']}>
									<SvgIcon icon={Icons.delete} />
								</button>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default ConfigsList;
