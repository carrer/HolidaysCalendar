# HolidaysCalendar
This is a container library for retrieving the holidays' calendar of a locale. 

You can use it as a Node.js module or in browser, but you must extend it with your "localized" calendar or use it together with an available locale-module (like ```holidays-calendar-brazil```).

## Instalation

If you use NPM, then you can install it with ```npm install holidays-calendar```. Othewise, you can download the latest release and use it in your browser or in other Javascript-based projects.

## Creating a localized calendar

In order to create custom calendars, you must have Node.js installed. Inside ```src``` directory, there's a CSV spreadsheet file called **holidays.csv**. Change its content accordingly to your needs, keeping the same column scheme and date formats. Then run:
```bash
gulp generate --name
```
... where --**name** is your locale identificator. This will generate a new holidays-calendar-**identificator** module inside ```dist``` folder. There's a sample customization for the Brazilian Holidays Calendar, which happens to be the source code of the **holidays-calendar-brazil** module. It would be awesome if you could your custom calendar into the NPM repository.

## Usage

### Node.js
```javascript
var calendar = require("../dist/HolidaysCalendar-brazil");
console.log('The total number of holidays in 2020 is '+calendar.Year(2020).total);
```

### Browser
```html
<script src="../dist/HolidaysCalendar.js"></script>
<script src="../dist/HolidaysCalendar-brazil.js" charset="utf-8"></script>
<script>
console.log('The total number of holidays in 2020 is '+HolidaysCalendar.Year(2020).total);
</script>
```

## API Reference

### AddCalendar(locale, data)
Inserts a new calendar into the container.
**locale**: String, required. Locale identificator.
**data**: Object, required. Must respect the follow pattern:
```
{
    "YEAR": {
        "total": "TOTAL_HOLIDAYS_IN_YEAR",
        "months": {
            "MONTH": {
                "total": "TOTAL_HOLIDAYS_IN_MONTH",
                "days": {
                    "DAY": "HOLIDAY",
                    ...
                },
            },
            ...
        }
    },
    ...
}
```
Example:
```json
{
    "2017": {
        "total": 1,
        "months": {
            "1": {
                "total": 1,
                "days": {
                    "1": "New Years Day"
                }
            }
        }
    }
}
```

### Locale(locale)

Sets/Gets which calendar is being used, identified by its respective locale.

**locale**: String, optional. If informed, sets the library to use the locale's calendar. If omitted, retrives the locale being used.

***return***: Mixed: *String* when called with no parameters; *Nothing* when setting the locale.

### Year(year)

Retrieves information about holidays in year.

**year**: integer, required. Year reference.

***return***: Mixed. *Object* with structure: ```{total: integer, months: array of integer}``` when there are holidays within that year; *False* when there are no holidays in the given year.

#### Example

```bash
 var calendar = require("holidays-calendar-brazil");
 var data = calendar.Year(2020);
 \\data equals { months: [ 1, 2, 4, 5, 6, 9, 10, 11, 12 ], total: 11 }
```

### Month(year, month)

Retrieves information about holidays in a specific month.

**year**: integer, required. Year reference.

**month**: integer, required. Month reference (January=1).

***return***: Mixed. *Object* with structure: ```{total: integer, days: array of integer}``` when there are holidays within that year; *False* when there are no holidays in the given month.

#### Example

```bash
 var calendar = require("holidays-calendar-brazil");
 var data = calendar.Month(2020, 2);
 \\data equals { days: [ 24, 25 ], total: 2 }
```

### Day(year, month, day)

Retrieves information about a holiday in a specific date.

**year**: integer, required. Year reference.

**month**: integer, required. Month reference (January=1).

**day**: integer, required. Day reference.

***return***: Mixed. *String* representing the holiday name if the given date corresponds to a holiday according to the calendar in use; *False* when the date isn't a holiday.

#### Example
```bash
 var calendar = require("holidays-calendar-brazil");
 var data = calendar.Day(2020, 2, 25);
 \\data equals 'Carnaval'
```