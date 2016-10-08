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
} = require('../lib.js');

test('MAGIC_NUMBER is exported properly', t => {
  if (!MAGIC_NUMBER || typeof MAGIC_NUMBER !== 'number') {
    t.fail();
  }
});

test('CODE_RE is exported properly', t => {
  if (!CODE_RE || !(CODE_RE instanceof RegExp)) {
    t.fail();
  }
});

test('NAME_RE is exported properly', t => {
  if (!NAME_RE || !(NAME_RE instanceof RegExp)) {
    t.fail();
  }
});

test('FLAG_RE is exported properly', t => {
  if (!FLAG_RE || !(FLAG_RE instanceof RegExp)) {
    t.fail();
  }
});

test('isCode() is exported properly', t => {
  if (!isCode || typeof isCode !== 'function') {
    t.fail();
  }
});

test('fuzzyCompare() is exported properly', t => {
  if (!fuzzyCompare || typeof fuzzyCompare !== 'function') {
    t.fail();
  }
});

test('codeToName() is exported properly', t => {
  if (!codeToName || typeof codeToName !== 'function') {
    t.fail();
  }
});

test('codeToFlag() is exported properly', t => {
  if (!codeToFlag || typeof codeToFlag !== 'function') {
    t.fail();
  }
});

test('nameToCode() is exported properly', t => {
  if (!nameToCode || typeof nameToCode !== 'function') {
    t.fail();
  }
});

test('flagToCode() is exported properly', t => {
  if (!flagToCode || typeof flagToCode !== 'function') {
    t.fail();
  }
});
