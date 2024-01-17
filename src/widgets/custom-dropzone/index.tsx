import { TFile } from '@shared/types';
import CustomButton from '@widgets/custom-button';
import React, { FC, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Tooltip } from 'react-tooltip';

import {
	StyledDropzone,
	StyledDropzoneContainer,
	StyledDropzoneFileContainer,
	StyledDropzoneFileName,
	StyledDropzoneLabel,
	StyledDropzoneTitle,
} from './styles';

interface Props {
	label?: string;
	fileName?: string;
	onLoadFile: (obj: TFile) => void;
	onRemoveFile: () => void;
}

const CustomDropzone: FC<Props> = ({ fileName, onLoadFile, onRemoveFile }) => {
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
		<StyledDropzone>
			<Tooltip
				id="tooltip-dropzone"
				place="top"
				content={
					'The uploaded file is automatically inserted into the config in the "IdentityFile" key'
				}
			/>
			<StyledDropzoneLabel data-tooltip-id="tooltip-dropzone">
				Key file:
			</StyledDropzoneLabel>
			<StyledDropzoneContainer {...getRootProps()}>
				<input {...getInputProps()} />
				<StyledDropzoneTitle>
					Drag a file here or click to select a file.
				</StyledDropzoneTitle>
			</StyledDropzoneContainer>
			{fileName && (
				<StyledDropzoneFileContainer>
					<StyledDropzoneFileName>{fileName}</StyledDropzoneFileName>
					<CustomButton
						variant="fill"
						color="danger"
						onClick={removeFileClick}
						type="button"
					>
						Remove
					</CustomButton>
				</StyledDropzoneFileContainer>
			)}
		</StyledDropzone>
	);
};

export default CustomDropzone;
