'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var countries = require('../countries.json');

var MAGIC_NUMBER = 127462 - 65;

var CODE_RE = /^[a-z]{2}$/i;
var NAME_RE = /^.{2,}$/;
var FLAG_RE = /\uD83C[\uDDE6-\uDDFF]/;

function fuzzyCompare(str, name) {
  name = name.toLowerCase();

  // Cases like:
  //    "Vatican" <-> "Holy See (Vatican City State)"
  //    "Russia"  <-> "Russian Federation"
  if (name.indexOf(str) !== -1 || str.indexOf(name) !== -1) {
    return true;
  }

  // Cases like:
  // "British Virgin Islands" <-> "Virgin Islands, British"
  // "Republic of Moldova"    <-> "Moldova, Republic of"
  if (name.indexOf(',') !== -1) {
    var reversedName = name.split(', ').reverse().join(' ');
    if (reversedName.indexOf(str) !== -1 || str.indexOf(reversedName) !== -1) {
      return true;
    }
  }

  return false;
}

function isCode(code) {
  code = code.toUpperCase();

  return countries[code] ? code : undefined;
}

function nameToCode(name) {
  if (!name || !NAME_RE.test(name)) {
    return;
  }

  name = name.trim().toLowerCase();

  // Look for exact match
  // NOTE: normal loop to terminate ASAP
  for (var _code in countries) {
    if ({}.hasOwnProperty.call(countries, _code)) {
      var names = countries[_code];

      if (!Array.isArray(names)) {
        names = [names];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = names[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var n = _step.value;

          if (n.toLowerCase() === name) {
            return _code;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }

  // Look for inexact match
  // NOTE: .filter() to aggregate all matches
  var matches = Object.keys(countries).filter(function (code) {
    var names = countries[code];

    if (!Array.isArray(names)) {
      names = [names];
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = names[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _n = _step2.value;

        if (fuzzyCompare(name, _n)) {
          return true;
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return false;
  });

  // Return only when exactly one match was found
  //   prevents cases like "United"
  if (matches.length === 1) {
    return matches[0];
  }
}

function codeToName(code) {
  if (!code || !CODE_RE.test(code)) {
    return;
  }

  var names = countries[code.toUpperCase()];
  if (Array.isArray(names)) {
    return names[0];
  }

  return names;
}

function codeToFlag(code) {
  if (!code || !CODE_RE.test(code)) {
    return;
  }

  code = isCode(code);
  if (!code) {
    return;
  }

  if (String && String.fromCodePoint) {
    return String.fromCodePoint.apply(String, _toConsumableArray([].concat(_toConsumableArray(code)).map(function (c) {
      return MAGIC_NUMBER + c.charCodeAt();
    })));
  }
}

function flagToCode(flag) {
  if (!flag || !FLAG_RE.test(flag)) {
    return;
  }

  return isCode([].concat(_toConsumableArray(flag)).map(function (c) {
    return c.codePointAt(0) - MAGIC_NUMBER;
  }).map(function (c) {
    return String.fromCharCode(c);
  }).join(''));
}

// Takes either emoji or full name
function code(input) {
  return flagToCode(input) || nameToCode(input);
}

// Takes either code or full name
function flag(input) {
  if (!CODE_RE.test(input) || input === 'UK') {
    input = nameToCode(input);
  }

  return codeToFlag(input);
}

// Takes either emoji or code
function name(input) {
  if (FLAG_RE.test(input)) {
    input = flagToCode(input);
  }

  return codeToName(input);
}

module.exports = {
  MAGIC_NUMBER: MAGIC_NUMBER,

  CODE_RE: CODE_RE,
  NAME_RE: NAME_RE,
  FLAG_RE: FLAG_RE,

  code: code,
  flag: flag,
  name: name,

  countries: countries,

  isCode: isCode,
  fuzzyCompare: fuzzyCompare,

  codeToName: codeToName,
  codeToFlag: codeToFlag,
  nameToCode: nameToCode,
  flagToCode: flagToCode
};