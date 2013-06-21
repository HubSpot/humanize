
describe 'compactInteger tests', ->
    it 'should make compact representations of integers', ->
        expect(Humanize).toBeDefined()
        expect(Humanize.compactInteger(999)).toEqual('999')
        expect(Humanize.compactInteger(999, 2)).toEqual('999.00')
        expect(Humanize.compactInteger(-999)).toEqual('-999')
        expect(Humanize.compactInteger(-0, 1)).toEqual('0.0')
        expect(Humanize.compactInteger(15, 0)).toEqual('15')
        expect(Humanize.compactInteger(7832186132456328967, 2)).toEqual('7.83x10^18')
        expect(Humanize.compactInteger(-7832186132456328967, 4)).toEqual('-7.8322x10^18')
        expect(Humanize.compactInteger(1000, 0)).toEqual('1k')
        expect(Humanize.compactInteger(-99321, 2)).toEqual('-99.32k')
        expect(Humanize.compactInteger(3199321, 1)).toEqual('3.2M')
        expect(Humanize.compactInteger(-37123436321, 5)).toEqual('-37.12344B')
        expect(Humanize.compactInteger(-9900432253321, 1)).toEqual('-9.9T')
        expect(Humanize.compactInteger(-9960432253321, 1)).toEqual('-10.0T')
        expect(Humanize.compactInteger(9990432253, 1)).toEqual('10.0B')
        expect(Humanize.compactInteger(100)).toEqual('100')
        expect(Humanize.compactInteger(123456789, 1)).toEqual('123.5M')

describe 'Ordinal value of numbers Test Suite', ->

    describe 'Ordinal value for numbers ending in zero', ->
        it 'should return 0 if the number is 0 (cos 0th doesnt read very well)', ->
            expect(Humanize.ordinal(0)).toEqual(0)

        it 'should return the number with suffix th', ->
            expect(Humanize.ordinal(10)).toEqual('10th')

    describe 'Ordinal value for numbers ending in one', ->
        it 'should end in st for numbers not ending in 11', ->
            expect(Humanize.ordinal(1)).toEqual('1st')
            expect(Humanize.ordinal(11)).toNotEqual('11st')
            expect(Humanize.ordinal(21)).toEqual('21st')

        it 'should be 11th for numbers ending in 11', ->
            expect(Humanize.ordinal(11)).toEqual('11th')
            expect(Humanize.ordinal(111)).toEqual('111th')

    describe 'Ordinal value for numbers ending in two', ->
        it 'should end in nd for numbers not ending in 12', ->
            expect(Humanize.ordinal(2)).toEqual('2nd')
            expect(Humanize.ordinal(12)).toNotEqual('12nd')
            expect(Humanize.ordinal(22)).toEqual('22nd')

        it 'should be 12th for numbers ending in 12', ->
            expect(Humanize.ordinal(12)).toEqual('12th')
            expect(Humanize.ordinal(112)).toEqual('112th')

    describe 'Ordinal value for numbers ending in three', ->
        it 'should end in rd for numbers not ending in 13', ->
            expect(Humanize.ordinal(3)).toEqual('3rd')
            expect(Humanize.ordinal(13)).toNotEqual('13rd')
            expect(Humanize.ordinal(23)).toEqual('23rd')

        it 'should be 13th for numbers ending in 13', ->
            expect(Humanize.ordinal(13)).toEqual('13th')
            expect(Humanize.ordinal(113)).toEqual('113th')

    describe 'Ordinal value for numbers ending in four', ->
        it 'should end in th for numbers', ->
            expect(Humanize.ordinal(4)).toEqual('4th')
            expect(Humanize.ordinal(14)).toEqual('14th')
            expect(Humanize.ordinal(24)).toEqual('24th')

describe 'Times tests', ->

    it 'should say never', ->
        expect(Humanize.times(0)).toEqual('never')

    it 'should say once', ->
        expect(Humanize.times(1)).toEqual('once')

    it 'should say twice', ->
        expect(Humanize.times(2)).toEqual('twice')

    it 'should say 12 times', ->
        expect(Humanize.times(12)).toEqual('12 times')

