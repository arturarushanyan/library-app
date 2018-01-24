const express = require('express');
const adminRouter = express.Router();
const mongodb = require('mongodb').MongoClient;
const books = require('../../data/books');

let router = function (nav) {
    adminRouter.route('/addbooks')
        .get((req, res) => {
            let url = 'mongodb://localhost:27017/libraryapp';
            mongodb.connect(url, (err, client) => {
                let db = client.db('libraryapp');
                let collection = db.collection('books');
                collection.insertMany(books, (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        console.log(result);
                        res.send(result);
                    }
                });
                client.close();
            });
        });
    return adminRouter;
};

module.exports = router;