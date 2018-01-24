const gulp =require('gulp');
const inject =require('gulp-inject');
const jshint = require('gulp-jshint');
const jscs = require('gulp-jscs');
const nodemon = require('gulp-nodemon');
const wiredep = require('wiredep').stream;
const jsFiles = ['*.js', 'src/**/*.js'];
const options = {
    bowerJson: require('./bower.json'),
    direcory: './public/lib',
    ignorePath: '../../public'
};

const injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'], {read: false});
const injectOptions = {
    ignorePath: '/public'
};
let nodemonOptions = {
    script: 'app.js',
    delayTime: 1,
    env: {
        'PORT': 3000
    },
    watch: jsFiles
};

gulp.task('style', () => {
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

gulp.task('inject', () => {
    return gulp.src('./src/views/*.html')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));
});

gulp.task('serve', ['style', 'inject'], () => {
    return nodemon(nodemonOptions)
        .on('restart', () => {
            console.log('restarting');
        });
});