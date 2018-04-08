const wiktionary = require("wiktionary-node");

wiktionary("word").then((result) => {
    console.log(result);
}).catch((error) => {})