export type TConfig = Record<string, any>;

export interface TFile {
	binary: string | ArrayBuffer;
	name: string;
	type: string;
}
