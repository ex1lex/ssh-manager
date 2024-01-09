import { useConfig } from '@shared/hooks';
import DeleteIcon from '@widgets/delete-icon';
import EditIcon from '@widgets/edit-icon';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import styles from './styles.module.scss';

const ConfigsList: FC = () => {
	const { configs, onDelete } = useConfig();

	const onDeleteConfigClick = async (val: string) => {
		onDelete(val).then(() => toast('Config deleted'));
	};

	const onEditConfigClick = (val: string) => {
		console.log('EDIT', val);
	};

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
