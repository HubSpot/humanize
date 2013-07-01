(function() {
  var Humanize, isArray, isFinite, isNaN, objectRef, timeFormats, toString,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  objectRef = new function() {};

  toString = objectRef.toString;

  isNaN = function(value) {
    return value !== value;
  };

  isFinite = function(value) {
    return ((typeof window !== "undefined" && window !== null ? window.isFinite : void 0) || global.isFinite)(value) && !isNaN(parseFloat(value));
  };

  isArray = function(value) {
    return toString.call(value) === '[object Array]';
  };

  timeFormats = [
    {
      name: 'second',
      value: 1e3
    }, {
      name: 'minute',
      value: 6e4
    }, {
      name: 'hour',
      value: 36e5
    }, {
      name: 'day',
      value: 864e5
    }, {
      name: 'week',
      value: 6048e5
    }
  ];

  Humanize = (function() {
    var PrivateHumanize;

    function Humanize() {}

    Humanize.instance = null;

    PrivateHumanize = (function() {

      function PrivateHumanize() {
        this.titleCase = __bind(this.titleCase, this);

        this.titlecase = __bind(this.titlecase, this);

        this.pace = __bind(this.pace, this);

        this.frequency = __bind(this.frequency, this);

        this.oxford = __bind(this.oxford, this);

        this.truncatenumber = __bind(this.truncatenumber, this);

        this.truncatewords = __bind(this.truncatewords, this);

        this.toFixed = __bind(this.toFixed, this);

        this.formatNumber = __bind(this.formatNumber, this);

        this.fileSize = __bind(this.fileSize, this);

        this.filesize = __bind(this.filesize, this);

        this.intComma = __bind(this.intComma, this);

        this.intcomma = __bind(this.intcomma, this);

        this.intword = __bind(this.intword, this);
        Object.freeze(this);
      }

      PrivateHumanize.prototype.intword = function(number, charWidth, decimals) {
        if (decimals == null) {
          decimals = 2;
        }
        /*
                    # This method is deprecated. Please use compactInteger instead.
                    # intword will be going away in the next major version.
        */

        return this.compactInteger(number, decimals);
      };

      PrivateHumanize.prototype.compactInteger = function(input, decimals) {
        var bigNumPrefixes, decimalIndex, decimalPart, decimalPartArray, length, number, numberLength, numberLengths, output, outputNumber, signString, unsignedNumber, unsignedNumberCharacterArray, unsignedNumberString, wholePart, wholePartArray, _i, _len, _length;
        if (decimals == null) {
          decimals = 0;
        }
        decimals = Math.max(decimals, 0);
        number = parseInt(input, 10);
        signString = number < 0 ? "-" : "";
        unsignedNumber = Math.abs(number);
        unsignedNumberString = "" + unsignedNumber;
        numberLength = unsignedNumberString.length;
        numberLengths = [13, 10, 7, 4];
        bigNumPrefixes = ['T', 'B', 'M', 'k'];
        if (unsignedNumber < 1000) {
          if (decimals > 0) {
            unsignedNumberString += "." + (Array(decimals + 1).join('0'));
          }
          return "" + signString + unsignedNumberString;
        }
        if (numberLength > numberLengths[0] + 3) {
          return number.toExponential(decimals).replace('e+', 'x10^');
        }
        for (_i = 0, _len = numberLengths.length; _i < _len; _i++) {
          _length = numberLengths[_i];
          if (numberLength >= _length) {
            length = _length;
            break;
          }
        }
        decimalIndex = numberLength - length + 1;
        unsignedNumberCharacterArray = unsignedNumberString.split("");
        wholePartArray = unsignedNumberCharacterArray.slice(0, decimalIndex);
        decimalPartArray = unsignedNumberCharacterArray.slice(decimalIndex, decimalIndex + decimals + 1);
        wholePart = wholePartArray.join("");
        decimalPart = decimalPartArray.join("");
        if (decimalPart.length < decimals) {
          decimalPart += "" + (Array(decimals - decimalPart.length + 1).join('0'));
        }
        if (decimals === 0) {
          output = "" + signString + wholePart + bigNumPrefixes[numberLengths.indexOf(length)];
        } else {
          outputNumber = (+("" + wholePart + "." + decimalPart)).toFixed(decimals);
          output = "" + signString + outputNumber + bigNumPrefixes[numberLengths.indexOf(length)];
        }
        return output;
      };

      PrivateHumanize.prototype.intcomma = function(n, d) {
        if (d == null) {
          d = 0;
        }
        return this.intComma(n, d);
      };

      PrivateHumanize.prototype.intComma = function(number, decimals) {
        if (decimals == null) {
          decimals = 0;
        }
        return this.formatNumber(number, decimals);
      };

      PrivateHumanize.prototype.filesize = function(f) {
        return this.fileSize(f);
      };

      PrivateHumanize.prototype.fileSize = function(filesize) {
        var sizeStr;
        if (filesize >= 1073741824) {
          sizeStr = this.formatNumber(filesize / 1073741824, 2, "") + " GB";
        } else if (filesize >= 1048576) {
          sizeStr = this.formatNumber(filesize / 1048576, 2, "") + " MB";
        } else if (filesize >= 1024) {
          sizeStr = this.formatNumber(filesize / 1024, 0) + " KB";
        } else {
          sizeStr = this.formatNumber(filesize, 0) + this.pluralize(filesize, " byte");
        }
        return sizeStr;
      };

      PrivateHumanize.prototype.formatNumber = function(number, precision, thousand, decimal) {
        var base, commas, decimals, firstComma, mod, negative, usePrecision,
          _this = this;
        if (precision == null) {
          precision = 0;
        }
        if (thousand == null) {
          thousand = ",";
        }
        if (decimal == null) {
          decimal = ".";
        }
        firstComma = function(number, thousand, position) {
          if (position) {
            return number.substr(0, position) + thousand;
          } else {
            return "";
          }
        };
        commas = function(number, thousand, position) {
          return number.substr(position).replace(/(\d{3})(?=\d)/g, "$1" + thousand);
        };
        decimals = function(number, decimal, usePrecision) {
          if (usePrecision) {
            return decimal + _this.toFixed(Math.abs(number), usePrecision).split(".")[1];
          } else {
            return "";
          }
        };
        usePrecision = this.normalizePrecision(precision);
        negative = number < 0 && "-" || "";
        base = parseInt(this.toFixed(Math.abs(number || 0), usePrecision), 10) + "";
        mod = base.length > 3 ? base.length % 3 : 0;
        return negative + firstComma(base, thousand, mod) + commas(base, thousand, mod) + decimals(number, decimal, usePrecision);
      };

      PrivateHumanize.prototype.toFixed = function(value, precision) {
        var power;
        if (precision == null) {
          precision = this.normalizePrecision(precision, 0);
        }
        power = Math.pow(10, precision);
        return (Math.round(value * power) / power).toFixed(precision);
      };

      PrivateHumanize.prototype.normalizePrecision = function(value, base) {
        value = Math.round(Math.abs(value));
        if (isNaN(value)) {
          return base;
        } else {
          return value;
        }
      };

      PrivateHumanize.prototype.ordinal = function(value) {
        var end, leastSignificant, number, specialCase;
        number = parseInt(value, 10);
        if (number === 0) {
          return value;
        }
        specialCase = number % 100;
        if (specialCase === 11 || specialCase === 12 || specialCase === 13) {
          return "" + number + "th";
        }
        leastSignificant = number % 10;
        switch (leastSignificant) {
          case 1:
            end = "st";
            break;
          case 2:
            end = "nd";
            break;
          case 3:
            end = "rd";
            break;
          default:
            end = "th";
        }
        return "" + number + end;
      };

      PrivateHumanize.prototype.times = function(value, overrides) {
        var number, smallTimes, _ref;
        if (overrides == null) {
          overrides = {};
        }
        if (isFinite(value) && value >= 0) {
          number = parseFloat(value);
          smallTimes = ['never', 'once', 'twice'];
          if (overrides[number] != null) {
            return "" + overrides[number];
          } else {
            return "" + (((_ref = smallTimes[number]) != null ? _ref.toString() : void 0) || number.toString() + ' times');
          }
        }
      };

      PrivateHumanize.prototype.pluralize = function(number, singular, plural) {
        if (!((number != null) && (singular != null))) {
          return;
        }
        if (plural == null) {
          plural = singular + "s";
        }
        if (parseInt(number, 10) === 1) {
          return singular;
        } else {
          return plural;
        }
      };

      PrivateHumanize.prototype.truncate = function(str, length, ending) {
        if (length == null) {
          length = 100;
        }
        if (ending == null) {
          ending = '...';
        }
        if (str.length > length) {
          return str.substring(0, length - ending.length) + ending;
        } else {
          return str;
        }
      };

      PrivateHumanize.prototype.truncatewords = function(s, l) {
        return this.truncateWords(s, l);
      };

      PrivateHumanize.prototype.truncateWords = function(string, length) {
        var array, i, result;
        array = string.split(" ");
        result = "";
        i = 0;
        while (i < length) {
          if (array[i] != null) {
            result += "" + array[i] + " ";
          }
          i++;
        }
        if (array.length > length) {
          return result += "...";
        }
      };

      PrivateHumanize.prototype.truncatenumber = function(n, b, e) {
        if (b == null) {
          b = 100;
        }
        if (e == null) {
          e = '+';
        }
        return this.boundedNumber(n, b, e);
      };

      PrivateHumanize.prototype.boundedNumber = function(num, bound, ending) {
        var result;
        if (bound == null) {
          bound = 100;
        }
        if (ending == null) {
          ending = "+";
        }
        result = null;
        if (isFinite(num) && isFinite(bound)) {
          if (num > bound) {
            result = bound + ending;
          }
        }
        return (result || num).toString();
      };

      PrivateHumanize.prototype.oxford = function(items, limit, limitStr) {
        var extra, limitIndex, numItems;
        numItems = items.length;
        if (numItems < 2) {
          return "" + items;
        } else if (numItems === 2) {
          return items.join(' and ');
        } else if ((limit != null) && numItems > limit) {
          extra = numItems - limit;
          limitIndex = limit;
          if (limitStr == null) {
            limitStr = ", and " + extra + " " + (this.pluralize(extra, 'other'));
          }
        } else {
          limitIndex = -1;
          limitStr = ", and " + items[numItems - 1];
        }
        return items.slice(0, limitIndex).join(', ') + limitStr;
      };

      PrivateHumanize.prototype.dictionary = function(object, joiner, separator) {
        var defs, key, result, val;
        if (joiner == null) {
          joiner = ' is ';
        }
        if (separator == null) {
          separator = ', ';
        }
        result = '';
        if ((object != null) && typeof object === 'object' && Object.prototype.toString.call(object) !== '[object Array]') {
          defs = [];
          for (key in object) {
            val = object[key];
            defs.push("" + key + joiner + val);
          }
          result = defs.join(separator);
        }
        return result;
      };

      PrivateHumanize.prototype.frequency = function(list, verb) {
        var len, str, times;
        if (!isArray(list)) {
          return;
        }
        len = list.length;
        times = this.times(len);
        if (len === 0) {
          str = "" + times + " " + verb;
        } else {
          str = "" + verb + " " + times;
        }
        return str;
      };

      PrivateHumanize.prototype.pace = function(value, intervalMs, unit) {
        var f, prefix, rate, relativePace, roundedPace, timeUnit, _i, _len;
        if (unit == null) {
          unit = 'time';
        }
        if (value === 0 || intervalMs === 0) {
          return "No " + (this.pluralize(unit));
        }
        prefix = 'Approximately';
        timeUnit = null;
        rate = value / intervalMs;
        for (_i = 0, _len = timeFormats.length; _i < _len; _i++) {
          f = timeFormats[_i];
          relativePace = rate * f.value;
          if (relativePace > 1) {
            timeUnit = f.name;
            break;
          }
        }
        if (!timeUnit) {
          prefix = 'Less than';
          relativePace = 1;
          timeUnit = timeFormats[timeFormats.length - 1].name;
        }
        roundedPace = Math.round(relativePace);
        unit = this.pluralize(roundedPace, unit);
        return "" + prefix + " " + roundedPace + " " + unit + " per " + timeUnit;
      };

      PrivateHumanize.prototype.nl2br = function(string, replacement) {
        if (replacement == null) {
          replacement = '<br/>';
        }
        return string.replace(/\n/g, replacement);
      };

      PrivateHumanize.prototype.br2nl = function(string, replacement) {
        if (replacement == null) {
          replacement = '\r\n';
        }
        return string.replace(/\<br\s*\/?\>/g, replacement);
      };

      PrivateHumanize.prototype.capitalize = function(string, downCaseTail) {
        if (downCaseTail == null) {
          downCaseTail = false;
        }
        return "" + (string.charAt(0).toUpperCase()) + (downCaseTail ? string.slice(1).toLowerCase() : string.slice(1));
      };

      PrivateHumanize.prototype.capitalizeAll = function(string) {
        return string.replace(/(?:^|\s)\S/g, function(a) {
          return a.toUpperCase();
        });
      };

      PrivateHumanize.prototype.titlecase = function(s) {
        return this.titleCase(s);
      };

      PrivateHumanize.prototype.titleCase = function(string) {
        var doTitleCase, internalCaps, smallWords, splitOnHyphensRegex, splitOnWhiteSpaceRegex,
          _this = this;
        smallWords = /\b(a|an|and|at|but|by|de|en|for|if|in|of|on|or|the|to|via|vs?\.?)\b/i;
        internalCaps = /\S+[A-Z]+\S*/;
        splitOnWhiteSpaceRegex = /\s+/;
        splitOnHyphensRegex = /-/;
        doTitleCase = function(_string, hyphenated, firstOrLast) {
          var index, stringArray, titleCasedArray, word, _i, _len;
          if (hyphenated == null) {
            hyphenated = false;
          }
          if (firstOrLast == null) {
            firstOrLast = true;
          }
          titleCasedArray = [];
          stringArray = _string.split(hyphenated ? splitOnHyphensRegex : splitOnWhiteSpaceRegex);
          for (index = _i = 0, _len = stringArray.length; _i < _len; index = ++_i) {
            word = stringArray[index];
            if (word.indexOf('-') !== -1) {
              titleCasedArray.push(doTitleCase(word, true, index === 0 || index === stringArray.length - 1));
              continue;
            }
            if (firstOrLast && (index === 0 || index === stringArray.length - 1)) {
              titleCasedArray.push(internalCaps.test(word) ? word : _this.capitalize(word));
              continue;
            }
            if (internalCaps.test(word)) {
              titleCasedArray.push(word);
            } else if (smallWords.test(word)) {
              titleCasedArray.push(word.toLowerCase());
            } else {
              titleCasedArray.push(_this.capitalize(word));
            }
          }
          return titleCasedArray.join(hyphenated ? '-' : ' ');
        };
        return doTitleCase(string);
      };

      return PrivateHumanize;

    })();

    Humanize.get = function() {
      var _ref;
      return (_ref = this.instance) != null ? _ref : this.instance = new PrivateHumanize;
    };

    return Humanize;

  }).call(this);

  this.Humanize = Humanize.get();

  if (typeof module !== "undefined" && module !== null) {
    module.exports = this.Humanize;
  }

}).call(this);
