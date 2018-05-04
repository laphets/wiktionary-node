const wiktionary = require("wiktionary-node");

wiktionary("some words").then((result) => {
    console.log(result);
}).catch((error) => {})