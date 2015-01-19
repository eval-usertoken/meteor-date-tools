if (Meteor.isClient) {
  Template.example.helpers({
    date: function () {
      return DateTools.format(new Date(), 'LT');
    }
  });

  Template.example.events({
    'change select': function (event) {
      var expectedTimezone = $(event.currentTarget).val();

      DateTools.setExpectedTimezone(expectedTimezone);
    }
  });

  Meteor.startup(function () {
    DateTools.updateDeviceTimezone();
  });
}
