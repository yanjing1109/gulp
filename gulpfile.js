var gulp = require('gulp'),  
    sass = require('gulp-ruby-sass'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    px2rem = require('gulp-px2rem-plugin');


//==============================================================================
//task: gulp

gulp.task('sass', () =>
    sass(['dev/scss/**/*.scss','!dev/scss/include/**/*.scss'], {
            style: 'compressed' //  'compact' 'compressed', 'expanded' //压缩css 
            // sourcemap: false,
        })
        .on('error', sass.logError)
        .pipe(gulp.dest('tao/css/'))        
);


// 脚本
gulp.task('scripts', function() {  
  return gulp.src(['dev/js/**/*.js','!dev/js/libs/**/*.js'],{
    
  })
    // 代码检查
    // .pipe(jshint.reporter('default'))
    // 合并文件
    //.pipe(concat('ui.js'))
    // 压缩
    .pipe(uglify())
    // 改名
    .pipe(rename({ suffix: '.min' }))
    // 输出
    .pipe(gulp.dest('tao/js/'))
});

//html
gulp.task('html', function() {
  return gulp.src(['dev/html/*.{html,htm}','!dev/html/**/*.{html,htm}'])
    .pipe(gulp.dest('tao/html/'))
    //.pipe(browserSync.reload({
    //  stream: true
    //}));
    //.pipe(notify({ message: 'html task complete' }));
});

// 图片
gulp.task('images', function() {  
  return gulp.src('dev/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('tao/images/'))
});
// 数据图片
gulp.task('img', function() {  
  return gulp.src('dev/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('tao/img/'))
});

// clean
gulp.task('clean', function() {  
  return gulp.src(['css','images','img'], {read: false})
    .pipe(clean());
});

// 预设任务
gulp.task('default', ['clean'], function() {  
    gulp.start('sass', 'images');
});

// watch
gulp.task('watch', function() {
  gulp.watch('dev/scss/**/*.scss', ['sass']);
  gulp.watch('dev/js/**/*.js', ['scripts']);
  gulp.watch('dev/images/**/*', ['images']);
  gulp.watch('dev/img/**/*', ['img']);
  gulp.watch('dev/html/**/*.{html,htm}', ['html'])

});



//==============================================================================
//task: gulpv1

gulp.task('sass-v1', () =>
    sass(['dev/v1/scss/**/*.scss','!dev/v1/scss/include/**/*.scss'], {
            style: 'compressed' //  'compact' 'compressed', 'expanded' //压缩css 
            // sourcemap: false,
        })
        .on('error', sass.logError)
        .pipe(gulp.dest('tao/v1/css/'))        
);


// 脚本
gulp.task('scripts-v1', function() {  
  return gulp.src(['dev/v1/js/**/*.js','!dev/v1/js/libs/**/*.js'],{
    
  })
    // 代码检查
    // .pipe(jshint.reporter('default'))
    // 合并文件
    //.pipe(concat('ui.js'))
    // 压缩
    .pipe(uglify())
    // 改名
    .pipe(rename({ suffix: '.min' }))
    // 输出
    .pipe(gulp.dest('tao/v1/js/'))
});

gulp.task('html-v1', function() {
  return gulp.src('v1/**/*.{html,htm}')
    .pipe(gulp.dest('tao/v1/'))
});

// 图片
gulp.task('images-v1', function() {  
  return gulp.src('dev/v1/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('tao/v1/images/'))
});
// 数据图片
gulp.task('img-v1', function() {  
  return gulp.src('dev/v1/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('tao/v1/img/'))
});

// clean
gulp.task('clean-v1', function() {  
  return gulp.src(['css','images','img'], {read: false})
    .pipe(clean());
});

// 预设任务
gulp.task('default-v1', ['clean'], function() {  
    gulp.start('sass', 'images');
});

  // watch
  gulp.task('watch-v1', function() {
  gulp.watch('dev/v1/scss/**/*.scss', ['sass-v1']);
  gulp.watch('dev/v1/js/**/*.js', ['scripts-v1']);
  gulp.watch('dev/v1/images/**/*', ['images-v1']);
  gulp.watch('dev/v1/img/**/*', ['img-v1']);
  gulp.watch('v1/*.{html,htm}', ['html-v1'])

});




//==============================================================================
//task: gulp m 

gulp.task('sass-m', () =>
    sass(['dev/m/scss/**/*.scss'], {
            style: 'compressed' //  'compact' 'compressed', 'expanded' //压缩css 
            // sourcemap: false,
        })
        .pipe(px2rem())
        .on('error', sass.logError)
        .pipe(gulp.dest('tao/m/css/')) 
);


// 脚本
gulp.task('scripts-m', function() {  
  return gulp.src(['dev/m/js/**/*.js','!dev/m/js/libs/**/*.js'],{
    
  })
    // 代码检查
    // .pipe(jshint.reporter('default'))
    // 合并文件
    //.pipe(concat('ui.js'))
    // 压缩
    .pipe(uglify())
    // 改名
    .pipe(rename({ suffix: '.min' }))
    // 输出
    .pipe(gulp.dest('tao/m/js/'))
});

//html
gulp.task('html-m', function() {
  return gulp.src('m/**/*.{html,htm}')
    .pipe(gulp.dest('tao/m/'))
});

// 图片
gulp.task('images-m', function() {  
  return gulp.src('dev/m/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('tao/m/images/'))
});
// 数据图片
gulp.task('img-m', function() {  
  return gulp.src('dev/m/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('tao/m/img/'))
});

// clean
gulp.task('clean-m', function() {  
  return gulp.src(['css','images','img'], {read: false})
    .pipe(clean());
});

// 预设任务
gulp.task('default-m', ['clean'], function() {  
    gulp.start('sass', 'images');
});

// watch
gulp.task('watch-m', function() {
  gulp.watch('dev/m/scss/**/*.scss', ['sass-m']);
  gulp.watch('dev/m/js/**/*.js', ['scripts-m']);
  gulp.watch('dev/m/images/**/*', ['images-m']);
  gulp.watch('dev/m/img/**/*', ['img-m']);
  gulp.watch('m/*.{html,htm}', ['html-m'])

});