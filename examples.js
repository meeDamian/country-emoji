'use strict';

function print(str, out, comment = '') {
  if (comment) {
    comment = `// ${comment}\n`;
  }

  console.log(`${comment}${str}\n // ~> ${out}\n`);
}

const {flag, code, name, countries} = require('./src/main.js');

print('flag(\'CL\')', flag('CL'));
print('code(\'🇨🇦\')', code('🇨🇦'));
print('name(\'🇶🇦\')', name('🇶🇦'));
print('flag(\'Taiwan number one!\')', flag('Taiwan number one!'), 'can extract name from string…');
print('flag(\'Congo and Burma\')', flag('Congo and Burma'), '…but only if there\'s no ambiguity');
print('flag(\'Republic of Tanzania\')', flag('Republic of Tanzania'));
print('flag(\'Tanzania, United Republic of\')', flag('Tanzania, United Republic of'));
print('code(\'Australia\')', code('Australia'));
print('code(\'UAE\')', code('UAE'));
print('name(\'AE\')', name('AE'));
print('code(\'UK\')', code('UK'));
print('flag(name(flag(code(flag(name(\'NZ\'))))))', flag(name(flag(code(flag(name('NZ')))))), 'all values can be converted back and forth indefinitely');
print('Object.keys(countries).join(\', \')', Object.keys(countries).join(', '), 'a dictionary (of country code to country name) of all countries');
