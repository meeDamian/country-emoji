export interface ICountries {
    [key: string]: [string, string];
}


declare module 'country-emoji' {
	/**
	* Returns the flag emoji of a country.
	*
	* @param input - Country code or name.
	* @returns Flag emoji of the country.
	*
	*/
	export function flag(input: string): string;

	/**
	* Returns the code of a country.
	*
	* @param input - Flag emoji or name.
	* @returns Code of the country.
	*
	*/
	export function code(input: string): string;

	/**
	* Returns the name of a country.
	*
	* @param input - Flag emoji or county code.
	* @returns Name of the country.
	*
	*/
	export function name(input: string): string;

	/**
	* Object that contains every single countries' name and language name.
	*
	* @example {"BG": ["Bulgaria", "Bulgarian"]}; countries["BG"] would be ["Bulgaria", "Bulgarian"]
	*
	* 
	*/
	export const countries: ICountries;
}
