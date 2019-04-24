import test from 'ava';

test('[main.js].name() is exported properly', t => {
  const fn = require('../src/main.js').name;

  if (!fn || typeof fn !== 'function') {
    t.fail();
  }

  t.pass();
});

test('[lib.js].name() is exported properly', t => {
  const fn = require('../src/lib.js').name;

  if (!fn || typeof fn !== 'function') {
    t.fail();
  }

  t.pass();
});

const {name} = require('../src/lib.js');

test('fails if empty', t => {
  const country = name();
  if (country !== undefined) {
    t.fail(`${country} instead of undefined`);
  }

  t.pass();
});

//
// from country NAMES
//
test('fails if country name given', t => {
  const country = name('Lithuania');
  if (country !== undefined) {
    t.fail(`${country} instead of undefined`);
  }

  t.pass();
});

test('fails if short country name given', t => {
  const country = name('UK');
  if (country !== undefined) {
    t.fail(`${country} instead of undefined`);
  }

  t.pass();
});

//
// from country CODES
//
test('converts if valid code given', t => {
  const country = name('LY');
  if (country !== 'Libyan Arab Jamahiriya') {
    t.fail(`${country} instead of Libyan Arab Jamahiriya`);
  }

  t.pass();
});

test('returns first name from array', t => {
  const country = name('US');
  if (country !== 'United States') {
    t.fail(`${country} instead of United States`);
  }

  t.pass();
});

test('fails if invalid code given', t => {
  const country = name('YY');
  if (country !== undefined) {
    t.fail(`${country} instead of undefined`);
  }

  t.pass();
});

test('fails if other chars given', t => {
  const country = name('__');
  if (country !== undefined) {
    t.fail(`${country} instead of undefined`);
  }

  t.pass();
});

//
// from country FLAG
//
test('converts if valid flag given', t => {
  const country = name('🇬🇧');
  if (country !== 'United Kingdom') {
    t.fail(`${country} instead of United Kingdom`);
  }

  t.pass();
});

test('fails if invalid flag given', t => {
  const country = name('🇬🇿');
  if (country !== undefined) {
    t.fail(`${country} instead of undefined`);
  }

  t.pass();
});

test('fails if some other emoji given', t => {
  const country = name('💩');
  if (country !== undefined) {
    t.fail(`${country} instead of undefined`);
  }

  t.pass();
});
