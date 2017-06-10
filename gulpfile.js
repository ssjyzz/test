'use strict';

var gulp = require("gulp");

// 浏览器同步组件
var browserSync = require("browser-sync").create();

var $ = require("gulp-load-plugins")();

var app = {
	srcPath:"src/",
	distPath:"dist/",
	proname:"test"
}
/*
	"browser-sync": "^2.18.12",
    "gulp": "^3.9.1",
    "gulp-clean": "^0.3.2",
    "gulp-concat": "^2.6.1",
    "gulp-cssmin": "^0.2.0",
    "gulp-htmlmin": "^3.0.0",
    "gulp-less": "^3.3.0",
    "gulp-load-plugins": "^1.5.0",
    "gulp-rename": "^1.2.2",
    "gulp-uglify": "^3.0.0"
*/
// html的拷贝压缩
gulp.task("html",function(){
	gulp.src(app.srcPath+"**/*.html")
		.pipe($.htmlmin({
			collapseBooleanAttributes:true,
			removeEmptyAttributes:true
		}))
		.pipe(gulp.dest(app.distPath))
		.pipe(browserSync.stream());
});
// less的编译拷贝压缩重命名合并
gulp.task("less",function(){
	gulp.src(app.srcPath+"**/*.less")
		.pipe($.less())
		.pipe($.concat(app.proname+".css"))
		.pipe(gulp.dest(app.distPath+"css"))
		.pipe($.cssmin())
		.pipe($.rename({suffix:".min"}))
		.pipe(gulp.dest(app.distPath+"css"))
		.pipe(browserSync.stream());
});
// js的拷贝压缩混淆合并
gulp.task("js",function(){
	gulp.src(app.srcPath+"js/**/*.js")
		.pipe($.concat(app.proname+".js"))
		.pipe($.uglify())
		.pipe($.rename({suffix:".min"}))
		.pipe(gulp.dest(app.distPath+"js"))
		.pipe(browserSync.stream());
});

// utils的拷贝
gulp.task("utilJs",function(){
	gulp.src(app.srcPath+"utils/**/*.js")
		.pipe(gulp.dest(app.distPath+"js"))
		.pipe(browserSync.stream());
});

// 清空
gulp.task("clean",function(){
	gulp.src(app.distPath)
		.pipe($.clean())
		.pipe(browserSync.stream());
});
// 任务合并
gulp.task("mytask",["html","less","js","utilJs"]);
// 添加监视器 完整全自动任务
gulp.task("watch",["html","less","js","utilJs"],function(){
	gulp.watch(app.srcPath+"**/*.html",["html"]);
	gulp.watch(app.srcPath+"**/*.less",["less"]);
	gulp.watch(app.srcPath+"js/**/*.js");
	gulp.watch(app.srcPath+"utils/**/*.js",["utilJs"]);
});

// 浏览器同步静态服务器
gulp.task("by",["watch"],function(){
	browserSync.init({
		server:{
			baseDir:app.disPath
		},
		port:7777
	});
});

// gulp 默认启动服务
// default 是gulp的默认启动任务
gulp.task("default",["watch"],function(){
	browserSync.init({
		server:{
			baseDir:app.disPath
		},
		port:7777
	});
});
