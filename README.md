# country-emoji

[![npm_svg]][npm_url]
[![dl_url]][npm_url]
[![coveralls_svg]][coveralls_url]
[![codecov_svg]][codecov_url]
[![xo_svg]][xo_url]
[![license_svg]][license_url]
[![tippin_svg]][tippin_url]


[npm_svg]: https://img.shields.io/npm/v/country-emoji
[npm_url]: https://www.npmjs.com/package/country-emoji

[dl_url]: https://img.shields.io/npm/dw/country-emoji

[coveralls_svg]: https://coveralls.io/repos/github/meeDamian/country-emoji/badge.svg?branch=master
[coveralls_url]: https://coveralls.io/github/meeDamian/country-emoji?branch=master

[codecov_svg]: https://codecov.io/github/meeDamian/country-emoji/coverage.svg?branch=master
[codecov_url]: https://codecov.io/github/meeDamian/country-emoji?branch=master

[xo_svg]: https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo_url]: https://github.com/sindresorhus/xo

[license_svg]: https://img.shields.io/npm/l/country-emoji
[license_url]: https://github.com/meeDamian/country-emoji/blob/master/LICENSE

Converts between country names, ISO 3166-1 codes and flag emojis. **Has zero dependencies.**

## Install

```
$ npm install --save country-emoji
```

## Usage

```js
const {flag, code, name, countries} = require('country-emoji');

flag('CL')
 // ~> 🇨🇱

code('🇨🇦')
 // ~> CA

name('🇶🇦')
 // ~> Qatar

// can extract name from string…
flag('Taiwan number one!')
 // ~> 🇹🇼

// …but only if there's no ambiguity
flag('Congo and Burma')
 // ~> undefined

flag('Republic of Tanzania')
 // ~> 🇹🇿

flag('Tanzania, United Republic of')
 // ~> 🇹🇿

code('Australia')
 // ~> AU

code('UAE')
 // ~> AE

name('AE')
 // ~> United Arab Emirates

code('UK')
 // ~> GB

// all values can be converted back and forth indefinitely
flag(name(flag(code(flag(name('NZ'))))))
 // ~> 🇳🇿

 // a dictionary (of country code to country name) of all countries
Object.keys(countries).join(", ")
 // ~> AD, AE, AF, AG, AI, AL, AM, AN, AO, AQ, AR, AS, AT, AU, AW, AX, AZ, BA, BB, BD, BE, BF, BG, BH, BI, BJ, BM, BN, BO, BR, BS, BT, BV, BW, BY, BZ, CA, CC, CD, CF, CG, CH, CI, CK, CL, CM, CN, CO, CR, CU, CV, CX, CY, CZ, DE, DJ, DK, DM, DO, DZ, EC, EE, EG, EH, ER, ES, ET, EU, FI, FJ, FK, FM, FO, FR, GA, GB, GD, GE, GF, GG, GH, GI, GL, GM, GN, GP, GQ, GR, GS, GT, GU, GW, GY, HK, HM, HN, HR, HT, HU, ID, IE, IL, IM, IN, IO, IQ, IR, IS, IT, JE, JM, JO, JP, KE, KG, KH, KI, KM, KN, KP, KR, KW, KY, KZ, LA, LB, LC, LI, LK, LR, LS, LT, LU, LV, LY, MA, MC, MD, ME, MG, MH, MK, ML, MM, MN, MO, MP, MQ, MR, MS, MT, MU, MV, MW, MX, MY, MZ, NA, NC, NE, NF, NG, NI, NL, NO, NP, NR, NU, NZ, OM, PA, PE, PF, PG, PH, PK, PL, PM, PN, PR, PS, PT, PW, PY, QA, RE, RO, RS, RU, RW, SA, SB, SC, SD, SE, SG, SH, SI, SJ, SK, SL, SM, SN, SO, SR, ST, SV, SY, SZ, TC, TD, TF, TG, TH, TJ, TK, TL, TM, TN, TO, TR, TT, TV, TW, TZ, UA, UG, UM, US, UY, UZ, VA, VC, VE, VG, VI, VN, VU, WF, WS, XK, YE, YT, ZA, ZM, ZW

```

### Don't want JS?

Check out the following:

* **Swift:** [SwiftFlags](https://github.com/BubiDevs/SwiftFlags) (ref: [#16](https://github.com/meeDamian/country-emoji/issues/16))
* **Rust:** [country-emoji](https://github.com/leodutra/country-emoji) [[crates.io]] (ref: [#20](https://github.com/meeDamian/country-emoji/issues/20))
* **Python:** [country-emoji](https://github.com/Nnonexistent/country-emoji) [[PyPI]] (ref: [#40](https://github.com/meeDamian/country-emoji/issues/40))

[crates.io]: https://crates.io/crates/country-emoji
[PyPI]: https://pypi.org/project/country-emoji/

PS. Happy to add more here :).

## Bugs and feedback

If you discover a bug please report it [here](https://github.com/meeDamian/country-emoji/issues/new).  Express gratitude [here](https://donate.meedamian.com).

Mail me at bugs@meedamian.com, or on twitter [@meeDamian](http://twitter.com/meedamian).

![codecov.io](https://codecov.io/github/meeDamian/country-emoji/branch.svg?branch=master)


## License

MIT @ [Damian Mee](https://meedamian.com)
