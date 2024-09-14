import countries from '../countries.json' with { type: 'json' };

export const MAGIC_NUMBER = 127_462 - 65; // Base offset for flag emoji calculation

export const CODE_RE = /^[a-z]{2}$/i;
export const NAME_RE = /^.{2,}$/;
export const FLAG_RE = /\uD83C[\uDDE6-\uDDFF]/;

const NAME_SEP = ', ';

// Turn returned names from ex. "Virgin Islands, British" into "British Virgin Islands"
export function normalizeOutput(name) {
	if (!name) {
		return name;
	}

	if (name.includes(NAME_SEP)) {
		name = name.split(NAME_SEP).reverse().join(' ');
	}

	return name;
}

// For all non-empty strings, strip out diacritics, replace & with 'and', and turn "weird form" in
export function normalizeName(name) {
	if (!name) {
		return name;
	}

	// Replace & with and
	name = name.replaceAll(/\s*&\s*/g, ' and ');

	// Replace diacritics with their base characters
	name = name.normalize('NFD').replaceAll(/[\u0300-\u036F]/g, '');

	name = normalizeOutput(name);

	return name;
}

// Compare two names, allowing for differences
export function fuzzyCompare(input, name) {
	name = name.toLowerCase();

	// Cases like:
	//    "Vatican" <-> "Holy See (Vatican City State)"
	//    "Russia"  <-> "Russian Federation"
	if (name.includes(input) || input.includes(name)) {
		return true;
	}

	const normalizedName = normalizeName(name);
	const normalizedInput = normalizeName(input);

	// Cases like:
	//    "British Virgin Islands" <-> "Virgin Islands, British"
	//    "Republic of Moldova"    <-> "Moldova, Republic of"
	//    "Trinidad & Tobago"      <-> "Trinidad and Tobago"
	if (normalizedName !== name || normalizedInput !== input) {
		if (normalizedName.includes(normalizedInput) || normalizedInput.includes(normalizedName)) {
			return true;
		}
	}

	return false;
}

export function isCode(code) {
	code = code.toUpperCase();

	return countries[code] ? code : undefined;
}

export function nameToCode(name) {
	if (!name || !NAME_RE.test(name)) {
		return;
	}

	name = name.trim().toLowerCase();

	// Look for exact match
	for (const [code, names] of Object.entries(countries)) {
		if (names.some(n => n.toLowerCase() === name)) {
			return code;
		}
	}

	// Look for inexact match
	const matches = Object.keys(countries)
		.filter(code =>
			countries[code].some(n => fuzzyCompare(name, n)),
		);

	// Return only when exactly one match was found
	//   prevents cases like "United"
	if (matches.length === 1) {
		return matches[0];
	}
}

export function codeToName(code) {
	if (!code || !CODE_RE.test(code)) {
		return;
	}

	return normalizeOutput(countries[code.toUpperCase()]?.[0]);
}

export function codeToFlag(code) {
	if (!code || !CODE_RE.test(code)) {
		return;
	}

	code = isCode(code);
	if (!code) {
		return;
	}

	return String.fromCodePoint(...[...code].map(c => MAGIC_NUMBER + c.codePointAt(0)));
}

export function flagToCode(flag) {
	if (!flag || !FLAG_RE.test(flag)) {
		return;
	}

	return isCode([...flag].map(c => c.codePointAt(0) - MAGIC_NUMBER).map(c => String.fromCodePoint(c)).join(''));
}

/**
 * Converts a country flag emoji or country name to its corresponding ISO 3166-1 alpha-2 country code.
 *
 * @param {string} input - A country flag emoji or full country name.
 * @returns {string|undefined} The country code (e.g., 'US') if found, otherwise `undefined`.
 *
 * @example
 * code('🇨🇦'); // Returns 'CA'
 * code('Canada'); // Returns 'CA'
 */
export function code(input) {
	return flagToCode(input) || nameToCode(input);
}

/**
 * Converts a country code or country name to its corresponding flag emoji.
 *
 * @param {string} input - A country code (e.g., 'US') or full country name.
 * @returns {string|undefined} The country flag emoji (e.g., '🇺🇸') if found, otherwise `undefined`.
 *
 * @example
 * flag('US'); // Returns '🇺🇸'
 * flag('United States'); // Returns '🇺🇸'
 */
export function flag(input) {
	if (!CODE_RE.test(input) || input === 'UK') {
		input = nameToCode(input);
	}

	return codeToFlag(input);
}

/**
 * Converts a country flag emoji or country code to its corresponding country name.
 *
 * @param {string} input - A country flag emoji or ISO 3166-1 alpha-2 country code.
 * @returns {string|undefined} The country name (e.g., 'United States') if found, otherwise `undefined`.
 *
 * @example
 * name('🇺🇸'); // Returns 'United States'
 * name('US'); // Returns 'United States'
 */
export function name(input) {
	if (FLAG_RE.test(input)) {
		input = flagToCode(input);
	}

	return codeToName(input);
}

/**
 * An object containing all country codes mapped to their respective country names and aliases.
 *
 * @type {Object.<string, string[]>}
 *
 * @example
 * countries['CA']; // Returns ['Canada', 'Canadian']
 */
export {countries};
