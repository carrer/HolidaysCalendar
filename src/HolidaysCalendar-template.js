var calendar = false,
    data = {};
if (typeof module !== 'undefined' && this.module !== module)
{
    calendar = require('./HolidaysCalendar');
}

if (calendar)
{
    calendar.AddCalendar('locale', data);
    calendar.Locale('locale');
}
else
{
    HolidaysCalendar.AddCalendar('locale', data);
    HolidaysCalendar.Locale('locale');
}

if (typeof module !== 'undefined' && this.module !== module)
    module.exports = {
        Year: calendar ? calendar.Year : HolidaysCalendar.Year,
        Month: calendar ? calendar.Month : HolidaysCalendar.Month,
        Day: calendar ? calendar.Day : HolidaysCalendar.Day,
        Locale: calendar ? calendar.Locale : HolidaysCalendar.Locale
    }