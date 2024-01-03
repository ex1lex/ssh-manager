import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import SvgIcon, { Icons } from '../svg-icon';
import styles from './styles.module.scss';

const ConfigsList: FC = () => {
	const [configs, setConfigs] = useState([]);

	const getConfigs = async () => {
		const _configs = await window.electron.getListOfConfigs();
		setConfigs(_configs);
	};

	const onDeleteConfigClick = async (val: string) => {
		await window.electron.deleteConfig(val);
		toast('Config deleted');
	};

	const onEditConfigClick = (val: string) => {
		console.log('EDIT', val);
	};

	useEffect(() => {
		getConfigs();
	}, []);

	return (
		<div className={styles['configs-list']}>
			<ul className={styles['configs-list__list']}>
				{configs?.map(({ value }: any) => {
					return (
						<li
							key={`configs-list-item-${value}`}
							className={styles['configs-list__item']}
						>
							<Link to={value} className={styles['configs-list__link']}>
								{value}
							</Link>
							<div className={styles['configs-list__actions']}>
								<button
									onClick={() => onEditConfigClick(value)}
									type="button"
									className={styles['configs-list__btn']}
								>
									<SvgIcon icon={Icons.edit} />
								</button>
								<button
									onClick={() => onDeleteConfigClick(value)}
									type="button"
									className={styles['configs-list__btn']}
								>
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
