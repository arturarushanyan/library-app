const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongodb = require('mongodb').MongoClient;

module.exports = () => {
    passport.use(new LocalStrategy({
        _usernameField: 'username',
        _passwordField: 'password'
    },
    (username, password, done) => {
        let url = 'mongodb://localhost:27017/libraryapp';
        mongodb.connect(url, (err, client) => {
            let db = client.db('libraryapp');
            let collection = db.collection('users');
            collection.findOne({username: username}, (err, results) => {
                if (err) {
                    console.log(err);
                    done('bad username and pass', null);
                }
                if (results.password === password) {
                    let user = results;
                    done(null, user);
                } else {
                    done(null, false, {message : 'bad pass'});
                }
            });
        });
    }));
};