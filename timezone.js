var expectedTimezone = null;

var deviceOffset = null;

var timezoneToShowDep = new Tracker.Dependency();

// This is a function so we can mock it in tests
DateTools._getDeviceOffset = function() {
  return new Date().getTimezoneOffset();
};

/**
 * Set the timezone the user is expecting their times to be displayed in.
 * @param timezone This can be a moment timezone string or a timezone offset number.
 */
DateTools.setExpectedTimezone = function (timezone) {
  if (timezone === expectedTimezone) return;

  expectedTimezone = timezone;
  timezoneToShowDep.changed();
};

/**
 * If there is a device timezone offset and expected timezone and they are
 * different return the expected timezone, otherwise return false (reactive).
 * Ex. device timezone is CST, expected timezone is EST, returns EST
 * @returns {Boolean} || {String}
 */
DateTools.timezoneToShow = function () {
  timezoneToShowDep.depend();

  if (!expectedTimezone || deviceOffset === null) return false;

  var expectedOffset = moment.tz.zone(expectedTimezone).parse();

  if (expectedOffset === deviceOffset) return false;

  return expectedTimezone;
};

/**
 * Update the device timezone offset. On Cordova this uses a plugin
 * and a moment formatter, on the browser this uses getDateOffset.
 */
DateTools.updateDeviceTimezone = function () {
  // Get the timezone offset on the browser and phones
  var newDeviceOffset = this._getDeviceOffset();
  if (deviceOffset === newDeviceOffset) return;

  deviceOffset = newDeviceOffset;
  timezoneToShowDep.changed();
};
