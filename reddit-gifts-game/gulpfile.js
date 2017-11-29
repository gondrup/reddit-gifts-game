let gulp = require('gulp');
let uglify = require('gulp-uglify');
let webserver = require('gulp-webserver');
let browserify = require('browserify');
let source = require('vinyl-source-stream');
let buffer = require('vinyl-buffer');
let transform = require('vinyl-transform');
let sourcemaps = require('gulp-sourcemaps');
let babelify = require('babelify');

gulp.task('scripts', () => {
    return browserify({
            entries: ['src/js/game.js'],
            debug: true
        })
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
        .pipe(source('game.js'))
        .pipe(gulp.dest('./web/js'));
});

gulp.task('scripts-dist', () => {
    return browserify({
        entries: ['src/js/game.js'],
        debug: true
    })
    .transform("babelify", { presets: ["es2015"] })
    .bundle()
    .pipe(source('game.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./web/js'));
});

gulp.task('webserver', function() {
    gulp.src( '.' )
        .pipe(webserver({
            livereload: false,
            directoryListing: true,
            open: 'http://localhost:8000/web/index.html'
        }));
});

gulp.task('watch', () => {
    gulp.watch('src/js/*.js', ['scripts']);
});

gulp.task('build', ['scripts-dist']);
gulp.task('default', ['webserver', 'scripts', 'watch']);