'use strict';

//
// primary functions:
//
const {flag, code, name} = require('./main.js');

console.log(flag('CL'));
// 🇨🇱

console.log(flag('Taiwan nember one!'));
// 🇹🇼

console.log(code('🇨🇦'));
// CA

console.log(code('Australia'));
// AU

console.log(name('AE'));
// United Arab Emirates

console.log(name('🇶🇦'));
// Qatar

//
// Helpers, but still exposed
//
const {isFlag} = require('./main.js');

console.log(isFlag('🇸🇻'));
// true

console.log(isFlag('💩'));
// false
