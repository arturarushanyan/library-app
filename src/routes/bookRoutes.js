const express = require('express');
const mongodb = require('mongodb').MongoClient;
const bookRouter = express.Router();
const ObjectId = require('mongodb').ObjectID;


let router = function (nav) {
    const bookService = require('../services/goodreadsService')();
    const bookController = require('../controllers/bookController')(bookService, nav);
    bookRouter.use(bookController.middleware);
    bookRouter.route('/')
        .get(bookController.getIndex);

    bookRouter.route('/:id')
        .get(bookController.getById);
    return bookRouter;
};

module.exports = router;