'use strict';

const countries = require('./countries.json');

const MAGIC_NUMBER = 127462 - 65;

const CODE_RE = /^[a-z]{2}$/i;
const NAME_RE = /^.{3,}$/;
const FLAG_RE = /\uD83C[\uDDE6-\uDDFF]/g;

const isCode = code => CODE_RE.test(code);
const isFlag = flag => FLAG_RE.test(flag);
const isName = name => NAME_RE.test(name);

// takes either emoji or full name
function code(input) {
  if (isFlag(input)) {
    return [...input].map(c => c.codePointAt(0) - MAGIC_NUMBER).map(c => String.fromCharCode(c)).join('');
  }

  if (isName(input)) {
    input = input.trim().toLowerCase();

    // look for exact match first
    // NOTE: normal loop, bcoz we want to stap ASAP
    for (const code in countries) {
      if (countries[code].toLowerCase() === input) {
        return code;
      }
    }

    // look for inexact match next
    const matches = Object.keys(countries)
      .filter(code => {
        const name = countries[code].toLowerCase();
        return name.indexOf(input) !== -1 || input.indexOf(name) !== -1;
      });

    // return only when exactly one match was found
    //   prevents cases like "United"
    if (matches.length === 1) {
      return matches[0];
    }
  }

  return;
}

// takes either code or full name
function flag(input) {
  if (!isCode(input)) {
    input = code(input);

    if (!input) {
      return;
    }
  }

  input = input.toUpperCase();

  return String.fromCodePoint(...[...input].map(c => MAGIC_NUMBER + c.charCodeAt()));
}

// takes either emoji or code
function name(input) {
  if (isFlag(input)) {
    input = code(input);
  }

  return countries[input.toUpperCase()];
}

module.exports = {
  MAGIC_NUMBER,
  CODE_RE,
  NAME_RE,
  FLAG_RE,

  isCode,
  isFlag,
  isName,

  code,
  flag,
  name
};
