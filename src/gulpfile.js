var less = require("gulp-less");
var path = require("path");

gulp.task("less", function () {
  return gulp
    .src("/src/css/style.less")
    .pipe(
      less({
        paths: [path.join(__dirname, "less", "includes")],
      })
    )
    .pipe(gulp.dest("./public"));
});
