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
var b = watchify(browserify(opts)); 

// add transformations here, this is essential for minifying right now because 
// the minifaction tool doesn't yet support es6 features
// Babel transform
b.transform(babelify.configure({
    sourceMapRelative: 'src',
}));

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the b
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b.bundle()
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




var testOpts = {
  entries: ['test/client_side/Canvas,js'],
  debug: false
};
gulp.task('clientSideTestjs', bundle); 
var topts = assign({}, watchify.args, testOpts);
var tb = watchify(browserify(topts)); 
tb.on('update', bundle).on('error', gutil.log); 

function testBundle() {
  return tb.bundle()
    .pipe(source('Canvas.js').on('error', gutil.log))
    .pipe(buffer().on('error', gutil.log))
    .pipe(gulp.dest('./test/build').on('error', gutil.log))
}


gulp.task('default', ['js', 'clientSideTestjs']);  
