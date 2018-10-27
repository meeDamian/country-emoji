import test from 'ava';

test('[main.js].code() is exported properly', t => {
  const fn = require('../main.js').code;

  if (!fn || typeof fn !== 'function') {
    t.fail();
  }
  t.pass();
});

test('[lib.js].code() is exported properly', t => {
  const fn = require('../lib.js').code;

  if (!fn || typeof fn !== 'function') {
    t.fail();
  }
  t.pass();
});

const {code} = require('../lib.js');

test('fails if empty', t => {
  const iso3166 = code();
  if (iso3166 !== undefined) {
    t.fail(`${iso3166} instead of undefined`);
  }
  t.pass();
});

//
// from country NAMES
//
test('converts name', t => {
  const iso3166 = code('Belgium');
  if (!iso3166 || iso3166 !== 'BE') {
    t.fail(`${iso3166} instead of BE`);
  }
  t.pass();
});

test('converts short name', t => {
  const iso3166 = code('UK');
  if (!iso3166 || iso3166 !== 'GB') {
    t.fail(`${iso3166} instead of GB`);
  }
  t.pass();
});

test('converts partial name', t => {
  const iso3166 = code('Brunei');
  if (!iso3166 || iso3166 !== 'BN') {
    t.fail(`${iso3166} instead of BN`);
  }
  t.pass();
});

test('converts alternative name', t => {
  const iso3166 = code('South Korea');
  if (!iso3166 || iso3166 !== 'KR') {
    t.fail(`${iso3166} instead of KR`);
  }
  t.pass();
});

test('converts weird name notation', t => {
  const iso3166 = code('Iran, Islamic Republic Of');
  if (!iso3166 || iso3166 !== 'IR') {
    t.fail(`${iso3166} instead of IR`);
  }
  t.pass();
});

test('converts less weird name notation', t => {
  const iso3166 = code('The Former Yugoslav Republic of Macedonia');
  if (!iso3166 || iso3166 !== 'MK') {
    t.fail(`${iso3166} instead of MK`);
  }
  t.pass();
});

test('converts name with weird characters', t => {
  const iso3166 = code('Åland Islands');
  if (!iso3166 || iso3166 !== 'AX') {
    t.fail(`${iso3166} instead of AX`);
  }
  t.pass();
});

test('converts name with different casing', t => {
  const iso3166 = code('BELARUS');
  if (!iso3166 || iso3166 !== 'BY') {
    t.fail(`${iso3166} instead of BY`);
  }
  t.pass();
});

test('converts if name within string', t => {
  const iso3166 = code('Dear Canada is the land of Maple syrup.');
  if (!iso3166 || iso3166 !== 'CA') {
    t.fail(`${iso3166} instead of CA`);
  }
  t.pass();
});

test('fails on name conflict', t => {
  const iso3166 = code('United');
  if (iso3166 !== undefined) {
    t.fail(`${iso3166} instead of undefined`);
  }
  t.pass();
});

test('fails if two names in string', t => {
  const iso3166 = code('Cyprus & Greece');
  if (iso3166 !== undefined) {
    t.fail(`${iso3166} instead of undefined`);
  }
  t.pass();
});

test('fails on no match', t => {
  const iso3166 = code('there is no country named like that');
  if (iso3166 !== undefined) {
    t.fail(`${iso3166} instead of undefined`);
  }
  t.pass();
});

//
// from country CODES
//
test('fails if code given', t => {
  const iso3166 = code('AZ');
  if (iso3166 !== undefined) {
    t.fail(`${iso3166} instead of undefined`);
  }
  t.pass();
});

//
// from country FLAG
//
test('converts if valid flag given', t => {
  const iso3166 = code('🇲🇴');
  if (iso3166 !== 'MO') {
    t.fail(`${iso3166} instead of MO`);
  }
  t.pass();
});

test('fails if invalid flag given', t => {
  const iso3166 = code('🇿🇧');
  if (iso3166 !== undefined) {
    t.fail(`${iso3166} instead of undefined`);
  }
  t.pass();
});

test('fails if some other emoji given', t => {
  const iso3166 = code('🌸');
  if (iso3166 !== undefined) {
    t.fail(`${iso3166} instead of undefined`);
  }
  t.pass();
});
