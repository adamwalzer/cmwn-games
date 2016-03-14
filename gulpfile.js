var argv = require('yargs').argv,
    gulp = require('gulp'),
    watch = require('gulp-watch'),
    gutil = require('gulp-util'),
    webpack = require('webpack'),
    webpackDevConfig = require('./webpack.config.dev.js'),
    webpackProdConfig = require('./webpack.config.prod.js'),
    fs = require('fs'),
    path = require('path'),
    games,
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload');

function lsd (_path) {
    return fs.readdirSync(_path).filter(function (file) {
        return fs.statSync(path.join(_path, file)).isDirectory();
    });
}

function defineEntries (_config,_game) {
    // modify some webpack config options
    var config, modulesDirectories;

    config = Object.create(_config);

    config.resolve = Object.create(config.resolve);
    config.entry = {};
    config.resolve.modulesDirectories = config.resolve.modulesDirectories.slice(0); // clone array

    config.resolve.modulesDirectories.push(__dirname+'/library/'+_game+'/source/js/');
    config.entry[_game] = ['./'+_game+'/source/js/index.js'];

    console.log(games, 'entry', config.entry);

    return config;
}

games = (argv.game === undefined) ? lsd('./library') : [argv.game];

gulp.task('default', ['build-dev']);

gulp.task('build-dev', ['sass', 'webpack:build-dev', 'copy-index', 'copy-media', 'copy-components', 'copy-thumbs']);

// Production build
gulp.task('build', ['sass-prod', 'webpack:build', 'copy-index', 'copy-media', 'copy-components', 'copy-thumbs']);

gulp.task('webpack:build-dev', function(callback) {
    games.forEach(function (_game, _index) {
        var config = defineEntries(webpackDevConfig,_game);

        webpack(config).run(function(err, stats) {
            if(err) throw new gutil.PluginError('webpack:build-dev', err);
            gutil.log('[webpack:build-dev]', stats.toString({
                colors: true
            }));
            if(_index === games.length-1) {
                callback();
            }
        });
    });
});

gulp.task('webpack:build', function(callback) {
    games.forEach(function (_game, _index) {
        var config = defineEntries(webpackProdConfig,_game);

        // run webpack
        webpack(config, function(err, stats) {
            if(err) throw new gutil.PluginError('webpack:build', err);
            gutil.log('[webpack:build]', stats.toString({
                colors: true
            }));
            if(_index === games.length-1) {
                callback();
            }
        });
    });
});

gulp.task('sass', function () {
    games.forEach(function (_game) {
        gulp
            .src(['./library/' + _game + '/source/js/components/**/*.scss',
                  './library/' + _game + '/source/js/components/**/*.css',
                  './library/' + _game + '/source/css/*.scss',
                  './library/' + _game + '/source/css/*.css'])
            .pipe(sass().on('error', sass.logError))
            .pipe(concat('style.css'))
            .pipe(sourcemaps.init())
            .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./build/'+_game+'/css'))
            .pipe(livereload());
    });
});

gulp.task('sass-prod', function () {
    games.forEach(function (_game) {
        gulp
            .src(['./library/' + _game + '/source/js/components/**/*.scss',
                  './library/' + _game + '/source/js/components/**/*.css',
                  './library/' + _game + '/source/css/*.scss',
                  './library/' + _game + '/source/css/*.css'])
            .pipe(sass().on('error', sass.logError))
            .pipe(concat('style.css'))
            .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
            .pipe(gulp.dest('./build/'+_game+'/css'));
    });
});

gulp.task('copy-index', function () {
    games.forEach(function (_game) {
        gulp
            .src(path.join('./library', _game, 'index.html'))
            .pipe(gulp.dest('./build/'+_game));
    });
});

gulp.task('copy-media', ['copy-index'], function () {
    games.forEach(function (_game) {
        gulp
            .src(path.join( './library', _game, 'media/**/*' ))
            .pipe( gulp.dest(path.join( './build', _game, 'media' )) );
    });
});

gulp.task('copy-components', ['copy-media'], function () {
    games.forEach(function (_game) {
        gulp
            .src(path.join( './library', _game, 'source/js/components/**/*.html' ))
            .pipe( gulp.dest(path.join( './build', _game, 'components' )) );
    });
});

gulp.task('copy-thumbs', ['copy-components'], function () {
    games.forEach(function (_game) {
        gulp
            .src(path.join( './library', _game, 'thumb.jpg' ))
            .pipe( gulp.dest('./build/'+_game) );
    });
});

gulp.task('copy-webgl', [], function () {
    gulp
        .src(path.join('./webgl-library/**/*'))
        .pipe( gulp.dest(path.join('./build')) );
});

// To specify what game you'd like to copy play components into call gulp play-components --game game-name
// Replace game-name with the name of the game
gulp.task('play-components', function () {
    games.forEach(function (_game) {
        gulp
            .src( './node_modules/js-interactive-library/components/**/*' )
            .pipe( gulp.dest(path.join( './library', _game, 'source/js/components' )) );
    });
});

// To specify what game you'd like to watch call gulp watch --game game-name
// Replace game-name with the name of the game
gulp.task('watch', function(callback) {
    livereload.listen();
    var game = (games.length > 1) ? '**' : games[0];
    watch([
        '../js-interactive-library/build/play.js',
        'library/' + game + '/source/js/**/*.js',
        'library/' + game + '/source/js/components/**/*.scss',
        'library/' + game + '/source/js/components/**/*.css',
        'library/' + game + '/source/css/*.scss',
        'library/' + game + '/source/css/*.css',
        'library/' + game + '/source/js/components/**/*.html',
        'library/' + game + '/index.html'], function () {
        gulp.start('build-dev');
    });
});
