export interface ICountries {
    [key: string]: [string, string];
}


declare module 'country-emoji' {
	export const flag: (input: string) => string;
	export const code: (input: string) => string;
	export const name: (input: string) => string;
	export const countries: ICountries;
}
