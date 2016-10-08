import test from 'ava';

test('[main.js].flag() is exported properly', t => {
  const fn = require('../main.js').flag;

  if (!fn || typeof fn !== 'function') {
    t.fail();
  }
});

test('[lib.js].flag() is exported properly', t => {
  const fn = require('../lib.js').flag;

  if (!fn || typeof fn !== 'function') {
    t.fail();
  }
});

const {flag} = require('../lib.js');

test('fails if empty', t => {
  const emoji = flag();
  if (emoji !== undefined) {
    t.fail(`${emoji} instead of undefined`);
  }
});

//
// from country NAMES
//
test('converts name', t => {
  const emoji = flag('Taiwan');
  if (!emoji || emoji !== '🇹🇼') {
    t.fail(`${emoji} instead of 🇹🇼`);
  }
});

test('converts short name', t => {
  const emoji = flag('UK');
  if (!emoji || emoji !== '🇬🇧') {
    t.fail(`${emoji} instead of 🇬🇧`);
  }
});

test('converts partial name', t => {
  const emoji = flag('Czech');
  if (!emoji || emoji !== '🇨🇿') {
    t.fail(`${emoji} instead of 🇨🇿`);
  }
});

test('converts alternative name', t => {
  const emoji = flag('North Korea');
  if (!emoji || emoji !== '🇰🇵') {
    t.fail(`${emoji} instead of 🇰🇵`);
  }
});

test('converts weird name notation', t => {
  const emoji = flag('Virgin Islands, British');
  if (!emoji || emoji !== '🇻🇬') {
    t.fail(`${emoji} instead of 🇻🇬`);
  }
});

test('converts less weird name notation', t => {
  const emoji = flag('U.S. Virgin Islands');
  if (!emoji || emoji !== '🇻🇮') {
    t.fail(`${emoji} instead of 🇻🇮`);
  }
});

test('converts name with weird characters', t => {
  const emoji = flag('Åland');
  if (!emoji || emoji !== '🇦🇽') {
    t.fail(`${emoji} instead of 🇦🇽`);
  }
});

test('converts name with different casing', t => {
  const emoji = flag('EGYPT');
  if (!emoji || emoji !== '🇪🇬') {
    t.fail(`${emoji} instead of 🇪🇬`);
  }
});

test('converts if name within string', t => {
  const emoji = flag('China number two!');
  if (!emoji || emoji !== '🇨🇳') {
    t.fail(`${emoji} instead of 🇨🇳`);
  }
});

test('fails on name conflict', t => {
  const emoji = flag('Korea');
  if (emoji !== undefined) {
    t.fail(`${emoji} instead of undefined`);
  }
});

test('fails if two names in string', t => {
  const emoji = flag('Poland & Hungary');
  if (emoji !== undefined) {
    t.fail(`${emoji} instead of undefined`);
  }
});

test('fails on no match', t => {
  const emoji = flag('there is no country named like that');
  if (emoji !== undefined) {
    t.fail(`${emoji} instead of undefined`);
  }
});

//
// from country CODES
//
test('converts if existing code given', t => {
  const emoji = flag('MA');
  if (!emoji || emoji !== '🇲🇦') {
    t.fail(`${emoji} instead of 🇲🇦`);
  }
});

test('fails if not existing code given', t => {
  const emoji = flag('XX');
  if (emoji) {
    t.fail(`${emoji} instead of undefined`);
  }
});

//
// from country FLAG
//
test('fails if emoji given', t => {
  const emoji = flag('🇪🇬');
  if (emoji !== undefined) {
    t.fail(`${emoji} instead of undefined`);
  }
});
