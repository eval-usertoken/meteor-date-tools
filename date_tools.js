DateTools = {};

/**
 * Return a new date with days added or removed.
 * @param {Date} time
 * @param {Number} days
 * @returns {Date}
 */
DateTools.addDays = function (time, days) {
  var newDate = new Date(time);

  newDate.setDate(newDate.getDate() + days);

  return newDate;
};

/**
 * Return a new date at midnight on the same day as the time.
 * @param {Date} time
 * @returns {Date}
 */
DateTools.min = function (time) {
  return new Date(time.getFullYear(), time.getMonth(), time.getDate(), 0, 0, 0);
};

/**
 * Return a new date at 11:59:59 on the same day as the time.
 * @param {Date} time
 * @returns {Date}
 */
DateTools.max = function (time) {
  return new Date(time.getFullYear(), time.getMonth(), time.getDate(), 23, 59, 59);
};
