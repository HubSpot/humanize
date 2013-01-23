# Humanize
A simple utility library for making the web more humane.

## Getting Started
Download the [minified version][min] or the [full version][max].

[min]: https://raw.github.com/HubSpot/humanize/master/public/src/humanize.min.js
[max]: https://raw.github.com/HubSpot/humanize/master/public/src/humanize.js

In your web page:

```html
<script src="public/humanize.min.js"></script>
<script>
var capitalized = Humanize.capitalize("ten tiny ducklings.")
// "Ten tiny ducklings."
</script>
```

### API Methods

##### formatNumber
Formats a number to a human-readable string. Localize by overriding the precision, thousand and decimal arguments.

```javascript
Humanize.formatNumber(123456789, 2)
// "123,456,789.00"
```

##### intcomma
Converts an integer to a string containing commas every three digits.

```javascript
Humanize.intcomma(123456789)
// "123,456,789"
```

##### intword
Converts a large integer to a friendly text representation.

```javascript
Humanize.intword(123456789, 5)
// "123.4M"

Humanize.intword(123456789, 6)
// "123.45M"

Humanize.intword(123456789, 9)
// "123,456,789"
```

##### ordinal
Converts an integer to its ordinal as a string.

```javascript
Humanize.ordinal(22)
// "22nd"
```

##### filesize
Formats the value like a 'human-readable' file size (i.e. '13 KB', '4.1 MB', '102 bytes', etc).

```javascript
Humanize.filesize(1024 * 20)
// "20 Kb"

Humanize.filesize(1024 * 2000)
// "1.95 Mb"

Humanize.filesize(Math.pow(1000, 4))
// "931.32 Gb"
```

##### pluralize
Returns the plural version of a given word if the value is not 1. The default suffix is 's'.

```javascript
Humanize.pluralize(1, "duck")
// "duck"

Humanize.pluralize(3, "duck")
// "ducks"

Humanize.pluralize(3, "duck", "duckies")
// "duckies"
```

##### truncate
Truncates a string if it is longer than the specified number of characters. Truncated strings will end with a translatable ellipsis sequence ("…").

```javascript
Humanize.truncate('long text is good for you')
// "long text is good for you"

Humanize.truncate('long text is good for you', 19)
// "long text is goo..."

Humanize.truncate('long text is good for you', 19, '... etc')
// "long text is... etc"
```

##### truncatewords
Truncates a string after a certain number of words.

```javascript
Humanize.truncatewords('long text is good for you', 5)
// "long text is good for ..."
```

##### oxford
Converts a list of items to a human readable string with an optional limit.

```javascript
items = ['apple', 'orange', 'banana', 'pear', 'pineapple']

Humanize.oxford(items)
// "apple, orange, banana, pear, and pineapple"

Humanize.oxford(items, 3)
// "apple, orange, banana, and 2 others"

// Pluralizes properly too!
Humanize.oxford(items, 4)
// "apple, orange, banana, and 1 other"

Humanize.oxford(items, 3, "and some other fruits")
// "apple, orange, banana, and some other fruits"
```

##### nl2br and br2nl
Flexible conversion of `<br/>` tags to newlines and vice versa.

```javascript
// Use your imagination
```

#### capitalize
Capitalizes the first letter in a string.

```javascript
Humanize.capitalize("some boring string")
// "Some boring string"
```

#### titlecase
Captializes the first letter of every word in a string.

```javascript
Humanize.titlecase("some boring string")
// "Some Boring String"
```

### Utility methods

##### toFixed
Fixes binary rounding issues (eg. (0.615).toFixed(2) === "0.61").

```javascript
Humanize.toFixed(0.615, 2)
// "0.62"
```

##### normalizePrecision
Ensures precision value is a positive integer.

```javascript
Humanize.normalizePrecision(-232.231)
// 232
```

## Important notes
Please don't edit files in the `public` subdirectory as they are generated via grunt. You'll find source code in the `coffee` subdirectory!

## Compiling

### Installing grunt
_This assumes you have [node.js](http://nodejs.org/) and [npm](http://npmjs.org/) installed already._

1. From the root directory of this project, run `npm install` to install the project's dependencies.

And that's it!

Once grunt is installed, just run "grunt" in the root directory of the project to compile the CoffeeScript files into the public/ subdirectory.

## Testing

### Installing PhantomJS

In order for the test task to work properly, [PhantomJS](http://www.phantomjs.org/) must be installed and in the system PATH (if you can run "phantomjs" at the command line, this task should work).

Unfortunately, PhantomJS cannot be installed automatically via npm or grunt, so you need to install it yourself. There are a number of ways to install PhantomJS.

* [PhantomJS and Mac OS X](http://ariya.ofilabs.com/2012/02/phantomjs-and-mac-os-x.html)
* [PhantomJS Installation](http://code.google.com/p/phantomjs/wiki/Installation) (PhantomJS wiki)

Note that the `phantomjs` executable needs to be in the system `PATH` for grunt to see it.

* [How to set the path and environment variables in Windows](http://www.computerhope.com/issues/ch000549.htm)
* [Where does $PATH get set in OS X 10.6 Snow Leopard?](http://superuser.com/questions/69130/where-does-path-get-set-in-os-x-10-6-snow-leopard)
* [How do I change the PATH variable in Linux](https://www.google.com/search?q=How+do+I+change+the+PATH+variable+in+Linux)


## License
Copyright (c) 2013 HubSpotDev  
Licensed under the MIT license.
