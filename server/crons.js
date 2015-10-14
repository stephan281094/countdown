SyncedCron.add({
  name: 'Clear countdowns that finished',
  schedule(parser) {
    return parser.text('at 2:00 am');
  },
  job() {
    Meteor.call('countdownRemoveFinished');
  }
});
