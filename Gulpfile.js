require('babel-core/register');
var gulp = require('gulp');
var git = require('gulp-git');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var shell = require('gulp-shell');
var os = require('os');
var open = require('gulp-open');
var gp_prompt = require('gulp-prompt');
var runSequence = require('run-sequence');
var mocha = require('gulp-mocha');
var fs = require('fs');


var browser = os.platform() === 'linux' ? 'google-chrome' : (
  os.platform() === 'darwin' ? 'google chrome' : (
  os.platform() === 'win32' ? 'chrome' : 'firefox'));
 

// Open an URL in a given browser: 
 
gulp.task('open-browser', function(){
  var options = {
    uri: 'http://localhost:8090/dev.html',
    app: browser
  };
  return gulp.src(__filename)
  .pipe(open(options));
});
 


/**
 * Generates front end production scripts
 */
gulp.task('frontprod', function (done) {
	var compiler = webpack(require('./webpack.production.config.js'));

	compiler.run(function(err,stats){
		if(err){
			return console.warn(err);
		}
		var statOptions = {
			colors : true ,
			assets : false,
			hash : false,
			chunkModules :false 
		} ;
		var statsString = stats.toString(statOptions);
		console.log(statsString);
	});

 	compiler.plugin('done',function(){
		console.log('front end webpack production script generation is done');
    done();
	});
});



/**
 *  Starts Webpack dev server and then opens chrome
 */
gulp.task('frontdev',function(done) {
	var compiler = webpack(require('./webpack.dev.config.js'));

	var server = new WebpackDevServer(compiler, {
			hot : true,
			quiet: false,
  			noInfo: false,
  			stats : {
  				colors : true,
				assets : false,
				hash : false,
				chunkModules :false 
   			},
   			publicPath:'/assets/'
	});
	
  server.listen(8080,'0.0.0.0');

	compiler.plugin('done',function(){
		console.log('front end webpack production script generation is done');
		done();
		runSequence('watch-test','open-browser');
	});

});
/**
 * Starts python server
 */
gulp.task('back', 
	shell.task(
		['python -m SimpleHTTPServer 8090'],
		{verbose: true}));


gulp.task('set-dev-node-env', function(done) {
    process.env.NODE_ENV = 'development';
    done();
});

gulp.task('set-prod-node-env', function(done) {
    process.env.NODE_ENV = 'production';
    done();
});



/**
 * Git scripts
 */

var files_to_commit = '.';

// Run git add with options 
gulp.task('add', function(done){
 	gulp.src(files_to_commit)
    .pipe(git.add());
    done();
});

gulp.task('commit', function(done) {
      gulp.src(files_to_commit)
        .pipe(gp_prompt.prompt({
            type: 'input',
            name: 'commit',
            message: 'Please enter commit message...'
        }, function(res) {
        		 gulp.src(files_to_commit, {buffer: false})
              .pipe(git.commit(res.commit))
              .on('end',function(){
                  console.log('Done committing');
                  done();
              });
        }));
});




gulp.task('push',function(done){
         git.push('origin', 'develop',{quiet : false},function(err){
              if(err)return console.log(err);
               console.log('Done pushing');
               done();
        });
});

gulp.task('add_commit_push',function(done){
    runSequence('add','commit','push',done);
 });



/**
 * Test scripts
 */
var watching = false;

function onError(err) {
  console.log(err.toString());
  if (watching) {
    this.emit('end');
  } else {
    // if you want to be really specific
    watching = false;
    process.exit(1);
  }
}



gulp.task('test', function () {
    return gulp.src(['./__tests__/**/*.js'], { read: false })
        .pipe(mocha({ 
        	reporter: 'spec',
        }))
        .on('error', onError);
});
 
gulp.task('watch-test',['test'] ,function () {
    watching = true;
    gulp.watch(['./src/**', './__tests__/**'], ['test']);
});


/**
 * Bulk scripts
 */
gulp.task('dev',['set-dev-node-env'],function(done){
	runSequence(['back','frontdev'],done);
});


gulp.task('update_package',function(){
  var packageDetails = JSON.parse(fs.readFileSync('./package.json'));
  var ver = packageDetails.ver;
  ver++;
  var packageDetailsNew = JSON.stringify(Object.assign({},packageDetails,{ver : ver}),null,2);
  fs.writeFileSync('./package.json',packageDetailsNew);
});

gulp.task('publish',function(done){
	runSequence('update_package',['set-prod-node-env','frontprod'],'add_commit_push',done);
});




