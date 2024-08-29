import test from 'ava';
import {code} from '../src/main.js';

test('[main.js].code() is exported properly', async t => {
	const {code: fn} = await import('../src/main.js');
	t.true(typeof fn === 'function', 'code is not a function');
});

test('[lib.js].code() is exported properly', async t => {
	const {code: fn} = await import('../src/lib.js');
	t.true(typeof fn === 'function', 'code is not a function');
});

test('fails if empty', t => {
	const iso3166 = code();
	t.is(iso3166, undefined, 'Should return undefined for empty input');
});

//
// from country NAMES
//
test('converts full name', t => {
	const iso3166 = code('Belgium');
	t.is(iso3166, 'BE', 'Should return BE for Belgium');
});

test('converts short name', t => {
	const iso3166 = code('UK');
	t.is(iso3166, 'GB', 'Should return GB for UK');
});

test('converts partial name', t => {
	const iso3166 = code('Brunei');
	t.is(iso3166, 'BN', 'Should return BN for Brunei');
});

test('converts alternative name', t => {
	const iso3166 = code('South Korea');
	t.is(iso3166, 'KR', 'Should return KR for South Korea');
});

test('converts weird name notation', t => {
	const iso3166 = code('Iran, Islamic Republic Of');
	t.is(iso3166, 'IR', 'Should return IR for Iran, Islamic Republic Of');
});

test('converts new macedonian name', t => {
	const iso3166 = code('The Former Yugoslav Republic of Macedonia');
	t.is(iso3166, 'MK', 'Should return MK for The Former Yugoslav Republic of Macedonia');
});

test('converts name with weird characters', t => {
	const iso3166 = code('Åland Islands');
	t.is(iso3166, 'AX', 'Should return AX for Åland Islands');
});

test('converts Republic of North Macedonia', t => {
	const iso3166 = code('Republic of North Macedonia');
	t.is(iso3166, 'MK', 'Should return MK for Republic of North Macedonia');
});

test('converts name with different casing', t => {
	const iso3166 = code('BELARUS');
	t.is(iso3166, 'BY', 'Should return BY for BELARUS');
});

test('finds countries with weird punctuation', t => {
	const iso3166 = code('Türkiye');
	t.is(iso3166, 'TR', 'Should return TR for Türkiye');
});

test('converts if name within string', t => {
	const iso3166 = code('Dear Canada is the land of Maple syrup.');
	t.is(iso3166, 'CA', 'Should return CA for string containing Canada');
});

test('fails on name conflict', t => {
	const iso3166 = code('United');
	t.is(iso3166, undefined, 'Should return undefined for name conflict');
});

test('fails if two names in string', t => {
	const iso3166 = code('Cyprus & Greece');
	t.is(iso3166, undefined, 'Should return undefined for multiple country names in string');
});

test('fails on no match', t => {
	const iso3166 = code('there is no country named like that');
	t.is(iso3166, undefined, 'Should return undefined for no matching country name');
});

//
// from country CODES
//
test('fails if code given', t => {
	const iso3166 = code('AZ');
	t.is(iso3166, undefined, 'Should return undefined when given a country code directly');
});

//
// from country FLAG
//
test('converts if valid flag given', t => {
	const iso3166 = code('🇲🇴');
	t.is(iso3166, 'MO', 'Should return MO for valid flag 🇲🇴');
});

test('fails if invalid flag given', t => {
	const iso3166 = code('🇿🇧');
	t.is(iso3166, undefined, 'Should return undefined for invalid flag 🇿🇧');
});

test('fails if some other emoji given', t => {
	const iso3166 = code('🌸');
	t.is(iso3166, undefined, 'Should return undefined for non-country emoji 🌸');
});
