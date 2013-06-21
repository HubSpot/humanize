# Shortcuts for native object methods
objectRef = new ->
toString = objectRef.toString

# Identifies where in a sequential list a new value should be added.
sortedIndex = (array, candidate, iterator) ->
    iterator ?= (value) -> value
    value = iterator candidate

    low = 0
    high = array.length

    while (low < high)
      mid = (low + high) >> 1
      if iterator(array[mid]) < value then low = mid + 1 else high = mid

    return low

arrayIndex = [].indexOf or (item) ->
    arr = @
    for arrItem, index in arr
        return index if arrItem is item
    return -1

isNaN = (value) -> value isnt value

isFinite = (value) -> (window?.isFinite or global.isFinite)(value) and not isNaN(parseFloat(value))

isArray = (value) -> toString.call(value) is '[object Array]'

timeFormats = [
    {
        name: 'second'
        value: 1e3
    }, {
        name: 'minute'
        value: 6e4
    }, {
        name: 'hour'
        value: 36e5
    }, {
        name: 'day'
        value: 864e5
    }, {
        name: 'week'
        value: 6048e5
    }
]


@Humanize = {}

# converts an integer into its most compact representation
@Humanize.compactInteger = (input, decimals=0) ->
    decimals             = Math.max decimals, 0
    number               = parseInt input, 10
    signString           = if number < 0 then "-" else ""
    unsignedNumber       = Math.abs number
    unsignedNumberString = "" + unsignedNumber
    numberLength         = unsignedNumberString.length
    numberLengths        = [ 13 ,  10,  7,   4 ]
    bigNumPrefixes       = [ 'T', 'B', 'M', 'k']

    # small numbers
    if unsignedNumber < 1000
        if decimals > 0
            unsignedNumberString += ".#{ Array(decimals + 1).join('0') }"
        return "#{ signString }#{ unsignedNumberString }"

    # really big numbers
    if numberLength > numberLengths[0] + 3
        return number.toExponential(decimals).replace('e+', 'x10^')

    # 999 < unsignedNumber < 999,999,999,999,999
    for _length in numberLengths
        if numberLength >= _length
            length = _length
            break

    decimalIndex = numberLength - length + 1
    unsignedNumberCharacterArray = unsignedNumberString.split("")

    wholePartArray = unsignedNumberCharacterArray.slice(0, decimalIndex)
    decimalPartArray = unsignedNumberCharacterArray.slice(decimalIndex, decimalIndex + decimals + 1)

    wholePart = wholePartArray.join("")

    # pad decimalPart if necessary
    decimalPart = decimalPartArray.join("")
    if decimalPart.length < decimals
        decimalPart += "#{ Array(decimals - decimalPart.length + 1).join('0') }"

    if decimals is 0
        output = "#{ signString }#{ wholePart }#{ bigNumPrefixes[numberLengths.indexOf(length)] }"
    else
        outputNumber = (+("#{ wholePart }.#{ decimalPart }")).toFixed(decimals)
        output = "#{ signString }#{ outputNumber }#{ bigNumPrefixes[numberLengths.indexOf(length)] }"
    
    output

# Converts an integer to a string containing commas every three digits.
@Humanize.intComma = (number, decimals=0) -> @formatNumber number, decimals

# Formats the value like a 'human-readable' file size (i.e. '13 KB', '4.1 MB', '102 bytes', etc).
@Humanize.fileSize = (filesize) ->
    if filesize >= 1073741824
        sizeStr = @formatNumber(filesize / 1073741824, 2, "") + " GB"
    else if filesize >= 1048576
        sizeStr = @formatNumber(filesize / 1048576, 2, "") + " MB"
    else if filesize >= 1024
        sizeStr = @formatNumber(filesize / 1024, 0) + " KB"
    else
        sizeStr = @formatNumber(filesize, 0) + @pluralize filesize, " byte"

    sizeStr

# Formats a number to a human-readable string.
# Localize by overriding the precision, thousand and decimal arguments.
@Humanize.formatNumber = (number, precision=0, thousand=",", decimal=".") ->

    # Create some private utility functions to make the computational
    # code that follows much easier to read.

    firstComma = (number, thousand, position) =>
        if position then number.substr(0, position) + thousand else ""

    commas = (number, thousand, position) =>
        number.substr(position).replace /(\d{3})(?=\d)/g, "$1" + thousand

    decimals = (number, decimal, usePrecision) =>
        if usePrecision then decimal + @toFixed(Math.abs(number), usePrecision).split(".")[1] else ""

    usePrecision = @normalizePrecision precision

    # Do some calc
    negative = number < 0 and "-" or ""
    base = parseInt(@toFixed(Math.abs(number or 0), usePrecision), 10) + ""
    mod = if base.length > 3 then base.length % 3 else 0

    # Format the number
    negative +
    firstComma(base, thousand, mod) +
    commas(base, thousand, mod) +
    decimals(number, decimal, usePrecision)

# Fixes binary rounding issues (eg. (0.615).toFixed(2) === "0.61")
@Humanize.toFixed = (value, precision) ->
    precision ?= @normalizePrecision precision, 0
    power = Math.pow 10, precision

    # Multiply up by precision, round accurately, then divide and use native toFixed()
    (Math.round(value * power) / power).toFixed precision

# Ensures precision value is a positive integer
@Humanize.normalizePrecision = (value, base) ->
    value = Math.round Math.abs value
    if isNaN(value) then base else value

