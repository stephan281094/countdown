SyncedCron.add({
  name: 'Clear countdowns that finished',
  schedule: function(parser) {
    return parser.text('at 9:35 pm');
  },
  job: function() {
    Meteor.call('countdownRemoveFinished');
  }
});
