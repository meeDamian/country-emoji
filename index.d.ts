declare module 'country-emoji' {
	/**
	* Returns the flag emoji of a country.
	*
	* @param {string} input - Country code or name.
	* @returns {?string} The flag emoji of the country if the provided input is valid.
	*
	*/
	export function flag(input: string): string | undefined;

	/**
	* Returns the code of a country.
	*
	* @param {string} input - Flag emoji or name.
	* @returns {?string} The code of the country if the input is valid.
	*
	*/
	export function code(input: string): string | undefined;

	/**
	* Returns the name of a country.
	*
	* @param {string} input - Flag emoji or county code.
	* @returns {?string} The name of the country if the input is valid.
	*
	*/
	export function name(input: string): string | undefined;

	/**
	* Object that contains every single country's name and language name.
	* The value can be either a string or an array of at least two strings.
	*
	* @example {"BG": ["Bulgaria", "Bulgarian"]}; countries["BG"] would be ["Bulgaria", "Bulgarian"]
	* @example {"US": "United States"}; countries["US"] would be "United States"
	*
	*/
	export const countries: Record<string, string | [string, string, ...string[]]>;
}
