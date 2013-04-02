(function() {

  describe('Millions as word', function() {
    return it('should pass', function() {
      expect(Humanize).toBeDefined();
      return expect(Humanize.intword(123456789, 6)).toEqual('123.45M');
    });
  });

  describe('Ordinal value of numbers Test Suite', function() {
    describe('Ordinal value for numbers ending in zero', function() {
      it('should return 0 if the number is 0 (cos 0th doesnt read very well)', function() {
        return expect(Humanize.ordinal(0)).toEqual(0);
      });
      return it('should return the number with suffix th', function() {
        return expect(Humanize.ordinal(10)).toEqual('10th');
      });
    });
    describe('Ordinal value for numbers ending in one', function() {
      it('should end in st for numbers not ending in 11', function() {
        expect(Humanize.ordinal(1)).toEqual('1st');
        expect(Humanize.ordinal(11)).toNotEqual('11st');
        return expect(Humanize.ordinal(21)).toEqual('21st');
      });
      return it('should be 11th for numbers ending in 11', function() {
        expect(Humanize.ordinal(11)).toEqual('11th');
        return expect(Humanize.ordinal(111)).toEqual('111th');
      });
    });
    describe('Ordinal value for numbers ending in two', function() {
      it('should end in nd for numbers not ending in 12', function() {
        expect(Humanize.ordinal(2)).toEqual('2nd');
        expect(Humanize.ordinal(12)).toNotEqual('12nd');
        return expect(Humanize.ordinal(22)).toEqual('22nd');
      });
      return it('should be 12th for numbers ending in 12', function() {
        expect(Humanize.ordinal(12)).toEqual('12th');
        return expect(Humanize.ordinal(112)).toEqual('112th');
      });
    });
    describe('Ordinal value for numbers ending in three', function() {
      it('should end in rd for numbers not ending in 13', function() {
        expect(Humanize.ordinal(3)).toEqual('3rd');
        expect(Humanize.ordinal(13)).toNotEqual('13rd');
        return expect(Humanize.ordinal(23)).toEqual('23rd');
      });
      return it('should be 13th for numbers ending in 13', function() {
        expect(Humanize.ordinal(13)).toEqual('13th');
        return expect(Humanize.ordinal(113)).toEqual('113th');
      });
    });
    return describe('Ordinal value for numbers ending in four', function() {
      return it('should end in th for numbers', function() {
        expect(Humanize.ordinal(4)).toEqual('4th');
        expect(Humanize.ordinal(14)).toEqual('14th');
        return expect(Humanize.ordinal(24)).toEqual('24th');
      });
    });
  });

  describe('Pluralize tests', function() {
    it('should append an s as the default', function() {
      expect(Humanize.pluralize(1, 'cupcake')).toEqual('cupcake');
      return expect(Humanize.pluralize(2, 'cupcake')).toEqual('cupcakes');
    });
    return it('should return provided value for special cases', function() {
      expect(Humanize.pluralize(1, 'person', 'people')).toEqual('person');
      expect(Humanize.pluralize(2, 'person', 'people')).toEqual('people');
      expect(Humanize.pluralize(1, 'child', 'children')).toEqual('child');
      return expect(Humanize.pluralize(2, 'child', 'children')).toEqual('children');
    });
  });

  describe('Filesize tests for nerds', function() {
    it('should append bytes if it is less than 1024 bytes', function() {
      return expect(Humanize.filesize(512)).toEqual('512 bytes');
    });
    it('should return a file in KB if it is more than 1024 bytes', function() {
      return expect(Humanize.filesize(1080)).toEqual('1 KB');
    });
    it('should return a file in MB if it is more than a 1024 * 1024 bytes', function() {
      return expect(Humanize.filesize(2.22 * 1024 * 1024)).toEqual('2.22 MB');
    });
    return it('should return a file in GB if it is more than a 1024 * 1024 * 1024 bytes', function() {
      return expect(Humanize.filesize(2.22 * 1024 * 1024 * 1024)).toEqual('2.22 GB');
    });
  });

  describe('Truncating objects to shorter versions', function() {
    var objs;
    objs = {
      str: 'abcdefghijklmnopqrstuvwxyz',
      num: 1234567890,
      arr: [1, 2, 3, 4, 5]
    };
    it('should truncate a long string with ellipsis', function() {
      expect(Humanize.truncate(objs.str, 14)).toEqual('abcdefghijk...');
      return expect(Humanize.truncate(objs.str, 14, '...kidding')).toEqual('abcd...kidding');
    });
    it('should truncate a number to an upper bound', function() {
      return expect(Humanize.truncatenumber(objs.num, 500)).toEqual('500+');
    });
    return it('should not trucate things that are too short', function() {
      expect(Humanize.truncate(objs.str, objs.str.length + 1)).toEqual(objs.str);
      return expect(Humanize.truncatenumber(objs.num, objs.num + 1)).toEqual("" + objs.num);
    });
  });

  describe('Converting a list to a readable, oxford commafied string', function() {
    var items;
    items = ['apple', 'orange', 'banana', 'pear', 'pineapple'];
    it('should return an empty string when given an empty list', function() {
      return expect(Humanize.oxford(items.slice(0, 0))).toEqual('');
    });
    it('should return a string version of a list that has only one value', function() {
      return expect(Humanize.oxford(items.slice(0, 1))).toEqual('apple');
    });
    it('should return items separated by "and" when given a list of two values', function() {
      return expect(Humanize.oxford(items.slice(0, 2))).toEqual('apple and orange');
    });
    it('should convert a list to an oxford commafied string', function() {
      return expect(Humanize.oxford(items.slice(0))).toEqual('apple, orange, banana, pear, and pineapple');
    });
    it('should truncate a large list of items with proper pluralization', function() {
      expect(Humanize.oxford(items.slice(0), 3)).toEqual('apple, orange, banana, and 2 others');
      return expect(Humanize.oxford(items.slice(0), 4)).toEqual('apple, orange, banana, pear, and 1 other');
    });
    it('should accept custom trucation strings', function() {
      var limitStr;
      limitStr = ", and some other fruits";
      expect(Humanize.oxford(items.slice(0), 3, limitStr)).toEqual('apple, orange, banana' + limitStr);
      return expect(Humanize.oxford(items.slice(0, 3), 3, limitStr)).toEqual('apple, orange, and banana');
    });
    return it('should convert two pace arguments to a string', function() {
      var decade, second, week;
      second = 1000;
      week = 6.048e8;
      decade = 3.156e11;
      expect(Humanize.pace(4, week)).toEqual('Approximately 4 times per week');
      expect(Humanize.pace(1.5, second, "heartbeat")).toEqual('Approximately 2 heartbeats per second');
      return expect(Humanize.pace(1, decade, "life crisis")).toEqual('Less than 1 life crisis per week');
    });
  });

  describe('Converting line breaks', function() {
    it('should convert /\n to a <br/> tag', function() {
      return expect(Humanize.nl2br('\n')).toEqual('<br/>');
    });
    it('should convert a <br> tag to /\r/\n (new line)', function() {
      return expect(Humanize.br2nl('<br>')).toEqual('\r\n');
    });
    it('should convert a <br/> tag to /\r/\n (new line)', function() {
      return expect(Humanize.br2nl('<br/>')).toEqual('\r\n');
    });
    it('should convert a malformed <br> tag to /\r/\n (new line)', function() {
      return expect(Humanize.br2nl('<br    >')).toEqual('\r\n');
    });
    return it('should convert a malformed <br/> tag to /\r/\n (new line)', function() {
      return expect(Humanize.br2nl('<br            />')).toEqual('\r\n');
    });
  });

  describe('Capitalizing words', function() {
    it('should convert "ship it" to "Ship it"', function() {
      return expect(Humanize.capitalize('ship it')).toEqual('Ship it');
    });
    return it('should convert "ship it" to "Ship It"', function() {
      return expect(Humanize.titlecase('ship it', true)).toEqual('Ship It');
    });
  });

}).call(this);
