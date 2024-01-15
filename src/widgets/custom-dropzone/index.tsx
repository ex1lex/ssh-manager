import { TFile } from '@shared/types';
import CustomButton from '@widgets/custom-button';
import React, { FC, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Tooltip } from 'reactstrap';

import styles from './styles.module.scss';

interface Props {
	label?: string;
	fileName?: string;
	onLoadFile: (obj: TFile) => void;
	onRemoveFile: () => void;
}

const CustomDropzone: FC<Props> = ({ fileName, onLoadFile, onRemoveFile }) => {
	const [tooltipOpen, setTooltipOpen] = useState(false);
	const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

	const onDrop = useCallback((acceptedFiles: any) => {
		acceptedFiles.forEach((file: any) => {
			const reader = new FileReader();

			reader.onabort = () => console.log('file reading was aborted');
			reader.onerror = () => console.log('file reading has failed');
			reader.onload = () => {
				const binaryStr = reader.result;
				onLoadFile({
					binary: binaryStr,
					name: file.name,
					type: file.type?.split('/')[1],
				});
			};
			reader.readAsArrayBuffer(file);
		});
	}, []);
	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		maxFiles: 1,
	});

	const removeFileClick = useCallback(() => {
		onRemoveFile();
	}, []);

	return (
		<div className={styles['custom-dropzone']}>
			<Tooltip
				autohide
				isOpen={tooltipOpen}
				target="tooltip-dropzone"
				toggle={toggleTooltip}
			>
				The uploaded file is automatically inserted into the config in the
				"IdentityFile" key
			</Tooltip>
			<p id="tooltip-dropzone" className={styles['custom-dropzone__label']}>
				Key file:
			</p>
			<div className={styles['custom-dropzone__container']} {...getRootProps()}>
				<input {...getInputProps()} />
				<p className={styles['custom-dropzone__title']}>
					Drag a file here or click to select a file.
				</p>
			</div>
			{fileName && (
				<div className={styles['custom-dropzone__file-container']}>
					<p>{fileName}</p>
					<CustomButton
						onClick={removeFileClick}
						type="button"
						title="Remove"
					/>
				</div>
			)}
		</div>
	);
};

export default CustomDropzone;
