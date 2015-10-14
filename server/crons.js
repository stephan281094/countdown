SyncedCron.add({
  name: 'Clear countdowns that finished',
  schedule: function(parser) {
    return parser.text('at 2:00 am');
  },
  job: function() {
    Meteor.call('countdownRemoveFinished');
  }
});
