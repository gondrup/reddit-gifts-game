let gulp = require('gulp');
let babel = require('gulp-babel');
let uglify = require('gulp-uglify');
let webserver = require('gulp-webserver');
let browserify = require('browserify');
let source = require('vinyl-source-stream');
let buffer = require('vinyl-buffer');
let sourcemaps = require('gulp-sourcemaps');
let gutil = require('gulp-util');

gulp.task('scripts', () => {
    let b = browserify({
        entries: ['./src/js/game.js'],
        debug: true
    });

    return b.bundle()
        .pipe(source('./web/js/game.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./web/js/'));

    /*return gulp.src('src/js/game.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('web/js'));*/
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

gulp.task('default', ['webserver', 'scripts', 'watch']);