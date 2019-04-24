import test from 'ava';

const {
  MAGIC_NUMBER,

  CODE_RE,
  NAME_RE,
  FLAG_RE,

  isCode,
  fuzzyCompare,

  codeToName,
  codeToFlag,
  nameToCode,
  flagToCode
} = require('../src/lib.js');

test('MAGIC_NUMBER is exported properly', t => {
  if (!MAGIC_NUMBER || typeof MAGIC_NUMBER !== 'number') {
    t.fail();
  }

  t.pass();
});

test('CODE_RE is exported properly', t => {
  if (!CODE_RE || !(CODE_RE instanceof RegExp)) {
    t.fail();
  }

  t.pass();
});

test('NAME_RE is exported properly', t => {
  if (!NAME_RE || !(NAME_RE instanceof RegExp)) {
    t.fail();
  }

  t.pass();
});

test('FLAG_RE is exported properly', t => {
  if (!FLAG_RE || !(FLAG_RE instanceof RegExp)) {
    t.fail();
  }

  t.pass();
});

test('isCode() is exported properly', t => {
  if (!isCode || typeof isCode !== 'function') {
    t.fail();
  }

  t.pass();
});

test('fuzzyCompare() is exported properly', t => {
  if (!fuzzyCompare || typeof fuzzyCompare !== 'function') {
    t.fail();
  }

  t.pass();
});

test('codeToName() is exported properly', t => {
  if (!codeToName || typeof codeToName !== 'function') {
    t.fail();
  }

  t.pass();
});

test('codeToFlag() is exported properly', t => {
  if (!codeToFlag || typeof codeToFlag !== 'function') {
    t.fail();
  }

  t.pass();
});

test('nameToCode() is exported properly', t => {
  if (!nameToCode || typeof nameToCode !== 'function') {
    t.fail();
  }

  t.pass();
});

test('flagToCode() is exported properly', t => {
  if (!flagToCode || typeof flagToCode !== 'function') {
    t.fail();
  }

  t.pass();
});
