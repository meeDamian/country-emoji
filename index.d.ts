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
	* Object that contains every single countries' name and language name.
	*
	* @example {"BG": ["Bulgaria", "Bulgarian"]}; countries["BG"] would be ["Bulgaria", "Bulgarian"]
	*
	*/
	export const countries: {
		[key: string]: [string, string];
	};
}
