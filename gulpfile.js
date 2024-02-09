// function tarea( done ) {
//     console.log('Desde mi primer tarea');
//     done();

// }
// exports.tarea = tarea

// dependecias de css y sass
const { src, dest, watch, series,/*parallel*/} = require('gulp'); // Requerir funciones de Gulp
const sass = require('gulp-sass')(require('sass')); // Requerir gulp-sass con la versión de Dart Sass
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer'); // Requerir autoprefixer
const sourcemaps = require('gulp-sourcemaps'); // Requerir sourcemaps

// dependencias imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// Manejo de errores
function errorHandler(err) {
    console.error(err.toString());
    this.emit('end');
}

// Tarea para compilar Sass
function css() {
    return src('src/scss/app.scss') // Buscar el archivo app.scss en la carpeta src/scss
/*         .pipe(sass().on('error', errorHandler)) // Compilar el archivo Sass
 */     .pipe(sourcemaps.init()) // Inicializar sourcemaps
        .pipe(postcss([autoprefixer()])) // Usar autoprefixer para procesar el CSS
        .pipe(sourcemaps.write('.')) // Generar los mapas de origen en el archivo CSS
        .pipe(dest('build/css')); // Guardar el resultado en la carpeta build/css
}

// Tarea para optimizar imágenes
function imagenes() {
    return src('src/img/**/*')// todos los archivos de la carpeta
        .pipe( imagemin({ optimizationLevel: 3 }))
        .pipe( dest('build/img'))
}

// Tarea para generar versiones WebP de las imágenes
function versionWebp() {
    const opciones = {
        quality: 50
    };
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'));
}

// Tarea para generar versiones AVIF de las imágenes
function versionAvif() {
    const opciones = {
        quality: 50
    };
    return src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'));
}

// Tarea para observar cambios durante el desarrollo
function dev() {
    watch('src/scss/**/*.scss', css);// buscar todos los archivos css
    //watch('src/scss/app.scss', css); // Observar cambios en app.scss y ejecutar la función css
    watch('src/img/**/*', imagenes);
}
exports.css = css; // Exportar la función css para usarla desde la línea de comandos
exports.dev = dev; // Exportar la función dev para usarla desde la línea de comandos
exports.imagenes = imagenes;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;

// Tarea predeterminada que se ejecuta al llamar a "gulp" desde la línea de comandos
exports.default = series(imagenes, versionWebp, versionAvif, css, dev);


// series - se Inicia una tarea, y hasta que finaliza, inicia la siguiente
// paralle - todas inician al mismo tiempo


