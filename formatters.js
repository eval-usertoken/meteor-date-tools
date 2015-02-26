// Helper used for formatting
// If excludeTimezone is true, the date will be formatted in the proper
// timezone, but will not show the timezone label
DateTools._format = function (time, momentFormat, excludeTimezone) {
  time = moment(time);

  // Default moment format to a long time
  momentFormat = momentFormat || 'LT';

  var timezoneToShow = this.timezoneToShow();

  if (!timezoneToShow) return time.format(momentFormat);

  if (excludeTimezone) return time.tz(timezoneToShow).format(momentFormat);

  return time.tz(timezoneToShow).format(momentFormat + ' z');
};

/**
 * Format a date (reactive).
 * Ex. Jan 16th 5:00 PM (w/ momentFormat 'MMM Do LT')
 * Ex. 5:05 PM (w/ momentFormat 'LT')
 * If the timezone is different from the expected timezone, append it.
 * Ex. Jan 16th 4:00 PM CST
 * Ex. 4:05 PM CST
 * @param {Array.<Date> | Date} times
 * @param {String} [momentFormat] The moment format to use. Defaults to 'LT'.
 * @returns {String}
 */
DateTools.format = function (times, momentFormat) {
  if (!times) return;

  if (!(times instanceof Array)) return DateTools._format(times, momentFormat);

  if (!times.length) return;

  if (times.length === 1)  return DateTools._format(times[0], momentFormat);

  var timeRange = DateTools._format(times.shift(), momentFormat, true);

  times.forEach(function (time) {
    timeRange += ' - ' + DateTools._format(time, momentFormat);
  });

  return timeRange;

}

/**
 * The relative day to today (reactive).
 * @param {Date} date
 * @returns {{title: String, detail: String}}
 * Ex. { title: 'Last Wednesday', detail: 'Nov. 12th' }
 * Ex. { title: 'Today', detail: 'Mon Nov. 10th' }
 */
DateTools.fuzzyDay = function (date) {
  if (Tracker.active) {
    var midnightTomorrow = moment().add(1, 'days').startOf('day');
    TimeTracker.changeAt(midnightTomorrow.toDate());
  }

  var dayMoment = moment(date).startOf('day');
  var todayMoment = moment().startOf('day');
  var daysFromToday = dayMoment.diff(todayMoment, 'days');

  var dayOfWeek = dayMoment.format('dddd'),
    shortDayOfWeek = dayMoment.format('ddd');

  var dateString = dayMoment.format('MMM. Do');

  // If it is not this year include the year.
  if (todayMoment.get('year') !== dayMoment.get('year')) {
    dateString += ' ' + dayMoment.format('YYYY');
  }

  // Default the title to day of the week
  // and default the detail to the month and day.
  var title = dayOfWeek;
  var detail = shortDayOfWeek + ' ' + dateString;

  // Yesterday
  if (daysFromToday === -1) {
    title = 'Yesterday';
  }
  // Today
  else if (daysFromToday === 0) {
    title = 'Today';
  }
  // Tomorrow
  else if (daysFromToday === 1) {
    title = 'Tomorrow';
  }
  // Other days show the day of the week in the title
  // so only show the date string in the detail.
  else {
    detail = dateString;
  }


  return {title: title, detail: detail};
};
