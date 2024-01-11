import { useConfig } from '@shared/hooks';
import DeleteIcon from '@widgets/delete-icon';
import EditIcon from '@widgets/edit-icon';
import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

const ConfigsList: FC = () => {
	const {
		state: { configs },
		deleteConfig,
		getConfigs,
	} = useConfig();

	const onDeleteConfigClick = async (val: string) => {
		deleteConfig(val);
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
				{configs?.map((_value: any) => {
					const value = _value?.Host;
					if (!value) {
						return null;
					}

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
									<EditIcon />
								</button>
								<button
									onClick={() => onDeleteConfigClick(value)}
									type="button"
									className={styles['configs-list__btn']}
								>
									<DeleteIcon />
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