describe 'Pluralize tests', ->

    it 'should append an s as the default', ->
        expect(Humanize.pluralize(1,'cupcake')).toEqual('cupcake')
        expect(Humanize.pluralize(2,'cupcake')).toEqual('cupcakes')

    it 'should return provided value for special cases', ->
        expect(Humanize.pluralize(1,'person','people')).toEqual('person')
        expect(Humanize.pluralize(2,'person','people')).toEqual('people')
        expect(Humanize.pluralize(1,'child','children')).toEqual('child')
        expect(Humanize.pluralize(2,'child','children')).toEqual('children')

describe 'Filesize tests for nerds', ->

    it 'should append byte if it is exactly 1 byte', ->
        expect(Humanize.fileSize(1)).toEqual('1 byte')

    it 'should append bytes if it is less than 1024 bytes', ->
        expect(Humanize.fileSize(512)).toEqual('512 bytes')

    it 'should return a file in KB if it is more than 1024 bytes', ->
        expect(Humanize.fileSize(1080)).toEqual('1 KB')

    it 'should return a file in MB if it is more than a 1024 * 1024 bytes', ->
        expect(Humanize.fileSize(2.22*1024*1024)).toEqual('2.22 MB')

    it 'should return a file in GB if it is more than a 1024 * 1024 * 1024 bytes', ->
        expect(Humanize.fileSize(2.22*1024*1024*1024)).toEqual('2.22 GB')

describe 'Truncating objects to shorter versions', ->
    objs =
        str: 'abcdefghijklmnopqrstuvwxyz'
        num: 1234567890
        arr: [1, 2, 3, 4, 5]

    it 'should truncate a long string with ellipsis', ->
        expect(Humanize.truncate(objs.str, 14)).toEqual('abcdefghijk...')
        expect(Humanize.truncate(objs.str, 14, '...kidding')).toEqual('abcd...kidding')

    it 'should truncate a number to an upper bound', ->
        expect(Humanize.boundedNumber(objs.num, 500)).toEqual('500+')

    it 'should not trucate things that are too short', ->
        expect(Humanize.truncate(objs.str, objs.str.length + 1)).toEqual(objs.str)
        expect(Humanize.boundedNumber(objs.num, objs.num + 1)).toEqual("#{objs.num}")

describe 'Converting a list to a readable, oxford commafied string', ->
    items = ['apple', 'orange', 'banana', 'pear', 'pineapple']

    it 'should return an empty string when given an empty list', ->
        expect(Humanize.oxford(items.slice(0, 0))).toEqual('')

    it 'should return a string version of a list that has only one value', ->
        expect(Humanize.oxford(items.slice(0, 1))).toEqual('apple')

    it 'should return items separated by "and" when given a list of two values', ->
        expect(Humanize.oxford(items.slice(0, 2))).toEqual('apple and orange')

    it 'should convert a list to an oxford commafied string', ->
        expect(Humanize.oxford(items.slice(0))).toEqual('apple, orange, banana, pear, and pineapple')

    it 'should truncate a large list of items with proper pluralization', ->
        expect(Humanize.oxford(items.slice(0), 3)).toEqual('apple, orange, banana, and 2 others')
        expect(Humanize.oxford(items.slice(0), 4)).toEqual('apple, orange, banana, pear, and 1 other')

    it 'should accept custom trucation strings', ->
        limitStr = ", and some other fruits"

        expect(Humanize.oxford(items.slice(0), 3, limitStr)).toEqual('apple, orange, banana' + limitStr)
        expect(Humanize.oxford(items.slice(0, 3), 3, limitStr)).toEqual('apple, orange, and banana')

describe 'Converting a hashmap to a dictionary-like string', ->
    hash = {'Jonathan': 24, 'Bash': 23, 'Matt': 26}

    it 'should not accept non-objects', ->
        expect(Humanize.dictionary('String')).toEqual('')
        expect(Humanize.dictionary((arg) -> 'Function')).toEqual('')
        expect(Humanize.dictionary([1, 2, 3])).toEqual('')

    it 'should convert a hash to a key-value string', ->
        expect(Humanize.dictionary(hash)).toEqual('Jonathan is 24, Bash is 23, Matt is 26')

