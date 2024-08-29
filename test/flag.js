import test from 'ava';
import {flag} from '../src/main.js';

test('[main.js].flag() is exported properly', async t => {
	const {flag: fn} = await import('../src/main.js');
	t.is(typeof fn, 'function', 'flag should be a function');
});

test('[lib.js].flag() is exported properly', async t => {
	const {flag: fn} = await import('../src/lib.js');
	t.is(typeof fn, 'function', 'flag should be a function');
});

test('fails if empty', t => {
	const emoji = flag();
	t.is(emoji, undefined, 'Should return undefined for empty input');
});

//
// from country NAMES
//
test('converts name', t => {
	const emoji = flag('Taiwan');
	t.is(emoji, '🇹🇼', 'Should return 🇹🇼 for Taiwan');
});

test('converts short name', t => {
	const emoji = flag('UK');
	t.is(emoji, '🇬🇧', 'Should return 🇬🇧 for UK');
});

test('converts partial name', t => {
	const emoji = flag('Czech');
	t.is(emoji, '🇨🇿', 'Should return 🇨🇿 for Czechia');
});

test('converts alternative name', t => {
	const emoji = flag('North Korea');
	t.is(emoji, '🇰🇵', 'Should return 🇰🇵 for North Korea');
});

test('converts weird name notation', t => {
	const emoji = flag('Virgin Islands, British');
	t.is(emoji, '🇻🇬', 'Should return 🇻🇬 for Virgin Islands, British');
});

test('converts less weird name notation', t => {
	const emoji = flag('U.S. Virgin Islands');
	t.is(emoji, '🇻🇮', 'Should return 🇻🇮 for U.S. Virgin Islands');
});

test('converts partial name with weird characters', t => {
	const emoji = flag('Côte');
	t.is(emoji, '🇨🇮', 'Should return 🇨🇮 for Côte d\'Ivoire');
});

test('converts name with different casing', t => {
	const emoji = flag('EGYPT');
	t.is(emoji, '🇪🇬', 'Should return 🇪🇬 for EGYPT');
});

test('converts if name within string', t => {
	const emoji = flag('China number two!');
	t.is(emoji, '🇨🇳', 'Should return 🇨🇳 for string containing China');
});

test('converts when `&` used in place of `and`', t => {
	const emoji = flag('Trinidad & Tobago');
	t.is(emoji, '🇹🇹', 'Should return 🇹🇹 for Trinidad and Tobago');
});

test('converts country name where substring match with other country exists', t => {
	const emoji = flag('South Sudan');
	t.is(emoji, '🇸🇸', 'Should return 🇸🇸 for South Sudan');
});

test('fails on name conflict', t => {
	const emoji = flag('Korea');
	t.is(emoji, undefined, 'Should return undefined for name conflict Korea');
});

test('fails if two names in string', t => {
	const emoji = flag('Poland & Hungary');
	t.is(emoji, undefined, 'Should return undefined for string containing two names');
});

test('fails on no match', t => {
	const emoji = flag('there is no country named like that');
	t.is(emoji, undefined, 'Should return undefined for no match');
});

//
// from country CODES
//
test('converts if existing code given', t => {
	const emoji = flag('MA');
	t.is(emoji, '🇲🇦', 'Should return 🇲🇦 for code MA');
});

test('fails if not existing code given', t => {
	const emoji = flag('XX');
	t.is(emoji, undefined, 'Should return undefined for non-existing code XX');
});

//
// from country FLAG
//
test('fails if emoji given', t => {
	const emoji = flag('🇪🇬');
	t.is(emoji, undefined, 'Should return undefined if emoji is given as input');
});
