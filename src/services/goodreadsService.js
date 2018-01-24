const request = require('request');
const xml2js = require('xml2js');
const parser = xml2js.Parser({explicitArray: false});

const goodreadsService = () => {
    const getBookById = (id, cb) => {
        let url = 'https://www.goodreads.com/book/show/' + id + '?format=xml&key=ij9zzDZdZFvcYDX71htg';
        let callback = (error, response, body) => {
            if (error) {
                console.log('request err', error);
            }
            let str = '' + body;
            parser.parseString(str, (err, result) => {
                if (err) {
                    throw err;
                }
                cb(null, result.GoodreadsResponse.book);
            });
        };
        request(url, callback);
    };
    return {
        getBookById: getBookById
    };
};

module.exports = goodreadsService;