describe 'Converting pace arguments into strings', ->
    it 'should convert two pace arguments to a string', ->
        second = 1000
        week = 6.048e8
        decade = 3.156e11
        expect(Humanize.pace(4, week)).toEqual('Approximately 4 times per week')
        expect(Humanize.pace(1.5, second, "heartbeat")).toEqual('Approximately 2 heartbeats per second')
        expect(Humanize.pace(1, decade, "life crisis")).toEqual('Less than 1 life crisis per week')

describe 'Converting line breaks', ->
    it 'should convert /\n to a <br/> tag', ->
        expect(Humanize.nl2br('\n')).toEqual('<br/>')

    it 'should convert a <br> tag to /\r/\n (new line)', ->
        expect(Humanize.br2nl('<br>')).toEqual('\r\n')

    it 'should convert a <br/> tag to /\r/\n (new line)', ->
        expect(Humanize.br2nl('<br/>')).toEqual('\r\n')

    it 'should convert a malformed <br> tag to /\r/\n (new line)', ->
        expect(Humanize.br2nl('<br    >')).toEqual('\r\n')

    it 'should convert a malformed <br/> tag to /\r/\n (new line)', ->
        expect(Humanize.br2nl('<br            />')).toEqual('\r\n')

describe 'Capitalizing words appropriately', ->
    it 'should convert "ship it" to "Ship it"', ->
        expect(Humanize.capitalize('ship it')).toEqual('Ship it')

    it 'should convert "wHOaAa!" to "WHOaAa!"', ->
        expect(Humanize.capitalize('wHOaAa!')).toEqual('WHOaAa!')

    it 'should convert "wHOaAa!" to "Whoaaa!"', ->
        expect(Humanize.capitalize('wHOaAa!', true)).toEqual('Whoaaa!')

    it 'should convert "ship it" to "Ship It"', ->
        expect(Humanize.titleCase('ship it')).toEqual('Ship It')

    it 'should convert "" to ""', ->
        expect(Humanize.titleCase('')).toEqual('')

    it 'should convert "the boss is O\'Mally\'s brother." to "The Boss is O\'Mally\'s Brother."', ->
        expect(Humanize.titleCase('the boss likes O\'Mally\'s little brother a lot.')).toEqual('The Boss Likes O\'Mally\'s Little Brother a Lot.')

    it 'should convert "you get the cake an iTunes hat is West wacky?" to "You Get the Cake an iTunes Hat Is West Wacky?"', ->
        expect(Humanize.titleCase('you get the cake an iTunes hat is West wacky?')).toEqual('You Get the Cake an iTunes Hat Is West Wacky?')

    it 'should convert "cool the iTunes cake, O\'Malley!" to "Cool the iTunes Cake, O\'Malley!"', ->
        expect(Humanize.titleCase('cool the iTunes cake, O\'Malley!')).toEqual('Cool the iTunes Cake, O\'Malley!')
        
    it 'should convert "cul-de-sac        drive-by" to "Cul-de-Sac Drive-By"', ->
        expect(Humanize.titleCase('cul-de-sac         drive-by')).toEqual('Cul-de-Sac Drive-By')
        
    it 'should convert "ultra-book By iTunes" to "Ultra-Book by iTunes"', ->
        expect(Humanize.titleCase('ultra-book By iTunes')).toEqual('Ultra-Book by iTunes')
        
    it 'should convert "by-the-book ultra-book By iTunes" to "By-the-Book Ultra-Book by iTunes"', ->
        expect(Humanize.titleCase('by-the-book ultra-book By iTunes')).toEqual('By-the-Book Ultra-Book by iTunes')
        
    it 'should convert "by-the-book ultra-book by-the-by iTunes" to "By-the-Book Ultra-Book by-the-by iTunes"', ->
        expect(Humanize.titleCase('by-the-book ultra-book by-the-by iTunes')).toEqual('By-the-Book Ultra-Book by-the-by iTunes')
        
    it 'should convert "by-the-by is not iTunes-O\'Malley\'s favorite of the new-on-a-book" to "By-the-by Is Not iTunes-O\'Malley\'s Favorite of the New-on-a-Book"', ->
        expect(Humanize.titleCase('by-the-by is not iTunes-O\'Malley\'s favorite of the new-on-a-book')).toEqual('By-the-By Is Not iTunes-O\'Malley\'s Favorite of the New-on-a-Book')
        
