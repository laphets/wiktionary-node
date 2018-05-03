const wiktionary = require("wiktionary-node");

wiktionary("some word").then((result) => {
    console.log(result);
}).catch((error) => {})