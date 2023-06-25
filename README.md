
# Quote Garden - [Star on GitHub](https://github.com/pprathameshmore/QuoteGarden)
A REST API for quotes.

I originally built this for [Achieve Chrome Extension](https://github.com/pprathameshmore/Achieve-Chrome-Extension) project and decided to publish for others to use as well. The database currently includes more than 75000 quotes

![Build](https://travis-ci.com/pprathameshmore/QuoteGarden.svg?branch=master)
![Maintenance](https://img.shields.io/maintenance/yes/2020?style=plastic)
![GitHub top language](https://img.shields.io/github/languages/top/pprathameshmore/QuoteGarden?style=plastic)
![GitHub](https://img.shields.io/github/license/pprathameshmore/QuoteGarden?style=plastic)
![GitHub last commit](https://img.shields.io/github/last-commit/pprathameshmore/QuoteGarden?style=plastic)

## Install NPM package
```
npm install @pprathameshmore/quotegardennpm@1.1.0
```
[Documentation for NPM package](https://github.com/pprathameshmore/QuoteGardenNPM)

## Table of Contents

* [Get a random quote](#get-a-random-quote).
* [Get all quotes](#get-quotes)
* [Get all genres](#get-all-genres).
* [Get all authors](#get-all-authors).

## API Documentation

Please do upgrade to V3. Older versions stopped supporting

### Get a random quote

Returns a single random quote from the server.

#### Request

``` https://quote-garden.onrender.com/api/v3/quotes/random```

#### Params

```
author: string (Optional)
genre: string (Optional)
count: number (Optional)
```

#### Response

```javascript
{
    "statusCode": 200,
    "message": "Random quotes",
    "pagination": {
        "currentPage": 1,
        "nextPage": null,
        "totalPages": 1
    },
    "totalQuotes": 1,
    "data": [
        {
            "_id": "5eb17ab3b69dc744b4e81942",
            "quoteText": "I think the thing we see is that as people are using video games more, they tend to watch passive TV a bit less. And so using the PC for the Internet, playing video games, is starting to cut into the rather unbelievable amount of time people spend watching TV.",
            "quoteAuthor": "Bill Gates",
            "quoteGenre": "time",
            "__v": 0
        }
    ]
}
```

### Get quotes

Returns multiple quotes.

#### Request

``` https://quote-garden.onrender.com/api/v3/quotes ```

#### Params

```
author: string (Optional)
genre: string (Optional)
query: string (Optional)
page: number (Optional)
limit: number (Optional)
```

#### Response

```javascript
{
    "statusCode": 200,
    "message": "Quotes",
    "pagination": {
        "currentPage": 1,
        "nextPage": 2,
        "totalPages": 4
    },
    "totalQuotes": 4,
    "data": [
        {
            "_id": "5eb17aaeb69dc744b4e72a4a",
            "quoteText": "The first rule of any technology used in a business is that automation applied to an efficient operation will magnify the efficiency. The second is that automation applied to an inefficient operation will magnify the inefficiency.",
            "quoteAuthor": "Bill Gates",
            "quoteGenre": "business",
            "__v": 0
        }
    ]
}
```
### Get all genres

Returns all genres.

#### Request

``` https://quote-garden.onrender.com/api/v3/genres```

#### Response
```javascript
{
    "statusCode": 200,
    "message": "Genres",
    "pagination": {
        "currentPage": null,
        "nextPage": null,
        "totalPages": null
    },
    "totalQuotes": null,
    "data": ["age", ...]
}
```

### Get all authors

Returns all authors.

#### Request

``` https://quote-garden.onrender.com/api/v3/authors```

#### Response
```javascript
{
    "statusCode": 200,
    "message": "Authors",
    "pagination": {
        "currentPage": null,
        "nextPage": null,
        "totalPages": null
    },
    "totalQuotes": null,
    "data": ["Bill Gates", ...]
}
```

## Support

<a href="https://paypal.me/PrathameshMore" 
target="_blank">
<img src="https://www.paypalobjects.com/en_US/GB/i/btn/btn_donateCC_LG.gif" alt="PayPal this" 
title="PayPal – The safer, easier way to pay online!" border="0" />
</a>

<a>Pay using UPI : pprathameshmore@upi </a>


## Get featured
If you are using my API in your application, get featured here.
Make an issue with your application.

- [frikishaan.xyz](https://frikishaan.xyz/) by [sheikh005](https://github.com/sheikh005)
- [Bink Chrome Extension](https://chrome.google.com/webstore/detail/hobnhcjgdhdcmgcjlidgcladgdlbpgba) by [AmitGujar](https://github.com/AmitGujar)
- [pprathamesh.github.io](https://pprathameshmore.github.io/) by Prathamesh More
- [Twitter Bot](https://twitter.com/quotegardenbot) by [ahzam1](https://github.com/ahzam1)
- [MotivateU](https://github.com/Shankhanil/MotivateU) by [Shankhanil Ghosh](https://github.com/Shankhanil)
- [Quote Garden](https://play.google.com/store/apps/details?id=iambedoy.quotegarden) by [cbedoy](https://github.com/cbedoy/QuoteGarden)
- [Spontaneous - Random quotes](https://apps.apple.com/us/app/spontaneous-random-quotes/id1538265374#?platform=iphone) by [Nikola Franičević](https://github.com/FranicevicNikola)

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

