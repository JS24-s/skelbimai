const mix = require('laravel-mix');

mix.js('src/modules/app.js', 'public/js')
   .js('src/modules/firebase-config.js', 'public/js')
   .js('src/modules/login.js', 'public/js')
   .js('src/modules/logout.js', 'public/js')
   .js('src/modules/register.js', 'public/js')
   .js('src/modules/upload.js', 'public/js')
   .sass('src/scss/app.scss', 'public/css')
   .copy('src/index.html', 'public/index.html')
   .copy('src/upload.html', 'public/upload.html')
   .copy('src/login.html', 'public/login.html')
   .copy('src/register.html', 'public/register.html')
   .copy('src/admin.html', 'public/admin.html')
   .setPublicPath('public');

mix.browserSync({
    proxy: false,
    server: { baseDir: 'public' },
    files: ['public/**/*']
});
