import countries from '../countries.json' with { type: 'json' };

export const MAGIC_NUMBER = 127_462 - 65; // Base offset for flag emoji calculation

export const CODE_RE = /^[a-z]{2}$/i;
export const NAME_RE = /^.{2,}$/;
export const FLAG_RE = /\uD83C[\uDDE6-\uDDFF]/;

export function fuzzyCompare(input, name) {
	name = name.toLowerCase();

	// Cases like:
	//    "Vatican" <-> "Holy See (Vatican City State)"
	//    "Russia"  <-> "Russian Federation"
	if (name.includes(input) || input.includes(name)) {
		return true;
	}

	// Cases like:
	//    "British Virgin Islands" <-> "Virgin Islands, British"
	//    "Republic of Moldova"    <-> "Moldova, Republic of"
	if (name.includes(',')) {
		const reversedName = name.split(', ').reverse().join(' ');
		if (reversedName.includes(input) || input.includes(reversedName)) {
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
	// NOTE: normal loop to terminate ASAP
	for (const code in countries) {
		if (Object.hasOwn(countries, code)) {
			let names = countries[code];

			if (!Array.isArray(names)) {
				names = [names];
			}

			for (const n of names) {
				if (n.toLowerCase() === name) {
					return code;
				}
			}
		}
	}

	// Look for inexact match
	// NOTE: .filter() to aggregate all matches
	const matches = Object.keys(countries)
		.filter(code => {
			let names = countries[code];

			if (!Array.isArray(names)) {
				names = [names];
			}

			for (const n of names) {
				if (fuzzyCompare(name, n)) {
					return true;
				}
			}

			return false;
		});

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

	const names = countries[code.toUpperCase()];
	if (Array.isArray(names)) {
		return names[0];
	}

	return names;
}

export function codeToFlag(code) {
	if (!code || !CODE_RE.test(code)) {
		return;
	}

	code = isCode(code);
	if (!code) {
		return;
	}

	if (String && String.fromCodePoint) {
		return String.fromCodePoint(...[...code].map(c => MAGIC_NUMBER + c.codePointAt(0)));
	}
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

export { countries };
