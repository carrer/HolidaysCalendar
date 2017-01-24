(function() {
    'use strict';

     var calendar = false,
        data = {};

    if (typeof module !== 'undefined')
        calendar = require('holidays-calendar');
    else
    {
        if (typeof HolidaysCalendar == 'undefined')
            throw 'You need to import "HolidaysCalendar" library.';
        calendar = HolidaysCalendar;
    }

    calendar.AddCalendar('locale', data);
    calendar.Locale('locale');
    function Locale()
    {
        return calendar.Locale();
    }


    if (typeof module !== 'undefined')
        module.exports = {
            Year: calendar.Year,
            Month: calendar.Month,
            Day: calendar.Day,
            Locale: Locale
        }

})();