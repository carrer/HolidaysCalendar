var HolidaysCalendar = (function(){

    var calendars = {},
        methods = {},
        locale = false;

    verifyDefault = function()
    {
        if (!locale)
            for(var calendar in calendars)
            {
                locale = calendar;
                return;
            }
    }

    methods.AddCalendar = function(local, data)
    {
        calendars[local] = data;
    }

    methods.Locale = function(local)
    {
        if (typeof local == 'undefined')
            return locale;

        if (typeof calendars[local] != 'undefined')
            locale = local;
        else
            throw "There is no calendar available for '"+local+"'";
    }

    methods.Year = function(year)
    {
        verifyDefault();
        if (!locale)
            return false;

        if (typeof calendars[locale][year] != 'undefined')
        {
            var months = [];
            var list = calendars[locale][year].months;
            for(var month in list)
                months.push(month * 1);

            return {
                months: months,  
                total: calendars[locale][year].total
            }
        }
        return false;
    }

    methods.Month = function(year, month)
    {
        verifyDefault();
        if (!locale)
            return false;

        if (typeof calendars[locale][year] != 'undefined' && typeof calendars[locale][year].months[month] != 'undefined')
        {
            var days = [];
            var list = calendars[locale][year].months[month].days;
            for(var day in list)
                days.push(day * 1);

            return {
                days: days,  
                total: calendars[locale][year].months[month].total
            }
        }
        return false;
    }

    methods.Day = function(year, month, day)
    {
        verifyDefault();
        if (!locale)
            return false;

        if (typeof calendars[locale][year] != 'undefined' && typeof calendars[locale][year].months[month] != 'undefined' && typeof calendars[locale][year].months[month].days[day] != 'undefined')
        {
            return calendars[locale][year].months[month].days[day];
        }
        return false;
    }

    return methods;

}());

if (typeof module != 'undefined')
    module.exports = {
        AddCalendar: HolidaysCalendar.AddCalendar,
        Year: HolidaysCalendar.Year,
        Month: HolidaysCalendar.Month,
        Day: HolidaysCalendar.Day,
        Locale: HolidaysCalendar.Locale
    }