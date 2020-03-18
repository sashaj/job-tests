const gulp = require('gulp');
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream'); // to use in gulp stream
const watch = require('gulp-watch'); // to watch when file is being saved
const prefixer = require('gulp-autoprefixer'); // css
// const uglify = require('gulp-uglify');
const sass = require('gulp-sass'); // sass compiler
const pug = require('gulp-pug'); // pug compiler
const sourcemaps = require('gulp-sourcemaps'); // 6It automatically creates source maps from your code. A source map is used to tell you which file and line in your original code a part of minified code comes from
// const rigger = require('gulp-rigger');
const cssmin = require('gulp-minify-css'); // css min
// const imagemin = require('gulp-imagemin');
// const pngquant = require('imagemin-pngquant');
const rimraf = require('rimraf'); // deletes folders = cleans
const notify = require('gulp-notify'); // os notifier, errors
// const plumber = require('gulp-plumber');
const gutil = require('gulp-util');
const pugInheritance = require('gulp-pug-inheritance'); // Rebuild a jade file with other files that have extended or included those file
const changed = require('gulp-changed'); // only pass throught changed files
const cached = require('gulp-cached'); // This keeps an in-memory cache of files (and their contents) that have passed through it. If a file has already passed through on the last run it will not be passed downstream. This means you only process what you need and save time + resources.
const gulpif = require('gulp-if'); // conditions
const filter = require('gulp-filter'); // filter
const browserSync = require('browser-sync'); // updates browser

const { reload } = browserSync;

const webpackConfig = require('./webpack.config.js');

const isProduction = gutil.env.production || gutil.env.prod || false;

const path = {
  build: {
    html: 'build/',
    js: 'build/assets/js/',
    css: 'build/assets/css/',
    img: 'build/assets/img/',
    fonts: 'build/assets/fonts/',
  },
  src: {
    pug: 'src/template/**/*.pug',
    js: 'src/js/index.js',
    style: 'src/style/*.scss',
    img: 'src/images/**/*.*',
    fonts: 'src/fonts/**/*.*',
  },
  watch: {
    pug: 'src/template/**/*.pug',
    js: 'src/js/**/*.js',
    style: 'src/style/**/*.scss',
    img: 'src/images/**/*.*',
    fonts: 'src/fonts/**/*.*',
  },
  clean: './build',
};

const config = {
  server: {
    baseDir: './build',
  },
  tunnel: false,
  host: 'localhost',
  port: 9000,
  logPrefix: 'My Server',
};

gulp.task('webserver', () => {
  browserSync(config);
});

gulp.task('clean', cb => rimraf(path.clean, cb));

// gulp.task('pug', () =>
//   gulp
//     .src(path.src.pug)
//     .pipe(
//       pug({
//         pretty: true,
//       }),
//     )
//     .pipe(cached('pug'))
//     .on(
//       'error',
//       notify.onError({
//         message: 'Error: <%= error.message %>',
//         title: 'Error running something',
//       }),
//     )
//     .pipe(gulp.dest(path.build.html))
//     .pipe(reload({ stream: true })),
// );
gulp.task('pug', () =>
  gulp
    .src(path.src.pug)
    // cache on /off
    // .pipe(
    //   changed(path.build.html, {
    //     extension: '.html',
    //   }),
    // )
    // .pipe(gulpif(global.isWatching, cached('pug')))
    // .pipe(
    //   pugInheritance({
    //     basedir: 'src/template',
    //     skip: 'node_modules',
    //   }),
    // )
    // .pipe(filter(file => !/\/_/.test(file.path) && !/^_/.test(file.relative)))
    .pipe(
      pug({
        pretty: true,
      }),
    )
    .on(
      'error',
      notify.onError({
        message: 'Error: <%= error.message %>',
        title: 'Error running something',
      }),
    )
    .pipe(gulp.dest(path.build.html))
    .pipe(
      reload({
        stream: true,
      }),
    ),
);

gulp.task('webpack', () =>
  gulp
    .src(path.src.js)
    .pipe(
      gulpWebpack(
        {
          config: webpackConfig,
        },
        webpack,
      ),
    )
    .on('error', function handleError() {
      this.emit('end'); // Recover from errors
    })
    .pipe(gulp.dest(path.build.js))
    .pipe(
      reload({
        stream: true,
      }),
    ),
);

gulp.task('style', () =>
  gulp
    .src(path.src.style)
    .pipe(!isProduction ? sourcemaps.init() : gutil.noop())
    .pipe(
      sass({
        sourceMap: !isProduction,
        errLogToConsole: true,
        indentedSyntax: true,
        outputStyle: 'compressed',
        includePaths: ['./node_modules', './node_modules/swiper/dist/css'],
      }),
    )
    .on(
      'error',
      notify.onError({
        message: 'Error: <%= error.message %>',
        title: 'Error running something',
      }),
    )
    .pipe(
      prefixer({
        browsers: ['last 2 versions', 'ie >= 10'],
      }),
    )
    .pipe(isProduction ? cssmin() : gutil.noop())
    .pipe(!isProduction ? sourcemaps.write() : gutil.noop())
    .pipe(gulp.dest(path.build.css))
    .pipe(
      reload({
        stream: true,
      }),
    ),
);

gulp.task('image', () =>
  gulp
    .src(path.src.img)
    .pipe(gulp.dest(path.build.img))
    .pipe(
      reload({
        stream: true,
      }),
    ),
);

gulp.task('fonts', () => gulp.src(path.src.fonts).pipe(gulp.dest(path.build.fonts)));

gulp.task('build', ['pug', 'webpack', 'style', 'fonts', 'image']);
gulp.task('develop', ['pug', 'webpack', 'style', 'fonts', 'image']);

gulp.task('setWatch', () => {
  global.isWatching = true;
});

gulp.task('watch', ['setWatch', 'pug', 'webpack', 'style', 'fonts', 'image'], () => {
  watch([path.watch.pug], () => {
    gulp.start('pug');
  });
  watch([path.watch.style], () => {
    gulp.start('style');
  });
  watch([path.watch.js], () => {
    gulp.start('webpack');
  });
  watch([path.watch.img], () => {
    gulp.start('image');
  });
  watch([path.watch.fonts], () => {
    gulp.start('fonts');
  });
});

gulp.task('default', ['develop', 'webserver', 'watch']);
