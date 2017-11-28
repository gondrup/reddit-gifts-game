let gulp = require('gulp');
let babel = require('gulp-babel');
let uglify = require('gulp-uglify');
let livereload = require('gulp-livereload');

gulp.task('scripts', () => {
    return gulp.src('src/js/game.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('web/js'))
        .pipe(livereload());
});

gulp.task('watch', () => {
    livereload.listen();
    gulp.watch('src/js/*.js', ['scripts']);
});

gulp.task('default', ['watch']);