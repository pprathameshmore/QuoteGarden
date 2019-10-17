![Icon](/assets/icon.png)


# Quote Garden
A REST API for quotes.

I originally built this for [Achieve Chrome Extension](https://github.com/pprathameshmore/Achieve-Chrome-Extension) project and decided to publish for others to use as well. The database currently includes more than 5000 quotes

![Build](https://travis-ci.com/pprathameshmore/QuoteGarden.svg?branch=master)
![Maintenance](https://img.shields.io/maintenance/yes/2020?style=plastic)
![GitHub top language](https://img.shields.io/github/languages/top/pprathameshmore/QuoteGarden?style=plastic)
![GitHub](https://img.shields.io/github/license/pprathameshmore/QuoteGarden?style=plastic)
![GitHub last commit](https://img.shields.io/github/last-commit/pprathameshmore/QuoteGarden?style=plastic)

## Table of Contents

* [Get a random quote](#get-a-random-quote).
* [Get all quotes by author](#get-quotes-by-author).
* [Get all quotes](#get-all-quotes).
* [Get all quotes by keyword](#get-all-quotes-by-keyword).

## API Documentation

### Get a random quote

Returns a single random quote from the database.

#### Request

``` https://quote-garden.herokuapp.com/quotes/random ```

#### Response

```javascript
{
  _id: string,
  quoteText: string,
  quoteAuthor: string
}
```

### Get quotes by author

Returns multiple quotes for a particular author.

#### Request

``` https://quote-garden.herokuapp.com/quotes/author/:authorName ```


#### Response

```javascript
{
    count: int,
    results : array
}
```

### Get all quotes

Returns all quotes from the database.

#### Request

``` https://quote-garden.herokuapp.com/quotes/all ```

#### Response
```javascript
{
    count: int,
    results : array
}
```

### Get all quotes by keyword

Returns all quotes with matching keywords.

#### Request

``` https://quote-garden.herokuapp.com/quotes/search/:query ```

#### Response

``` javascript
{
  count : int,
  results : array
}
```
### Upcoming feature - Sorting

## Get featured
If you are using my API in your application, get featured here.
Make an issue with your application.

- [frikishaan.xyz](https://frikishaan.xyz/) by [sheikh005](https://github.com/sheikh005)

## Contributing

All feedback and contributions are welcome!

## License

``` 
The MIT License (MIT)
=====================

Copyright © 2019 Prathamesh More

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE. ```

