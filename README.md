# A Node Based Wiktionary Parser 

![npm](https://img.shields.io/npm/v/wiktionary-node.svg?style=flat)
![npm](https://img.shields.io/npm/dw/wiktionary-node.svg)
![node](https://img.shields.io/node/v/koa.svg)

>  Look up words on [wiktionary.org](https://www.wiktionary.org/) in English, and return a well-structed json. (Other languages will be supported futher)

## Install

```
npm i wiktionary-node
```
## Usage in Node

You can call wiktionary("someword") with an argument with some word, and it will return a promise.

### Traditional Promise

```js
const wiktionary = require("wiktionary-node");

wiktionary("word").then((result) => {
    console.log(result);
}).catch((error) => {})
```
### Async Function

```js
const wiktionary = require("wiktionary-node");

const main = async(word) => {
    try {
        const define = await wiktionary(word);
    } catch (error) {}
}
```

## Result

The result is like this

```json
{
    "word": "help",
    "language": "en",
    "definitions": [{
            "speech": "Noun",
            "lines": [{
                    "define": "(uncountable) Action given to provide assistance; aid.",
                    "examples": [
                        "I need some help with my homework."
                    ]
                },
                {
                    "define": "(usually uncountable) Something or someone which provides assistance with a task.",
                    "examples": [
                        "He was a great help to me when I was moving house.",
                        "I've printed out a list of math helps."
                    ]
                },
                {
                    "define": "Documentation provided with computer software, etc. and accessed using the computer.",
                    "examples": [
                        "I can't find anything in the help about rotating an image."
                    ]
                },
                {
                    "define": "(usually uncountable) One or more people employed to help in the maintenance of a house or the operation of a farm or enterprise.",
                    "examples": [
                        "The help is coming round this morning to clean.",
                        "Most of the hired help is seasonal, for the harvest."
                    ]
                },
                {
                    "define": "(uncountable, euphemistic) Correction of deficits, as by psychological counseling or medication or social support or remedial training.",
                    "examples": [
                        "His suicide attempts were a cry for help.",
                        "He really needs help in handling customer complaints.",
                        "\"He's a real road-rager.\" / \"Yup, he really needs help, maybe anger management.\""
                    ]
                }
            ]
        },
        {
            "speech": "Verb",
            "lines": [{
                    "define": "(transitive) To provide assistance to (someone or something).",
                    "examples": [
                        "He helped his grandfather cook breakfast."
                    ]
                },
                {
                    "define": "(transitive) To contribute in some way to.",
                    "examples": [
                        "The white paint on the walls helps make the room look brighter.",
                        "If you want to get a job, it helps to have some prior experience."
                    ]
                },
                {
                    "define": "(intransitive) To provide assistance.",
                    "examples": [
                        "She was struggling with the groceries, so I offered to help.",
                        "Please, help!"
                    ]
                },
                {
                    "define": "(transitive) To avoid; to prevent; to refrain from; to restrain (oneself). Usually used in nonassertive contexts with can.",
                    "examples": [
                        "We couldn’t help noticing that you were late.",
                        "We couldn’t help but notice that you were late.",
                        "She’s trying not to smile, but she can’t help herself.",
                        "Can I help it if I'm so beautiful?",
                        "Can I help it that I fell in love with you?",
                        "Are they going to beat us? Not if I can help it!"
                    ]
                }
            ]
        },
        {
            "speech": "Interjection",
            "lines": [{
                "define": "A cry of distress or an urgent request for assistance",
                "examples": []
            }]
        }
    ]
}
```

## Dependencies

- [cheerio](https://github.com/cheeriojs/cheerio): Tiny, fast, and elegant implementation of core jQuery designed specifically for the server

- [unirest](https://github.com/Kong/unirest-nodejs): Simplified, lightweight HTTP client library

- [babel-runtime](https://www.npmjs.com/package/babel-runtime) Babel selfContained runtime

  ​