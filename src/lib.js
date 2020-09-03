'use strict';

const countries = require('../countries.json');

const MAGIC_NUMBER = 127462 - 65;

const CODE_RE = /^[a-z]{2}$/i;
const NAME_RE = /^.{2,}$/;
const FLAG_RE = /\uD83C[\uDDE6-\uDDFF]/;

function fuzzyCompare(input, name) {
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

function isCode(code) {
	code = code.toUpperCase();

	return countries[code] ? code : undefined;
}

function nameToCode(name) {
	if (!name || !NAME_RE.test(name)) {
		return;
	}

	name = name.trim().toLowerCase();

	// Look for an exact (but case-insensitive) match
	for (const [code, names] of Object.entries(countries)) {
		for (const n of names) {
			if (n.toLowerCase() === name) {
				return code;
			}
		}
	}

	// Look for all possible inexact matches
	const matches = Object.keys(countries)
		.filter(code => {
			for (const n of countries[code]) {
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

function codeToName(code) {
	if (!code || !CODE_RE.test(code)) {
		return;
	}

	const names = countries[code.toUpperCase()];
	if (!names) {
		return;
	}

	return names[0];
}

function codeToFlag(code) {
	if (!code || !CODE_RE.test(code)) {
		return;
	}

	code = isCode(code);
	if (!code) {
		return;
	}

	if (String && String.fromCodePoint) {
		return String.fromCodePoint(...[...code].map(c => MAGIC_NUMBER + c.charCodeAt(0)));
	}
}

function flagToCode(flag) {
	if (!flag || !FLAG_RE.test(flag)) {
		return;
	}

	return isCode([...flag].map(c => c.codePointAt(0) - MAGIC_NUMBER).map(c => String.fromCharCode(c)).join(''));
}

// Takes either emoji or full name
function code(input) {
	return flagToCode(input) || nameToCode(input);
}

// Takes either code or full name
function flag(input) {
	if (!CODE_RE.test(input) || input === 'UK') {
		input = nameToCode(input);
	}

	return codeToFlag(input);
}

// Takes either emoji or code
function name(input) {
	if (FLAG_RE.test(input)) {
		input = flagToCode(input);
	}

	return codeToName(input);
}

module.exports = {
	MAGIC_NUMBER,

	CODE_RE,
	NAME_RE,
	FLAG_RE,

	code,
	flag,
	name,

	countries,

	isCode,
	fuzzyCompare,

	codeToName,
	codeToFlag,
	nameToCode,
	flagToCode
};
