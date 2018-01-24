const mongodb = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const bookController = (bookService, nav) => {
    const middleware = (req, res, next) => {
        if (!req.user) {
            res.redirect('/');
        } else {
            next();
        }
    };
    const getIndex = (req, res) => {
        let url = 'mongodb://localhost:27017/libraryapp';
        mongodb.connect(url, (err, client) => {
            if (err) {
                throw err;
            }
            let db = client.db('libraryapp');
            let collection = db.collection('books');
            collection.find({}).toArray((err, result) => {
                if (err) {
                    throw err;
                }
                res.render('bookListView',
                    {
                        title: 'myapp',
                        nav: nav,
                        books: result
                    });
            });
        });
    };
    const getById = (req, res) => {
        let id = new ObjectId(req.params.id);
        let url = 'mongodb://localhost:27017/libraryapp';
        mongodb.connect(url, (err, client) => {
            if (err) {
                throw err;
            }
            let db = client.db('libraryapp');
            let collection = db.collection('books');
            collection.findOne({_id: id}, (err, result) => {
                if (err) {
                    throw err;
                }
                bookService.getBookById(result.bookId, (err, book) => {
                    result.book = book;
                    console.log('booooooook is', result);
                    res.render('bookView',
                        {
                            title: 'myapp',
                            nav: nav,
                            books: result
                        });
                });
            });
        });
    };
    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    };
};

module.exports = bookController;