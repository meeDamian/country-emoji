import test from 'ava';

test('[main.js].name() is exported properly', t => {
  const fn = require('../main.js').name;

  if (!fn || typeof fn !== 'function') {
    t.fail();
  }
});

test('[lib.js].name() is exported properly', t => {
  const fn = require('../lib.js').name;

  if (!fn || typeof fn !== 'function') {
    t.fail();
  }
});

const {name} = require('../lib.js');

test('fails if empty', t => {
  const country = name();
  if (country !== undefined) {
    t.fail(`${country} instead of undefined`);
  }
});

//
// from country NAMES
//
test('fails if country name given', t => {
  const country = name('Lithuania');
  if (country !== undefined) {
    t.fail(`${country} instead of undefined`);
  }
});

test('fails if short country name given', t => {
  const country = name('UK');
  if (country !== undefined) {
    t.fail(`${country} instead of undefined`);
  }
});

//
// from country CODES
//
test('converts if valid code given', t => {
  const country = name('LY');
  if (country !== 'Libyan Arab Jamahiriya') {
    t.fail(`${country} instead of Libyan Arab Jamahiriya`);
  }
});

test('returns first name from array', t => {
  const country = name('US');
  if (country !== 'United States') {
    t.fail(`${country} instead of United States`);
  }
});

test('fails if invalid code given', t => {
  const country = name('YY');
  if (country !== undefined) {
    t.fail(`${country} instead of undefined`);
  }
});

test('fails if other chars given', t => {
  const country = name('__');
  if (country !== undefined) {
    t.fail(`${country} instead of undefined`);
  }
});

//
// from country FLAG
//
test('converts if valid flag given', t => {
  const country = name('🇬🇧');
  if (country !== 'United Kingdom') {
    t.fail(`${country} instead of United Kingdom`);
  }
});

test('fails if invalid flag given', t => {
  const country = name('🇬🇿');
  if (country !== undefined) {
    t.fail(`${country} instead of undefined`);
  }
});

test('fails if some other emoji given', t => {
  const country = name('💩');
  if (country !== undefined) {
    t.fail(`${country} instead of undefined`);
  }
});
