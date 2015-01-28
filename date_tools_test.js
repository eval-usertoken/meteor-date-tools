Tinytest.add('DateTools.addDays()', function (test) {
  var newDate = DateTools.addDays(new Date(2014, 0, 1), 10);

  test.equal(newDate, new Date(2014, 0, 11));
});

Tinytest.add('DateTools.fuzzyDay()', function (test) {

  // With a date one day less than today, fuzzyDay.title is yesterday
  var yesterday = DateTools.addDays(new Date(), -1);
  var fuzzyDay = DateTools.fuzzyDay(yesterday);
  test.equal(fuzzyDay.title, 'Yesterday');

  // With a date of today, fuzzyDay.title is today
  var today = new Date();
  fuzzyDay = DateTools.fuzzyDay(today);
  test.equal(fuzzyDay.title, 'Today');

  // With a date one day greater than today, fuzzyDay.title is tomorrow
  var tomorrow = DateTools.addDays(new Date(), 1);
  fuzzyDay = DateTools.fuzzyDay(tomorrow);
  test.equal(fuzzyDay.title, 'Tomorrow');

  // With a date in two days, fuzzyDay.title is the day name
  // and the detail is the month name and date
  var inTwoDays = DateTools.addDays(new Date(), 2);
  fuzzyDay = DateTools.fuzzyDay(inTwoDays);
  test.equal(fuzzyDay.title, moment(inTwoDays).format('dddd'));
  test.equal(fuzzyDay.detail, moment(inTwoDays).format('MMM. Do'));

  // With a date not this year, fuzzyDay.detail includes the year
  var lastYear = new Date(2000, 0, 1);
  fuzzyDay = DateTools.fuzzyDay(lastYear);
  test.isTrue(fuzzyDay.detail.indexOf('2000') > -1);
});

// Mock for the tests
var mockDeviceOffset = 300;
DateTools._getDeviceOffset = function() {
  return mockDeviceOffset;
};

Tinytest.add('DateTools.timezoneToShow()', function (test) {
  // With no expected timezone, timezoneToShow is false
  var timezoneToShow = DateTools.timezoneToShow();
  test.isFalse(timezoneToShow);

  // With an expected timezone and no device timezone offset,
  // timezoneToShow is false
  DateTools.setExpectedTimezone('America/New_York');
  timezoneToShow = DateTools.timezoneToShow();
  test.isFalse(timezoneToShow);

  // With an expected timezone offset that is the same as the device timezone offset,
  // timezoneToShow is false
  DateTools.updateDeviceTimezone();
  timezoneToShow = DateTools.timezoneToShow();
  test.isFalse(timezoneToShow);

  // With an expected timezone offset that is different than the device timezone offset,
  // timezoneToShow is the expected timezone
  // Check offset 0 specifically, since it was a corner case bug before.
  mockDeviceOffset = 0;
  DateTools.updateDeviceTimezone();
  timezoneToShow = DateTools.timezoneToShow();
  test.equal(timezoneToShow, 'America/New_York');

  // With an expected timezone offset that is different than the device timezone offset,
  // timezoneToShow is the expected timezone.
  mockDeviceOffset = 480;
  DateTools.updateDeviceTimezone();
  timezoneToShow = DateTools.timezoneToShow();
  test.equal(timezoneToShow, 'America/New_York');
});
