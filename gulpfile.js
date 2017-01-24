var gulp = require('gulp');
var replace = require('gulp-replace');
var fs = require('fs'); 
var parse = require('csv-parse');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

gulp.task('build', [], function() {

    gulp.src(['./src/HolidaysCalendar.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

gulp.task('generate', ['build','csv2js'], function() {

    var locale = typeof process.argv[process.argv.indexOf('generate')+1] != 'undefined' ? process.argv[process.argv.indexOf('generate')+1].replace('--','') : 'generic';

    var sourceFilePath = './holidays.js';
    if (!fs.existsSync(sourceFilePath))
    {
        console.error(sourceFilePath+' does not exist');
        return;
    }

    var holidays = fs.readFileSync(sourceFilePath, 'utf-8');
    fs.unlinkSync(sourceFilePath);

    gulp.src(['./src/HolidaysCalendar-template.js'])
        .pipe(replace('data = {};', 'data = '+holidays+';'))
        .pipe(replace('\'locale\'', '\''+locale+'\''))
        .pipe(uglify())
        .pipe(rename("HolidaysCalendar-"+locale+".js"))
        .pipe(gulp.dest('dist/'));

});

gulp.task('csv2js', function(){

    return new Promise(function(resolve, reject){

        var sourceFilePath = './src/holidays.csv';
        var destinationFilePath = './holidays.js';
        var format_br = new RegExp(/(\d{1,2})[\/-]+(\d{1,2})[\/\-]+(\d{4})/);
        var format_iso8601 = new RegExp(/(\d{4})[\/-]+(\d{1,2})[\/\-]+(\d{1,2})/);
        var csvData= {};

        if (!fs.existsSync(sourceFilePath))
        {
            reject();
            console.error(sourceFilePath+' does not exist');
            return;
        }

        if (fs.existsSync(destinationFilePath))
        {
            fs.unlinkSync(destinationFilePath);
            if (fs.existsSync(destinationFilePath))
            {
                console.error('Can not write on '+destinationFilePath);
                reject();
                return;
            }
        }
        

        fs.createReadStream(sourceFilePath)
        .pipe(parse({delimiter: ';'}))
        .on('error', function(error) {
            console.warn(error);
            reject();
        })
        .on('data', function(csvrow) {

            var type = format_br.test(csvrow[0]) ? 'br' : ( format_iso8601.test(csvrow[0]) ? 'iso' : false );

            if (type != false)
            {
                var parts = type == 'br' ? format_br.exec(csvrow[0]) : format_iso8601.exec(csvrow[0]),
                    year = type == 'br' ? parts[3] * 1 : parts[1] * 1,
                    month = parts[2] * 1,
                    day = type == 'br' ? parts[1] * 1 : parts[3] * 1,
                    date = new Date(year, month-1, day);

                // if (date.getDay() != 0 && date.getDay() != 6)
                // {
                    if ( typeof csvData[year] == 'undefined' )
                        csvData[year] = {
                            months: {},
                            total: 0
                        }

                    if ( typeof csvData[year].months[month] == 'undefined' )
                        csvData[year].months[month] = {
                            days: {},
                            total: 0
                        }
                    
                    csvData[year].total++;
                    csvData[year].months[month].total++;
                    csvData[year].months[month].days[day] = csvrow[1];
                // }
            }

        })
        .on('end',function() {
        
            fs.writeFileSync(destinationFilePath, JSON.stringify(csvData));

            resolve();

        });
    })

})