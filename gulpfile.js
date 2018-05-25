const gulp=require('gulp');
//const imagemin=require('gulp-imagemin');
const babel=require('gulp-babel');
const connect=require('gulp-connect');
const concat=require('gulp-concat');
const uglify=require('gulp-uglify');
const sass=require('gulp-sass-china');
gulp.task('sass',function(){
	return gulp.src('./sass/**/*.scss')
	.pipe(sass().on('error',sass.logError))
	.pipe(gulp.dest('dist'));
})
gulp.task('connect',function(){
	connect.server({
		port:8888,
		root:"dist",
		livereload:true
	});
});
gulp.task("active",function(){
	return gulp.src("active.html")
	.pipe(gulp.dest("dist"))
	.pipe(connect.reload())
});
gulp.task("watch",()=>{
	gulp.watch("active.html",["active"]);
	gulp.watch("./sass/**/*.scss",["sass"]);
})
gulp.task("build",["active"]);
gulp.task('default',['connect','watch']);
