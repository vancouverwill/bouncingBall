var gulp       = require('gulp');  
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var assign = require('lodash.assign');
var babelify = require('babelify');
var browserify = require('browserify');
var gulpbrowserify = require('gulp-browserify');
var watchify = require('watchify');

var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');


// add custom browserify options here
var customOpts = {
  entries: ['src/index.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var bundler = watchify(browserify(opts)); 

// add transformations here, this is essential for minifying right now because 
// the minifaction tool doesn't yet support es6 features
// Babel transform
bundler.transform(babelify.configure({
    sourceMapRelative: 'src',
}));

gulp.task('js', bundle); // so you can run `gulp js` to build the file
bundler.on('update', bundle); // on any dep update, runs the bundler
bundler.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return bundler.bundle()
    // log errors if they happen
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // .pipe(uglify())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    
    .on('error', function (err) {
      gutil.log.bind(gutil, 'Browserify Error')
    })
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist'))
}



gulp.task('build', function() {
  return gulp.src('dist/bundle.js')
    .pipe(uglify().on('error', gutil.log))
    .pipe(gulp.dest('build'));
});


gulp.task('default', ['js']);  
