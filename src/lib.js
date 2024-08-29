import countries from '../countries.json' with { type: 'json' };

export const MAGIC_NUMBER = 127_462 - 65; // Base offset for flag emoji calculation

export const CODE_RE = /^[a-z]{2}$/i;
export const NAME_RE = /^.{2,}$/;
export const FLAG_RE = /\uD83C[\uDDE6-\uDDFF]/;

const NAME_SEP = ', ';

export function normalizeName(name) {
	if (!name) {
		return name;
	}

	name = name.replace(/\s*&\s*/g, ' and ');

	if (!name.includes(NAME_SEP)) {
		return name;
	}

	return name.split(NAME_SEP).reverse().join(' ');
}

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

	return normalizeName(countries[code.toUpperCase()]?.[0]);
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

// Takes either emoji or full name
export function code(input) {
	return flagToCode(input) || nameToCode(input);
}

// Takes either code or full name
export function flag(input) {
	if (!CODE_RE.test(input) || input === 'UK') {
		input = nameToCode(input);
	}

	return codeToFlag(input);
}

// Takes either emoji or code
export function name(input) {
	if (FLAG_RE.test(input)) {
		input = flagToCode(input);
	}

	return codeToName(input);
}

export {countries};
