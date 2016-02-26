var gulp       = require('gulp');  
var babel = require('gulp-babel'); 
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
// var watch      = require('gulp-watch');
var assign = require('lodash.assign');
var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');

var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');


gulp.task('babel', function() {
	return gulp.src('src/index.js', { base: 'src' })
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015', "stage-0"]
		}))
    .pipe(uglify())
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest('build'));
});

// gulp.task('watch-js', function() {  
//   gulp.watch('./src/*.js' , ['babel']);
// });




// add custom browserify options here
var customOpts = {
  entries: ['build/index.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var bundler = watchify(browserify(opts)); 

// add transformations here
// i.e. b.transform(coffeeify);
// Babel transform
bundler.transform(babelify.configure({
    sourceMapRelative: 'build'
}));

gulp.task('watchify', bundle); // so you can run `gulp js` to build the file
bundler.on('update', bundle); // on any dep update, runs the bundler
bundler.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return bundler.bundle()
    // log errors if they happen
    .on('error', function (err) {
    	gutil.log.bind(gutil, 'Browserify Error')
    	this.emit("end");
    })
    .pipe(source('./dist/bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./'));
}


// gulp.task('default', ['babel', 'watch-js', 'watchify']);  
gulp.task('default', ['babel', 'watchify']);  
