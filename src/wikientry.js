const unirest = require("unirest");
const cheerio = require("cheerio");

//wiki
const speech = [
    'Noun',
    'Pronoun',
    'Adjectives',
    'Numerals',
    'Verb',
    'Adverb',
    'Article',
    'Preposition',
    'Conjunction',
    'Interjection',
    'Abbreviation'
];
const patch = (re, s) => {
    re = eval("/" + re + "/ig");
    let k = s.match(re);
    if (k) {
        return k.length;
    } else {
        return 0;
    }
};

const verify_word = (word) => {
    return new Promise((resolve, reject) => {
        const req = unirest("GET", "https://en.wiktionary.org/w/api.php");
        req.query({
            "action": "query",
            "list": "search",
            "format": "json",
            "utf8": "",
            "srprop": "",
            "srsearch": word,
            "srwhat": "nearmatch"
        });
        req.headers({"postman-token": "c2b2280b-1b34-22f5-f96c-a07ad89c1713", "cache-control": "no-cache"});
        req.end(function (res) {
            if (res.error) 
                reject(res.error);
            const data = res.body.query.search;
            if (data.length == 0) {
                reject({info: 'word does not exist'});
            } else {
                resolve(data[0].title);
            }
        });
    })
}

const get_wiki_entry = (word) => {
    return new Promise((resolve, reject) => {
        const req = unirest("GET", "https://en.wiktionary.org/w/index.php");
        req.query({"title": word, "printable": "yes"});
        req.headers({"postman-token": "ebdb9090-7be1-6aeb-b7fb-7f68eb7a4202", "cache-control": "no-cache"});
        req.end(function (res) {
            if (res.error) 
                reject(res.error);
            let dictionary = {
                word: word,
                language: 'en',
                definitions: []
            };
            // console.log(res.body);
            let $ = cheerio.load(res.body);
            let cnt = 0;
            $('.toc')
                .find('.toclevel-1')
                .each(function (i, elem) {
                    if (i == 0) {
                        const text = $(elem).text();
                        for (let x in speech) {
                            cnt += patch(speech[x], text);
                        }
                    } else {
                        return;
                    }
                });
            $('.mw-parser-output')
                .find('ol')
                .each(function (i, elem) {
                    if (i < cnt) {
                        $(elem)
                            .find('ul')
                            .empty();
                        let curspeech = $(elem)
                            .prev()
                            .prev()
                            .text();
                        let onedefinition = {
                            speech: curspeech,
                            lines: []
                        };

                        $(elem)
                            .children()
                            .each(function (i1, elem1) {
                                let print = $(elem1)
                                    .text()
                                    .split('\n');
                                let oneline = {
                                    define: '',
                                    examples: []
                                };
                                for (let x in print) {
                                    if (x == 0) {
                                        oneline['define'] = print[x];
                                    } else {
                                        if (print[x]) {
                                            oneline['examples'].push(print[x]);
                                        }
                                    }
                                }
                                onedefinition['lines'].push(oneline);
                            });
                        dictionary['definitions'].push(onedefinition);
                    }
                });
            resolve(dictionary);
        });
    });
}

const wiki = async(word) => {
    try {
        const word1 = await verify_word(word);
        const dict = await get_wiki_entry(word1);
        return dict;
    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports = wiki;