const express = require('express');
const authRouter = express.Router();
const mongodb = require('mongodb').MongoClient;
const passport = require('passport');

const router  = () => {
    authRouter.route('/signup')
        .post((req, res) => {
            let url = 'mongodb://localhost:27017/libraryapp';
            mongodb.connect(url, (err, client) => {
                let db = client.db('libraryapp');
                let collection = db.collection('users');
                let user = {
                    username: req.body.username,
                    password: req.body.password
                };
                collection.insert(user, (err, result) => {
                    if (err) {
                        throw err;
                    }
                    req.login(result.ops[0], () => {
                        res.redirect('/auth/profile');
                    });
                });
            });
        });
    authRouter.route('/signin')
        .post(passport.authenticate('local',{
            failureRedirect: '/',
        }), (req, res) => {
            res.redirect('/auth/profile');
        });
    authRouter.route('/profile')
        .all((req, res, next) => {
            if (!req.user) {
                res.redirect('/');
            } else {
                next();
            }
        })
        .get((req, res) => {
            res.json(req.user);
        });
    return authRouter;
};
module.exports = router;