# Converts an integer to its ordinal as a string.
@Humanize.ordinal = (value) ->
    number = parseInt value, 10

    return value if number is 0

    specialCase = number % 100
    return number + "th" if specialCase in [11, 12, 13]

    leastSignificant = number % 10
    switch leastSignificant
        when 1
            end = "st"
        when 2
            end = "nd"
        when 3
            end = "rd"
        else
            end = "th"

    "#{number}#{end}"

# Interprets numbers as occurences. Also accepts an optional array/map of overrides.
@Humanize.times = (value, overrides={}) ->
    if isFinite(value) and value >= 0
        number = parseFloat value
        switch number
            when 0
                result = overrides[0]? or 'never'
            when 1
                result = overrides[1]? or 'once'
            when 2
                result = overrides[2]? or 'twice'
            else
                result = (overrides[number] or number) + " times"

    result

# Returns the plural version of a given word if the value is not 1. The default suffix is 's'.
@Humanize.pluralize = (number, singular, plural) ->
    return unless number? and singular?

    plural ?= singular + "s"

    if parseInt(number, 10) is 1 then singular else plural

# Truncates a string if it is longer than the specified number of characters (inclusive). Truncated strings will end with a translatable ellipsis sequence ("…").
@Humanize.truncate = (str, length=100, ending='...') ->
    if str.length > length
        str.substring(0, length - ending.length) + ending
    else
        str

# Truncates a string after a certain number of words.
@Humanize.truncateWords = (string, length) ->
    array = string.split " "
    result = ""
    i = 0

    while i < length
        if array[i]?
            result += array[i] + " "

        i++

    result += "..." if array.length > length

# Truncates a number to an upper bound.
@Humanize.boundedNumber = (num, bound=100, ending='+') ->
    result = null

    if isFinite(num) and isFinite(bound)
        result = bound + ending if num > bound

    (result or num).toString()

# Converts a list of items to a human readable string with an optional limit.
@Humanize.oxford = (items, limit, limitStr) ->
    numItems = items.length

    if numItems < 2
        return "#{items}"

    else if numItems is 2
        return items.join ' and '

    else if limit? and numItems > limit
        extra = numItems - limit
        limitIndex = limit
        limitStr ?= ", and #{extra} #{@pluralize(extra, 'other')}"

    else
        limitIndex = -1
        limitStr = ", and #{items[numItems - 1]}"

    items.slice(0, limitIndex).join(', ') + limitStr

# Converts an object to a definition-like string
@Humanize.dictionary = (object, joiner=' is ', separator=', ') ->
    result = ''

    if object? and typeof object is 'object' and not isArray(object)
        defs = []
        for k, v of object
            defs.push k + joiner + v

        result = defs.join separator

    result

# Describes how many times an item appears in a list
@Humanize.frequency = (list, verb) ->
    return unless isArray(list)

    len = list.length
    times = @times len

    if len is 0
        str = "#{times} #{verb}"
    else
        str = "#{verb} #{times}"

    str

@Humanize.pace = (value, intervalMs, unit='time') ->
    if value is 0 or intervalMs is 0
        # Needs a better string than this...
        return "No #{@pluralize(unit)}"

    # Expose these as overridables?
    prefix = 'Approximately'
    timeUnit = null

    rate = value / intervalMs
    for f in timeFormats  # assumes sorted list
        relativePace = rate * f.value
        if relativePace > 1
            timeUnit = f.name
            break

    # Use the last time unit if there is nothing smaller
    unless timeUnit
        prefix = 'Less than'
        relativePace = 1
        timeUnit = timeFormats[timeFormats.length - 1].name

    roundedPace = Math.round relativePace
    unit = @pluralize roundedPace, unit

    "#{prefix} #{roundedPace} #{unit} per #{timeUnit}"

# Converts newlines to <br/> tags
@Humanize.nl2br = (string, replacement='<br/>') ->
    string.replace /\n/g, replacement

# Converts <br/> tags to newlines
@Humanize.br2nl = (string, replacement='\r\n') ->
    string.replace /\<br\s*\/?\>/g, replacement

# Capitalizes first letter in a string
@Humanize.capitalize = (string, downCaseTail=false) ->
    _tail = string.slice(1)
    tail = (downCaseTail and _tail.toLowerCase()) or _tail
    string.charAt(0).toUpperCase() + tail

# Capitalizes the first letter of each word in a string
@Humanize.capitalizeAll = (string) ->
    string.replace /(?:^|\s)\S/g, (a) -> a.toUpperCase()

# Titlecase words in a string.
@Humanize.titleCase = (string) ->
    smallWords = /\b(a|an|and|at|but|by|de|en|for|if|in|of|on|or|the|to|via|vs?\.?)\b/i
    internalCaps = /\S+[A-Z]+\S*/
    splitOnWhiteSpaceRegex = /\s+/
    splitOnHyphensRegex = /-/

    doTitleCase = (_string, hyphenated=false, firstOrLast=true) =>
        titleCasedArray = []
        stringArray = _string.split(if hyphenated then splitOnHyphensRegex else splitOnWhiteSpaceRegex)
        for word, index in stringArray
            if word.indexOf('-') isnt -1
                titleCasedArray.push(doTitleCase(word, true, (index is 0 or index is stringArray.length - 1)))
                continue

            if firstOrLast and (index is 0 or index is stringArray.length - 1)
                titleCasedArray.push if internalCaps.test(word) then word else @capitalize(word)
                continue

            if internalCaps.test(word)
                titleCasedArray.push(word)
            else if smallWords.test(word)
                titleCasedArray.push(word.toLowerCase())
            else
                titleCasedArray.push(@capitalize(word))

        titleCasedArray.join(if hyphenated then '-' else ' ')
    doTitleCase(string)


module?.exports = @Humanize
