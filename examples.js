'use strict';

const {flag, code, name} = require('./main.js');

console.log(flag('CL'));
// 🇨🇱

// can extract name from string…
console.log(flag('Taiwan number one!'));
// 🇹🇼

// …but only if there's no ambiguity
console.log(flag('Congo and Burma'));
// undefined

console.log(flag('Republic of Tanzania'));
// 🇹🇿

console.log(flag('Tanzania, United Republic of'));
// 🇹🇿

console.log(code('🇨🇦'));
// CA

console.log(code('Australia'));
// AU

console.log(code('UAE'));
// AE

console.log(name('AE'));
// United Arab Emirates

console.log(name('🇶🇦'));
// Qatar

// all values can be converted back and forth indefinitely
console.log(flag(name(flag(code(flag(name('NZ')))))));
// 🇳🇿
