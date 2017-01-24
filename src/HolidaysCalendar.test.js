var calendar = require("./HolidaysCalendar.js");
var expect = require("chai").expect;

describe('Holidays Calendar ...', function()
{
    describe('Locale', function()
    {
        it('should return false if there\'s no calendar available', function()
        {
            var result = calendar.Locale();
            expect(result).to.be.a('boolean');
            expect(result).to.be.false;

        });

        it('should return set and return locale (when a calendar is available)', function()
        {
            calendar.AddCalendar('brazil',{});
            calendar.Locale('brazil');
            var result = calendar.Locale();
            expect(result).to.be.a('string');
            expect(result).to.be.equal('brazil');
        });

    });


    describe('Year', function()
    {
        it('should bring back all months and total number of holidays for a given year', function()
        {
            calendar.AddCalendar('brazil', {
                "2020": {"months": {"1": {"days": {"6": "Anything"}, "total": 1}}, "total": 1},
            });
            calendar.Locale('brazil');
            var result = calendar.Year(2020);
            expect(result).to.be.a('object');
            expect(result.total).to.be.a('number');
            expect(result.total).to.be.equal(1);
            expect(result.months).to.be.a('array');
            expect(result.months.indexOf(1)).to.be.not.equal(-1);
        });

        it('should return false for non existing reference in the calendar', function()
        {
            calendar.AddCalendar('brazil', {
                "2020": {"months": {"1": {"days": {"6": "Anything"}, "total": 1}}, "total": 1},
            });
            calendar.Locale('brazil');
            var result = calendar.Year(2021);
            expect(result).to.be.a('boolean');
            expect(result).to.be.false;
        });

    });

    describe('Month', function()
    {
        it('should bring back all days and total number of holidays for a given year + month', function()
        {
            calendar.AddCalendar('brazil', {
                "2020": {"months": {"1": {"days": {"6": "Anything"}, "total": 1}}, "total": 1},
            });
            calendar.Locale('brazil');
            var result = calendar.Month(2020, 1);
            expect(result).to.be.a('object');
            expect(result.total).to.be.a('number');
            expect(result.total).to.be.equal(1);
            expect(result.days).to.be.a('array');
            expect(result.days.indexOf(6)).to.be.not.equal(-1);
        });

        it('should return false for non existing reference in the calendar', function()
        {
            calendar.AddCalendar('brazil', {
                "2020": {"months": {"1": {"days": {"6": "Anything"}, "total": 1}}, "total": 1},
            });
            calendar.Locale('brazil');
            var result = calendar.Month(2020, 2);
            expect(result).to.be.a('boolean');
            expect(result).to.be.false;
        });

    });

    describe('Day', function()
    {
        it('should bring back information about the holiday for a given year + month + day', function()
        {
            calendar.AddCalendar('brazil', {
                "2020": {"months": {"1": {"days": {"6": "Anything"}, "total": 1}}, "total": 1},
            });
            calendar.Locale('brazil');
            var result = calendar.Day(2020, 1, 6);
            expect(result).to.be.a('string');
            expect(result).to.be.equal("Anything");
        });

        it('should return false not a holiday', function()
        {
            calendar.AddCalendar('brazil', {
                "2020": {"months": {"1": {"days": {"6": "Anything"}, "total": 1}}, "total": 1},
            });
            calendar.Locale('brazil');
            var result = calendar.Day(2020, 1, 7);
            expect(result).to.be.a('boolean');
            expect(result).to.be.false;

            result = calendar.Day(2019, 2, 7);
            expect(result).to.be.a('boolean');
            expect(result).to.be.false;
        });

    });

})