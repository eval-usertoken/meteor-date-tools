/**
 * Format a date (reactive).
 * Ex. Jan 16 5 PM
 * If the timezone is different from the expected timezone, append it.
 * Ex. Jan 16 4 PM CST
 * @param {Date} timestamp
 * @returns {String}
 */
DateTools.dateTimeLong = function (timestamp) {
  timestamp = moment(timestamp);

  var timezoneToShow = this.timezoneToShow();

  if (timezoneToShow) {
    return timestamp.tz(timezoneToShow).format('MMM DDDo LT z');
  }

  return timestamp.format('MMM DDDo LT');
};

/**
 * Format a date (reactive).
 * Ex. 5 PM
 * If the timezone is different from the expected timezone, append it.
 * Ex. 4 PM CST
 * @param {Date} timestamp
 * @returns {String}
 */
DateTools.timeLong = function (timestamp) {
  timestamp = moment(timestamp);

  var timezoneToShow = this.timezoneToShow();

  if (timezoneToShow) {
    return timestamp.tz(timezoneToShow).format('LT z');
  }

  return timestamp.format('LT');
};

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
  var detail = dateString;

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

  detail = shortDayOfWeek + ' ' + detail;

  return { title: title, detail: detail };
};
