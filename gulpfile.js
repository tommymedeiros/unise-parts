/* gulpfile.js
 * Criado por Tommy Medeiros */

var cached        = require("gulp-cached"),
    cleanhtml     = require("gulp-cleanhtml"),
    concat        = require("gulp-concat"),
    ext           = require("gulp-ext"),
    ftp           = require("gulp-ftp"),
    gulp          = require("gulp"),
    gutil         = require("gulp-util"),
    haml          = require("gulp-ruby-haml"),
    imagemin      = require("gulp-imagemin"),
    plumber       = require("gulp-plumber"),
    pngquant      = require("imagemin-pngquant"),
    sass          = require("gulp-ruby-sass"),
    uglify        = require("gulp-uglify"),
    path          = {
          layout: ["layout/*",
                   "layout/**/*"],
           style: ["style/*",
                   "style/**/*"],
           fonts: ["fonts/*"],
             pix: ["pix/*",
                   "pix/**/*"],
      javascript: ["javascript/fittext/fittext.js",
                   "javascript/general.js",
                   "javascript/header.js",
                   "javascript/footer.js",
                   "javascript/course.js",
                   "javascript/blocks.js",
                   "javascript/frontpage.js",
                   "javascript/dock.js"],
             src: "P:/moodle_uniserpro_moodle_2/uniserpro src/",
           local: "P:/moodle_uniserpro_moodle_2/uniserpro/",
             ftp: "/www/unisedev/theme/uniserpro/"
    },
    onError = function(err) {
      gutil.beep();
      console.log(err);
    };

// Apenas copia o PHP para o destino final
gulp.task("layout", function() {
  return gulp.src(path.layout)
    .pipe(gulp.dest(path.src + "layout"))
    .pipe(gulp.dest(path.local + "layout"))
    .pipe(ftp({
      host: "moodle27.bhe.serpro",
      user: "unise",
      pass: "unise",
      remotePath: path.ftp + "layout"
    }));
});

// Compila o Sass e otimiza o CSS
gulp.task("style", function() {
  return gulp.src(path.style)
    .pipe(gulp.dest(path.src + "style"))
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass({
      cacheLocation: "sass_cache",
      style: "compressed",
      sourcemap: false,
      trace: true
    }))
    .pipe(concat("main.css"))
    .pipe(gulp.dest(path.local + "style"))
    .pipe(ftp({
      host: "moodle27.bhe.serpro",
      user: "unise",
      pass: "unise",
      remotePath: path.ftp + "style"
    }));
});

// Otimiza e concatena o JavaScript
gulp.task("javascript", function() {
  return gulp.src(path.javascript)
    .pipe(gulp.dest(path.src + "javascript"))
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(uglify())
    .pipe(concat("main.js"))
    .pipe(gulp.dest(path.local + "javascript"))
    .pipe(ftp({
      host: "moodle27.bhe.serpro",
      user: "unise",
      pass: "unise",
      remotePath: path.ftp + "javascript"
    }));
});

// Apenas copia as fontes para o destino final
gulp.task("fonts", function() {
  return gulp.src(path.fonts)
    .pipe(gulp.dest(path.src + "fonts"))
    .pipe(gulp.dest(path.local + "fonts"))
    .pipe(ftp({
      host: "moodle27.bhe.serpro",
      user: "unise",
      pass: "unise",
      remotePath: path.ftp + "fonts"
    }));
});

// Otimiza as imagens
gulp.task("pix", function() {
  return gulp.src(path.pix)
    .pipe(gulp.dest(path.src + "pix"))
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(cached("gulp_cache"))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(path.local + "pix"))
    .pipe(ftp({
      host: "moodle27.bhe.serpro",
      user: "unise",
      pass: "unise",
      remotePath: path.ftp + "pix"
    }));
});

// Observa alteracoes e roda tarefas
gulp.task("watch", function() {
    gulp.watch(path.layout, ["layout"]);
    gulp.watch(path.style, ["style"]);
    gulp.watch(path.javascript, ["javascript"]);
    gulp.watch(path.fonts, ["fonts"]);
    gulp.watch(path.pix, ["pix"]);
  }
);

// Tarefa padrao
gulp.task("default", ["layout",
                      "style",
                      "javascript",
                      "fonts",
                      "pix",
                      "watch"]);
