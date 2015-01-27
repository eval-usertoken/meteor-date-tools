DateTools = {};

/**
 * Return a new date with days added or removed.
 * @param {Date} timestamp
 * @param {Number} days
 * @returns {Date}
 */
DateTools.addDays = function (timestamp, days) {
  var newDate = new Date(timestamp);

  newDate.setDate(newDate.getDate() + days);

  return newDate;
};

/**
 * Return a new date at midnight on the same day as the timestamp.
 * @param {Date} timestamp
 * @returns {Date}
 */
DateTools.min = function (timestamp) {
  return new Date(timestamp.getFullYear(), timestamp.getMonth(), timestamp.getDate(), 0, 0, 0);
};

/**
 * Return a new date at 11:59:59 on the same day as the timestamp.
 * @param {Date} timestamp
 * @returns {Date}
 */
DateTools.max = function (timestamp) {
  return new Date(timestamp.getFullYear(), timestamp.getMonth(), timestamp.getDate(), 23, 59, 999);
};
