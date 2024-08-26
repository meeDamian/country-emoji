import test from 'ava';
import {
	MAGIC_NUMBER,
	CODE_RE,
	NAME_RE,
	FLAG_RE,
	isCode,
	fuzzyCompare,
	codeToName,
	codeToFlag,
	nameToCode,
	flagToCode,
} from '../src/lib.js';

test('MAGIC_NUMBER is exported properly', t => {
	t.is(typeof MAGIC_NUMBER, 'number', 'MAGIC_NUMBER should be a number');
});

test('CODE_RE is exported properly', t => {
	t.true(CODE_RE instanceof RegExp, 'CODE_RE should be a RegExp');
});

test('NAME_RE is exported properly', t => {
	t.true(NAME_RE instanceof RegExp, 'NAME_RE should be a RegExp');
});

test('FLAG_RE is exported properly', t => {
	t.true(FLAG_RE instanceof RegExp, 'FLAG_RE should be a RegExp');
});

test('isCode() is exported properly', t => {
	t.is(typeof isCode, 'function', 'isCode should be a function');
});

test('fuzzyCompare() is exported properly', t => {
	t.is(typeof fuzzyCompare, 'function', 'fuzzyCompare should be a function');
});

test('codeToName() is exported properly', t => {
	t.is(typeof codeToName, 'function', 'codeToName should be a function');
});

test('codeToFlag() is exported properly', t => {
	t.is(typeof codeToFlag, 'function', 'codeToFlag should be a function');
});

test('nameToCode() is exported properly', t => {
	t.is(typeof nameToCode, 'function', 'nameToCode should be a function');
});

test('flagToCode() is exported properly', t => {
	t.is(typeof flagToCode, 'function', 'flagToCode should be a function');
});
