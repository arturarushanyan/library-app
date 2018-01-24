const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
let port = process.env.PORT || 3000;
let nav = [
        {text: 'books', link: '/books'},
        {text: 'authors', link: '/authors'}
    ];
const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')();
const authRouter = require('./src/routes/authRoutes')();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());
app.use(session({
    secret: 'library',
    resave: true,
    saveUninitialized: true
}));


require('./src/config/passport')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.render('index',
        {
            title: 'myapp',
            nav: [
                {text: 'books', link: '/books'},
                {text: 'authors', link: '/authors'}
                ]
        });
});

app.listen(port, (err) => {
    if (err) {
        throw err;
    } else {
        console.log('app is running om port', port);
    }
});