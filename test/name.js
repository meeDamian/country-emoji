import test from 'ava';
import {name} from '../src/main.js';

test('[main.js].name() is exported properly', async t => {
	const {name: fn} = await import('../src/main.js');
	t.is(typeof fn, 'function', 'name should be a function');
});

test('[lib.js].name() is exported properly', async t => {
	const {name: fn} = await import('../src/lib.js');
	t.is(typeof fn, 'function', 'name should be a function');
});

test('returns undefined if empty', t => {
	const country = name();
	t.is(country, undefined, 'Should return undefined for empty input');
});

//
// from country NAMES
//
test('fails if full country name given', t => {
	const country = name('Lithuania');
	t.is(country, undefined, 'Should return undefined for full country name');
});

test('fails if short country name given', t => {
	const country = name('UK');
	t.is(country, undefined, 'Should return undefined for short country name');
});

//
// from country CODES
//
test('returns correct name if valid code is given', t => {
	const country = name('LY');
	t.is(country, 'Libyan Arab Jamahiriya', 'Should return correct country name for code LY');
});

test('returns first name from array for code US', t => {
	const country = name('US');
	t.is(country, 'United States', 'Should return United States for code US');
});

test('returns correct name for Macedonian country code', t => {
	const country = name('MK');
	t.is(country, 'Republic of North Macedonia', 'Should return correct name for code MK');
});

test('returns undefined if invalid code is given', t => {
	const country = name('YY');
	t.is(country, undefined, 'Should return undefined for invalid code YY');
});

test('returns undefined if non-alphabetic characters are given', t => {
	const country = name('__');
	t.is(country, undefined, 'Should return undefined for invalid characters');
});

//
// from country FLAG
//
test('returns correct name if valid flag is given', t => {
	const country = name('🇬🇧');
	t.is(country, 'United Kingdom', 'Should return United Kingdom for valid flag');
});

test('returns undefined if invalid flag is given', t => {
	const country = name('🇬🇿');
	t.is(country, undefined, 'Should return undefined for invalid flag');
});

test('returns undefined if unrelated emoji is given', t => {
	const country = name('💩');
	t.is(country, undefined, 'Should return undefined for unrelated emoji');
});
